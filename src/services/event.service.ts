import Request from '~/utils/request'

/**
 * 获取风控事件总数
 */
export const getEventTotalCount = () => {
	return Promise.resolve({
		total: 100,
		today_incr: 12,
	})
}
