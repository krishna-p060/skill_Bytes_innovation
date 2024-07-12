import mongoose, {Schema, Document} from "mongoose";




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
        match: [/.+\@.+\..+/, 'Please enter a valid email'],
    },
    password: {type: String, 
        required: [true, 'Password is required'],
    },
    verifyCode: {type: String, 
        required: [true, 'Verification code is required'],
    },
    verifyCodeExpiry: {type: Date, 
        required: [true, 'Verification code expiry is required'],},
        
    isVerified: {type: Boolean,
        default: false,
    }
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>('User', UserSchema));

export default UserModel;