import type { ContentType } from '@/interface/content';
import type { FC } from 'react';

import { Badge, Card, Col, Image, Row, Skeleton } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DocumentationPage: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(location.state?.payload);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <Row style={{ padding: '2rem', color: 'white' }}>
      <Col span={24} style={{ padding: '1rem 2rem' }}>
        <Title level={4}>{data.title}</Title>
        <hr />
        <div className="grid-card">
          {data?.data.content.map((category: ContentType, index: number) => {
            return loading ? (
              <div className="px-2">
                <Card>
                  <Skeleton.Node style={{ width: '180px' }} active />
                  <Skeleton active paragraph={{ rows: 1 }}></Skeleton>
                </Card>
              </div>
            ) : (
              <Badge.Ribbon text={`${category.date}`} color={'#1c84b5'}>
                <Card
                  className="mt-4"
                  key={index}
                  style={{ cursor: 'pointer' }}
                  cover={<Image alt="example" src={src} />}
                >
                  <Title className="mt-0" level={4}>
                    {category.title}
                  </Title>
                  <div className="flex-between">
                    <span style={{ fontSize: '12px' }}>{category.description}</span>
                  </div>
                </Card>
              </Badge.Ribbon>
            );
          })}
        </div>
      </Col>
    </Row>
  );
};

export default DocumentationPage;
