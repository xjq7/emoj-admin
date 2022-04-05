import { useState, useMemo } from 'react';
import { Select, SelectProps } from 'antd';
import { getEmojGroupList, GetEmojListBody } from '@services/emoj';
import _ from 'lodash';

interface Props extends SelectProps<any> {}

const SelectEmojGroup = function (props: Props) {
  const [fetchEmojGroupLoading, setFetchEmojGroupLoading] = useState(false);
  const [emojGroupsOptions, setEmojGroupsOptions] = useState<{ label?: string; value?: number }[]>([]);
  const handleEmojGroupSearch = useMemo(() => {
    const fetchEmojGroup = async (value: string) => {
      if (!value) return;
      try {
        setFetchEmojGroupLoading(true);
        const params: GetEmojListBody = { page: 1, pageSize: 100000 };
        if (value) params.name = value;
        const { data } = await getEmojGroupList(params);
        const { list = [] } = data || {};
        setEmojGroupsOptions(list.map(({ name, id }) => ({ label: name, value: id })));
      } catch (error) {
      } finally {
        setFetchEmojGroupLoading(false);
      }
    };
    return _.debounce(fetchEmojGroup, 1000);
  }, [getEmojGroupList]);

  return (
    <Select
      style={{ width: 200 }}
      allowClear
      showSearch
      filterOption={false}
      onSearch={handleEmojGroupSearch}
      loading={fetchEmojGroupLoading}
      placeholder="请选择关联分组"
      options={emojGroupsOptions as any}
      {...props}
    />
  );
};

export default SelectEmojGroup;
