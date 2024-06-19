
import { db } from "../../firebaseinit";
import { collection,addDoc } from "firebase/firestore"; 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const details = [
  { day: 'Mon', status: 'none' },
  { day: 'Tue', status: 'none' },
  { day: 'Wed', status: 'none' },
  { day: 'Thu', status: 'none' },
  { day: 'Fri', status: 'none' },
  { day: 'Sat', status: 'none' },
  { day: 'Sun', status: 'none' },
]
const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-GB').format(date); // 'en-GB' locale formats the date as dd/MM/yyyy
};
const now = new Date();
export const addHabit = createAsyncThunk(
  'habits/addHabit',
  async (habitName, thunkAPI) => {
    const docRef = await addDoc(collection(db, 'habbits'), {
      habbitName: habitName,
      createdTime:formatDate(now) ,
      completedTime: details,
    });
    return { id: docRef.id, habbitName: habitName, createdTime: formatDate(now), completedTime: '' };
  }
);

 


const habitsSlice = createSlice({
  name: 'habits',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addHabit.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addHabit.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addHabit.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const habbitReducer = habitsSlice.reducer;
export const  habbitAction = habitsSlice.actions
export const habbitNotificatio = (state)=>state.habbitReducer.status
console.log(habbitAction)