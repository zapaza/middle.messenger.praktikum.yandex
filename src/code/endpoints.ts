export const Endpoints = {
  SING_UP: '/auth/signup',
  SING_IN: '/auth/signin',
  USER: '/auth/user',
  LOGOUT: '/auth/logout',
  CHATS: '/chats',
  CHATS_TOKEN: (userId: number) => `/chats/token/${userId}`,
  CHANGE_USER_PROFILE: '/user/profile',
  CHANGE_USER_AVATAR: '/user/profile/avatar',
  CHANGE_USER_PASSWORD: '/user/password',
  CHAT_USERS: '/chats/users',
};
