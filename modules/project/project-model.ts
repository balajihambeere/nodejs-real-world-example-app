'use strict';

import mongoose from 'mongoose';

import { coreSchema } from '../../utils/core-schema';

export type ProjectDocument = mongoose.Document & {
    name: string;
    userId: mongoose.Types.ObjectId;
    createdDate: Date;
};

const ProjectSchema = coreSchema({
    name: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        Index: true,
        required: true,
    }
});

export const ProjectModel = mongoose.model<ProjectDocument>('Project', ProjectSchema);