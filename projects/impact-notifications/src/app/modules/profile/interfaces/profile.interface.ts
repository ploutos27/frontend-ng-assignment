export interface IProfile {
  fname: string;
  lname: string;
  email: string;
  phone: number;
  street: string;
  city: string;
  zip: number;
  country: string;
}

export interface IPassword {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}