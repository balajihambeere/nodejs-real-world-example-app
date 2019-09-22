'use strict';

import express from 'express';

import passport from 'passport';

import { add, update, getById, getAll, remove, getByProjectId } from './task-controller';

const taskRoutes = express.Router();

// Router-level middleware
taskRoutes.get('/tasks', passport.authenticate('jwt', { session: false }), getAll);
taskRoutes.get('/project/:projectId/tasks', passport.authenticate('jwt', { session: false }), getByProjectId);
taskRoutes.post('/tasks', passport.authenticate('jwt', { session: false }), add);
taskRoutes.get('/tasks/:taskId', passport.authenticate('jwt', { session: false }), getById);
taskRoutes.put('/tasks/:taskId', passport.authenticate('jwt', { session: false }), update);
taskRoutes.delete('/tasks/:taskId', passport.authenticate('jwt', { session: false }), remove);

export default taskRoutes;