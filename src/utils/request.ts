import Axios, { AxiosRequestConfig, Method } from 'axios'
import {validateLogin} from '.'

const Request = (options: AxiosRequestConfig) => {
  const {
    url,
    method,
    data
  } = options
  return new Promise((resolve, reject)=>{

    // 发起请求之前校验登录
    validateLogin()
    
    Axios.request({
      url,
      method,
      headers: {
        'Content-type': 'application/json'
      },
      data
    }).then((res)=>{
      if ( res.status === 200 && res.data ) {
        resolve(res.data)
        return
      }
      reject(res)
    })
  })
}

export default Request