import React, { useState, useEffect } from 'react';

import { Form, Input, Button, Table, Card, Modal, FormInstance, message, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { GetUserListBody, getUserList, updateUser, deleteUser } from '@services/user';
import ModalCreateUser from './component/modalCreateUser';
import { PageInfo } from '@/utils/types';

export interface UserInfo {
  id?: string;
  name?: string;
  phone?: string;
  password?: string;
}

const User = function () {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState<PageInfo>({ page: 1, pageSize: 10, total: 0 });

  const searchForm = React.createRef<FormInstance>();

  const fetchList = async (page?: number, pageSize?: number) => {
    const { phone } = (await searchForm.current?.validateFields()) || {};
    const params: GetUserListBody = {
      page: page || pageInfo.page,
      pageSize: pageSize || pageInfo.pageSize,
    };

    if (phone) params.phone = phone;

    setLoading(true);
    try {
      const { data } = await getUserList(params);
      const { list, total, page, pageSize } = data || {};
      setData(
        list.map((item: any) => ({
          ...item,
          updatedAt: dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
          createdAt: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        })),
      );
      setPageInfo({ page, pageSize, total });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList(1, 10);
  }, []);

  const refresh = async () => {
    await fetchList();
  };

  const handleUpdateUser = (params: { isEdit: boolean; data: UserInfo }) => {
    const { isEdit, data } = params;
    const modalCreateUserRef = React.createRef<FormInstance>();
    const label = `${isEdit ? '编辑' : '新增'}用户`;
    Modal.confirm({
      title: label,
      width: 600,
      content: <ModalCreateUser data={data} modalCreateUserRef={modalCreateUserRef} />,
      okText: '确定',
      onOk: async () => {
        if (!modalCreateUserRef.current) return;
        const values = await modalCreateUserRef.current?.validateFields();
        await updateUser({ ...values, id: data.id });
        await refresh();
        message.success(`${label}成功`);
      },
      cancelText: '取消',
    });
  };

  const onSearch = () => {
    fetchList();
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser({ id });
    await refresh();
    message.success('删除用户成功');
  };

  const columns = [
    { key: 'id', dataIndex: 'id', title: 'id' },
    { key: 'name', dataIndex: 'name', title: '昵称' },
    { key: 'phone', dataIndex: 'phone', title: '手机号' },
    { key: 'createdAt', dataIndex: 'createdAt', title: '注册时间' },
    { key: 'latestAt', dataIndex: 'latestAt', title: '最近上线时间' },
    {
      key: 'operation',
      dataIndex: 'operation',
      align: 'center' as AlignType,
      title: '操作',
      render: (_: any, record: any) => (
        <>
          <Button
            type="link"
            onClick={() => {
              handleUpdateUser({ isEdit: true, data: record });
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除?"
            onConfirm={() => {
              handleDeleteUser(record.id);
            }}
            onCancel={() => {}}
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <Form ref={searchForm} onFinish={onSearch} layout="inline">
          <Form.Item label="phone" name="phone">
            <Input placeholder="please input phone" allowClear />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              搜索
            </Button>
            <Button
              loading={loading}
              style={{ marginLeft: '20px' }}
              type="primary"
              onClick={() => {
                searchForm.current?.resetFields();
                refresh();
              }}
            >
              重置
            </Button>
            <Button
              style={{ marginLeft: '20px' }}
              type="primary"
              onClick={() => {
                handleUpdateUser({ isEdit: false, data: {} });
              }}
            >
              新增
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <Table
          rowKey="id"
          loading={loading}
          dataSource={data}
          columns={columns}
          pagination={{
            showSizeChanger: false,
            showQuickJumper: false,
            showTotal: () => `共${pageInfo.total}条`,
            pageSize: Number(pageInfo.pageSize),
            current: Number(pageInfo.page),
            total: Number(pageInfo.total),
            onChange: (current, pageSize) => {
              fetchList(current, pageSize);
            },
          }}
        />
      </Card>
    </div>
  );
};

export default User;
