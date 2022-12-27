import { createSlice } from "@reduxjs/toolkit";

interface TypeGlobalStore {
    indexRoute: number
}

const initialState: TypeGlobalStore = {
    indexRoute: 0
}

export const globaSlice = createSlice({
  name: 'globaStore',
  initialState,
  reducers : {
    getRoute: (state, action) => {
        state.indexRoute = action.payload
    }
  }  
})

export const {getRoute} = globaSlice.actions;
export default globaSlice.reducer