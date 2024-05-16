import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import { Col, Form, Input, Row, Select, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { postContent } from '@/api/content';
import { getCategory } from '@/stores/category.action';
import { getThematic } from '@/stores/thematic.action';

type Category = {
  label: string;
  value: string;
  type: string;
};

const initialValues = {
  name: '',
  type: '',
  thematic: '',
  url: '',
  imageUploaded: null,
};

const DocumentationPage: FC = () => {
  const [allThemtic, setAllThematic] = useState([]);
  const [allCategory, setAllCategory] = useState<Category[]>([]);
  const [form] = useForm();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categorySelect, setCategorySelect] = useState<Category | undefined>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [typeFile, setTypeFile] = useState<boolean | null>(null);
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 40,
    total: 0,
  });

  const onGetThematic = async () => {
    const data: any = await dispatch(getThematic({}));

    if (!!data) {
      const thematic = data.results.map((item: any) => {
        return {
          label: item.name,
          value: item.id,
        };
      });

      setAllThematic(thematic);
    }
  };

  const onCreateContent = async (value: any) => {
    const data = value;

    const imageFile = fileList[0]?.originFileObj;

    if (imageFile) {
      const formData = new FormData();

      formData.append('title', data.name);
      formData.append('category', data.type);
      formData.append('thematic', data.thematic);
      formData.append('imageUploaded', imageFile);

      const result = await postContent(formData);

      if (!!result) {
        setFileList([]);
        clearForm();
      }
    } else {
      await postContent({
        title: data.name,
        category: data.type,
        thematic: data.thematic,
        url: data.url,
      });

      setFileList([]);
      clearForm();
    }
  };

  const onGetCategory = async (page: number, pageSize: number) => {
    const data: any = await dispatch(getCategory({ page, limit: pageSize }));

    const category = data.results.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
        type: item.type,
      };
    });

    setAllCategory(category);
  };

  const handleCategoryChange = (value: string) => {
    const category = allCategory.find((item: Category) => item.value === value);

    category?.type == 'images' ? setTypeFile(true) : setTypeFile(false);

    // setCategorySelect(category);
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

  const clearForm = () => {
    form.resetFields();
  };

  useEffect(() => {
    onGetThematic();
    onGetCategory(pagination.current, pagination.pageSize);
  }, []);

  return (
    <div style={{ padding: '1rem 2rem' }}>
      <Row>
        <Col span={24}>
          <Title level={4} className="my-0">
            Category
          </Title>
          <Paragraph className="my-0">Manage the category.</Paragraph>
          <Form form={form} className="mt-4" onFinish={onCreateContent} initialValues={initialValues}>
            <>
              <label>Name</label>
              <Form.Item
                name="name"
                className="form-inputs"
                rules={[
                  {
                    required: true,
                    message: 'Please select one type!',
                  },
                ]}
              >
                <Input type="text" size="large" />
              </Form.Item>
            </>
            <>
              <label>Category</label>
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
                <Select
                  style={{ width: '100%' }}
                  onChange={handleCategoryChange}
                  options={allCategory}
                  value={categorySelect?.value}
                />
              </Form.Item>
            </>
            <>
              <label>Thematic</label>
              <Form.Item
                name="thematic"
                className="form-inputs"
                rules={[
                  {
                    required: true,
                    message: 'Please select one type!',
                  },
                ]}
              >
                <Select style={{ width: '100%' }} options={allThemtic} value={categorySelect?.value} />
              </Form.Item>
            </>

            {!typeFile ? (
              <>
                <label>Name</label>
                <Form.Item
                  name="url"
                  className="form-inputs"
                  rules={[
                    {
                      required: true,
                      message: 'Please select one type!',
                    },
                  ]}
                >
                  <Input type="text" size="large" />
                </Form.Item>
              </>
            ) : (
              <>
                <label>Photo</label>
                <Form.Item className="form-inputs" name="imageUploaded">
                  <Upload listType="picture-card" fileList={fileList} onChange={onChange} onPreview={onPreview}>
                    {fileList.length < 1 && '+ Upload'}
                  </Upload>
                </Form.Item>
              </>
            )}
            <Form.Item>
              <button type="submit" className="btn-submit">
                Save
              </button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default DocumentationPage;
