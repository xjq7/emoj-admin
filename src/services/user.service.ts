import Request from '~/utils/request'

export const getRules = () => {
	return Promise.resolve({
		rules: [{
			"id": 1,
			"name": "lexmin",
			"desc": "no description",
			"type": 1,
			"duration": 10,
			"count": 5,
			"is_valid": true
		}]
	})
}

/**
 * 更新用户状态
 */
export const updateUser = (params: {
  id: number;  // 用户id
  is_valid: 0 | 1  // 是否开启 1-开启 0-关闭
}) => {
	return Promise.resolve()
}

/**
 * 更新用户信息
 */
export const updateUserConfig = (params: {
  id: number;  // 用户id
  name: string;  // 用户名称
  desc: string;  // 用户签名
  type: 1 | 2 | 3;  // 类型 1-github 2-微信 3-h5
  duration: number;  // 用户浏览时间
  count: number;  // 用户浏览次数
  is_valid: 1 | 0  // 是否禁用 1-开启 0-关闭
}) => {
	return Promise.resolve()
}
