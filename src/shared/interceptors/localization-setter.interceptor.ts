import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { parse } from 'accept-language-parser';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import ISO6391 from 'iso-639-1';
import _ from 'lodash';

export interface Response<T> {
  data: T;
}

@Injectable()
export class LocalizationSetter<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    let lang = parse(
      context.switchToHttp().getRequest().headers['accept-language'] || 'en',
    )[0].code.toLowerCase();
    if (!ISO6391.validate(lang)) {
      lang = 'en';
    }
    return next.handle().pipe(
      map((data) => {
        // if data is wrapped in data object, extract the content
        if (_.has(data, 'data')) {
          const { data: dataContent } = data;
          this.setLanguage(dataContent, lang);
        } else {
          this.setLanguage(data, lang);
        }
        return data;
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  setLanguage(data: any, lang: any, isSequelizeInstance = false): T {
    // terminating case
    if (!data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return;
    }
    if (isSequelizeInstance && typeof data !== 'object') {
      return data;
    }
    // set data language
    data.$locale = lang;
    // if dataContent is a defined object
    this.setObjectLang(data, lang);
    // if dataContent is an array
    if (Array.isArray(data)) {
      data.forEach((r) => {
        // make sure r is object before adding $locale
        if (isSequelizeInstance && typeof r !== 'object') {
          return;
        }
        r.$locale = lang;
        this.setObjectLang(r, lang);
      });
    }
  }

  setObjectLang(obj: any, lang: any) {
    // if object isn't sequelize instance but has arrays
    Object.keys(obj).forEach((key) => {
      if (Array.isArray(obj[key])) {
        this.setLanguage(obj[key], lang, true);
      }
    });
    // if object isn't sequelize instance return
    if (!obj.constructor.associations) {
      return obj;
    }
    // handle associations
    Object.values(obj.constructor.associations).forEach((assoc: any) => {
      (Array.isArray(obj[assoc.as]) ? obj[assoc.as] : [obj[assoc.as]]).forEach(
        (s: any) => {
          this.setLanguage(s, lang);
        },
      );
    });
  }
}
