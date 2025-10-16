import { insertCustomer, selectCustomer } from "../services/customers.services.js";


export async function handleCustomerInsertion(request, response) {
    try {
        const missingFields = [];
        const { name, email, gstin } = request.body;
        // handle missing info in customer details
        if (!name) missingFields.push("name");
        if (!email) missingFields.push("email");
        if (!gstin) missingFields.push("gstin");


        const broker_id = request.user.id;
        // handle missing id
        if (!broker_id) missingFields.push("broker_id");

        if (missingFields.length > 0) {
            return response.status(400).json({
                error: "400",
                message: "Validation failed: Missing required fields",
                cause: "Incomplete input received",
                missingFields,
                hint: "Please provide all required fields to proceed"
            });
        }

        const data = await insertCustomer(broker_id, name, email, gstin);
        if (!data) {
            return response.status(400).json({
                error: "500",
                message: "No data received",
                cause: "Incomplete input received",
                missingFields,
                hint: "Please provide all required fields to proceed"
            });
        }
        return response.status(201).json({
            status: "201",
            message: "New customer created",
            data: data
        })
    } catch (err) {
        console.error("Error creating customer:", err);
        if (err.message === "Customer exists") {
            return response.status(409).json({
                error: "409",
                message: "Customer already exists for this broker",
                cause: "Duplicate entry detected",
            });
        }

        return response.status(500).json({
            error: "500",
            message: "Server error",
            cause: "A malfunction occurred while inserting the customer.",
        });
    }
}

export async function getCustomers(request, response) {
    try {
        if (!request.user) {
            return response.status(403).json({ message: "Forbidden" });
        }

        const broker_id = request.user.id;
        const isAdmin = request.user.is_admin;

        const data = await selectCustomer(isAdmin ? null : broker_id, isAdmin);

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