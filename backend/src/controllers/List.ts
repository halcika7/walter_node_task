import { NextFunction, Request, Response } from 'express';
import { HTTPCodes } from '@codes';
import * as ListService from '@service/List';

export const addList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as { id: string };
    await ListService.addList({ ...req.body, userId: id });
    return res.status(HTTPCodes.Created).json({ message: 'List added' });
  } catch (error) {
    return next(error);
  }
};

export const getTotalNumberOfLists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as { id: string };
    const rsp = await ListService.getTotalNumberOfLists(id as string);
    const numberOfLists = rsp[0].name;
    return res.status(HTTPCodes.OK).json({ numberOfLists });
  } catch (error) {
    return next(error);
  }
};

export const getLists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as { id: string };
    const { lists } = await ListService.getLists(id as string, req.params.skip);
    return res.status(HTTPCodes.OK).json({ lists });
  } catch (error) {
    return next(error);
  }
};

export const getList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as { id: string };
    const list = await ListService.getList(id, req.params.id);
    return res.status(HTTPCodes.OK).json({ list });
  } catch (error) {
    return next(error);
  }
};

export const deleteList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as { id: string };
    await ListService.deleteList(id, req.params.id);
    return res.status(HTTPCodes.OK).json({ message: 'List deleted' });
  } catch (error) {
    return next(error);
  }
};

interface Dates {
  startDate: string;
  endDate: string;
}

export const getListReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as { id: string };
    const dates = (req.query as unknown) as Dates;
    const report = await ListService.getReport({ ...dates }, id);
    return res
      .status(HTTPCodes.OK)
      .json({ report, message: !report.length ? 'No Data Found' : '' });
  } catch (error) {
    return next(error);
  }
};

export const updateList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as { id: string };
    const { message } = await ListService.updateList(
      {
        ...req.body,
        userId: id,
      },
      req.params.id
    );
    return res.status(HTTPCodes.OK).json({ message });
  } catch (error) {
    return next(error);
  }
};
