import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  users: [
    {
      id: uuidv4(),
      firstName: 'Ivan',
      lastName: 'Petrenko',
      age: 25,
      imgSrc: 'https://cdn-icons-png.flaticon.com/128/3607/3607444.png',
      phoneNumber: '0671234567',
      isFavourite: false,
    },
    {
      id: uuidv4(),
      firstName: 'Olena',
      lastName: 'Kovalenko',
      age: 19,
      imgSrc: 'https://cdn-icons-png.flaticon.com/128/17360/17360409.png',
      phoneNumber: '0509876543',
      isFavourite: false,
    },
    {
      id: uuidv4(),
      firstName: 'Sofiia',
      lastName: 'Bondarenko',
      age: 22,
      imgSrc: 'https://cdn-icons-png.flaticon.com/128/13126/13126995.png',
      phoneNumber: '0934567890',
      isFavourite: false,
    },
    {
      id: uuidv4(),
      firstName: 'Dmytro',
      lastName: 'Horobets',
      age: 27,
      imgSrc: 'https://cdn-icons-png.flaticon.com/128/13126/13126995.png',
      phoneNumber: '0991122334',
      isFavourite: false,
    },
    {
      id: uuidv4(),
      firstName: 'Danil',
      lastName: 'Kovalenko',
      age: 21,
      imgSrc: 'https://cdn-icons-png.flaticon.com/128/1177/1177568.png  ',
      phoneNumber: '0687788990',
      isFavourite: false,
    },
    {
      id: uuidv4(),
      firstName: 'Anna',
      lastName: 'Petrenko',
      age: 23,
      imgSrc: 'https://cdn-icons-png.flaticon.com/128/3607/3607444.png',
      phoneNumber: '0497232334',
      isFavourite: false,
    },
  ],
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    updateUser: (state, { payload }) => {
      const user = state.users.find(u => u.id === payload);
      console.log('payload :>> ', payload);
      if (user) {
        user.isFavourite = !user.isFavourite;
      }
    },
  },
});

const { reducer, actions } = userSlice;
export const { updateUser } = actions;

export default reducer;
