import { crowllerController, Login } from '../controller';

export enum Methods {
  get = 'get',
  post = 'post',
}

export function typeMaker(type: Methods) {
  return function (path: string) {
    return function (target: crowllerController | Login, key: string) {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', type, target, key);
    };
  };
}

export const get = typeMaker(Methods.get);

export const post = typeMaker(Methods.post);
