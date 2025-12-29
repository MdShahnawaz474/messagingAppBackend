import { StatusCodes } from 'http-status-codes';
import userRepository from '../repository/userRepository.js';
import ClientError from '../utils/errors/clientError.js';
import ValidationError from '../utils/errors/validationError.js';
import bcrypt from 'bcrypt';
import { createJWT } from '../utils/common/authUtils.js';
export const signUpService = async (data) => {
  try {
    const newUser = await userRepository.create(data);
    return newUser;
  } catch (error) {
    console.log('User service error', error);

    if (error.name === 'ValidationError') {
      throw new ValidationError(
        {
          error: error.errors,
        },
        error.message,
      );
    }

    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        {
          error: ['A user with same email or username already exists'],
        },
        'A user with same email or username already exists',
      );
    }

    // Handle MongooseError with duplicate key
    if (error.name === 'MongooseError' && error.cause?.code === 11000) {
      throw new ValidationError(
        {
          error: ['A user with same email or username already exists'],
        },
        'A user with same email or username already exists',
      );
    }

    // Catch-all: re-throw any other unexpected errors
    throw error;
  }
};

export const signInService = async (data) => {
  // Implementation for sign-in service
  try {
    const user = await userRepository.getByEmail(data.email);
    if (!user) {
      throw new ClientError({
        explanation: 'Invalid email or password',
        message: 'Invalid email or password',
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }
    // Further logic for password verification and token generation would go here
    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw new ClientError({
        explanation: 'Invalid email or password',
        message: 'Invalid email or password',
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }

    return {
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      token: createJWT({id:user._id,email:user.email}),
    };
  } catch (error) {
    console.log('Sign-in service error', error);
    // Re-throw the error for higher-level handling
    throw error;
  }
};
