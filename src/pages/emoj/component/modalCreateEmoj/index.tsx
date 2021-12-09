import { useEffect, useState, useMemo } from 'react';
import { Form, Input, Select } from 'antd';
import { Emoj, getEmojGroupList } from '@services/emoj';
import _ from 'lodash';

interface Props {
  modalCreateEmojRef: any;
  data?: Emoj;
}

function ModalCreateEmoj(props: Props) {
  const { modalCreateEmojRef, data } = props;
  const { id } = data || {};

  const isEdit = !!id;
  const [emojGroupsOptions, setEmojGroupsOptions] = useState<{ label?: string; value?: number }[]>([]);

  const [fetchEmojGroupLoading, setFetchEmojGroupLoading] = useState(false);

  const handleEmojGroupSearch = useMemo(() => {
    const fetchEmojGroup = async (value: string) => {
      try {
        setFetchEmojGroupLoading(true);
        const { data } = await getEmojGroupList({ page: 1, pageSize: 100, name: value });
        const { list = [] } = data || {};
        setEmojGroupsOptions(list.map(({ name, id }) => ({ label: name, value: id })));
      } catch (error) {
      } finally {
        setFetchEmojGroupLoading(false);
      }
    };
    return _.debounce(fetchEmojGroup, 1000);
  }, [getEmojGroupList, 1000]);

  return (
    <Form ref={modalCreateEmojRef} initialValues={data} labelCol={{ span: 4 }}>
      <Form.Item label="关联分组" name="emoj_group">
        <Select
          allowClear
          showSearch
          filterOption={false}
          onSearch={handleEmojGroupSearch}
          loading={fetchEmojGroupLoading}
          placeholder="请选择关联分组"
          options={emojGroupsOptions as any}
        />
      </Form.Item>
      <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称' }]}>
        <Input placeholder="请输入名称" />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <Input placeholder="请输入描述" />
      </Form.Item>
      <Form.Item
        label="链接"
        name="url"
        rules={[
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback('请输入链接');
                return;
              }
              if (!/^((http|https):\/\/)/.test(value)) {
                callback('请输入正确的链接');
                return;
              }
              callback();
            },
          },
        ]}
      >
        <Input placeholder="请输入链接" />
      </Form.Item>
    </Form>
  );
}

export default ModalCreateEmoj;
