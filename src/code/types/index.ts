export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export interface RequestOptions<Data> {
  method: METHOD;
  data?: Data;
  headers?: Record<string, string>
}

export interface IHTTPBaseRequest {
  get: (url: string, options: RequestOptions<unknown>) => Promise<unknown>;
  post: (url: string, options: RequestOptions<unknown>) => Promise<unknown>;
  put: (url: string, options: RequestOptions<unknown>) => Promise<unknown>;
  patch: (url: string, options: RequestOptions<unknown>) => Promise<unknown>;
  delete:( url: string, options: RequestOptions<unknown>) => Promise<unknown>;
}

export type EventBusCallback<A extends any[] = unknown[]> = (...args: A) => void;

export type MapInterface<P> = P[keyof P]


export interface IButtonProps {
  isSecondary?: boolean;
  type?: 'reset' | 'button' | 'submit';
  text: string;
  events?: {
    click?: (event: PointerEvent) => void;
  };
}

export interface IButtonRoundedProps {
  type?: 'reset' | 'button' | 'submit';
  text?: string;
  iconClass?: string;
  events?: {
    click?: (event: PointerEvent) => void;
  };
}

export interface IErrorProps {
  errorCode?: number;
  errorText: string;
  button?: IButtonProps;
}

export interface IInputProps {
  label?: string;
  placeholder: string;
  type: 'tel' | 'password' | 'email' | 'number' | 'text'| 'file';
  name: string;
  errorText?: string | string[];
  value: string;
  rule?: string;
  events?: {
    input?: (event?: InputEvent) => void;
    change?: (event?: InputEvent) => void;
    blur?: (event?: InputEvent) => void;
  }
}

export interface IFormProps {
  formId: string;
  formTitle: string;
  fields: IInputProps[];
  buttons: IButtonProps[];
}

export interface IProfileListItemProps {
  link?: string;
  name?: string;
  value?: string;
  isExit?: boolean;
  click?: (event: PointerEvent) => void;
}

export interface IProfileListProps {
  items: IProfileListItemProps[]
}

export interface IProfilePageProps {
  buttonBack: IButtonRoundedProps;
  profileName: string;
  avatarUrl: string;
  avatarAlt: string;
  infoBlock: IProfileListProps;
  settingBlock: IProfileListProps;
}

export interface IProfileSettingsPageProps {
  buttonBack: IButtonRoundedProps;
  profileName?: string;
  avatarUrl?: string;
  avatarAlt?: string;
  form: IFormProps;
}

export interface IMessageField {
  events?: {
    input: (event?: InputEvent) => void;
  };
}


export interface IChatWindowMessage {
  buttonAttach: IButtonRoundedProps;
  buttonSend: IButtonRoundedProps;
  messageField: IMessageField;
}

export interface IChatMessage {
  isImage?: boolean;
  isIncoming?: boolean;
  messageContent: string;
  author: string;
  messageDate: string;
}

export interface IChatHeader {
  avatar?: string;
  chatName: string;
}


export interface IChatItem {
  avatar?: string;
  chatName: string;
  message: string;
  date: string;
  count? : number;
}

export interface IChatPage {
  chatSearch: IInputProps;
  chatsList: IChatItem[];
  chatHeader: IChatHeader;
  messages?: IChatMessage[];
  error?: IErrorProps;
  chatBottom: IChatWindowMessage;
}

export interface IValidationOptions {
  isRequired: boolean;
  repeatedValue?: string;
  min?: number;
  max?: number;
}

export type PlainObject<T = any> = {
  [k: string]: T;
};

export type StringIndexed = Record<string, any>;

export type TState = Record<string, any>;

export type TProps = Record<string, any>;

export type TAccess = 'public' | 'protected' | '';

export interface IRouterParams {
  [key: string]: number | null
}
