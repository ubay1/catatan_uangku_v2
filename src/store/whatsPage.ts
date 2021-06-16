import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ISelectPage {
    page: string
}

const initialState: ISelectPage = { page: '' }

const SetWhatsPage = createSlice({
    name: 'whatsPage',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<ISelectPage>) {
            state.page = action.payload.page
        },
    },
})
export const { setPage } = SetWhatsPage.actions
export default SetWhatsPage.reducer