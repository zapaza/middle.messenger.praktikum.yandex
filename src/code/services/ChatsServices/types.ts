export interface IGetChatParams {
  offset?: number,
  limit?: number,
  title?: string,
}

interface IChatUser {
  first_name: string;
  second_name: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
}

export interface IChatLastMessage {
  user: IChatUser,
  time: Date,
  content: string
}

export interface IChatItem {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: IChatLastMessage;
  created_by: number,
}

export interface INewChatBody {
  title: string;
}

export interface IRemoveChatBody {
  chatId: string;
}

export interface IRemoveChatResponse {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
  };
}

export interface INewChatResponse {
  id: number;
}

export interface IChatTokenBody {
  id: number;
}

export interface IChatTokenResponse {
  token: string;
}

export interface IChatSocketPayload {
  content: string;
  type: 'message' | 'get old',
}

export interface IChatSocketMessage {
  content: string;
  type: string;
  id: number;
  time: string;
  user_id: number;
}

export interface IChatUserPayload {
  users: number[] | string[],
  chatId: number
}
