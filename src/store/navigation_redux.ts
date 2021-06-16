import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface navigationReduxState {
    showTab: boolean
}

const initialState: navigationReduxState = { showTab: true }

const navigationReduxSlice = createSlice({
    name: 'navigationRedux',
    initialState,
    reducers: {
        setShowTab(state) {
            // console.log(state.value)
            state.showTab = true
        },
        setHideTab(state) {
            // console.log(state.value)
            state.showTab = false
        },
    },
})
export const { setShowTab ,setHideTab} = navigationReduxSlice.actions
export default navigationReduxSlice.reducer