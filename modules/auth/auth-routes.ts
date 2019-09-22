'use strict';

import express from 'express';

import passport from 'passport';

import { signUp, signIn } from './auth-controller';

const authRoutes = express.Router();

authRoutes.post('/signup', passport.authenticate('signup', { session: false }), signUp);

authRoutes.post('/signin', passport.authenticate('signin', { session: false }), signIn);

export default authRoutes;