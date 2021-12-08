import React, {useEffect, useState} from 'react'
import NumberAnimation from '~/components/NumberAnimation'
import DashboardCard from '~/components/DashboardCard'
import { getTotalVisitCount } from '~/services/visit.service'
import './Dashboard.less'
import {
	Link
} from 'react-router-dom'

const Dashboard = () => {

	const [totalVisitCount, setTotalVisitCount] = useState(0)
	const [todayIncreaseVisitCount, settodayIncreaseVisitCount] = useState(0)

	// 获取访问总人数
	const queryTotalVisitCount = () => {
		getTotalVisitCount().then((res: any)=>{
			setTotalVisitCount(res.count)
			settodayIncreaseVisitCount(res.today_incr)
		})
	}

	useEffect(()=>{
		queryTotalVisitCount()
	}, [])

	return (
		<div className='dashboard-container'>
			<div className="cards">
				<DashboardCard
					extra={
						<Link to='/blackList'>更多</Link>
					}
					title='访问人数'
					count={<div style={{
						display: 'flex',
						alignItems: 'center'
					}}>
						<NumberAnimation value={totalVisitCount} />
						<span>条</span>
					</div>}
				>
					<div className="today-container"
						style={{
							color: todayIncreaseVisitCount > 0 ? '#ff4a4a' : '#3f8600',
							fontWeight: 700
						}}
					>
						今日新增 {todayIncreaseVisitCount}
					</div>
				</DashboardCard>
			</div>
		</div>
	)
}

export default Dashboard
