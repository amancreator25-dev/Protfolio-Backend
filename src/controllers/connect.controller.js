import { Contact } from "../models/contact.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);

    const {
        fullname,
        email,
        telephone,
        description
    } = req.body;

    if (
        !fullname ||
        !email ||
        !telephone ||
        !description
    ) {
        throw new apiError(
            400,
            "All fields are required!"
        );
    }

    const contact = await Contact.create({
        fullname,
        email,
        telephone,
        description
    });

    return res.status(201).json(
        new apiResponse(
            201,
            contact,
            "Message sent successfully!"
        )
    );
});

export {
    createContact
};