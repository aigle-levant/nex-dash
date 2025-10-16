import { pool } from "../db/db.js";

export async function insertCustomer(broker_id, name, email, gstin) {
    const exists = await pool.query("SELECT 1 FROM customers WHERE email=$1 AND broker_id=$2", [email, broker_id]);
    if (exists.rowCount > 0) {
        throw new Error("Customer exists");
    }
    await pool.query(
        "INSERT INTO customers (broker_id, name, email, gstin) VALUES ($1,$2,$3,$4)",
        [broker_id, name, email, gstin]
    );
    return true;
}

export async function selectCustomer(broker_id) {
    const result = await pool.query("SELECT * FROM customers WHERE broker_id=$1", [
        broker_id,
    ]);
    if (!result) {
        throw new Error("No results");
    }
    return result;
}