import {message} from 'antd'

/**
 * 合法的用户列表
 */
export const validateUserList: Array<{
  userName: string;
  password: string
}> = [
  {
    userName: 'admin',
    password: 'admin123'
  }
]

/**
 * 重定向到登录页面
 */
export const redirectToLogin = () => {
  localStorage.removeItem('userInfo')
  window.location.replace(`${window.location.origin}/login`)
}

/**
 * request中校验登录
 * @returns
 */
export const validateLogin = () => {
  const userInfo = localStorage.getItem('userInfo')
  if (!userInfo) {
    message.error('登录失效，请重新登录～')
    setTimeout(() => {
      redirectToLogin()
    }, 2000);
    return
  }
  const parsedUserInfo = JSON.parse(userInfo)
  if (!parsedUserInfo.userName || !parsedUserInfo.password) {
    console.log('parsedUserInfo', parsedUserInfo)
    message.error('登录失效，请重新登录～')
    setTimeout(() => {
      redirectToLogin()
    }, 2000);
    return
  }
}
