import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import nodemailer from "nodemailer";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
):Promise<ApiResponse>{
    try{
        const userMail = process.env.EMAIL_USER;
        const userPass = process.env.EMAIL_PASS;
        let transporter = nodemailer.createTransport({
            service: 'gmail', 
            secure: true,
            port: 465,
            auth: {
                user: userMail,
                pass:  userPass
            }
        });

        const mailOptions = {
            from: userMail,
            to: email,
            subject: "SkillBytes | Verification Code",
            react: VerificationEmail({ username, otp: verifyCode })
        };

        await transporter.sendMail(mailOptions);

        return {
            success: true,
            message: "Verification email sent"
        
        }
    }
    catch(emailError){
        console.error("error sending verification email",emailError);
        return {
            success: false,
            message: "Failed to send verification email"}
    }
}
