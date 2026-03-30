//Authentication step 2.5 configure the store with the transducer found in AuthSlice.ts

/**
 * Redux Notes:
 * Provides a separation between the code that managers and updates your data, and the parts of the code that say "heres 
 * a thing that happened in our application"   https://react-redux.js.org/introduction/getting-started
 * timetravel go back and forth in a stack
 * NOt the shortest way to write code, it is to make your code PREDICTABLE
 * REDUX expects that you update your state immutably, so it expects that you make copies of your state, -> Reect doesn't work like this
 * Helps with reducing prop drilling
 * context API was developed to avoid using REDUX and prop drilling
 * REDUX is NOT the best tool for every situation
 *      -> choose the tool that best solves YOUR problem
 * state management vs redux vs context API
 * 
 */

import authReducer from '@/utilities/AuthSlice'; // Adjust path as needed
import { configureStore } from '@reduxjs/toolkit'; //a wrapper around the basic redux create store function, auth adds THUNK middleware, catches accidental mutations on auto, auto dev tools video 36:30

export const store = configureStore({
    reducer: {
        auth: authReducer,
        //authSlice: authSlice
    },
});

export type AppDispatch = typeof store.dispatch; //39:06 in video https://www.youtube.com/watch?v=9zySeP5vH9c //taking stores dispatch func and asking ts "what is this thing?"
export type RootState = ReturnType<typeof store.getState>; //mouse over RootState ts knows its an object that has in this instance the auth state