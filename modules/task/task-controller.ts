'use strict';
import { TaskModel } from './task-model';
import { successMessage, errorMessage } from '../../utils/response-message';
import {
    ADDED_TASK_SUCCESS, UPDATED_TASK_SUCCESS, FETCHED_TASK_SUCCESS,
    REMOVED_TASK_SUCCESS
} from '../../utils/constants';

export const add = async (request, response) => {
    try {
        const newTask = new TaskModel(request.body);
        const result = await newTask.save();
        return response.formatter.ok(result, successMessage(ADDED_TASK_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

export  const update = async (request, response) => {
    try {
        const result = await TaskModel.findOneAndUpdate({ _id: request.params.taskId }, request.body, { new: true });
        return response.formatter.ok(result, successMessage(UPDATED_TASK_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

export  const getById = async (request, response) => {
    try {
        const result = await TaskModel.find({ _id: request.params.id });
        return response.formatter.ok(result, successMessage(FETCHED_TASK_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

export  const getByProjectId = async (request, response) => {
    try {
        const result = await TaskModel.find({ projectId: request.params.projectId });
        return response.formatter.ok(result, successMessage(FETCHED_TASK_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

export const getAll = async (request, response) => {
    try {
        const result = await TaskModel.find({});
        return response.formatter.ok(result, successMessage(FETCHED_TASK_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

export const remove = async (request, response) => {
    try {
        const result = await TaskModel.deleteOne({ _id: request.params.taskId });
        return response.formatter.ok(result, successMessage(REMOVED_TASK_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};
