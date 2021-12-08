
import React from 'react'
import {AreaChartOutlined, EditOutlined} from '@ant-design/icons';

const menuList = [
	{
		icon: <AreaChartOutlined />,
		name: '卡片',
		path: '/dashboard',
		children: []
	},
	{
		icon: <EditOutlined />,
		name: '表格+表单',
		path: '/ruleManage',
		children: []
	}
]

export {
	menuList
}
