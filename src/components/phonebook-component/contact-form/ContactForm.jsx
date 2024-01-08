// Імпорти стилів і бібліотек
import React, { useState } from 'react';
import { StyledForm, StyledTextField } from './contactformstyles';
import { Button } from '@mui/material';
// Основна функція компоненту
const ContactForm = ({ addContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });
  // Відслідковування зміни полів
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
  // Додавання контакту
  const handleAddContact = e => {
    e.preventDefault();
    const { name, number } = formData;
    addContact(name, number);
    setFormData({ name: '', number: '' });
  };

  return (
    <StyledForm onSubmit={handleAddContact}>
      <StyledTextField
        label="Name"
        variant="outlined"
        sx={{ width: '350px', marginBottom: '10px' }}
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <StyledTextField
        label="Number"
        variant="outlined"
        type="tel"
        sx={{ width: '350px', marginBottom: '10px' }}
        name="number"
        value={formData.number}
        onChange={handleInputChange}
        required
      />
      <Button type="submit" variant="outlined">
        Add Contact
      </Button>
    </StyledForm>
  );
};
// Експорт
export default ContactForm;
