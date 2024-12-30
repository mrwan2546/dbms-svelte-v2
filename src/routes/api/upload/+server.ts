import { getUserByMiddleware } from "$lib/middleware/user";
import { RequestEvent } from "./$types";
import { handlerError } from "$lib/handler/error.handler";
import { json } from "@sveltejs/kit";
import fs from "node:fs"
import path from "node:path"
import { createHash } from "node:crypto"
import mime from "mime"
import { checkIsAdmin } from "$lib/middleware/admin";

const UPLOAD_PATH = "upload"
const UPLOAD_FOLDER = path.resolve(process.cwd(), "static", "upload")

export async function POST({ cookies, request }: RequestEvent) {
    try {
        // Validate user
        const user = await getUserByMiddleware(cookies, false);
        if (!user) return
        const [success, message] = checkIsAdmin(user?.role || "USER")
        if (!success) return json({
            message: message || "Unknown error"
        }, { status: 403 })

        // Get file
        const forms = await request.formData()
        const file = forms.get("file") as File;
        if (!file.type.startsWith("image")) {
            return json({ message: "Support image file only" }, { status: 400 })
        }

        // Convert to buffer
        const buf = new Uint8Array(await file.arrayBuffer())
        // Hash content file to filename for reduce disk
        const extension = await mime.getExtension(file.type)
        const filename = `${createHash("sha1").update(buf).digest("hex")}.${extension}`
        // Check if 
        if (!fs.existsSync(UPLOAD_FOLDER)) {
            try {
                fs.mkdirSync(UPLOAD_FOLDER, { recursive: true })
            } catch { /* empty */ }
        }
        // Write file
        await fs.writeFileSync(path.resolve(UPLOAD_FOLDER, filename), buf)

        return json({
            url: `/${UPLOAD_PATH}/${filename}`
        }, { status: 201 })

    } catch (e) {
        return handlerError(e);
    }
}


