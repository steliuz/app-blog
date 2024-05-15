import type { FC } from 'react';

import { Col, Form, Input, Row } from 'antd';

const DocumentationPage: FC = () => {
  return (
    <div style={{ padding: '1rem 2rem' }}>
      <Row>
        <Col span={24}>
          <Form>
            <h2 className="my-0">Hellow Again!</h2>
            <p className="mt-0">Welcome back you've been missed!</p>
            <Row>
              <Col span={12}>
                <Form.Item className="form-inputs" name="email">
                  <>
                    <label>Email</label>
                    <Input type="text" size="large" />
                  </>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default DocumentationPage;
