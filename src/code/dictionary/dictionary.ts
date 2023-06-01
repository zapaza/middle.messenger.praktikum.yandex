export enum BLOCK_EVENT {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render'
}

export enum FIELDS_PATTERN {
  EMAIL = '^[a-zA-Z\\d\\-_]+@[a-zA-Z]+\\.[a-zA-Z]+$',
  LOGIN = '^(?!\\d+$)[a-zA-Z\\d_-]{3,20}$',
  NAME = '^[A-ZА-ЯЁ][a-zA-ZА-ЯЁа-яё]*$',
  PHONE = '^\\+?\\d{10,15}$',
  PASSWORD = '^(?=.*[A-Z])(?=.*\\d).{8,40}$'
}

export enum VALIDATE_TYPES {
  LOGIN = 'LOGIN',
  PASSWORD = 'PASSWORD',
  REPEAT_PASSWORD = 'REPEAT_PASSWORD',
  EMAIL = 'EMAIL',
  PHONE_NUMBER = 'PHONE_NUMBER',
  FIRST_NAME = 'FIRST_NAME',
  SECOND_NAME = 'SECOND_NAME',
  MESSAGE = 'MESSAGE',
}
