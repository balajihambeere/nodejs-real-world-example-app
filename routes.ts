'use strict';

import express from 'express';

import authRoutes from './modules/auth/auth-routes';

import projectRoutes from './modules/project/project-routes';

import taskRoutes from './modules/task/task-routes';

const routes = express.Router();

routes.use('/', authRoutes);

routes.use('/', projectRoutes);

routes.use('/', taskRoutes);

export default routes;