import type { FC } from 'react';

import { Badge, Card, Col, Image, Row, Skeleton } from 'antd';
import Title from 'antd/es/typography/Title';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getDetails } from '@/api/content';
import { formatDate } from '@/utils/formatDate';
import { getImage } from '@/utils/getUrlImage';

const DocumentationPage: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState({ ...location.state?.payload, results: [] });

  const idTheamatic = location.state?.payload?.thematic;
  const idCategory = location.state?.payload?.category;

  const fetchContent = useCallback(async () => {
    const dataContents: any = await getDetails(idTheamatic, idCategory);

    if (dataContents) {
      setData(dataContents);
    }
  }, []);

  const onToRedirect = (url: string) => {
    const fileExtensions = ['.txt', '.docx', '.pdf', '.png', '.jpg', '.jpeg', '.gif'];

    if (!fileExtensions.includes(url.slice(-4))) {
      return window.open(url, '_blank');
    }

    window.open(`https://ll6zw4n2-3000.use2.devtunnels.ms${url}`, '_blank');
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, [data]);
  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <Row style={{ padding: '2rem', color: 'white' }}>
      <Col span={24} style={{ padding: '1rem 2rem' }}>
        <Title level={4}>{data.title}</Title>
        <hr />
        <div className="grid-card">
          {data.results.map((item: any, index: number) => {
            return loading ? (
              <div className="px-2" key={index}>
                <Card>
                  <Skeleton.Node style={{ width: '180px' }} active />
                  <Skeleton active paragraph={{ rows: 1 }}></Skeleton>
                </Card>
              </div>
            ) : (
              <Card
                className="mt-4"
                onClick={() => onToRedirect(item?.url)}
                style={{ objectFit: 'cover', cursor: 'pointer' }}
                cover={
                  <Image width="100%" height="220px" preview={false} alt="example" src={getImage(item?.url) || ''} />
                }
              >
                <Title className="mt-0" level={4}>
                  {item?.title}
                </Title>
              </Card>
            );
          })}
        </div>
      </Col>
    </Row>
  );
};

export default DocumentationPage;
