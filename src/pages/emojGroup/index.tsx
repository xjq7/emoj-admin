import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Card, Input, Modal, FormInstance, message } from 'antd';
import { getEmojGroupList, Emoj, GetEmojListBody, updateEmojGroup, EmojGroup, deleteEmojGroup } from '@services/emoj';
import { PageInfo } from '@utils/types';
import ModalCreateEmojGroup from './modalCreateEmojGroup';

function EmojGroupPage() {
  const [list, setList] = useState<Emoj[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState<PageInfo>({ page: 1, pageSize: 10, total: 0 });

  const fetchList = async (page?: number, pageSize?: number) => {
    try {
      setLoading(true);
      const body: GetEmojListBody = { page: page, pageSize };
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

  const handleCreateEmojGroup = ({ isEdit, record }: { isEdit: boolean; record?: EmojGroup }) => {
    const { id } = record || {};
    const label = isEdit ? '编辑' : '新增';

    const form = React.createRef<FormInstance>();

    Modal.confirm({
      title: label,
      width: 500,
      content: <ModalCreateEmojGroup modalCreateEmojGroupRef={form} />,
      okText: '确定',
      cancelText: '取消',
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
    Modal.confirm({
      title: '确认删除?',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await deleteEmojGroup({ id });
        await refresh();
        message.success('删除成功');
      },
    });
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
      render: (text: any, record: Emoj) => {
        return (
          <>
            <Button
              type="link"
              danger
              onClick={() => {
                handleDeleteEmojGroup(record);
              }}
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Card>
        <Form layout="inline">
          <Form.Item label="名称" name="name">
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={hanldeSearch}>
              搜索
            </Button>
            <Button
              style={{ marginLeft: '20px' }}
              type="primary"
              onClick={() => {
                handleCreateEmojGroup({ isEdit: false });
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
}

export default EmojGroupPage;
