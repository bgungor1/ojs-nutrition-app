import { User } from "@/types/auth";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: User | null
    accessToken: string | null
    refreshToken: string | null
    isAuthenticated: boolean
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{
            user: User
            accessToken: string
            refreshToken: string
        }>) => {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.user = null
            state.accessToken = null
            state.refreshToken = null
            state.isAuthenticated = false
        },

        updateTokens: (state, action: PayloadAction<{
            accessToken: string,
            refreshToken?: string,
        }>) => {
            state.accessToken = action.payload.accessToken
            if (action.payload.refreshToken) {
                state.refreshToken = action.payload.refreshToken
            }
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        }
    }
})

export const { setAuth, logout, updateTokens, setUser } = authSlice.actions
export default authSlice.reducer

export const selectUser = (state: { auth: AuthState }) => state.auth.user
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken