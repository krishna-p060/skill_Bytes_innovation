import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { ApiResponse } from "@/types/ApiResponse";
import bcrypt from "bcryptjs";

//verfication email
//api response

// export async function sendVerificationEmail(
//     email: string,
//     username: string,
//     verifyCode: string): Promise<ApiResponse> {
//     try {
//         return {success: true, message: "Verification email sent"};

//     }catch(emailError) {
//         console.log("Error sending verification email", emailError);
//         return {success: false, message: "Error sending verification email"};
//     }
// }

export async function POST(request: Request) {
    await dbConnect();

    try{
        const {username, email, password} = await request.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({username,
            isVerified: true
        });

        if(existingUserVerifiedByUsername) {
            return Response.json({success: false, message: "Username already exists"}
                ,{status: 400}
            );
        }

        const existingUserByEmail = await UserModel.findOne({email});
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        if(existingUserByEmail) {
            if(existingUserByEmail.isVerified) {
                return Response.json({success: false, message: "Email already exists"}
                    ,{status: 400}
                );
            }
            else{
                const hasedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hasedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }

        } else{
            const hasedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hasedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
            });

            await newUser.save();
        }
        //send verification email

    }catch(error) {
        console.log("Error signing up", error);
        return Response.json({success: false, message: "Error signing up"}
            ,{status: 500}
        );
    }
}