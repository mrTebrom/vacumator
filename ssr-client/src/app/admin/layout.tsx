'use client';
import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  PictureOutlined,
  PieChartOutlined,
  BoxPlotOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { http, ky } from '@/lib/ky';
import axios from 'axios';

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link href="/admin/promocode">Промокоды</Link>,
    '1',
    <PieChartOutlined />,
  ),
  getItem(<Link href="/admin/promo">Промо</Link>, '2', <DesktopOutlined />),
  getItem('Продукция', 'product', <BoxPlotOutlined />, [
    getItem(<Link href="/admin/attribute">Атрибуты</Link>, 'attribute'),
    getItem(<Link href="/admin/category">Категорий</Link>, 'category'),
    getItem(<Link href="/admin/product">Товары</Link>, 'goods'),
  ]),

  getItem(
    <Link href="/admin/slider">Слайдер</Link>,
    'slider',
    <PictureOutlined />,
  ),
];
const Admin = ({ children, item }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (pathname === '/admin') return;
    axios
      .post(
        'http://localhost:5000/api/auth/loading',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )
      .then((result) => {
        if (!result.data.status) router.push('/');
      })
      .catch((error) => {
        console.log(error);
        router.push('/');
      });
  }, [router]);

  if (pathname === '/admin') return children;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[item]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content>
          <div style={{ padding: 10 }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          vv ©{2024} Created by TECHTENG
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Admin;
