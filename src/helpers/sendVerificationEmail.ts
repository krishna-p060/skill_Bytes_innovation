import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import nodemailer from "nodemailer";
import React from 'react';
import ReactDOMServer from 'react-dom/server';



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

        // Render the React component to static HTML
        const emailHtml = VerificationEmail({username, otp:verifyCode});

        const mailOptions = {
            from: userMail,
            to: email,
            subject: "SkillBytes | Verification Code",
            html: emailHtml,
        };

        await transporter.sendMail(mailOptions,(error, info) => {
            if(error){
                console.error("Error sending verification email", error);
                return {
                    success: false,
                    message: "Failed to send verification email"
                }
            }
            console.log("Verification email sent", info.response);
            
        }
        );

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
