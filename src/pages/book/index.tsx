import { useEffect, useState } from 'react';
import { Button, Card, Form, Input, Table } from 'antd';
import SelectCategory from '@components/SelectCategory';
import { Book, getBookList } from '@services/book';
import { PageInfo } from '@utils/types';
import { FILE_PREIX } from '@constant/book';

const initPageInfo = { page: 1, pageSize: 15, total: 0 };

const Component = function () {
  const [list, setList] = useState([]);
  const [form] = Form.useForm<Book>();

  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState<PageInfo>(initPageInfo);

  const fetchList = async (page?: number, pageSize?: number) => {
    try {
      setLoading(true);
      const { name, category1, category2 } = await form.getFieldsValue();
      const {data} = await getBookList({ page, pageSize, category1, category2, name });
      const { list: bookList = [], ...pageInfo } = data
      setList(bookList);
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

  const columns = [
    {
      title: '书名',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '一级类目',
      width: 120,
      align: 'center' as AlignType,
      key: 'category1_name',
      dataIndex: 'category1_name',
    },
    {
      title: '二级类目',
      width: 120,
      align: 'center' as AlignType,
      key: 'category2_name',
      dataIndex: 'category2_name',
    },
    {
      title: '文件列表',
      key: 'files',
      dataIndex: 'files',
      render: (text: any, record: any) => (
        <div>
          {text.map((item: any) => (
            <a target="_blank" href={FILE_PREIX + item.path} rel="noreferrer">
              {item.name}
            </a>
          ))}
        </div>
      ),
    },
    {
      title: '操作',
      render: (text: Book, record: Book[]) => (
        <>
          <Button type="link" onClick={() => {}}>
            添加文件
          </Button>
          {/* <Popconfirm
            title="确认删除?"
            onConfirm={() => {
              handleDeleteEmoj(record);
            }}
            onCancel={() => {}}
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm> */}
        </>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <Form<Book> form={form} layout="inline">
          <Form.Item label="书名" name="name">
            <Input placeholder="请输入书名" allowClear />
          </Form.Item>
          <Form.Item label="一级类目" name="category1">
            <SelectCategory style={{ width: 120 }} allowClear level={1} placeholder="请选择一级类目" />
          </Form.Item>
          <Form.Item label="二级类目" name="category2">
            <SelectCategory style={{ width: 120 }} level={2} allowClear placeholder="请选择二级类目" />
          </Form.Item>
          <Form.Item style={{ marginLeft: 20 }}>
            <Button type="primary" onClick={handleSearch} loading={loading}>
              搜索
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
    </div>
  );
};

export default Component;
