import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import productService from "./productService"

const initialState = {
    products: [],
    status:null
}

// get all products
export const getAllProducts = createAsyncThunk("products/getAllProducts", async (_, thunkAPI) => {
    try {
        return await productService.getAllProducts
    } catch (error) {
        const msg = error.res;

        return thunkAPI.rejectWithValue(msg)
    }
})
// get all clothing products
export const getAllClothes = createAsyncThunk("products/getAllClothes", async (_, thunkAPI) => {
    try {
        return await productService.getAllClothes
    } catch (error) {
        const msg = error.res;

        return thunkAPI.rejectWithValue(msg)
    }
})

// get all tech products
export const getAllTech = createAsyncThunk("products/getAllTech", async (_, thunkAPI) => {
    try {
        return await productService.getAllTech
    } catch (error) {
        const msg = error.res;

        return thunkAPI.rejectWithValue(msg)
    }
})

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
            state.status = "pending";
        })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.status = "success";
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state) => {
                state.status = "rejected";
            })
            .addCase(getAllClothes.pending, (state) => {
                state.status = "pending";
            })
            .addCase(getAllClothes.fulfilled, (state, action) => {
                state.status = "success";
                state.products = action.payload;
            })
            .addCase(getAllClothes.rejected, (state) => {
            state.status="rejected"
            })
            .addCase(getAllTech.pending, (state) => {
                state.status = "pending";
            })
            .addCase(getAllTech.fulfilled, (state, action) => {
            state.status = "success";
            state.products = action.payload;
            })
            .addCase(getAllTech.rejected, (state) => {
                state.status = "rejected";
        })
    }
})

export default productSlice.reducer