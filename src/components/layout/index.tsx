import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { PieChartOutlined, FileOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import ContentRouter from './router';
import styles from './index.module.less';

const { Header, Content, Footer, Sider } = Layout;

const Index = function () {
  const [collapsed, setCollapsed] = useState(false);
  const [breadCrumb, setBreadCrumb] = useState('用户管理');
  const [selectedKeys, setSelectedKeys] = useState(['1']);

  const navigate = useNavigate();
  const location = useLocation();

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    switch (location.pathname) {
      case '/user':
        setBreadCrumb('用户管理');
        setSelectedKeys(['1']);
        break;
      case '/emoj':
        setBreadCrumb('表情包管理');
        setSelectedKeys(['2']);
        break;
      case '/emojGroup':
        setBreadCrumb('分组管理');
        setSelectedKeys(['3']);
        break;
      case '/book':
        setBreadCrumb('书籍管理');
        setSelectedKeys(['4']);
        break;
      case '/createBook':
        setBreadCrumb('书籍上传');
        setSelectedKeys(['5']);
        break;
      case '/book/category':
        setBreadCrumb('书籍分类');
        setSelectedKeys(['6']);
        break;
      default:
    }
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.replace('/login');
    }
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={styles.logo}>
          <div className={styles.label}>后台管理系统</div>
        </div>
        <Menu theme="dark" selectedKeys={selectedKeys} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => navigate('/user')}>
            用户管理
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />} onClick={() => navigate('/emoj')}>
            表情包管理
          </Menu.Item>
          <Menu.Item key="3" icon={<FileOutlined />} onClick={() => navigate('/emojGroup')}>
            分组管理
          </Menu.Item>
          <Menu.Item key="4" icon={<FileOutlined />} onClick={() => navigate('/book')}>
            书籍管理
          </Menu.Item>
          <Menu.Item key="5" icon={<FileOutlined />} onClick={() => navigate('/createBook')}>
            书籍上传
          </Menu.Item>
          <Menu.Item key="6" icon={<FileOutlined />} onClick={() => navigate('/book/category')}>
            书籍分类
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{breadCrumb}</Breadcrumb.Item>
          </Breadcrumb>
          <ContentRouter />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default Index;
