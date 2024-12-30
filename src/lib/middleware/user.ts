import { verifyToken } from "$lib/token";
import { Cookies } from "@sveltejs/kit";
import { IUser, IUserJWT } from "../interface/user.interface";
import { conn } from "$lib/db";
import constant from "$lib/constant";
import { LoginRequired } from "$lib/errors/authenticate.errors";


export async function getUserByMiddleware(cookie: Cookies, safe = false) {
    // Get cookie
    const token = cookie.get("token") as string;
    if (!token && !safe) throw new LoginRequired();
    if (!token && safe) return null;
    // Decode token
    const decoded = await verifyToken<IUserJWT>(token);
    if (!decoded && !safe) throw new LoginRequired();
    if (!decoded && safe) return null;
    // Search user
    const [accounts] = await conn.query<IUser>(constant.checkUserById, [decoded!.userid]);
    if(!accounts.length && !safe) throw new LoginRequired();
    if (!accounts.length && safe) return null;

    return accounts[0]
}