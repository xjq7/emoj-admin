import { useState } from 'react';
import { Upload, message, Spin } from 'antd';
import useAliyunOss from '@hooks/useAliyunOss';
import { calHash } from '@utils/utils';
import styles from './index.module.less';

const Index = ({ multiple = false, value = [], onChange, ...restProps }: any) => {
  const [loading, setLoading] = useState(false);

  const { ossStore } = useAliyunOss();

  const uploadOss = async (r: any) => {
    const { file } = r;
    const { name, uid } = file;

    const urlArray = name.split('.');
    const suffix = urlArray[urlArray.length - 1];

    const fileHash = await calHash(file);

    try {
      const res = await ossStore.put(`emoj/test/${fileHash}.${suffix}`, file);
      const { url } = res;
      onChange([...value, { url, name, uid, status: 'success' }]);
      message.success(`${name}上传成功!`);
    } catch (error) {
      console.log(error);
    }
  };

  const _upload = async (r: any) => {
    if (value.length > 5) {
      message.error('最多同时上传 5 个文件!');
      return;
    }
    if (!loading) setLoading(true);
    try {
      await uploadOss(r);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadParams = {
    name: 'file',
    multiple,
    fileList: value,
    customRequest: _upload,
    beforeUpload(file: File) {
      const isLt5M = file.size / 1024 / 1024 > 10;
      if (isLt5M) {
        message.error('请选择小于10 mb 的文件');
        return false;
      }
      return true;
    },
    onRemove(e: any) {
      onChange(value.filter((item: any) => item.uid !== e.uid));
      return true;
    },
  };
  return (
    <Spin spinning={loading} tip="上传中...">
      <Upload {...uploadParams} {...restProps} listType="picture-card" className={styles.draggerBox}>
        +upload
      </Upload>
    </Spin>
  );
};

export default Index;
