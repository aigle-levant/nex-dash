import { login, register, getUserDetails } from "../services/auth.services.js";

export async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        const missingFields = [];
        if (!email) missingFields.push("email");
        if (!password) missingFields.push("password");

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: "400",
                message: "Validation failed: Missing required fields",
                cause: "Incomplete input received",
                missingFields,
                hint: "Please provide all required fields to proceed"
            });
        }

        const userToken = await login(email, password);

        res.status(200).json({
            message: "Login successful",
            token: userToken
        });

    } catch (err) {
        console.error(err);
        if (err.message === "User does not exist" || err.message === "Invalid credentials") {
            return res.status(401).json({
                error: "401",
                message: "Invalid credentials",
                cause: "Email or password is incorrect"
            });
        }

        res.status(500).json({
            error: "500",
            message: "Server error",
            cause: "A malfunction happened in the server's functions"
        });
    }
}

export async function registerController(req, res) {
    try {
        const { name, email, password, gstin } = req.body;

        const missingFields = [];
        if (!name) missingFields.push("name");
        if (!email) missingFields.push("email");
        if (!password) missingFields.push("password");
        if (!gstin) missingFields.push("gstin");

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: "400",
                message: "Validation failed: Missing required fields",
                cause: "Incomplete input received",
                missingFields,
                hint: "Please provide all required fields to proceed"
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
                cause: "The email provided is already registered"
            });
        }

        res.status(500).json({
            error: "500",
            message: "Server error",
            cause: "A malfunction happened in the server's functions"
        });
    }
}

export async function profileController(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(403).json({ message: "Forbidden" });

        const user = await getUserDetails(userId);

        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            gstin: user.gstin || "",
            is_admin: user.is_admin,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
