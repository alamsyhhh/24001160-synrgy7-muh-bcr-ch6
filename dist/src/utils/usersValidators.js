"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginInput = exports.validateUserInput = void 0;
const objection_1 = require("objection");
const validateUserInput = (username, email, password) => {
    if (!username) {
        throw new objection_1.ValidationError({
            type: 'ModelValidation',
            message: 'Username cannot be empty',
        });
    }
    if (!password || password.length < 8) {
        throw new objection_1.ValidationError({
            type: 'ModelValidation',
            message: 'Password must be at least 8 characters long',
        });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new objection_1.ValidationError({
            type: 'ModelValidation',
            message: 'Invalid email format',
        });
    }
};
exports.validateUserInput = validateUserInput;
const validateLoginInput = (email, password) => {
    if (!password || password.length < 6) {
        throw new objection_1.ValidationError({
            type: 'ModelValidation',
            message: 'Password must be at least 6 characters long',
        });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new objection_1.ValidationError({
            type: 'ModelValidation',
            message: 'Invalid email format',
        });
    }
};
exports.validateLoginInput = validateLoginInput;
