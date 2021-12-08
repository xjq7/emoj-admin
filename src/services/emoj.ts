import request from '@utils/request';
import { PageInfo, Response, ResponseList } from '@utils/types';

export interface Emoj {
  id?: number;
  name?: string;
  desc?: string;
  url?: string;
  created_at?: string;
}

interface GetEmojBody extends PageInfo {}

export function getEmojList(body: GetEmojBody): Promise<ResponseList<Emoj>> {
  return request.post('/emoj/list', body);
}

interface EmojGroup {
  id?: number;
  name?: string;
  desc?: string;
  created_at?: string;
}

export interface GetEmojListBody extends PageInfo {}

export function getEmojGroupList(body: GetEmojListBody): Promise<ResponseList<EmojGroup>> {
  return request.post('/emoj/group/list', body);
}

export function updateEmoj(body: Emoj): Promise<Response> {
  return request.post('/emoj/update', body);
}

export interface EmojGroupBody {
  id?: number;
  name?: string;
  desc?: string;
  created_at?: string;
}

export function updateEmojGroup(body: EmojGroupBody): Promise<Response> {
  return request.post('/emoj/group/update', body);
}
