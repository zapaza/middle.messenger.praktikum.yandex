export interface IProfileInfoEditBody {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface IProfileInfoResponse {
  id: number
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface IProfileChangePasswordBody{
  oldPassword: string;
  newPassword: string;
}
