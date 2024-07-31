import { Model, model, models, Schema } from "mongoose";

export interface IUser extends Document {
    email: string;
    name: string;
    password: string;
    googleId: string;
}

export interface IUserWithId extends IUser {
    _id: string;
}
const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
    }
});

export const User: Model<IUser> = models?.User || model<IUser>("User", userSchema);
