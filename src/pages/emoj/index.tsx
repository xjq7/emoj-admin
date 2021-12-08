import { useEffect, useState } from 'react';
import { Form, Button, Table, Card, Input } from 'antd';
import { getEmojList, Emoj } from '@services/emoj';
import { PageInfo } from '@utils/types';

function EmojPage() {
  const [list, setList] = useState<Emoj[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState<PageInfo>({ page: 1, pageSize: 10, total: 0 });

  const fetchList = async (page?: number, pageSize?: number) => {
    try {
      setLoading(true);
      const { data } = await getEmojList({ page, pageSize });
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

  const handleCreateEmoj = () => {};

  const columns = [
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
            <Button>删除</Button>
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
            <Button
              type="primary"
              onClick={() => {
                handleCreateEmoj();
              }}
            >
              新增
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Table
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

export default EmojPage;
