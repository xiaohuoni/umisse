import React from 'react';
import type { FC } from 'react';
import { Form, Input, Button } from 'antd';
import { useIntl, FormattedMessage, history, Icon } from 'umi';

const HomePage: FC = () => {
  const onFinish = (values: any) => {
    history.push(`/hi/${values.username}`);
  };
  const intl = useIntl();
  return (
    <div>
      <Icon icon="local:logo" width="56" />
      <Icon
        icon="grommet-icons:add"
        width="25"
        height="25"
        style={{ margin: '10px' }}
      />
      <Icon icon="local:antd" width="56" height="56" />
      <h2>
        <a
          rel="noreferrer"
          href="https://github.com/xiaohuoni/umisse"
          target="_blank"
        >
          UMISSE
        </a>
      </h2>
      <p>
        <em>
          {intl.formatMessage({
            id: 'intro.desc',
          })}
        </em>
      </p>

      <Form
        name="basic"
        style={{
          maxWidth: 250,
          width: '100%',
          textAlign: 'center',
          margin: '0 auto',
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'intro.whats-your-name',
              }),
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage({
              id: 'intro.whats-your-name',
            })}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            <FormattedMessage id="button.go" />
          </Button>
        </Form.Item>
      </Form>
      <p>{Math.random()}</p>
    </div>
  );
};

export default HomePage;
