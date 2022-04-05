import { Form, FormInstance, Input } from 'antd';
import { Emoj } from '@services/emoj';
import SelectEmojGroup from '@components/SelectEmojGroup';
import { RefObject } from 'react';
import UploadImage from '@components/UploadImage';

interface Props {
  modalCreateEmojRef: RefObject<FormInstance<any>>;
  data?: Emoj;
}

const ModalCreateEmoj = function (props: Props) {
  const { modalCreateEmojRef, data } = props;
  const { name, url, desc } = data || {};

  return (
    <Form
      ref={modalCreateEmojRef}
      initialValues={{ name, desc, url: url ? [{ url, uid: Math.random().toString(), name: url }] : [] }}
      labelCol={{ span: 4 }}
    >
      <Form.Item label="关联分组" name="group_id">
        <SelectEmojGroup />
      </Form.Item>
      <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称' }]}>
        <Input placeholder="请输入名称" />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <Input placeholder="请输入描述" />
      </Form.Item>
      <Form.Item label="链接" name="url">
        <UploadImage />
      </Form.Item>
    </Form>
  );
};

ModalCreateEmoj.defaultProps = {
  data: {},
};

export default ModalCreateEmoj;
