import jwt from "jsonwebtoken";

export function authMiddleware(request, response, next) {
    const head = request.headers.authorization;
    // no token, verification is not done yet
    if (!head || !head.startsWith("Bearer ")) {
        return response.status(400).json({
            error: "401",
            message: "No token provided",
            cause: "Missing token.",
            hint: "Please ensure the user is signed up and has entries in the records."
        });
    }
    const token = head.split(" ")[1];
    // verify signature
    try {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Verification done.")
        request.user = verifyToken;
        console.log("User is legitimate.");
        next();
    } catch (err) {
        return response.status(403).json({
            error: "403",
            message: "Invalid or expired token",
            cause: "Token is either expired or doesn't match the signed value.",
            hint: "Please login back, or ensure the user is legit."
        });
    }
}