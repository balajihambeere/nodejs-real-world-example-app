'use strict';

import mongoose from 'mongoose';

import bcrypt from 'bcrypt';

import { coreSchema } from '../../utils/core-schema';

export type UserDocument = mongoose.Document & {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    avatar: string;
    createdDate: Date;
    comparePassword: comparePasswordFunction;
};

type comparePasswordFunction = (requestedPassword: string, password: string) => boolean;

export const UserSchema = coreSchema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    fullName: {
        type: String,
    },
    phone: {
        type: String,
    },
    avatar: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const comparePassword: comparePasswordFunction = (requestedPassword, password) => {
    return bcrypt.compareSync(requestedPassword, password);
};


UserSchema.methods.comparePassword = comparePassword;

export const UserModel = mongoose.model<UserDocument>("User", UserSchema);
