import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import Header from '../../components/Header';

const ListForm = ({ handleFormSubmit }) => {
  return (
    <Box m="20px">
      <Header title="CREATE LIST" subtitle="Create a New List" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={listSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="List Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.listName}
              name="listName"
              error={!!touched.listName && !!errors.listName}
              helperText={touched.listName && errors.listName}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="List Note"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.listNote}
              name="listNote"
              error={!!touched.listNote && !!errors.listNote}
              helperText={touched.listNote && errors.listNote}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="List Card Background Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.cardBackgroundName}
              name="cardBackgroundName"
              error={!!touched.cardBackgroundName && !!errors.cardBackgroundName}
              helperText={touched.cardBackgroundName && errors.cardBackgroundName}
              sx={{ mb: 2 }}
            />
            <Box display="flex" justifyContent="end">
              <Button type="submit" color="secondary" variant="contained">
                Create New List
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const listSchema = yup.object().shape({
  listName: yup.string().required('List name is required'),
  listNote: yup.string().required('List note is required'),
  cardBackgroundName: yup.string().required('Card background name is required'),
});

const initialValues = {
  listName: '',
  listNote: '',
  cardBackgroundName: '',
};

export default ListForm;
