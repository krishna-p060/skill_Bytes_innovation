import mongoose, {Schema, Document} from "mongoose";
import { EXPORT_DETAIL } from "next/dist/shared/lib/constants";
import { Nanum_Myeongjo } from "next/font/google";

// export interface Message extends Document {
//     content: string;
//     createdAt: Date;
// }

// const MessageSchema: Schema<Message> = new Schema({
//     content: {type: String, 
//         required: true},
//     createdAt: {type: Date, 
//         required: true,
//         default: Date.now
//     }
// });

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
}

const UserSchema: Schema<User> = new Schema({
    username: {type: String, 
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
    },
    email: {type: String, 
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
    password: {type: String, 
        required: [true, 'Password is required'],},
    verifyCode: {type: String, 
        required: [true, 'Verification code is required'],},
    verifyCodeExpiry: {type: Date, 
        required: [true, 'Verification code expiry is required'],},
        
    isVerified: {type: Boolean,
        default: false,
    }
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>('User', UserSchema));

export default UserModel;