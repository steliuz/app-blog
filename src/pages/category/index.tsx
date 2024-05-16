import type { CategoryParams } from '@/interface/category';
import type { RadioChangeEvent } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import { Button, Col, Form, Image, Input, Radio, Row, Space, Table, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Column from 'antd/es/table/Column';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { CategoryEnum } from '@/interface/category';
import { createCategory, deleteCategory, getCategory, updateCategory } from '@/stores/category.action';

const initialValues: CategoryParams = {
  name: '',
  type: CategoryEnum.images,
  imageUploaded: null,
};

const DocumentationPage: FC = () => {
  const [form] = useForm();
  const [, setValueRol] = useState('images');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editingRecord, setEditingRecord] = useState<CategoryParams | undefined>(undefined);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [editActive, setEditActive] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 40,
    total: 0,
  });

  const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
    setValueRol(value);
  };

  const onGetCategory = async (page: number, pageSize: number) => {
    const data: any = await dispatch(getCategory({ page, limit: pageSize }));

    if (!!data) {
      setAllCategory(data.results);
      setPagination({ ...pagination, current: page, total: data.totalResults });
    }
  };

  const onCreateCategory = async (vale: any) => {
    const data = vale;

    if (editActive) {
      onUpdateThematic({
        id: data?.id,
      });

      return;
    }

    if (editActive) {
      return;
    }

    const imageFile = fileList[0]?.originFileObj;

    if (imageFile) {
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('type', data.type);
      formData.append('imageUploaded', imageFile);

      const res = await dispatch(createCategory(formData));

      if (!!res) {
        onGetCategory(pagination.current, pagination.pageSize);
        form.resetFields();
        setFileList([]);
        setEditActive(false);
      }
    }
  };

  const startEditing = (record: any) => {
    setEditActive(true);

    const formValues: CategoryParams = { id: record.id, name: record.name, type: record.type, imageUploaded: null };

    setEditingRecord(formValues);

    setTimeout(() => {
      form.setFieldsValue(formValues);
    }, 0);

    form.setFieldsValue(formValues);
  };

  const onDeleteCategory = async (record: any) => {
    await dispatch(deleteCategory(record));

    onGetCategory(pagination.current, pagination.pageSize);
    setEditActive(false);
  };

  const onUpdateThematic = async (record: any) => {
    const data: any = await dispatch(updateCategory(record));

    if (!!data) {
      onGetCategory(pagination.current, pagination.pageSize);
    }
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;

    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();

        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }

    const image: HTMLImageElement = new (window as any).Image();

    image.src = src;
    const imgWindow = window.open(src);

    imgWindow?.document.write(image.outerHTML);
  };

  const handleTableChange = async (pagination: { current: number; pageSize: number; total: number }) => {
    const { current, pageSize } = pagination;

    onGetCategory(current, pageSize);
  };

  const getImage = (url: string) => {
    const isUrl = `http://localhost:3000${url}`;

    return isUrl;
  };

  useEffect(() => {
    form.resetFields();
    onGetCategory(pagination.current, pagination.pageSize);
  }, []);

  return (
    <div style={{ padding: '1rem 2rem' }}>
      <Row>
        <Col span={24}>
          <Form<CategoryParams> form={form} onFinish={onCreateCategory} initialValues={{ ...initialValues }}>
            <h2 className="my-0">Category</h2>
            <p className="mt-0">Manage the category.</p>
            <Row>
              <Col className="px-4" span={12}>
                <>
                  <label>Type</label>
                  <Form.Item
                    name="type"
                    className="form-inputs"
                    rules={[
                      {
                        required: true,
                        message: 'Please select one type!',
                      },
                    ]}
                  >
                    <Radio.Group buttonStyle="solid" onChange={onChange1}>
                      <Radio.Button value="images">Images</Radio.Button>
                      <Radio.Button value="videos">Videos</Radio.Button>
                      <Radio.Button value="documents">Documents</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </>
                <>
                  <label>Name</label>
                  <Form.Item name="name" className="form-inputs">
                    <Input type="text" size="large" />
                  </Form.Item>
                </>

                <Form.Item>
                  <button type="submit" className="btn-submit">
                    Save
                  </button>
                </Form.Item>
              </Col>
              <Col className="px-4" span={12}>
                <>
                  <label>Photo</label>
                  <Form.Item className="form-inputs" name="image">
                    <Upload listType="picture-card" fileList={fileList} onChange={onChange} onPreview={onPreview}>
                      {fileList.length < 1 && '+ Upload'}
                    </Upload>
                  </Form.Item>
                </>
              </Col>
            </Row>
          </Form>
        </Col>

        <Col span={24}>
          {allCategory && (
            <Table dataSource={allCategory} rowKey="id" pagination={pagination} onChange={() => handleTableChange}>
              <Column
                title="Image"
                dataIndex="coverImage"
                key="coverImage"
                render={(text, record: any) => (
                  <Image
                    src={getImage(record.imageUploaded)}
                    alt={record.name}
                    style={{ width: '50px', height: '50px' }}
                  />
                )}
              />
              <Column title="Name" dataIndex="name" key="name" />
              <Column title="Type" dataIndex="type" key="type" />
              <Column
                width={200}
                title="Action"
                key="action"
                render={(text, record) => (
                  <Space size="middle">
                    <Button type="primary" onClick={() => startEditing(record)}>
                      Editar
                    </Button>
                    <Button danger onClick={() => onDeleteCategory(record)}>
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

export default DocumentationPage;
