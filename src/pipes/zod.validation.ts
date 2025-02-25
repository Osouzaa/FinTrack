import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        // Aqui lidamos com o erro específico do Zod
        const errorDetails = error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        }));
        throw new BadRequestException({
          message: 'Validation failed',
          errors: errorDetails,
        });
      }
      throw new BadRequestException('Unknown error during validation');
    }
  }
}
