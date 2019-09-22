'use strict';

import express from 'express';

import passport from 'passport';

import { add, update, getById, getAll, remove } from './project-controller';

export const projectRoutes = express.Router();

projectRoutes.get('/projects', passport.authenticate('jwt', { session: false }), getAll);
projectRoutes.post('/projects', passport.authenticate('jwt', { session: false }), add);
projectRoutes.get('/projects/:projectId', passport.authenticate('jwt', { session: false }), getById);
projectRoutes.put('/projects/:projectId', passport.authenticate('jwt', { session: false }), update);
projectRoutes.delete('/projects/:projectId', passport.authenticate('jwt', { session: false }), remove);

export default projectRoutes;