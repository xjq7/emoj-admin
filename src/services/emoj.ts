import request from '@utils/request';
import { PageInfo, Response, ResponseList } from '@utils/types';

export interface Emoj {
  id?: number;
  name?: string;
  desc?: string;
  url?: string;
  group_id?: number;
  group_name?: string;
  createdAt?: string;
}

interface GetEmojBody extends PageInfo {
  name?: string;
  group_id?: number;
}

export function getEmojList(body: GetEmojBody): Promise<ResponseList<Emoj>> {
  return request.get('/emoj/list', body);
}

export function updateEmoj(body: Emoj): Promise<Response> {
  return request.put('/emoj', body);
}

export function createEmoj(body: Emoj): Promise<Response> {
  return request.post('/emoj', body);
}

export interface EmojGroup {
  id?: number;
  name?: string;
  desc?: string;
  createdAt?: string;
}

export interface GetEmojListBody extends PageInfo {
  name?: string;
}

export function getEmojGroupList(body: GetEmojListBody): Promise<ResponseList<EmojGroup>> {
  return request.get('/emoj-group/list', body);
}

export function updateEmojGroup(body: EmojGroup): Promise<Response> {
  return request.post('/emoj-group', body);
}

export function deleteEmojGroup(body: EmojGroup): Promise<Response> {
  return request.delete('/emoj-group', body);
}

export function deleteEmoj(body: { id: number }): Promise<Response> {
  return request.delete('/emoj', body);
}
