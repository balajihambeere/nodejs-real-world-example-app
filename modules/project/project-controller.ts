'use strict';
import { ProjectModel } from './project-model';
import { successMessage, errorMessage } from '../../utils/response-message';

import {
    ADDED_PROJECT_SUCCESS, UPDATED_PROJECT_SUCCESS, FETCHED_PROJECT_SUCCESS,
    REMOVED_PROJECT_SUCCESS
} from '../../utils/constants';

export const add = async (request, response) => {
    const { _id } = request.user;
    const { name } = request.body;
    const project = { userId: _id, name: name };
    try {
        const newProject = new ProjectModel(project);
        const result = await newProject.save();
        return response.formatter.ok(result, successMessage(ADDED_PROJECT_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

export const update = async (request, response) => {
    try {
        const result = await ProjectModel.findOneAndUpdate({ _id: request.params.projectId }, request.body, { new: true });
        return response.formatter.ok(result, successMessage(UPDATED_PROJECT_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

export const getById = async (request, response) => {
    try {
        const result = await ProjectModel.find({ _id: request.params.projectId });
        return response.formatter.ok(result, successMessage(FETCHED_PROJECT_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

export const getAll = async (request, response) => {
    try {
        const result = await ProjectModel.find({});
        return response.formatter.ok(result, successMessage(FETCHED_PROJECT_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

export const remove = async (request, response) => {
    try {
        const result = await ProjectModel.deleteOne({ _id: request.params.projectId });
        return response.formatter.ok(result, successMessage(REMOVED_PROJECT_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};
