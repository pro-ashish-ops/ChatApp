import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js"; 
import User from "../models/user.js";
import bcrypt from "bcryptjs";

//signup a new user
export const signup = async (req,res)=>{
    console.log("📥 Signup endpoint hit:", req.body);
    const {fullName,email,password,bio} = req.body;

    try {
        console.log("Signup request body:", req.body);
        if(!fullName || !email || !password || !bio){   
            console.log("Signup req.body:", req.body);

            return res.json({success:false, message:"Missing Details"})
        }
        const user = await User.findOne({email});

        if(user){
            return res.json({success:false, message:"User already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            email,
            password:hashedPassword,
            bio
        });

        const token = generateToken(newUser._id);

        res.json({
            success:true,
            userData: newUser,
            token,
            message:"User created successfully"
        });

    } catch (error) {
        console.error("Error in signup:", error.message);
        return res.json({success:false, message:error.message});
    }
}


// Controller to login a new user
export const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const userData = await User.findOne({email});
        // if (!userData) {
        //     return res.json({success:false, message:"Invalid Credentials"});
        // }
        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if(!isPasswordCorrect){
            return res.json({success:false, message:"Invalid Credentials"});
        }

        const token = generateToken(userData._id);

        res.json({
            success:true,
            userData,
            token,
            message:"Login Successful"
        });

    } catch (error) {
        console.error("Error in login:", error.message);
        return res.json({success:false, message:error.message});
    }
}

// controller to check if user is authenticated
export const checkAuth = async (req, res) => {
    res.json({success:true, user:req.user});
};

// controller to update user profile details
export const updateProfile = async (req, res) => {
    try {
        const { fullName, bio, profilePic } = req.body;
        const userId = req.user._id;

        let updatedUser;

        if(!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, {
                fullName,
                bio
            }, { new: true });
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId, {
                fullName,
                bio,
                profilePic: upload.secure_url
            }, { new: true });
        }

        res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message:error.message });
    }
};