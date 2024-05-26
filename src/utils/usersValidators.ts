import { ValidationError } from 'objection';

export const validateUserInput = (
  username: string,
  email: string,
  password: string
) => {
  if (!username) {
    throw new ValidationError({
      type: 'ModelValidation',
      message: 'Username cannot be empty',
    });
  }

  if (!password || password.length < 8) {
    throw new ValidationError({
      type: 'ModelValidation',
      message: 'Password must be at least 8 characters long',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError({
      type: 'ModelValidation',
      message: 'Invalid email format',
    });
  }
};

export const validateLoginInput = (email: string, password: string) => {
  if (!password || password.length < 6) {
    throw new ValidationError({
      type: 'ModelValidation',
      message: 'Password must be at least 6 characters long',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError({
      type: 'ModelValidation',
      message: 'Invalid email format',
    });
  }
};
