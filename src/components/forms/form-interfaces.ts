export interface FormState {
  name: string | undefined;
  age: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  gender: Gender;
  acceptTC: boolean | undefined;
  avatar: string | undefined;
  country: string | undefined;
}

export type Gender = 'male' | 'female' | undefined;
