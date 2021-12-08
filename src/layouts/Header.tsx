import React, {FC} from 'react'
import {Layout, Dropdown, Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import { redirectToLogin } from '~/utils/index'
import {
	Link
} from 'react-router-dom'
import './Header.less'

const {Header} = Layout;

const menu = () => {
	const handleLogout = () => {
		redirectToLogin()
	}
	return (
		<Menu>
			<Menu.Item>
				<div onClick={handleLogout}>
					退出登录
				</div>
			</Menu.Item>
		</Menu>
	);
}

const LayoutHeader: FC = () => {
	return (
		<Header className="layout-header">
			<Link className="logo"
				to="/dashboard"
			>Vite React Ant</Link>
			<Dropdown overlay={menu} placement="bottomRight">
				<UserOutlined />
			</Dropdown>
		</Header>
	)
}

export default LayoutHeader
