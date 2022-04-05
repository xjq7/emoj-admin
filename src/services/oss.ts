import request from '@utils/request';

export function getStsToken() {
  return request.get('/oss/sts-token');
}
