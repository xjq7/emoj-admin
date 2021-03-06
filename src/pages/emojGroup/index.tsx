import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Card, Input, Modal, FormInstance, message, Popconfirm } from 'antd';
import { getEmojGroupList, Emoj, GetEmojListBody, updateEmojGroup, EmojGroup, deleteEmojGroup } from '@services/emoj';
import { PageInfo } from '@utils/types';
import { useForm } from 'antd/lib/form/Form';
import ModalCreateEmojGroup from './modalCreateEmojGroup';

const EmojGroupPage = function () {
  const [list, setList] = useState<Emoj[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState<PageInfo>({ page: 1, pageSize: 10, total: 0 });

  const [form] = useForm();

  const fetchList = async (page?: number, pageSize?: number) => {
    try {
      setLoading(true);
      const { name } = form.getFieldsValue();
      const body: GetEmojListBody = { page, pageSize, name };

      const { data } = await getEmojGroupList(body);
      const { list: emjoList = [], ...pageInfo } = data || {};
      setList(emjoList);
      setPageInfo({ ...pageInfo });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList(1, 10);
  }, []);

  const refresh = () => {
    fetchList(1, 10);
  };

  const hanldeSearch = () => {
    fetchList(pageInfo.page, pageInfo.pageSize);
  };

  const handleUpdateEmojGroup = (record?: EmojGroup) => {
    const { id } = record || {};
    const label = id ? '编辑' : '新增';

    const form = React.createRef<FormInstance>();

    Modal.confirm({
      title: label,
      width: 500,
      content: <ModalCreateEmojGroup data={record} modalCreateEmojGroupRef={form} />,
      onOk: async () => {
        const values: EmojGroup = await form.current?.validateFields();
        if (id) values.id = id;
        await updateEmojGroup(values);
        message.success(`${label}成功`);
        await refresh();
      },
    });
  };

  const handleDeleteEmojGroup = async ({ id }: EmojGroup) => {
    await deleteEmojGroup({ id });
    await refresh();
    message.success('删除成功');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '操作',
      render: (text: any, record: Emoj) => (
        <>
          <Button
            type="link"
            onClick={() => {
              handleUpdateEmojGroup(record);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除?该分组关联的表情包都会删除!"
            onConfirm={() => {
              handleDeleteEmojGroup(record);
            }}
            onCancel={() => {}}
            okText="确认"
            cancelText="取消"
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
    <>
      <Card>
        <Form form={form} layout="inline">
          <Form.Item label="名称" name="name">
            <Input placeholder="请输入名称" allowClear />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={hanldeSearch}>
              搜索
            </Button>
            <Button
              style={{ marginLeft: '20px' }}
              type="primary"
              onClick={() => {
                handleUpdateEmojGroup();
              }}
            >
              新增
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Table
          rowKey="id"
          loading={loading}
          dataSource={list}
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
    </>
  );
};

export default EmojGroupPage;
