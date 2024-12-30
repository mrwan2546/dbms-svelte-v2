import { type Options, hash as argonHash, verify as argonVerify } from "@node-rs/argon2";

// Password algorithm config
const ARGON2_OPTIONS: Options = {
    algorithm: 2,
    memoryCost: 4096,
    version: 1,
    secret: new TextEncoder().encode("CoffeeStore@2024")
};

export function hash(password: string) {
    return argonHash(new TextEncoder().encode(password), ARGON2_OPTIONS)
}

export function verify(hashed: string, password: string) {
    return argonVerify(
        new TextEncoder().encode(hashed),
        new TextEncoder().encode(password),
        ARGON2_OPTIONS
    )
}