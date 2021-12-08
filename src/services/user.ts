import { PageInfo } from '@utils/types';
import request from '@utils/request';

interface DeleteUserBody {
  id: number;
}

export function deleteUser(body: DeleteUserBody) {
  return request.post('/user/delete', body);
}

interface UpdateUserBody {
  id?: number;
  name: string;
  phone: string;
  password: string;
}

export function updateUser(body: UpdateUserBody) {
  return request.post('/user/update', body);
}

export interface GetUserListBody extends PageInfo {
  phone?: string;
}

export function getUserList(body: GetUserListBody) {
  return request.post('/user/list', body);
}
