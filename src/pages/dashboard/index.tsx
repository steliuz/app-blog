import type { Content, DataContent } from '@/interface/content';
import type { FC } from 'react';

import './index.less';

import { Badge, Card, Col, Image, Row, Skeleton } from 'antd';
import Title from 'antd/es/typography/Title';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getThematicCategory } from '@/api/content';
import { formatDate } from '@/utils/formatDate';
import { getImage } from '@/utils/getUrlImage';

const DashBoardPage: FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState<DataContent>();

  const fetchContent = useCallback(async () => {
    const result: any = await getThematicCategory({});

    if (!!result) {
      setData(result);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    fetchContent();
  }, []);

  const goToDetail = (category: any, thematic: string) => {
    const payload = { thematic, category };

    const getToken = localStorage.getItem('token');

    getToken ? navigate('/details', { state: { payload } }) : navigate('/login');
  };

  return (
    <>
      <Row>
        {data?.contents?.map((item: Content, thematicIndex: any) => {
          return (
            <Col key={thematicIndex} span={24} style={{ padding: '1rem 2rem' }}>
              <Title level={3}>{item.thematic.name}</Title>
              <hr />
              <div className="grid-card">
                {item.categories.map((category: any, categoryIndex) => {
                  const uniqueKey = `${thematicIndex}-${categoryIndex}`;

                  return loading ? (
                    <div className="px-2" key={`loading-${categoryIndex}`}>
                      <Card className="mt-4">
                        <Skeleton.Node style={{ width: '160px' }} active />
                        <Skeleton active paragraph={{ rows: 1 }}></Skeleton>
                      </Card>
                    </div>
                  ) : (
                    <Badge.Ribbon text={`Count: ${category.count}`} color={'#1c84b5'} key={`ribbon-${uniqueKey}`}>
                      <Card
                        className="mt-4"
                        key={categoryIndex}
                        style={{ cursor: 'pointer' }}
                        onClick={() => goToDetail(category.category._id, item.thematic._id)}
                        cover={
                          <Image
                            style={{ objectFit: 'cover' }}
                            width="100%"
                            height="200px"
                            preview={false}
                            alt="example"
                            src={getImage(category.category?.imageUploaded)}
                          />
                        }
                      >
                        <Title className="mt-0" level={5}>
                          {category.category?.name || 'Name Category'}
                        </Title>
                        <div className="flex-between">
                          <span style={{ fontSize: '10px' }}>{formatDate(category.category?.createdAt)}</span>
                        </div>
                      </Card>
                    </Badge.Ribbon>
                  );
                })}
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default DashBoardPage;
