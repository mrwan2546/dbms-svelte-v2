export interface IUser {
    id: number;
    username: string;
    password: string;
    display_name: string;
    role: "USER" | "ADMIN"
}


export interface IUserJWT {
    userid: number;
}