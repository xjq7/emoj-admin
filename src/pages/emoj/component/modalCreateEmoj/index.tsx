import { Form, Input } from 'antd';
import { Emoj } from '@services/emoj';
import SelectEmojGroup from '@components/SelectEmojGroup';

interface Props {
  modalCreateEmojRef: any;
  data?: Emoj;
}

const ModalCreateEmoj = function (props: Props) {
  const { modalCreateEmojRef, data } = props;

  return (
    <Form ref={modalCreateEmojRef} initialValues={data} labelCol={{ span: 4 }}>
      <Form.Item label="关联分组" name="group_id">
        <SelectEmojGroup />
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
};

ModalCreateEmoj.defaultProps = {
  data: {},
};

export default ModalCreateEmoj;
