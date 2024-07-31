import { Model, model, models, Schema } from "mongoose";

export type user = {
    _id: string,
    email: string,
    name: string,
    password: string,
    googleId: string,
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
    googleId: {
        type: String,
    }
});

export const User: Model<user> = models?.User || model("User", userSchema);
