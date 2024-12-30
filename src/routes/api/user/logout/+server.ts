import { redirect } from "@sveltejs/kit";
import { RequestEvent } from "./$types";

export async function GET({ cookies }: RequestEvent) {
    cookies.delete("token", {
        path: '/',
        sameSite: 'lax',
    })
    return redirect(301, '/')
}