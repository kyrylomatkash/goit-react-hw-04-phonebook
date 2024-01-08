// Імпорт компонентів і бібліотек
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './phonebook-component/contact-form/ContactForm';
import ContactList from './phonebook-component/contact-list/ContactList';
import EditContact from './phonebook-component/edit-contact/Edit';
import DeleteConfirmationModal from './phonebook-component/delete-contact/Delete';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Імпорт стилів
import { AppContainer, Heading, ErrorText, SearchInput } from './appstyles';
// Основна функція застосунку
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const [editContact, setEditContact] = useState(null);
  const [isContactExistsModalOpen, setIsContactExistsModalOpen] =
    useState(false);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [
    isClearHistoryConfirmationModalOpen,
    setIsClearHistoryConfirmationModalOpen,
  ] = useState(false);

  const handleChange = value => {
    setFilter(value);
  };
  // Додавання нового контакту
  const addContact = (name, number) => {
    if (name.trim() === '' || number.trim() === '') {
      setError('Please fill in both name and number.');
      return;
    }

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      setIsContactExistsModalOpen(true);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
    setFilter('');
    setError('');

    toast.success('Contact added successfully');
  };

  // Видалення контакту зі списку
  const deleteContact = contactId => {
    setIsDeleteConfirmationModalOpen(true);
    setContactToDelete(contactId);
  };

  const handleDeleteConfirmation = () => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactToDelete)
    );
    setIsDeleteConfirmationModalOpen(false);

    toast.success('Contact deleted successfully');
  };

  const handleCloseDeleteConfirmationModal = () => {
    setIsDeleteConfirmationModalOpen(false);
    setContactToDelete(null);
  };

  // Редагування контакту
  const handleEditClick = contact => {
    setEditContact(contact);
  };

  // Збереження контакту у списку
  const handleSaveEdit = editedContact => {
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === editedContact.id ? editedContact : contact
      )
    );
    setEditContact(null);

    toast.success('Contact edited successfully');
  };

  const handleContactExistsModalClose = () => {
    setIsContactExistsModalOpen(false);
  };

  const clearHistory = () => {
    if (contacts.length === 0) {
      toast.warning('No contacts to clear.');
      return;
    }

    setIsClearHistoryConfirmationModalOpen(true);
  };

  const handleClearHistoryConfirmation = () => {
    setContacts([]);
    setIsClearHistoryConfirmationModalOpen(false);

    toast.success('Phonebook history cleared successfully');
  };

  const handleCloseClearHistoryConfirmationModal = () => {
    setIsClearHistoryConfirmationModalOpen(false);
  };

  // Завантаження контактів з локального сховища
  useEffect(() => {
    const storedContacts = localStorage.getItem('phonebookContacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('phonebookContacts', JSON.stringify(contacts));
  }, [contacts]);

  // Фільтр по імені
  const filteredContacts = contacts
    .filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <React.Fragment>
      <AppContainer>
        <Heading variant="h1">Phonebook</Heading>
        {error && <ErrorText>{error}</ErrorText>}
        <ContactForm addContact={addContact} />
        <Typography variant="h2">Contacts</Typography>
        <SearchInput
          type="text"
          name="filter"
          value={filter}
          onChange={e => handleChange('filter', e.target.value)}
          placeholder="Search contacts..."
        />
        <ContactList
          contacts={filteredContacts}
          filter={filter}
          deleteContact={deleteContact}
          handleEditClick={handleEditClick}
        />
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={clearHistory}
        >
          Clear History
        </Button>
      </AppContainer>

      {editContact && (
        <EditContact
          contact={editContact}
          handleSaveEdit={handleSaveEdit}
          handleClose={() => setEditContact(null)}
        />
      )}

      <DeleteConfirmationModal
        open={isDeleteConfirmationModalOpen}
        handleClose={handleCloseDeleteConfirmationModal}
        handleConfirmation={handleDeleteConfirmation}
      />

      <Dialog
        open={isContactExistsModalOpen}
        onClose={handleContactExistsModalClose}
      >
        <DialogTitle>Contact Exists</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A contact with the name <strong>{filter}</strong> already exists.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleContactExistsModalClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isClearHistoryConfirmationModalOpen}
        onClose={handleCloseClearHistoryConfirmationModal}
      >
        <DialogTitle>Clear Phonebook History</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to clear the phonebook history? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseClearHistoryConfirmationModal}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleClearHistoryConfirmation} color="primary">
            Clear
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </React.Fragment>
  );
};
// Експорт
export default App;
