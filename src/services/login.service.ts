import {validateUserList} from "~/utils"

/**
 * mock登录
 * @param params 
 * @returns 
 */
export const login = (params: {
  userName: string;
  password: string
}) => {
  const { userName, password } = params
  return new Promise((resolve, reject)=>{
    const isCorrent = validateUserList.find(item=>item.userName===userName && item.password === password)
    if ( isCorrent ) {
      resolve(true)
    } else {
      resolve(false)
    }
  })
}