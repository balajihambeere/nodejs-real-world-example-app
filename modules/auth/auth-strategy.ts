const localStrategy = require('passport-local').Strategy;

const JWTstrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

import bcrypt from 'bcrypt';

import { UserModel } from '../user/user-model';
import { stringify } from 'querystring';

export const signUpStrategy = new localStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email: any, password: any, done) => {
        let newUser = new UserModel({ email, password });
        newUser.password = bcrypt.hashSync(password, 10);
        try {
            const user = await newUser.save();
            user.password = undefined;
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }
);

export const loginStrategy = new localStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            const validate = await user.comparePassword(password, user.password);
            if (!validate) {
                return done(null, false, { message: 'Wrong password' });
            }
            return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
            done(error);
        }
    }
);

export const verifyToken = new JWTstrategy(
    { secretOrKey: 'top_secret', jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() },
    async (token, done) => {
        try {
            return done(null, token.user);
        } catch (error) {
            done(error);
        }
    }
);

