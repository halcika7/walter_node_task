import bcrypt from 'bcrypt';

export class Bcrypt {
  private constructor() {}

  public static async hashWithSalt(value: string) {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(value, salt);
  }

  public static compare(value1: string, value2: string) {
    return bcrypt.compare(value1, value2);
  }
}
