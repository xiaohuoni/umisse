import React, { useEffect } from 'react';
import type { FC } from 'react';
import { useIntl, Icon, useParams, useModel, Link, history } from 'umi';
import { Button, theme } from 'antd';
import { Show } from '@alita/flow';

const UserIcon = () => {
  const { token } = theme.useToken();
  return (
    <Icon
      icon="grommet-icons:user"
      style={{ fontSize: '56px', color: token.colorPrimary }}
    />
  );
};

const HiPage: FC = () => {
  const intl = useIntl();
  const { index = '' } = useParams();
  const { setNewUser, users } = useModel('user');
  useEffect(() => {
    setNewUser(index);
  }, [index]);

  const otherUsers = Array.from(users).filter((name) => name !== index);

  return (
    <div>
      <UserIcon />
      <h2>
        {intl.formatMessage(
          {
            id: 'intro.hi',
          },
          { name: index },
        )}
      </h2>
      <p>
        <em>
          {intl.formatMessage({
            id: 'intro.dynamic-route',
          })}
        </em>
      </p>
      <Show when={otherUsers.length > 0}>
        <div>
          <span>
            {intl.formatMessage({
              id: 'intro.aka',
            })}
            :
          </span>
          {otherUsers.map((item) => {
            return (
              <p key={item}>
                <Link to={`/hi/${item}`}>{item}</Link>
              </p>
            );
          })}
        </div>
      </Show>
      <Button
        type="primary"
        style={{
          marginBottom: '32px',
        }}
        onClick={() => {
          history.push('/');
        }}
      >
        {intl.formatMessage({
          id: 'button.back',
        })}
      </Button>
      <p>{Math.random()}</p>
    </div>
  );
};

export default HiPage;
