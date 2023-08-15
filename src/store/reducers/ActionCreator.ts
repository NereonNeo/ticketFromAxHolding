import { IContactStore } from "@/types/global.interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@utils/http";


export const fetchAllContacts = createAsyncThunk(
    'contact/fetchAll',
    async (_, thunkApi) => {
        try {
            const response = await axios.get<IContactStore[]>('/contacts')
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue('Error')
        }
    }
)

export const addContact = createAsyncThunk(
    'contact/addContact',
    async (data: Omit<IContactStore, '_id'>, thunkApi) => {
        try {
            const response = await axios.post<IContactStore>('/contacts/create', data)
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue('Error')
        }
    }
)

export const updateContact = createAsyncThunk(
    'contact/updateContact',
    async (body: IContactStore, thunkApi) => {
        try {
            const response = await axios.put<IContactStore>(`/contacts/${body._id}`, body)
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue('Error')
        }
    }
)


export const deleteContact = createAsyncThunk(
    'contact/deleteContact',
    async (id: string, thunkApi) => {
        try {
            await axios.delete<string>(`/contacts/${id}`)
            return id
        } catch (error) {
            return thunkApi.rejectWithValue('Error')
        }
    }
)

export const filterContacts = createAsyncThunk(
    'contact/filterContacs',
    async (query: string, thunkApi) => {
        try {
            const response = await axios.get<IContactStore[]>(`/contacts/filter/?search=${query}`)
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue('Error')
        }
    }
)
