import Request from '~/utils/request'

/**
 * 获取访问总人数
 */
export const getTotalVisitCount = () => {
	return Promise.resolve({
		count: 9999,
		today_incr: 129,
	})
}
