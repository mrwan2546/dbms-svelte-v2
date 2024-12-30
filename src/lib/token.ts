import { JWT_TOKEN } from "$env/static/private";
import pkg from 'jsonwebtoken';
const {sign, verify} = pkg;
import type { SignOptions, VerifyOptions } from "jsonwebtoken";

const JWT_SIGN_OPTIONS: SignOptions = {
    algorithm: "HS384",
    expiresIn: "1d",
};
const JWT_VERIFY_OPTIONS: VerifyOptions = {
    algorithms: ["HS384"],
};

export async function encodeToken<D extends object>(value: D): Promise<string> {
    return sign(value, JWT_TOKEN || "", JWT_SIGN_OPTIONS);
}

export async function verifyToken<D extends object>(
    token: string
): Promise<D | null> {
    try {
        return verify(token, JWT_TOKEN || "", JWT_VERIFY_OPTIONS) as D;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
        return null;
    }
}
