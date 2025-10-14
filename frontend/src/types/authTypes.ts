export interface LoginFormValues {
  email: string;
  password: string;
}
export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  gstin: string;
}

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};
