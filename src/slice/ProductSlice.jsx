import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const url="http://localhost:3001/products"

export const fetchProducts=createAsyncThunk('products/fetchProducts', async ()=>{
    const response=await axios(url)
    return response.data
})
export const addProducts=createAsyncThunk('products/addProducts', async (product)=>{
    const response=await axios.post(url,product)
    return response.data
})
export const editProduct=createAsyncThunk('product/editProduct', async ({id, product})=>{
    const response=await axios.put(`${url}/${id}`,product)
    return response.data
})
export const deleteProduct=createAsyncThunk('product/deleteProduct', async (id)=>{
    const response=await axios.delete(`${url}/${id}`)
    return id
})

export const ProductSlice=createSlice({
    name:'products',
    initialState:{
        items:[], 
        status:""
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending,(state,action)=>{
            state.status="pending"
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.status="succeed"
            state.items=action.payload
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.status="rejected"
        })
        .addCase(addProducts.pending,(state,action)=>{
            state.status="pending"
        })
        .addCase(addProducts.fulfilled,(state,action)=>{
            state.status="succeed"
            state.items.push(action.payload)
        })
        .addCase(addProducts.rejected,(state,action)=>{
            state.status="rejected"
        })
        .addCase(editProduct.pending,(state,action)=>{
            state.status="pending"
        })
        .addCase(editProduct.fulfilled,(state,action)=>{
            state.status="succeed"
            const existingIndex=state.items.findIndex(item=>item.id===action.payload.id)
            if (existingIndex>-1) {
                state.items[existingIndex]=action.payload
            }
        })
        .addCase(editProduct.rejected,(state,action)=>{
            state.status="rejected"
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.status="succeed"
            state.items=state.items.filter(item=>item.id!==action.payload.id)
        })
    }
})
export default ProductSlice.reducer