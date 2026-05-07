import * as yup from 'yup';

export const TODO_VALIDATION_SCHEMA = yup.object({
  todo: yup.string().trim().required('Task is required'),
});
