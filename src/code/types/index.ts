import {IChatItem} from '../services/ChatsServices/types';

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export interface RequestOptions {
  method?: METHOD;
  data?:  Document | XMLHttpRequestBodyInit | null;
  headers?: Record<string, string>
}

export interface IHTTPBaseRequest {
  get: (url: string, options: RequestOptions) => Promise<unknown>;
  post: (url: string, options: RequestOptions) => Promise<unknown>;
  put: (url: string, options: RequestOptions) => Promise<unknown>;
  patch: (url: string, options: RequestOptions) => Promise<unknown>;
  delete:( url: string, options: RequestOptions) => Promise<unknown>;
}

export type EventBusCallback<A extends any[] = unknown[]> = (...args: A) => void;

export type MapInterface<P> = P[keyof P]


export interface IButtonProps {
  isSecondary?: boolean;
  type?: 'reset' | 'button' | 'submit';
  text?: string;
  disabled?: boolean;
  events?: {
    click?: (event: PointerEvent) => void;
    submit?: (event: PointerEvent) => void;
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
  errorCode?: number | string;
  errorText: string;
  button?: IButtonProps;
}

export interface IInputProps {
  label?: string;
  placeholder: string;
  type: 'tel' | 'password' | 'email' | 'number' | 'text'| 'file';
  name: string;
  errorText?: string | string[];
  value?: string;
  rule?: string;
  required?: boolean;
  validateType?: string;
  events?: {
    input?: (event?: InputEvent) => void;
    change?: (event?: InputEvent) => void;
    blur?: (event?: InputEvent) => void;
  }
}

export interface IFormProps {
  formId: string;
  formTitle: string;
  fields?: IInputProps[];
  buttons?: IButtonProps[];
  events?: {
    submit?: (event: Event) => void,
    change?: (event: Event) => void,
  }
}

export interface IProfileListItemProps {
  link?: string;
  name?: string;
  value?: string;
  isExit?: boolean;
  events?: {
    click?: (event: PointerEvent) => void;
  }
}

export interface IProfileListProps {
  items: IProfileListItemProps[],
  isExit?: boolean
}

export interface IProfilePageProps {
  buttonBack: IButtonRoundedProps;
  profileName?: string;
  avatarUrl?: string;
  avatarAlt?: string;
  infoBlock?: IProfileListProps;
  settingBlock?: IProfileListProps;
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
  value?: string;
}


export interface IChatWindowMessage {
  // buttonAttach: IButtonRoundedProps;
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
  currentChat: IChatItem;
  buttonAddUser: IButtonRoundedProps;
  buttonRemoveUser: IButtonRoundedProps;
  buttonRemoveChat: IButtonProps;
}


export interface IChatItemComponent {
  avatar?: string | null;
  chatName: string;
  message?: string | null ;
  // date: string;
  count? : number;
  id: number,
  events?: {
    click: () => void;
  };
}

export interface IChatPage {
  chatSearch: IInputProps;
  chatsList: IChatItemComponent[];
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
