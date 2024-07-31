import { model, models, Schema } from "mongoose";

export type user = {
    email: String,
    name: String,
    password: String,
    googleId: String,
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

export const User = models?.User || model("User", userSchema);
