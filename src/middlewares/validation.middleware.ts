import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { BadRequestException } from '@/exceptions/http.exception';
import { asyncHandler } from '@/utils/handlers';

export const validateRequest = (schema: ZodSchema) => {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.safeParseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (!result.success) {
        throw new BadRequestException('Validation failed', result.error.format());
      }

      req.body = result.data.body ?? {};
      req.query = result.data.query ?? {};
      req.params = result.data.params ?? {};

      next();
    } catch (error) {
      next(error);
    }
  });
};