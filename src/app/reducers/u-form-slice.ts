import { createSlice } from '@reduxjs/toolkit';

interface FormState {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'feamale';
  acceptTC: boolean;
  avatar: string;
  country: string;
}

const initialState: FormState = {
  name: '',
  age: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: 'male',
  acceptTC: false,
  avatar: '',
  country: '',
};

const uFormSlice = createSlice({
  name: 'u-form',
  initialState,
  reducers: {
    incAge(state) {
      state.age = state.age + 1;
    },
  },
});

export const { incAge } = uFormSlice.actions;

export default uFormSlice.reducer;
