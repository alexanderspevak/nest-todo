import { User } from '../user/user.model';

export interface TodoDTO {
  name?: string;
  description?: string;
  user: User;
  id?: string;
  status?: string;
}
