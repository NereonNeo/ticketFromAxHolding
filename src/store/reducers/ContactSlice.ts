import { IContactStore, InitialStore } from '@/types/global.interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchAllContacts, filterContacts, updateContact } from './ActionCreator';





const initialState: InitialStore = {
    loading: false,
    error: '',
    contacts: []
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        //! Loading Start
        handleLoading: (state) => {
            state.loading = true
            state.error = ''
        },

        //! Loading End
        handleLoadingEnd: (state) => {
            state.loading = false
            state.error = ''
        },

    },
    extraReducers: {
        //! Get All Contacts
        [fetchAllContacts.fulfilled.type]: (state, action) => {
            state.loading = false
            state.error = ''
            state.contacts = action.payload
        },
        [fetchAllContacts.pending.type]: (state) => {
            state.loading = true
        },
        [fetchAllContacts.rejected.type]: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
        //! Add Contact
        [addContact.fulfilled.type]: (state, action: PayloadAction<IContactStore>) => {
            state.loading = false
            state.error = ''
            state.contacts.push(action.payload)
        },
        [addContact.pending.type]: (state) => {
            state.loading = true
        },
        [addContact.rejected.type]: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },

        //! Update Contact
        [updateContact.fulfilled.type]: (state, action: PayloadAction<IContactStore>) => {
            state.loading = false
            state.error = ''
            const getContactIndex = state.contacts.findIndex(contact => contact._id === action.payload._id)
            state.contacts[getContactIndex] = {
                _id: action.payload._id,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                phone: action.payload.phone,
                email: action.payload.email,
                tag: action.payload.tag
            }
        },
        [updateContact.pending.type]: (state) => {
            state.loading = true
        },
        [updateContact.rejected.type]: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },

        //! Delete Contact  
        [deleteContact.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = ''
            state.contacts = state.contacts.filter((contact) => contact._id !== action.payload)
        },
        [deleteContact.pending.type]: (state) => {
            state.loading = true
        },
        [deleteContact.rejected.type]: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },

        //! Filter Contacts
        [filterContacts.fulfilled.type]: (state, action: PayloadAction<IContactStore[]>) => {
            state.loading = false
            state.error = ''
            state.contacts = action.payload
        },
        [filterContacts.pending.type]: (state) => {
            state.loading = true
        },
        [filterContacts.rejected.type]: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },

    }
})

export default contactSlice.reducer 