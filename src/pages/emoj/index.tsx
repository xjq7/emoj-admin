import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Card, Input, Modal, FormInstance, message, Image, Popconfirm } from 'antd';
import { getEmojList, Emoj, updateEmoj, deleteEmoj, createEmoj } from '@services/emoj';
import { PageInfo } from '@utils/types';
import SelectEmojGroup from '@components/SelectEmojGroup';
import ModalCreateEmoj from './component/modalCreateEmoj';

const initPageInfo = { page: 1, pageSize: 15, total: 0 };

const EmojPage = function () {
  const [list, setList] = useState<Emoj[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState<PageInfo>(initPageInfo);
  const [searchFrom] = Form.useForm();

  const fetchList = async (page?: number, pageSize?: number) => {
    try {
      setLoading(true);
      const { name, groupId: group_id } = await searchFrom.getFieldsValue();
      const { data } = await getEmojList({ page, pageSize, group_id, name });
      const { list: emjoList = [], ...pageInfo } = data || {};
      setList(emjoList);
      setPageInfo({ ...pageInfo });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchFirstList = async () => {
    await fetchList(initPageInfo.page, initPageInfo.pageSize);
  };

  const refresh = async () => {
    fetchFirstList();
  };

  useEffect(() => {
    fetchFirstList();
  }, []);

  const handleSearch = () => {
    fetchFirstList();
  };

  const handleUpdateEmoj = (record?: Emoj) => {
    const { id } = record || {};
    const form = React.createRef<FormInstance>();
    Modal.confirm({
      title: '编辑表情',
      width: 600,
      content: <ModalCreateEmoj data={record} modalCreateEmojRef={form} />,
      onOk: async () => {
        const { name, desc, url: urls, group_id } = (await form.current?.validateFields()) || {};
        const url = urls[0]?.url;
        if (!url) {
          message.error('请上传图片!');
          return Promise.reject();
        }
        await updateEmoj({
          name,
          desc,
          url,
          group_id,
          id,
        });
        await refresh();
        message.success('操作成功');
        form.current?.resetFields(['name', 'desc', 'url']);
        return Promise.resolve();
      },
    });
  };

  const handleCreateEmoj = () => {
    const form = React.createRef<FormInstance>();
    Modal.confirm({
      title: '新增表情',
      width: 600,
      content: <ModalCreateEmoj modalCreateEmojRef={form} />,
      onOk: async () => {
        const { name, desc, url: urls, group_id } = (await form.current?.validateFields()) || {};
        const url = urls[0]?.url;
        if (!url) {
          message.error('请上传图片!');
          return Promise.reject();
        }
        await createEmoj({
          name,
          desc,
          url,
          group_id,
        });
        await refresh();
        message.success('操作成功');
        form.current?.resetFields(['name', 'desc', 'url']);
        return Promise.reject();
      },
    });
  };

  const handleDeleteEmoj = async (record?: Emoj) => {
    const { id } = record || {};
    if (!id) return;
    await deleteEmoj({ id });
    await fetchList(pageInfo.page, pageInfo.pageSize);
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
      width: 150,
      ellipsis: true,
    },
    {
      title: '描述',
      width: 100,
      dataIndex: 'desc',
      render: (text: string) => text || '无',
    },
    {
      title: '标签',
      width: 100,
      dataIndex: 'tag',
      render: (text: string) => text || '无',
    },
    {
      title: '分组',
      dataIndex: 'group_name',
      width: 150,
      ellipsis: true,
      render: (text: string) => text || '无',
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '预览',
      width: 120,
      dataIndex: 'url',
      render: (text: string) => <Image width={100} src={text} />,
    },
    {
      title: '操作',
      render: (text: any, record: Emoj) => (
        <>
          <Button
            type="link"
            onClick={() => {
              handleUpdateEmoj(record);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除?"
            onConfirm={() => {
              handleDeleteEmoj(record);
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
    <>
      <Card>
        <Form form={searchFrom} layout="inline">
          <Form.Item label="名称" name="name">
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="关联分组" name="groupId">
            <SelectEmojGroup />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSearch}>
              搜索
            </Button>
            <Button style={{ marginLeft: '20px' }} type="primary" onClick={handleCreateEmoj}>
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
            showSizeChanger: true,
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

export default EmojPage;
