import type { Permissions, ThematicParams } from '@/interface/Thematic';
import type { RadioChangeEvent } from 'antd';

import { Button, Col, Form, Input, Radio, Row, Space, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Column from 'antd/es/table/Column';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { createThematic, deleteThematic, getThematic, updateThematic } from '@/stores/thematic.action';

const initialValues: ThematicParams = {
  name: '',
  permissions: '',
};

const ThematicPage: FC = () => {
  const [form] = useForm();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editingRecord, setEditingRecord] = useState<ThematicParams>();
  const [editActive, setEditActive] = useState(false);
  const [allThemtic, setAllThematic] = useState([]);
  const [dataPermissions, setDataPermissions] = useState<Permissions>({
    videos: false,
    documents: false,
    images: true,
  });
  const dispatch = useDispatch();

  const onCreateThematic = async (form: ThematicParams) => {
    const data = form;

    data.permissions = dataPermissions;

    if (editActive) {
      onUpdateThematic({
        name: data.name,
        permissions: dataPermissions,
        id: editingRecord?.id,
      });

      return;
    }

    const res = await dispatch(createThematic(form));

    if (!!res) {
      onGetThematic();
      setEditActive(false);
      onReset();
    }
  };

  const onGetThematic = async () => {
    const data: any = await dispatch(getThematic({}));

    if (!!data) {
      setAllThematic(data.results);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
    const updatedPermissions = {
      videos: value == 'videos' ? true : false,
      documents: value == 'documents' ? true : false,
      images: value == 'images' ? true : false,
    };

    setDataPermissions(updatedPermissions);
  };

  const startEditing = (record: any) => {
    setEditActive(true);

    const formValues: ThematicParams = { id: record.id, name: record.name, permissions: '' };

    if (record.permissions) {
      for (const permission in record.permissions) {
        if (record.permissions[permission]) {
          formValues.permissions = permission;
          break;
        }
      }
    }

    setEditingRecord(formValues);
    form.setFieldsValue(formValues);
  };

  const onDeleteThematic = async (record: any) => {
    const data: any = await dispatch(deleteThematic(record));

    if (!!data) {
      onGetThematic();
      setEditActive(false);
    }
  };

  const onUpdateThematic = async (record: any) => {
    const data: any = await dispatch(updateThematic(record));

    if (!!data) {
      onGetThematic();
    }
  };

  useEffect(() => {
    onReset();
    onGetThematic();
  }, []);

  return (
    <div style={{ padding: '1rem 2rem' }}>
      <Row>
        <Col span={24}>
          <Form<ThematicParams> form={form} onFinish={onCreateThematic} initialValues={{ ...initialValues }}>
            <h2 className="my-0">Thematic</h2>
            <p className="mt-0">Manage the thematic.</p>
            <Row>
              <Col className="px-4" span={12}>
                <>
                  <label>Name</label>
                  <Form.Item
                    name="name"
                    className="form-inputs"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your name!',
                      },
                    ]}
                  >
                    <Input type="text" size="large" />
                  </Form.Item>
                </>
                <>
                  <label>Permissions</label>
                  <Form.Item
                    name="permissions"
                    className="form-inputs"
                    rules={[
                      {
                        required: true,
                        message: 'Please select one type!',
                      },
                    ]}
                  >
                    <Radio.Group buttonStyle="solid" onChange={onChange1}>
                      <Radio.Button value="images">Image</Radio.Button>
                      <Radio.Button value="videos">Video</Radio.Button>
                      <Radio.Button value="documents">Document</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </>
                <Form.Item>
                  <button type="submit" className="btn-submit">
                    Save
                  </button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={24}>
          {allThemtic && (
            // <Table dataSource={allThemtic} columns={columns} />
            <Table dataSource={allThemtic} rowKey="id">
              <Column title="Name" dataIndex="name" key="name" />
              <Column
                title="Images"
                dataIndex="permissions"
                key="permissions.images"
                render={permissions => (permissions.images ? 'Yes' : 'No')}
              />
              <Column
                title="Videos"
                dataIndex="permissions"
                key="permissions.videos"
                render={permissions => (permissions.videos ? 'Yes' : 'No')}
              />
              <Column
                title="Documents"
                dataIndex="permissions"
                key="permissions.documents"
                render={permissions => (permissions.documents ? 'Yes' : 'No')}
              />
              <Column
                width={200}
                title="Action"
                key="action"
                render={(text, record) => (
                  <Space size="middle">
                    <Button type="primary" onClick={() => startEditing(record)}>
                      Editar
                    </Button>
                    <Button danger onClick={() => onDeleteThematic(record)}>
                      Delete
                    </Button>
                  </Space>
                )}
              />
            </Table>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ThematicPage;
