import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const paramDecorator = <T>(_data: unknown, ctx: ExecutionContext): T =>
  ctx.switchToHttp().getRequest().user;
export const RequestUser = createParamDecorator(paramDecorator);
