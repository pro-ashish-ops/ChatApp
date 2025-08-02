import User from "../models/user.js";
import jwt from "jsonwebtoken";


// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(req.userId).select("-password -__v");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error.message)
        return res.status(401).json({ success: false, message: "Unauthorized", error: error.message });
    }
};
