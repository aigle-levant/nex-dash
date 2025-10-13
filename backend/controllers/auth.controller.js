import { login, register } from "../services/auth.services.js";

export async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "400",
                message: "All fields required",
                cause: "Incomplete input received."
            });
        }

        const userToken = await login(email, password);

        if (!userToken) {
            return res.status(401).json({
                error: "401",
                message: "Invalid credentials",
                cause: "Email or password is incorrect."
            });
        }

        res.status(200).json({
            message: "Login successful",
            token: userToken
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "500",
            message: "Server error",
            cause: "A malfunction happened in the server's functions."
        });
    }
}

export async function registerController(req, res) {
    try {
        const { name, email, password, gstin } = req.body;

        if (!name || !email || !password || !gstin) {
            return res.status(400).json({
                error: "400",
                message: "All fields required",
                cause: "Incomplete input received."
            });
        }

        const user = await register(name, email, password, gstin);

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (err) {
        console.error(err);
        if (err.message === "User already exists") {
            return res.status(409).json({
                error: "409",
                message: "User already exists",
                cause: "The email provided is already registered."
            });
        }

        res.status(500).json({
            error: "500",
            message: "Server error",
            cause: "A malfunction happened in the server's functions."
        });
    }
}