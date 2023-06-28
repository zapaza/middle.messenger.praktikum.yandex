export interface ISingUpBody {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
}

export interface ISingUpResponse {
  reason: string;
  error: string
  id: number;
}

export interface ISingInBody {
  login: string;
  password: string;
}

export interface IUserResponse {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  reason?: string;
}
