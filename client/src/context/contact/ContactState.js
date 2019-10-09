import React, {useReducer} from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACTS,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types';

const ContactState = props => {
    const initailState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, disptach] = useReducer(contactReducer, initailState);

    // Get Contacts
    const getContacts = async () => {
        
        try {
            const res = await axios.get('/api/contacts');

            disptach({type: GET_CONTACTS, payload: res.data});
        } catch (err) {
            disptach({type: CONTACT_ERROR, payload: err.response.msg});
        }

        
    };


    // Add Contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts', contact, config);

            disptach({type: ADD_CONTACT, payload: res.data});
        } catch (err) {
            disptach({type: CONTACT_ERROR, payload: err.response.msg});
        }

        
    };

    // Delete Contact
    const deleteContact = async id => {
        try {
           await axios.delete(`/api/contacts/${id}`);

           disptach({type: DELETE_CONTACT, payload: id});
        } catch (err) {
            disptach({type: CONTACT_ERROR, payload: err.response.msg});
        }

        
    };

    // Update Contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);

            disptach({type: UPDATE_CONTACTS, payload: res.data});
        } catch (err) {
            disptach({type: CONTACT_ERROR, payload: err.response.msg});
        }
        
    };

    // Clear Contacts
    const clearContacts = () => {
        disptach({type: CLEAR_CONTACTS});
    };

    // Set Current Conact
    const setCurrent = contact => {
        disptach({type: SET_CURRENT, payload: contact});
    };

    // Clear Current Contact
    const clearCurrent = () => {
        disptach({type: CLEAR_CURRENT});
    };


    // Filter Contacts
    const filterContacts = text => {
        disptach({type: FILTER_CONTACTS, payload: text});
    };
    // Clear Filter
    const clearFilter = () => {
        disptach({type: CLEAR_FILTER});
    };

    return (
        <ContactContext.Provider 
        value = {{
            contacts: state.contacts,
            current:state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts

        }}>
            {props.children}
        </ContactContext.Provider>
    )


};

export default ContactState;