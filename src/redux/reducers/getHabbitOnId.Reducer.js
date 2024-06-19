// habbitReducer.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebaseinit';
import { doc,getDoc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
// Initial state
const initialState = {
  habbit: null,
  loading: false,
  error: null,
};

// Async thunk action
export const fetchHabbit = createAsyncThunk(
    'habbit/fetchHabbit',
    async (id, thunkAPI) => {
      const docRef = doc(db, 'habbits', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data())
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('No such document!');
      }
    }
  );
  export const updateHabitField = createAsyncThunk(
    'habbit/updateHabitField', // Action type
    async ({ id, completedTime, updatedValue }, thunkAPI) => {
      try {
        const docRef = doc(db, 'habbits', id); // Reference to the Firestore document
        await updateDoc(docRef, {
         completedTime : updatedValue // Update the specific field
        });
        return { id, completedTime, updatedValue }; // Optionally return the updated data
      } catch (error) {
        console.error('Error updating habit field:', error);
        throw error; // Rethrow the error to let Redux Toolkit handle it
      }
    }
  );

// Slice
const habbitSlice = createSlice({
  name: 'habbit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabbit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabbit.fulfilled, (state, action) => {
        state.loading = false;
        state.habbit = action.payload;
      })
      .addCase(fetchHabbit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});




export const getHabbitReducerById =  habbitSlice.reducer;
export const Singlehabits = (state) => state.getHabbitReducerById.habbit;
console.log(Singlehabits)