import { useLocation } from 'umi';
import { ConfigProvider, theme, Layout, App } from 'antd';
import React, { FC, useState } from 'react';
import { HomeLayout } from './home';
import { DefaultLayout } from './default';
import { NotFoundLayout } from './404';
import { TheFooter } from '@/components/TheFooter';
import { useDark } from '@/hooks/useDark';
import { MDXProvider } from '@mdx-js/react';

const { darkAlgorithm, defaultAlgorithm } = theme;
const components = {
  // TODO: why the Layout and wrapper is not working
  Layout: (props: any) => <div {...props} style={{ color: 'red' }} />,
};

export default () => {
  const { pathname } = useLocation();
  const [darkTheme, changeTheme] = useDark();
  const [colorPrimary, setColorPrimary] = useState<any>();
  let layout = <DefaultLayout />;
  switch (pathname) {
    case '/':
      layout = <HomeLayout />;
      break;
    case '/404':
      layout = <NotFoundLayout />;
      break;
    default:
      break;
  }
  return (
    <ConfigProvider
      theme={{
        algorithm: [darkTheme ? darkAlgorithm : defaultAlgorithm],
        // colorInfo is colorPrimary for antd@4
        token: !!colorPrimary ? { colorPrimary, colorInfo: colorPrimary } : {},
      }}
    >
      <App>
        <Layout
          hasSider={false}
          style={{
            height: '100vh',
            margin: 0,
            padding: 0,
          }}
        >
          <MDXProvider components={components}>{layout}</MDXProvider>
          <Layout.Footer style={{ textAlign: 'center' }}>
            <TheFooter
              changeTheme={changeTheme}
              selectTheme={(color) => {
                setColorPrimary(color.hex);
              }}
            />
          </Layout.Footer>
        </Layout>
      </App>
    </ConfigProvider>
  );
};
