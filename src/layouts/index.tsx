import { useLocation } from 'umi';
import { ConfigProvider, theme, Layout } from 'antd';
import React, { FC, useState } from 'react';
import { HomeLayout } from './home';
import { DefaultLayout } from './default';
import { NotFoundLayout } from './404';
import { TheFooter } from '@/components/TheFooter';
import { base } from '@theme-ui/preset-base';
import { ThemeProvider } from 'theme-ui';
import { useDark } from '@/hooks/useDark';
import { MDXProvider } from '@mdx-js/react';

const { darkAlgorithm, defaultAlgorithm } = theme;
const components = {
  // TODO: why the Layout and wrapper is not working
  Layout: (props: any) => <div {...props} style={{ color: 'red' }} />,
};

const Theme: FC<any> = (props) => {
  const { token } = theme.useToken();
  return (
    <ThemeProvider
      theme={{
        ...base,
        colors: {
          background: token.colorBgBase,
          //  what is muted for antd5 ???
          muted: token.colorText,
          primary: token.colorPrimary,
          // what is secondary for antd5 ???
          secondary: token.colorPrimary,
          text: token.colorText,
        },
      }}
    >
      <MDXProvider components={components}>{props.children}</MDXProvider>
    </ThemeProvider>
  );
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
      <Theme>
        <Layout
          hasSider={false}
          style={{
            height: '100%',
            margin: 0,
            padding: 0,
          }}
        >
          {layout}
          <Layout.Footer style={{ textAlign: 'center' }}>
            <TheFooter
              changeTheme={changeTheme}
              selectTheme={(color) => {
                setColorPrimary(color.hex);
              }}
            />
          </Layout.Footer>
        </Layout>
      </Theme>
    </ConfigProvider>
  );
};
