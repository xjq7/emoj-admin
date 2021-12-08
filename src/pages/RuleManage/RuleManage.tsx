import React, {useEffect, useState} from 'react'
import {Table, Space, Button, Modal, Switch, Form, Radio, Input, Select, message, Popconfirm} from 'antd';
import {getRules, updateUserConfig, updateUser} from '~/services/user.service'
import './RuleManage.less'



type SizeType = Parameters<typeof Form>[0]['size'];


interface Values {
	title: string;
	description: string;
	modifier: string;
}

interface CollectionCreateFormProps {
	rule?: {
		id: number;
		name: string;
		desc: string;
		duration: number;
		max: number;
		is_valid: 1 | 0;
		type: 1 | 2 | 3;
		count: number
	} | null,
	visible: boolean;
	onCreate: (values: Values) => void;
	onCancel: () => void;
	onQueryData: () => void
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
	rule,
	visible,
	onCreate,
	onCancel,
	onQueryData
}) => {
	useEffect(() => {
		form.resetFields();
	})
	const [form] = Form.useForm();
	console.log('CollectionCreateForm rule', rule)
	const handleCancel = () => {
		form.resetFields();
		onCancel()
	}

	const typeEnum: any = {
		'github': 1,
		'微信': 2,
		'h5': 3
	}

	return (
		<Modal
			visible={visible}
			title={rule ? "编辑用户" : '新增用户'}
			okText="确认"
			cancelText="取消"
			onCancel={handleCancel}
			onOk={() => {
				form
					.validateFields()
					.then(values => {
						form.resetFields();
						console.log('values', values)
						onCreate(values);

						if (!rule) {
							message.warn('暂不支持新增用户，敬请期待～')
							return
						}
						updateUserConfig({
							id: rule?.id,
							name: rule.name,
							desc: rule.desc,
							type: typeEnum[values.type],
							duration: values.duration,
							count: values.count,
							is_valid: rule.is_valid
						}).then((res) => {
							message.success('更新成功')
							onQueryData()
						})

					})
					.catch(info => {
						console.log('Validate Failed:', info);
					});
			}}
		>
			{
				visible &&
				<Form
					form={form}
					layout="horizontal"
					name="form_in_modal"
					initialValues={{field: 'ip', type: rule ? rule.type === 2 ? 'github' : rule.type === 3 ? '微信' : 'h5' : '未知', duration: rule ? rule.duration : '', count: rule ? rule.count : ''}}
				>
					<Form.Item
						name="name"
						label="用户名"
						rules={[{required: true, message: '用户名不能为空!'}]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="desc"
						label="用户签名"
						rules={[{required: true, message: '用户签名不能为空!'}]}
					>
						<Input />
					</Form.Item>
				</Form>
			}
		</Modal>
	);
};


const RuleManage = () => {

	const [data, setData] = useState([])

	// 请求用户数据
	const queryData = () => {
		getRules().then((res: any) => {
			console.log('res', res)
			setData(res.rules)
		})
	}

	useEffect(() => {
		queryData()
	}, [])

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const [form] = Form.useForm();

	const handleOk = () => {
		setIsModalVisible(false);
		console.log('form', form)
		const value = form.getFieldsValue()
		console.log('value', value);

		form
			.validateFields()
			.then(values => {
				form.resetFields();
				onCreate(values);
			})
			.catch(info => {
				console.log('Validate Failed:', info);
			});
	};

	const [currentRule, setCurrentRule] = useState(null)

	const handleAddRule = () => {
		setCurrentRule(null)
		setVisible(true);
	}

	const handleEdit = (data: any) => {
		console.log('handleEdit', data)
		setCurrentRule(data)
		setVisible(true)
	}

	const [visible, setVisible] = useState(false);

	const onCreate = (values: any) => {
		console.log('Received values of form: ', values);
		setVisible(false);
	};

	const confirm = (record: any) => {
		if (!record.id) {
			message.error('数据异常，操作失败～')
			return
		}
		updateUser({
			id: record.id,
			is_valid: record.is_valid ? 0 : 1
		}).then((res) => {
			setData([])
			queryData()
		})
	}

	const columns = [
		{
			title: '用户名称',
			dataIndex: 'name',
			key: 'name',
			render: (text: string) => <a>{text}</a>,
		},
		{
			title: '签名',
			key: 'desc',
			render: (desc: string, record: any) => <a>
				{record.desc}
			</a>,
		},
		{
			title: '浏览时间',
			dataIndex: 'duration',
			key: 'duration',
			render: (duration: string, record: any) => <a>{duration}秒</a>,
		},
		{
			title: '浏览页面个数',
			dataIndex: 'count',
			key: 'count',
			render: (count: string) => <a>{count}</a>,
		},
		{
			title: '用户来源',
			dataIndex: 'type',
			key: 'type',
			render: (type: number) => <a>{
				type === 2 ? 'github' : type === 3 ? '微信' : type === 1 ? 'h5' : '未知'
			}</a>,
		},
		{
			title: '操作',
			key: 'action',
			render: (text: string, record: any) => (
				<Space size="middle">
					<a onClick={() => handleEdit(record)}>编辑</a>
					<Popconfirm
						title="确认要禁用该用户吗？"
						onConfirm={() => confirm(record)}
						okText="确认"
						cancelText="取消"
					>
						<Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={record.is_valid}
							disabled
						/>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div>
			<div className="action-area">
				<Button type="primary" onClick={handleAddRule}>新增用户</Button>
			</div>
			<Table columns={columns} dataSource={data} />

			<CollectionCreateForm
				rule={currentRule}
				visible={visible}
				onCreate={onCreate}
				onQueryData={queryData}
				onCancel={() => {
					setVisible(false);
				}}
			/>

		</div>
	)
}

export default RuleManage
