import { StatusCodes } from 'http-status-codes';

import { customErrorResponse } from '../utils/common/responseObject.js';

export const validate = (schema) => {
  return async (req, res, next) => {
    const result = await schema.safeParseAsync(req.body);
    console.log('ZOD RESULT ===>', JSON.stringify(result, null, 2)); // temporary

    if (result.success) {
      req.body = result.data;
      return next();
    }

    const zodError = result.error;

    console.log('ZOD ERROR KEYS ===>', Object.keys(zodError)); // temporary

    // Prefer issues, fall back to errors if present
    const issues = Array.isArray(zodError.issues)
      ? zodError.issues
      : Array.isArray(zodError.errors)
        ? zodError.errors
        : [];

    let explanation = [];
    let errorMessage = '';

    issues.forEach((issue) => {
      const field = issue.path?.[0] ?? 'field';
      const msg = issue.message;
      explanation.push(field + ' ' + msg);
      errorMessage += ' : ' + field + ' ' + msg;
    });

    return res.status(StatusCodes.BAD_REQUEST).json(
      customErrorResponse({
        message: 'Validation error' + errorMessage,
        explanation,
      }),
    );
  };
};
