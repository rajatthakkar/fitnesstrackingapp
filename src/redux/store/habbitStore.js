import { configureStore } from '@reduxjs/toolkit';
import { habbitReducer } from '../reducers/habbitReducers';
import { getHabbitReducer } from '../reducers/getHabbitReducer';
import { getHabbitReducerById } from '../reducers/getHabbitOnId.Reducer';
const store = configureStore({
  reducer: {
  habbitReducer,
  getHabbitReducer,
  getHabbitReducerById
  },
});

export default store;
console.log(store)