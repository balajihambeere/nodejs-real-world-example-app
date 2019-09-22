'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const coreSchema = (schemaObject) => {
    return new Schema(schemaObject);
}
