import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import routes from './routers/index'
import {Layout, PageHeader} from 'antd';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom'
import Header from '~/layouts/Header'
import Menus from '~/layouts/Menus'
import Login from '~/pages/Login/Login'
const {Content, Footer, Sider} = Layout;
import 'antd/dist/antd.less';

const {pathname} = window.location

ReactDOM.render(
	<Router>
		{
			pathname === '/login' ?
				<Login />
				:
				<Layout>
					<Header />
					<Layout>
						<Sider
							theme="light"
							collapsible
							breakpoint="lg"
							onBreakpoint={broken => {
								console.log(broken);
							}}
							onCollapse={(collapsed, type) => {
								console.log(collapsed, type);
							}}
						>
							<Menus />
						</Sider>
						<Layout>
							<Content>
								<Switch>
									{
										routes.map(route => <Route exact key={route.path} path={route.path}>
											<Fragment>
												<PageHeader title={route.title} />
												<route.component />
											</Fragment>
										</Route>)
									}
								</Switch>
							</Content>
							<Footer>Vite React Admin ©2021 Created by Lexmin</Footer>
						</Layout>
					</Layout>
				</Layout>
		}

	</Router>,
	document.getElementById('root')
)
