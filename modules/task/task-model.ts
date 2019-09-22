'use strict';

import mongoose from 'mongoose';

import { coreSchema } from '../../utils/core-schema';

export type TaskDocument = mongoose.Document & {
    name: string;
    projectId: mongoose.Types.ObjectId;
    createdDate: Date;
    scheduleDate: Date;
};

const TaskSchema = coreSchema({
    name: {
        type: String,
        required: true
    },
    scheduleDate: {
        type: Date
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: 'Project',
        Index: true,
    }
});

export const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema);
