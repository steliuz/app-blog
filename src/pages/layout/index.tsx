import type { MenuChild, MenuList } from '@/interface/layout/menu.interface';
import type { FC } from 'react';

import './index.less';

import { PlusOutlined } from '@ant-design/icons';
import { Drawer, FloatButton, Layout, theme as antTheme } from 'antd';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { getMe, getMenuList } from '@/api/layout.api';
import { setUserItem } from '@/stores/user.store';
import { getFirstPathCode } from '@/utils/getFirstPathCode';
import { getGlobalState } from '@/utils/getGloabal';

import { useGuide } from '../thematic/useGuide';
import HeaderComponent from './header';
import MenuComponent from './menu';

const { Sider, Content } = Layout;
const WIDTH = 992;

const LayoutPage: FC = () => {
  const location = useLocation();
  const [openKey, setOpenkey] = useState<string>();
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
  const [menuList, setMenuList] = useState<MenuList>([]);
  const { device, collapsed, newUser, logged } = useSelector(state => state.user);
  const token = antTheme.useToken();
  const navigate = useNavigate();

  const isMobile = device === 'MOBILE';
  const dispatch = useDispatch();
  const { driverStart } = useGuide();

  useEffect(() => {
    const code = getFirstPathCode(location.pathname);

    setOpenkey(code);
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const toggle = () => {
    dispatch(
      setUserItem({
        collapsed: !collapsed,
      }),
    );
  };

  const initMenuListAll = (menu: MenuList) => {
    const MenuListAll: MenuChild[] = [];

    menu.forEach(m => {
      if (!m?.children?.length) {
        MenuListAll.push(m);
      } else {
        m?.children.forEach(mu => {
          MenuListAll.push(mu);
        });
      }
    });

    return MenuListAll;
  };

  const fetchMenuList = useCallback(async () => {
    const { status, result } = await getMenuList();

    if (status) {
      setMenuList(result);
      dispatch(
        setUserItem({
          menuList: initMenuListAll(result),
        }),
      );
    }
  }, [dispatch]);
  const fetchMe = useCallback(async () => {
    await getMe();
  }, [dispatch]);

  useEffect(() => {
    if (!logged) {
      navigate({ pathname: '/login' });
    }
  }, []);

  useEffect(() => {
    if (logged) {
      fetchMenuList();
      fetchMe();
    }
  }, [logged]);

  useEffect(() => {
    window.onresize = () => {
      const { device } = getGlobalState();
      const rect = document.body.getBoundingClientRect();
      const needCollapse = rect.width < WIDTH;

      dispatch(
        setUserItem({
          device,
          collapsed: needCollapse,
        }),
      );
    };
  }, [dispatch]);

  useEffect(() => {
    newUser && driverStart();
  }, [newUser]);

  return (
    <Layout className="layout-page">
      <HeaderComponent collapsed={collapsed} toggle={toggle} />
      <Layout>
        {!isMobile ? (
          <Sider
            className="layout-page-sider"
            trigger={null}
            collapsible
            style={{ backgroundColor: token.token.colorBgContainer }}
            collapsedWidth={isMobile ? 0 : 80}
            collapsed={collapsed}
            breakpoint="md"
          >
            <MenuComponent
              menuList={menuList}
              openKey={openKey}
              onChangeOpenKey={k => setOpenkey(k)}
              selectedKey={selectedKey}
              onChangeSelectedKey={k => setSelectedKey(k)}
            />
          </Sider>
        ) : (
          <Drawer
            width="200"
            placement="left"
            bodyStyle={{ padding: 0, height: '100%' }}
            closable={false}
            onClose={toggle}
            open={!collapsed}
          >
            <MenuComponent
              menuList={menuList}
              openKey={openKey}
              onChangeOpenKey={k => setOpenkey(k)}
              selectedKey={selectedKey}
              onChangeSelectedKey={k => setSelectedKey(k)}
            />
          </Drawer>
        )}
        <Content className="layout-page-content">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
      <FloatButton type="primary" icon={<PlusOutlined />} onClick={() => navigate({ pathname: '/content' })} />
    </Layout>
  );
};

export default LayoutPage;
