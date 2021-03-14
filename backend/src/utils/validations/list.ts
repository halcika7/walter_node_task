import { validate } from '@middleware/bodyValidation';
import { body } from 'express-validator';
import { ListRepository } from '@repository/List';

const nameCheck = body('name')
  .not()
  .isEmpty()
  .withMessage('Name of the list is required');

const nameCheckLength = body('name')
  .isLength({ max: 100 })
  .withMessage('Name of the list can contain at most 100 characters');

const isNameAlreadyInUse = body('name')
  .custom(async name => {
    const list = await ListRepository.getByName(name);

    if (list) throw new Error();

    return true;
  })
  .withMessage('List with provided name already exists');

const isNameValidForUpdate = body('name')
  .custom(async (name, { req }) => {
    const list = await ListRepository.getByName(name);
    const _id = list?._id.toString();
    const { id } = req.params as { id: string };

    if (_id !== id) throw new Error();

    return true;
  })
  .withMessage('List with provided name already exists');

const itemValidations = [
  body('items.*.name').not().isEmpty().withMessage('Name is required'),
  body('items.*.name')
    .isLength({ max: 100 })
    .withMessage('Name can contain at most 100 characters'),
  body('items.*.qty').not().isEmpty().withMessage('Quantity is required'),
  body('items.*.qty')
    .isNumeric()
    .withMessage('Quantity must be a numeric value'),
  body('items.*.qty')
    .custom(value => {
      if (typeof value === 'number' && value <= 0) throw new Error();
      return true;
    })
    .withMessage('Quantity must be greater than 0'),
];

export const addingListValidator = validate([
  nameCheck,
  nameCheckLength,
  isNameAlreadyInUse,
  ...itemValidations,
]);

export const updateListValidator = validate([
  nameCheck,
  nameCheckLength,
  isNameValidForUpdate,
  ...itemValidations,
]);
