import { createSlice } from "@reduxjs/toolkit";

const basket=JSON.parse(localStorage.getItem("basket")) 
export const BasketSlice=createSlice({
    name:"basket",
    initialState:{
        items:JSON.parse(localStorage.getItem("basket")) || [],
        total:basket.reduce((price,item)=>price+=item.price*item.count, 0)
    },
    reducers:{
        addBasket:(state,action)=>{
            const existingIndex=state.items.findIndex(item=>item.id===action.payload.id)
            if (existingIndex>=0) {
                state.items[existingIndex].count+=1
                localStorage.setItem("basket",JSON.stringify(state.items))
            }         
            else{
                state.items.push(action.payload)
                localStorage.setItem("basket",JSON.stringify(state.items))
            }
            state.total=state.items.reduce((price,item)=>price+=item.price*item.count, 0)
        },
        changeCount:(state,action)=>{
            const existingIndex=state.items.findIndex(product=>product.id===action.payload.id)
            if (state.items[existingIndex].count>1) {
                state.items[existingIndex].count-=1
                localStorage.setItem("basket",JSON.stringify(state.items))
            }
            else{
                state.items.filter(product=>product.id!==action.payload.id)
            }
            localStorage.setItem("basket",JSON.stringify(state.items))
            state.total=state.items.reduce((price,item)=>price+=item.price*item.count, 0)
        },
        removeBasket:(state,action)=>{
            state.items=state.items.filter(product=>product.id!==action.payload)
            localStorage.setItem("basket",JSON.stringify(state.items))
            state.total=state.items.reduce((price,item)=>price+=item.price*item.count, 0)
        },
        saleBasket:(state,action)=>{
            state.total=state.total-(state.total*0.5)
        },
        removeSale:(state,action)=>{
            state.total=state.total*2
        }
    }
})

export const {addBasket,changeCount,removeBasket,saleBasket,removeSale}=BasketSlice.actions
export default BasketSlice.reducer