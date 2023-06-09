export enum BLOCK_EVENT {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render'
}

export enum STORE_EVENTS {
  INIT = 'store:init',
  STORE_DM = 'store:did-mount',
  STORE_DU = 'store:did-update',
  USE = 'store:use',
}

export enum FIELDS_PATTERN {
  EMAIL = '^[a-zA-Z\\d\\-_.]+@[a-zA-Z]+\\.[a-zA-Z]+$',
  LOGIN = '^(?!\\d+$)[a-zA-Z\\d_-]{3,20}$',
  NAME = '^[A-ZА-ЯЁ][a-zA-ZА-ЯЁа-яё]*$',
  PHONE = '^\\+?\\d{10,15}$',
  PASSWORD = '^(?=.*[A-Z])(?=.*\\d).{8,40}$'
}

export const enum VALIDATE_TYPES {
  'login' = 'LOGIN',
  'password' = 'PASSWORD',
  'password2' = 'REPEAT_PASSWORD',
  'email' = 'EMAIL',
  'phone' = 'PHONE_NUMBER',
  'first_name' = 'FIRST_NAME',
  'second_name' = 'SECOND_NAME',
  'message' = 'MESSAGE',
};
