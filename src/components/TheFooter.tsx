import React, { FC, useState } from 'react';
import {
  Link,
  useIntl,
  Icon,
  setLocale,
  getAllLocales,
  getLocale,
  history,
} from 'umi';
import { Tooltip, theme, Modal, Popover } from 'antd';
import { SketchPicker, ColorResult } from 'react-color';

interface TheFooterProps {
  changeTheme: () => void;
  selectTheme: (color: ColorResult) => void;
}

const TheFooter: FC<TheFooterProps> = ({ changeTheme, selectTheme }) => {
  const intl = useIntl();
  const locales = getAllLocales();
  const locale = getLocale();
  const { token } = theme.useToken();
  const toggleLocales = () => {
    // change to some real logic
    setLocale(locales[(locales.indexOf(locale) + 1) % locales.length], false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // icons https://icones.js.org/
  return (
    <nav
      style={{ fontSize: '20px', marginTop: '20px', color: token.colorPrimary }}
    >
      <Tooltip
        title={intl.formatMessage({
          id: 'button.home',
        })}
      >
        <Link to="/" style={{ margin: '0 8px' }}>
          <Icon icon="grommet-icons:home" color={token.colorPrimary} />
        </Link>
      </Tooltip>
      <Tooltip
        title={intl.formatMessage({
          id: 'button.toggle_theme',
        })}
      >
        <Icon
          icon="grommet-icons:sun"
          onClick={changeTheme}
          style={{ margin: '0 8px' }}
        />
      </Tooltip>
      <Tooltip
        title={intl.formatMessage({
          id: 'button.toggle_langs',
        })}
      >
        <Icon
          icon="grommet-icons:language"
          onClick={toggleLocales}
          style={{ margin: '0 8px' }}
        />
      </Tooltip>
      <Tooltip
        title={intl.formatMessage({
          id: 'button.about',
        })}
      >
        <Icon
          icon="grommet-icons:contact"
          onClick={() => history.push('/about')}
          style={{ margin: '0 8px' }}
        />
      </Tooltip>
      <Tooltip title={'GitHub'}>
        <a
          rel="noreferrer"
          href="https://github.com/xiaohuoni/umisse"
          target="_blank"
          title="GitHub"
          style={{ margin: '0 8px' }}
        >
          <Icon icon="grommet-icons:github" color={token.colorPrimary} />
        </a>
      </Tooltip>
      <Tooltip
        title={intl.formatMessage({
          id: 'button.toggle_theme',
        })}
      >
        <Popover
          content={
            <SketchPicker
              color={token.colorPrimary}
              onChange={(color) => {
                selectTheme?.(color);
              }}
            />
          }
          title={intl.formatMessage({
            id: 'button.color_primary',
          })}
          trigger="click"
        >
          <Icon
            icon="grommet-icons:clear-option"
            onClick={showModal}
            style={{ margin: '0 8px' }}
          />
        </Popover>
      </Tooltip>
    </nav>
  );
};

export { TheFooter };
