import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { R } from '@nestjsx/crud/lib/crud';

@Injectable()
export class CrudWrapperInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const override = R.getOverrideRoute(context.getHandler());
        // if the function is overridden then don't wrap the response
        if (override || !data) {
          // the handler didn't return anything
          return data;
        }
        const keys = Object.keys(data);
        // this is a paginated request
        if (
          (keys.includes('data') && keys.includes('count')) ||
          // this request is already wrapped
          (keys.length === 1 && keys[0] === 'data')
        ) {
          return data;
        }
        return { data };
      }),
    );
  }
}
