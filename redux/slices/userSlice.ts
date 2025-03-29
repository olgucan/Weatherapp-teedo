import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the User type based on the API response
export interface User {
  id: number;
  name: string;
  userName: string;
  webSite: string;
  phone: string;
  email: string;
}

// Define the state type
interface UserState {
  users: User[];
  user: User | undefined;
  loading: boolean;
  error: string | null;
}

// Initial state with type
const initialState: UserState = {
  users: [],
  user: undefined,
  loading: false,
  error: null,
};
type FetchUsersParams = {
  userId?: string | number | undefined; // Optional filter parameter
};
export const fetchUsersId = createAsyncThunk<
  User,
  FetchUsersParams | undefined,
  { rejectValue: string }
>(
  "users/fetchUsersId", // Action type prefix
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get<User>(
        `https://jsonplaceholder.typicode.com/users/${params.userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch users");
    }
  }
);
// Create the async thunk with typed payload
export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>(
  "users/fetchUsers", // Action type prefix
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.data; // Array of Users
    } catch (error) {
      return rejectWithValue("Failed to fetch users");
    }
  }
);

// Create the slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {}, // Add synchronous reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(fetchUsersId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersId.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUsersId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default userSlice.reducer;
