import UserModel, { UserInterface } from '@model/User';

export class UserRepository {
  private constructor() {}

  public static create(data: Partial<UserInterface>) {
    return new UserModel({ ...data }).save();
  }

  public static getByEmail(email: string) {
    return UserModel.findOne( { email } ) as unknown as UserInterface;
  }

  public static getById(id: string) {
    return UserModel.findById(id) as unknown as UserInterface;
  }
}
