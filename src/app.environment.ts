/**
* @description:
* @author:Hsj
* @Date:2020-09-17 14:48:39
*/


export const environment = process.env.NODE_ENV;
export const isDevMode = Object.is(environment, 'development');
export const isProdMode = Object.is(environment, 'production');
export const isTestMode = Object.is(environment, 'test');

export default {
  isDevMode,
  isProdMode,
  isTestMode,
  environment,
};