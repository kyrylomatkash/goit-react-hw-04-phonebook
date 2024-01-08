// Імпорт бібліотек
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Основна функція компоненту
const EditContact = ({ contact, handleSaveEdit, handleClose }) => {
  const [editedName, setEditedName] = useState(contact.name);
  const [editedNumber, setEditedNumber] = useState(contact.number);

  // Зміна імені контакту
  const handleNameChange = e => {
    setEditedName(e.target.value);
  };

  // Зміна номеру контакту
  const handleNumberChange = e => {
    setEditedNumber(e.target.value);
  };

  // Збереження змін
  const handleSave = () => {
    const editedContact = {
      ...contact,
      name: editedName.trim(),
      number: editedNumber.trim(),
    };

    handleSaveEdit(editedContact);
    handleClose();
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edit the details of {contact.name}.
        </DialogContentText>
        <TextField
          label="Name"
          variant="outlined"
          value={editedName}
          onChange={handleNameChange}
          required
          sx={{ width: '100%', marginBottom: '10px' }}
        />
        <TextField
          label="Number"
          variant="outlined"
          type="tel"
          value={editedNumber}
          onChange={handleNumberChange}
          required
          sx={{ width: '100%', marginBottom: '10px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
// Експорт
export default EditContact;
