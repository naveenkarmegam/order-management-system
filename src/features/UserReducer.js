import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../config/config";

export const ftechPricing = createAsyncThunk('userData/ftechPricing', async () => {
    try {
        const response = await axios.get(`${config.packageApi}/Package`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;  
    }
})
export const ftechFeedback = createAsyncThunk('userData/ftechFeedback',async()=>{
    try {
        const response = await axios.get(`${config.feedbackApi}/feedback`);
        return response.data
    } catch (error) {
        console.error(error);
    }
})
export const postFeedback = createAsyncThunk('userData/postFeedback',async(values)=>{
    try {
        const response = await axios.post(`${config.feedbackApi}/feedback`,values);
        return response.data
    } catch (error) {
        console.error(error);
    }
})

export const userSlice = createSlice({
    name: 'users_info', 
    initialState: {
        user:{},
        pricing: [],
        loading: false,
        feedback:[]
    },
    reducers:{
        setUser:(state,action) =>{
            state.loading = false;
            state.user = action.payload
            return state
        },
        setFeedback:(state,action)=>{
            state.loading = false;
            state.feedback = [...state.feedback,action.payload]
            return state;
        }

    },
    extraReducers: (builder) => {
        builder
        .addCase(ftechPricing.pending, (state) => {
            state.loading = true;
        })
        .addCase(ftechPricing.fulfilled, (state, action) => {
            state.loading = false;
            state.pricing = action.payload;
        })
        .addCase(ftechPricing.rejected, (state, action) => {
            state.loading = false;
            state.pricing = action.error.message;
        })
        .addCase(ftechFeedback.pending, (state) => {
            state.loading = true;
        })
        .addCase(ftechFeedback.fulfilled, (state, action) => {
            state.loading = false;
            state.feedback = action.payload;
        })
        .addCase(ftechFeedback.rejected, (state, action) => {
            state.loading = false;
            state.feedback = action.error.message;
        })
        .addCase(postFeedback.pending, (state) => {
            state.loading = true;
        })
        .addCase(postFeedback.fulfilled, (state, action) => {
            state.feedback = [...state.feedback, action.payload]; 
            state.loading = false;
        })
        .addCase(postFeedback.rejected, (state, action) => {
            state.loading = false;
            state.feedback = action.error.message;
        })
    }
});

export const {setUser,setFeedback} = userSlice.actions
export default userSlice.reducer;
