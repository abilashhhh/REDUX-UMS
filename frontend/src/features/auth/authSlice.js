// file where reducers, initial state will be placed

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register user
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

//logout
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

// login user
export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

//update user
export const updateUser = createAsyncThunk('auth/updateUser', async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const response = await authService.updateUser(token, userData)
        console.log(response)
        return response
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update dp
export const updateProfileImage = createAsyncThunk('auth/uploadProfile', async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const response = await authService.updateProfileImage(token, userData)
        return response
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            // register
            .addCase(register.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })

            // logout  
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })

            // login
            .addCase(login.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
                state.user = null
            })
            // updates
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateProfileImage.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(updateProfileImage.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                state.isError = false
            })

    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer