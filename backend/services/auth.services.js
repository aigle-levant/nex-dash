import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/db.js";

const salt = parseInt(process.env.SALT) || 10;

export async function login(email, password) {
    // get user info from db
    const getUser = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (getUser.rows.length === 0) throw new Error("User does not exist");

    const hashed = getUser.rows[0].password_hash;
    const passwordMatch = await bcrypt.compare(password, hashed);
    if (!passwordMatch) throw new Error("Invalid credentials");

    const user = getUser.rows[0];

    const token = jwt.sign(
        { id: user.id, email: user.email, is_admin: user.is_admin },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    return token;
}

export async function register(name, email, password, gstin) {
    // does the user already exist?
    const isUserExisting = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    // user exists, throw error
    if (isUserExisting.rows.length > 0) {
        throw new Error("User already exists");
    }
    // hash password
    const hashed = await bcrypt.hash(password, salt);
    // insert user into db
    const newUser = await pool.query(
        "INSERT INTO users (name, email, password_hash, gstin) VALUES ($1, $2, $3, $4) RETURNING id, name, email, gstin",
        [name, email, hashed, gstin]
    );
    return newUser.rows[0];
}

export async function getUserDetails(id) {
    const result = await pool.query(
        "SELECT id, name, email, gstin, is_admin FROM users WHERE id=$1",
        [id]
    );

    if (result.rowCount === 0) {
        throw new Error("User not found");
    }

    return result.rows[0];
}