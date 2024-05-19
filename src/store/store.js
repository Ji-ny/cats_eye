import { configureStore, createSlice } from "@reduxjs/toolkit";

let 변수 = createSlice({
    name: '이름변수',
    initialState: '이름변수 초기값',
})

export default configureStore({
	reducer: {
    	변수2: 변수.reducer
    },
});