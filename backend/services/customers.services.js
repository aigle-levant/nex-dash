import { pool } from "../db/db.js";

export async function insertCustomer(broker_id, name, email, gstin) {
    const exists = await pool.query(
        "SELECT 1 FROM customers WHERE email=$1 AND broker_id=$2",
        [email, broker_id]
    );
    if (exists.rowCount > 0) throw new Error("Customer exists");

    const result = await pool.query(
        "INSERT INTO customers (broker_id, name, email, gstin) VALUES ($1,$2,$3,$4) RETURNING *",
        [broker_id, name, email, gstin]
    );
    return result.rows[0];
}

export async function selectCustomer(broker_id, isAdmin = false) {
    if (isAdmin) {
        const query = `
      SELECT c.*, u.name AS broker_name
      FROM customers c
      JOIN users u ON c.broker_id = u.id
      WHERE c.id IN (
        SELECT id FROM (
          SELECT id,
                 ROW_NUMBER() OVER (PARTITION BY broker_id ORDER BY created_at DESC) AS rn
          FROM customers
        ) t
        WHERE rn <= 5
      )
      ORDER BY broker_id, created_at DESC;
    `;
        return await pool.query(query);
    } else {
        const query = `
      SELECT c.*, u.name AS broker_name
      FROM customers c
      JOIN users u ON c.broker_id = u.id
      WHERE c.broker_id=$1
      ORDER BY c.created_at DESC;
    `;
        return await pool.query(query, [broker_id]);
    }
}

export async function getCustomers(request, response) {
    try {
        if (!request.user) {
            return response.status(403).json({ message: "Forbidden" });
        }

        const { id: broker_id, is_admin: isAdmin } = request.user;
        const data = await selectCustomer(broker_id, isAdmin);

        return response.status(200).json({
            message: "Customers fetched successfully",
            customers: data.rows,
        });
    } catch (err) {
        console.error("Error fetching customers:", err);
        return response.status(500).json({
            error: "500",
            message: "Server error",
            cause: "A malfunction occurred while fetching customers.",
        });
    }
}