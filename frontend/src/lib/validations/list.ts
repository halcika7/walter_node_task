import * as yup from 'yup';

export const ListValidation = yup.object({
  name: yup
    .string()
    .max(100, 'List name cannot exceed 100 characters')
    .required('List Name is required'),
  items: yup.array().of(
    yup.object().shape({
      name: yup
        .string()
        .max(100, 'Name cannot exceed 100 characters')
        .required('Name required'),
      qty: yup
        .number()
        .required('Quantity is required')
        .min(1, 'Quantity must be greater than 0'),
    })
  ),
});
