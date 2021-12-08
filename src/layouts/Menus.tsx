import React, {useState} from 'react'
import {Layout, Menu} from 'antd';
import {
	BrowserRouter as Router,
	Link
} from 'react-router-dom'
import {menuList} from '~/config/menus'
import {useEffect} from 'react';

console.log('window.location', window.location);
const {pathname} = window.location


const Menus = () => {

	const [selectedKeys, setSelectedKeys] = useState([pathname])

	const onSelect = (e: any) => {
		console.log('onSelect', e)
		setSelectedKeys(e.selectedKeys)
	}

	const [ defaultOpenKeys, setDefaultOpenKeys ] = useState([])

	useEffect(()=>{
		getDefaultOpenKeys()
	}, [])

	const getDefaultOpenKeys = () => {
		const currentMenu: any = menuList.find(item => pathname.includes(item.path))
		if ( currentMenu ) {
			console.log('currentMenu', currentMenu)
			const openKeys: any = [currentMenu.path]
			setDefaultOpenKeys(openKeys)
		}
		console.log('defaultOpenKeys', defaultOpenKeys)
	}

	return (
		<Menu mode="inline"
			openKeys={defaultOpenKeys}
			selectedKeys={selectedKeys}
			onClick={onSelect}
		>
			{
				menuList.map((item) => {
					return (
						item.children.length ?
							<Menu.SubMenu icon={item.icon} title={item.name}
								key={item.path}
							>
								{
									item.children.map((childItem: any)=>{
										return (
											<Menu.Item icon={childItem.icon}
												key={childItem.path}
											>
												<Link to={childItem.path}>
													{childItem.name}
												</Link>
											</Menu.Item>
										)
									})
								}
							</Menu.SubMenu>
							:
							<Menu.Item key={item.path} icon={item.icon}>
								<Link to={item.path}>
									{item.name}
								</Link>
							</Menu.Item>
					)
				})
			}
		</Menu>
	)
}

export default Menus
