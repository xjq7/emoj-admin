import React from 'react';
import { Form, FormInstance, Input } from 'antd';
import { UserInfo } from '../../index';

interface Props extends React.Props<any> {
  modalCreateUserRef: React.RefObject<FormInstance<any>>;
  data: UserInfo;
}

const ModalCreateUser = function (props: Props) {
  const { modalCreateUserRef, data } = props;
  const { name, password, phone } = data;
  return (
    <Form initialValues={{ name, password, phone }} ref={modalCreateUserRef} labelCol={{ span: 6 }}>
      <Form.Item label="name" name="name" rules={[{ required: true, message: 'please input name' }]}>
        <Input placeholder="please input name" />
      </Form.Item>
      <Form.Item label="phone" name="phone" rules={[{ required: true, message: 'please input phone' }]}>
        <Input placeholder="please input phone" />
      </Form.Item>
      <Form.Item label="password" name="password" rules={[{ required: true, message: 'please input password' }]}>
        <Input placeholder="please input password" />
      </Form.Item>
    </Form>
  );
};

export default ModalCreateUser;
