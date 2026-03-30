//Authentication step 2 using redux
import { Role } from '@/utilities/Role';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'; //https://medium.com/@bharathibala21/dynamic-stack-navigation-reset-in-react-native-based-on-user-role-f5e0e7ecddc3
/**createSlice -> the main function you use to define your REDUX logic
 * PayloadAction -> typesxcript type that represents this is the context of one given object
 */
interface AuthState { //1 make an INTERFACE for typing -> the shape of the state inside our slice managed by the reduscer
  userID: Int32Array | null;
  username: string | null;
  role: Role.ADMIN | Role.TRAINEE | null;
}
const initialState: AuthState = { //2 define the initial STATE for this slice
  userID: null,
  username: null,
  role: null,
};
const authSlice = createSlice({ //3 define the slice that contains our reducer logic ->
//                         takes 1 param -> an object -> takes in the following 3 args ->
  name: 'auth', //arg 1 -> a string -> slice uses it to 
  initialState,//arg 2 -> initial state the reducer uses
  reducers: { //arg 3 -> define the different types of logic and updates inside this reducer -> store is configured with the reducer name
    loginSuccess(state, action: PayloadAction<{ userID: Int32Array; role: Role.ADMIN | Role.TRAINEE; username: string }>) { //inline function
      state.userID = action.payload.userID; //<- now we can write mutating code directly in this reducer using REDUX toolkit -> which uses a special lib immer under the hood to turn it into a safe immutable update (more in video)
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    logout(state) {
      state.userID = null;
      state.role = null;
      state.username = null;
    },
  },
});
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer; 

// finally now after all of this this is the shape of a Redux slice ^