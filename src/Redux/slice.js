import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: localStorage.getItem('login') === 'true', // Convert stored string to boolean
    image: localStorage.getItem('image') || '',
    theme: localStorage.getItem('theme') || 'light',
    role: localStorage.getItem('role') || null,
    userid: localStorage.getItem('userid') || null,
    city : localStorage.getItem('city') || null,
    varify: localStorage.getItem('varify') || 'non-varified',
};



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            localStorage.setItem('login', action.payload ? 'true' : 'false'); // Store as string
            state.login = action.payload;
        },
        image(state, action) {
            localStorage.setItem('image', action.payload);
            state.image = action.payload;
        },
        toggletheme(state, action) {
            state.theme = action.payload;
            localStorage.setItem('theme', state.theme);
        },
        role(state, action) {
            localStorage.setItem('role', action.payload);
            state.role = action.payload;
        },
        userid(state, action) {
            localStorage.setItem('userid', action.payload);
            state.userid = action.payload;
        },
        city(state, action) {
            localStorage.setItem('city', action.payload);
            state.city = action.payload;
        },
        varify(state, action) {
            localStorage.setItem('varify', action.payload);
            state.varify = action.payload;
        }

    }
});


export const { login, image, toggletheme,role,userid,city,varify } = userSlice.actions;

export default userSlice.reducer;
