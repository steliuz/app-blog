import type { FC } from 'react';

import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Dropdown, Layout, theme as antTheme, Tooltip } from 'antd';
import { createElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Avator from '@/assets/header/avatar.png';
import { ReactComponent as MoonSvg } from '@/assets/header/moon.svg';
import { ReactComponent as SunSvg } from '@/assets/header/sun.svg';
import { LocaleFormatter, useLocale } from '@/locales';
import { setGlobalState } from '@/stores/global.store';

import { logoutAsync } from '../../stores/user.action';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { logged, device } = useSelector(state => state.user);

  const username = localStorage.getItem('username') ? JSON.parse(localStorage.getItem('username')!) : '';
  const { theme } = useSelector(state => state.global);
  const navigate = useNavigate();
  const token = antTheme.useToken();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return;
      case 'userSetting':
        return;
      case 'logout':
        const res = Boolean(await dispatch(logoutAsync()));

        res && navigate('/login');

        return;
    }
  };

  const toLogin = () => {
    navigate('/login');
  };

  const onChangeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', newTheme);
    dispatch(
      setGlobalState({
        theme: newTheme,
      }),
    );
  };

  return (
    <Header className="layout-page-header bg-2" style={{ backgroundColor: token.token.colorBgContainer }}>
      {device !== 'MOBILE' && (
        <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
          <img src="src/assets/logo/logoIcon.png" alt="" style={{ marginRight: collapsed ? '2px' : '20px' }} />
          <span style={{ fontWeight: 'bold', display: collapsed ? 'none' : 'block' }}>Bigbook</span>
        </div>
      )}
      <div className="layout-page-header-main">
        <div onClick={toggle}>
          <span id="sidebar-trigger">{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
        </div>
        <div className="actions">
          <Tooltip
            title={formatMessage({
              id: theme === 'dark' ? 'gloabal.tips.theme.lightTooltip' : 'gloabal.tips.theme.darkTooltip',
            })}
          >
            <span>
              {createElement(theme === 'dark' ? SunSvg : MoonSvg, {
                onClick: onChangeTheme,
              })}
            </span>
          </Tooltip>

          {logged ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    icon: <LogoutOutlined />,
                    label: (
                      <span onClick={() => onActionClick('logout')}>
                        <LocaleFormatter id="header.avator.logout" />
                      </span>
                    ),
                  },
                ],
              }}
            >
              <span className="user-action">
                <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{username.name}</span>
                <img src={Avator} className="user-avator" alt="avator" />
              </span>
            </Dropdown>
          ) : (
            <span style={{ cursor: 'pointer' }} onClick={toLogin}>
              {formatMessage({ id: 'gloabal.tips.login' })}
            </span>
          )}
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
