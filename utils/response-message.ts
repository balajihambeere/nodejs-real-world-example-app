'use strict';

export const successMessage = (message) => {
    return { 'success': true, 'message': message };
}

export const errorMessage = (message) => {
    return { 'failed': true, 'message': message };
}
