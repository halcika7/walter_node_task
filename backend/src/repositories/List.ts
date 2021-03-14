import ListModel, { ListInterface } from '@model/List';
import { Types } from 'mongoose';

export interface ListAggregate {
  _id: string;
  name: string;
  createdAt: string;
}

export class ListRepository {
  private constructor() {}

  public static create(data: Partial<ListInterface>) {
    return new ListModel({ ...data }).save();
  }

  public static getById(id: string) {
    return (ListModel.findById(id) as unknown) as ListInterface;
  }

  public static getByName(name: string) {
    return ListModel.findOne({ name });
  }

  public static getByIds(userId: string, _id: string) {
    return ListModel.findOne({ userId, _id });
  }

  public static getNumberOfLists(userId: string) {
    return ListModel.aggregate<{ name: number }>([
      { $match: { userId: new Types.ObjectId(userId) } },
      { $project: { name: 1 } },
      { $count: 'name' },
    ]);
  }

  public static getLists(userId: string, skip: number) {
    return ListModel.aggregate<ListAggregate>([
      { $match: { userId: new Types.ObjectId(userId) } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: 20 },
      { $project: { name: 1, createdAt: 1 } },
    ]);
  }

  public static generateReport(userId: string, startDate: Date, endDate: Date) {
    return ListModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      { $project: { items: 1 } },
      { $unwind: '$items' },
      {
        $group: {
          _id: { token: '$items.name' },
          count: { $sum: '$items.qty' },
        },
      },
      {
        $group: {
          _id: '$_id.token',
          qty: { $sum: '$count' },
        },
      },
      { $project: { name: '$_id', qty: 1, _id: 0 } },
      { $sort: { qty: -1, name: 1 } },
    ]);
  }
}
