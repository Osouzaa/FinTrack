import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export interface CurrentUserProps{
  sub: string
  email: string
}


export const CurrentUser = createParamDecorator(
  (_, ctx: ExecutionContext): CurrentUserProps | undefined => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);


export const getCurrentUserByContext = (
  ctx: ExecutionContext,
): CurrentUserProps | undefined => {
  try {
    if (ctx.getType() === 'http') {
      const user = ctx.switchToHttp().getRequest().user;
      return user;
    }
  } catch (error) {
    console.error('Error getting user from context:', error);
  }


  return undefined;
};