import { UploadOutlined } from '@ant-design/icons';
import { FILE_PREIX } from '@constant/book';
import { upload2Bucket } from '@services/book';
import { Button, List, message, Spin, Upload, UploadProps } from 'antd';
import copy from 'copy-to-clipboard';

interface Props extends UploadProps {
  value?: any[];
  onChange?(data: any): void;
}

const Component = function (props: Props) {
  const { value = [], onChange = () => {}, ...restProps } = props;

  const upload = async (options: any) => {
    const formData = new FormData();
    formData.append('file', options.file);
    formData.append('name', options.file.name);
    onChange([...value, { uid: options.file.uid, name: options.file.name, status: 'uploading' }]);
    const {data} = await upload2Bucket(formData);
    const { path, id } = data
    value.filter((item: any) => item.uid !== options.file.uid);
    onChange([
      ...value,
      { uid: options.file.uid, id, name: options.file.name, url: FILE_PREIX + path, status: 'success' },
    ]);
  };

  const uploadProps = {
    name: 'file',
    customRequest: upload,
    fileList: [],
  };

  return (
    <>
      <Upload {...uploadProps} {...restProps}>
        <Button icon={<UploadOutlined />}>点击上传</Button>
      </Upload>
      <List
        style={{ marginTop: '10px' }}
        header={<div>文件列表:</div>}
        bordered
        dataSource={value}
        renderItem={(item: any) => (
          <Spin spinning={item.status === 'uploading'}>
            <List.Item>
              {item.name}
              <Button
                style={{ marginLeft: 20 }}
                type="primary"
                onClick={() => {
                  copy(item.url);
                  message.success('复制链接成功!');
                }}
              >
                复制链接
              </Button>
            </List.Item>
          </Spin>
        )}
      />
    </>
  );
};

export default Component;
