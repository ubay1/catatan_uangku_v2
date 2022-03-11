import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISelectPage {
    page: string;
    prevPage?: string;
}

const initialState: ISelectPage = { page: '', prevPage: '' };

const SetWhatsPage = createSlice({
    name: 'whatsPage',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<ISelectPage>) {
            state.page = action.payload.page;
            state.prevPage = action.payload.prevPage;
        },
    },
});
export const { setPage } = SetWhatsPage.actions;
export default SetWhatsPage.reducer;
