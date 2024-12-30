import { getUserByMiddleware } from "$lib/middleware/user";
import { RequestEvent } from "./$types";
import { handlerError } from "$lib/handler/error.handler";
import { json } from "@sveltejs/kit";
import { createHash } from "node:crypto"
import mime from "mime"
import { checkIsAdmin } from "$lib/middleware/admin";
import { BUCKET_NAME, BUCKET_URL } from "$env/static/private";
import { s3 } from "$lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3"


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

        await s3.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: filename,
            Body: buf,
            ContentType: file.type,
        }))

        return json({
            url: `${BUCKET_URL}/${filename}`
        }, { status: 201 })

    } catch (e) {
        return handlerError(e);
    }
}


