import request from '@utils/request';
import { PageInfo } from '@utils/types';

export function upload2Bucket(params: any) {
  return request.post('/bucket', params, { timeout: 10 * 60 * 1000 });
}

export function getCategoryList() {
  return request.get('/book/category/list');
}

export interface Book {
  name?: string;
  desc?: string;
  category_id?: number;
  author?: string;
  files?: any[];
  createdAt?: string;
}

export function createBook(data: Book) {
  return request.post('/book', data);
}

interface BookListParams extends PageInfo, Book {}

export function getBookList(params: BookListParams) {
  return request.get('/book/list', params);
}

export function createCategory(data: any) {
  return request.post('/book/category/create', data);
}
