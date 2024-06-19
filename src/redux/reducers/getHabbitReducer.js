

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from "../../firebaseinit";
import { collection, getDocs } from "firebase/firestore";
const initialState = {
  habbits: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

export const getInitialState = createAsyncThunk(
  'habbits/getInitialState',
  async (arg,thunkAPI) => {
    const querySnapshot = await getDocs(collection(db, "habbits"));
       const data =  querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          return{
            id:doc.id,
            ...doc.data()
          }      
    });  
    thunkAPI.dispatch(action.setInitialState(data))
    return data
  })
  
  


const habbitSlice = createSlice({
  name: 'habbits',
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.habbits = action.payload;
    },
    addHabit: (state, action) => {
      state.habbits.push(action.payload);
    },
    deleteHabit: (state, action) => {
      state.habbits = state.habbits.filter(habit => habit.id !== action.payload);
      state.notification = 'Habit deleted successfully!';
    },
    habbitNotification: (state, action) => {
      state.message = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialState.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getInitialState.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.habbits = action.payload;
      })
      .addCase(getInitialState.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setInitialState, addHabit, habbitNotification,deleteHabit } = habbitSlice.actions;

export const selectHabbits = (state) => state.habbits.habbits;
export const selectHabbitsStatus = (state) => state.habbits.status;
export const selectHabbitsError = (state) => state.habbits.error;
export const action = habbitSlice.actions
export const getHabbitReducer = habbitSlice.reducer;
export const habits = (state)=>state.getHabbitReducer.habbits
