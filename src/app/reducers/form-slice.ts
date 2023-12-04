import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormState } from '@src/components/forms/form-interfaces';

const initialState: InitialState = {
  formStates: [
    {
      name: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: 'male',
      acceptTC: false,
      avatar: '',
      country: '',
    },
  ],
  countries: ['Russia', 'USA', 'Ukraine', 'Germany', 'Poland'],
  selectedCountry: '',
};

interface InitialState {
  formStates: FormState[];
  countries: string[];
  selectedCountry: string;
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<FormState>) {
      state.formStates.push(action.payload);
    },
    setCurrentCountry(state, action: PayloadAction<string>) {
      state.selectedCountry = action.payload;
    },
  },
});

export const { setFormData, setCurrentCountry } = formSlice.actions;

export default formSlice.reducer;
