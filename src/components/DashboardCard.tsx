import React from 'react'
import { Card } from 'antd'
import "./DashboardCard.less"

const DashboardCard = (props: {
  title: string;
  count: any;
  increase?: {
    week: string;
    month: string
  };
  children?: any
  extra?: any
}) => {
  const { title, count, increase, children, extra = null } = props
  return (
    <Card title={title} extra={extra} style={{width: 300}}>
      <div className="card-count">
        {count}
      </div>
      {
        increase &&
        <div className="tendency">
          周同比 {increase.week} 月同比 {increase.month}
        </div>
      }
      {children}
    </Card>
  )
}

export default DashboardCard