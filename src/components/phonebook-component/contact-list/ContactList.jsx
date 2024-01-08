// Імпорт бібліотек
import React, { useState } from 'react';
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

// Імпорт стилів
import {
  StyledList,
  StyledListItem,
  EditButton,
  DeleteButton,
} from './contactliststyles';

// Функція листу контактів
const ContactList = ({ contacts, filter, deleteContact, handleEditClick }) => {
  const [editContact, setEditContact] = useState(null);

  const handleDeleteConfirmationClose = () => {
    setEditContact(null);
  };

  // Видалення контакту
  const handleDeleteContact = contact => {
    deleteContact(contact.id);
    handleDeleteConfirmationClose();
  };

  const filteredContacts = contacts
    .filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <StyledList>
      {filteredContacts.length > 0 ? (
        <List>
          {filteredContacts.map(contact => (
            <StyledListItem key={contact.id}>
              {contact.name} - {contact.number}
              <EditButton onClick={() => handleEditClick(contact)}>
                Edit
              </EditButton>
              <DeleteButton onClick={() => handleDeleteContact(contact)}>
                Delete
              </DeleteButton>
            </StyledListItem>
          ))}
        </List>
      ) : (
        <p>There are no contacts.</p>
      )}

      {editContact && (
        <Dialog
          open={true}
          onClose={handleDeleteConfirmationClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit Contact</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit the details of {editContact.name}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteConfirmationClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </StyledList>
  );
};
// Експорт
export default ContactList;
