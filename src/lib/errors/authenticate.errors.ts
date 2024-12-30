export class LoginRequired extends Error {
    constructor() {
        super("Login required.")
    }
}