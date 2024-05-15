// eslint-disable-next-line simple-import-sort/imports
import type { FC } from 'react';

import './index.less';

import { Badge, Card, Col, Image, Row, Skeleton } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import Title from 'antd/es/typography/Title';

import { getThematic } from '@/api/content';

import type { ThematicType, CategoryType } from '@/interface/content';
import { useNavigate } from 'react-router-dom';

const DashBoardPage: FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState<ThematicType[]>([]);

  const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

  const fetchContent = useCallback(async () => {
    const { status, result } = await getThematic();

    if (status && result) {
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
  }, [fetchContent]);

  const goToDetail = (thematic: string, category: CategoryType) => {
    const payload = {
      title: thematic,
      data: category,
    };

    navigate('/details', { state: { payload } });
  };

  return (
    <>
      <Row>
        {data.map((thematic: ThematicType, index) => {
          return (
            <Col key={index} span={24} style={{ padding: '1rem 2rem' }}>
              <Title level={3}>{thematic.thematic}</Title>
              <hr />
              <div className="grid-card">
                {thematic.category.map((category: CategoryType, index) => {
                  return loading ? (
                    <div className="px-2">
                      <Card className="mt-4">
                        <Skeleton.Node style={{ width: '160px' }} active />
                        <Skeleton active paragraph={{ rows: 1 }}></Skeleton>
                      </Card>
                    </div>
                  ) : (
                    <Badge.Ribbon text={`Count: ${category.count}`} color={'#1c84b5'}>
                      <Card
                        className="mt-4"
                        key={index}
                        style={{ cursor: 'pointer' }}
                        onClick={() => goToDetail(thematic.thematic, category)}
                        cover={<Image preview={false} alt="example" src={src} />}
                      >
                        <Title className="mt-0" level={4}>
                          {category.name}
                        </Title>
                        <div className="flex-between">
                          <span style={{ fontSize: '10px' }}>{category.date}</span>
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
