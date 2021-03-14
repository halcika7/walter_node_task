import { BadRequestException } from '@exception';
import { UserRepository } from '@repository/User';
import { Bcrypt } from './Bcrypt';

export const changePassword = async (id: string, password: string) => {
  const user = await UserRepository.getById(id);

  const isSame = await Bcrypt.compare(password, user.password);

  if (isSame) throw new BadRequestException('Password already in use');

  user.password = password;

  return user.save();
};
