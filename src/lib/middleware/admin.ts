import { IUser } from "$lib/interface/user.interface";


export function checkIsAdmin(role: IUser["role"]): [boolean, string | null] {
    return role === "ADMIN" ? [true, null] : [false, "You can't access this path"]
}