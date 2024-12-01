import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiDefaultResponse({
  model,
  description = 'Data found.',
  isArray = false,
  status = 200,
}: {
  description?: string;
  isArray?: boolean;
  model: any;
  status?: number;
}) {
  return applyDecorators(
    ApiResponse({
      description,
      isArray,
      schema: {
        properties: {
          data: {
            items: {
              $ref: `#/components/schemas/${model.name}`,
            },
            type: 'array',
          },
        },
        type: 'object',
      },
      status,
    }),
  );
}
