import { BadRequestException } from '@exception';
import { ListInterface } from '@model/List';
import { ListRepository } from '@repository/List';

export const addList = async (data: Partial<ListInterface>) => {
  try {
    await ListRepository.create(data);
  } catch (error) {
    throw new BadRequestException();
  }
};

export const updateList = async (data: ListInterface, id: string) => {
  const list = await ListRepository.getById(id);

  if (!list) throw new BadRequestException('List does not exist');
  if (list.userId.toString() !== data.userId) {
    throw new BadRequestException(
      'You do not have permission to update this list'
    );
  }

  const updateValues = {} as Partial<ListInterface>;

  if(list.name !== data.name) {
    updateValues.name = data.name;
  }

  list.name = data.name;
  list.items = data.items;

  await list.save();

  return { message: 'List updated' };
};

export const getTotalNumberOfLists = (userId: string) => {
  try {
    return ListRepository.getNumberOfLists(userId);
  } catch {
    throw new BadRequestException();
  }
};

export const getLists = async (userId: string, skip = '0') => {
  try {
    const lists = await ListRepository.getLists(userId, parseInt(skip, 10));
    return { lists };
  } catch {
    throw new BadRequestException();
  }
};

export const getList = async (userId: string, id: string) => {
  const list = await ListRepository.getById(id);

  if (list.userId.toString() !== userId) {
    throw new BadRequestException(
      'You do not have permission to get this list'
    );
  }

  return list;
};

export const deleteList = async (userId: string, id: string) => {
  const list = await ListRepository.getById(id);

  if (list.userId.toString() !== userId) {
    throw new BadRequestException(
      'You do not have permission to delete this list'
    );
  }

  await list.delete();

  return true;
};

const normalizedDate = (date: string, h = 0) => {
  const newDate = new Date(date);
  newDate.setHours(h);
  newDate.setMinutes(0);
  newDate.setSeconds(0);

  return newDate;
};

export const getReport = async (
  data: { startDate: string; endDate: string },
  userId: string
) => {
  return ListRepository.generateReport(
    userId,
    normalizedDate(data.startDate),
    normalizedDate(data.endDate, 24)
  );
};
