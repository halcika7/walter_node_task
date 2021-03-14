import { useEffect, useRef, useState } from 'react';
import { useFormik as useForm } from 'formik';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { useThunkDispatch } from '@dispatch';
import { useParams } from 'react-router';

// validations
import { ListValidation } from '@validations/list';

// types
import { Item as ItemInterface, PostListData } from '@ctypes/list';
import { AppState } from '@reducers/index';

// actions
import {
  clearListErrors,
  setListMessage,
  addNewList,
  getList,
  resetListState,
  updateList,
} from '@actions';
import { v4 as uuidv4 } from 'uuid';

// components
import {
  Wrapper,
  ItemsWrapper,
  Item,
  AddItemButton,
  SubmitButton,
  ErrorParagraph,
} from './styled';
import Input from '@components/input';
import SweetAlert from '@components/alert';
import { BaseButton } from '@styled/components';
import { ReactComponent as XImage } from '@images/remove.svg';

type ForName = { name: string };
type ForQTY = { qty: string };

const reduxProps = createSelector(
  (state: AppState) => state.list.errors,
  (state: AppState) => state.list.message,
  (state: AppState) => state.list.status,
  (state: AppState) => state.list.list,
  (...props) => props
);

const errorMessages = [
  'Shopping list does not exist',
  'You do not have permission to get this list',
];

const AddList = () => {
  const itemsRef = useRef<HTMLDivElement>(null);
  const dispatch = useThunkDispatch();
  const [errors, message, status, list] = useSelector(reduxProps);
  const [items, setItems] = useState<ItemInterface[]>([]);
  const { id } = useParams() as { id: string | undefined };

  const onSubmit = (values: PostListData) => {
    const castValues = (ListValidation.cast(values) as unknown) as PostListData;
    const mapped = castValues.items.reduce((state, { name, qty }) => {
      const found = state[`${name}`];
      let quantity = qty;

      if (found) {
        quantity += found;
      }

      return { ...state, [name]: quantity };
    }, {} as Record<string, number>);

    const items = Object.entries(mapped).map(([name, qty]) => ({
      name,
      qty,
      uuid: uuidv4(),
    }));

    dispatch(clearListErrors());

    const data = { ...castValues, items };

    form.setValues(data);

    if (!id) {
      dispatch(addNewList(data));
    } else {
      dispatch(updateList(id, data));
    }
  };

  const form = useForm({
    initialValues: list,
    onSubmit,
    enableReinitialize: true,
    validationSchema: ListValidation,
    initialErrors: errors,
  });

  const { setValues } = form;

  const addItem = () => {
    const itms = [...form.values.items];
    const item = { name: '', qty: 1, uuid: uuidv4() };
    setItems(prev => [...prev, item]);

    itms.push(item);

    form.setValues({ name: form.values.name, items: itms });

    setTimeout(() => {
      if (itemsRef.current) {
        itemsRef.current.scrollTop =
          itemsRef.current.scrollHeight - itemsRef.current.clientHeight;
      }
    }, 100);
  };

  const removeItem = (index: number) => () => {
    const values = [...form.values.items];
    values.splice(index, 1);

    const newItems = [...items];
    newItems.splice(index, 1);

    setItems(newItems);
    form.setValues({ name: form.values.name, items: values });
  };

  const resetMessage = () => {
    if (status === 201) {
      form.resetForm();
      form.setValues({ name: '', items: [] });
      setItems([]);
    }
    dispatch(setListMessage('', null));
  };

  useEffect(() => {
    return () => {
      dispatch(resetListState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (id) dispatch(getList(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!id) {
      setValues({ name: '', items: [] });
      setItems([]);
    }
    return () => {
      setValues({ name: '', items: [] });
      setItems([]);
    };
  }, [setValues, id]);

  useEffect(() => {
    if (id) setItems(list.items);
  }, [id, list]);

  if (id && errorMessages.includes(message)) {
    return (
      <Wrapper>
        <ErrorParagraph>{message}</ErrorParagraph>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h1>{!id ? 'Add' : 'Edit'} list</h1>
      <form onSubmit={form.handleSubmit}>
        {message && (
          <SweetAlert
            message={message}
            type={status && status < 300 ? 'success' : 'error'}
            callBack={resetMessage}
            withButtons
            failedButton="Close"
            successButton="OK"
          />
        )}
        <Input
          name="name"
          label="List Name"
          type="text"
          value={form.values.name}
          error={form.errors.name}
          showError={form.errors.name && form.touched.name}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
        <h2>Items</h2>
        <ItemsWrapper ref={itemsRef}>
          {items.map((item, index) => (
            <Item key={item.uuid}>
              <Input
                name={`items.${index}.name`}
                label="Item Name"
                type="text"
                value={form.values.items?.[index]?.name}
                error={(form.errors.items?.[index] as ForName)?.name}
                showError={
                  (form.errors.items?.[index] as ForName)?.name &&
                  form.touched.items?.[index]?.name
                }
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <Input
                name={`items.${index}.qty`}
                label="Item Quantity"
                type="number"
                value={form.values.items?.[index]?.qty}
                error={(form.errors.items?.[index] as ForQTY)?.qty}
                showError={
                  (form.errors.items?.[index] as ForQTY)?.qty &&
                  form.touched.items?.[index]?.qty
                }
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <BaseButton type="button" onClick={removeItem(index)}>
                <XImage />
              </BaseButton>
            </Item>
          ))}
        </ItemsWrapper>
        <AddItemButton type="button" onClick={addItem}>
          Add Item
        </AddItemButton>
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </Wrapper>
  );
};

export default AddList;
