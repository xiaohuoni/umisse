import { useOutlet, useIntl } from 'umi';
import { Button } from 'antd';

const NotFoundLayout = () => {
  const outlet = useOutlet();
  const intl = useIntl();
  return (
    <main
      style={{
        textAlign: 'center',
        padding: '40px 16px',
      }}
    >
      {outlet}
      <Button>
        {intl.formatMessage({
          id: 'button.back',
        })}
      </Button>
      [404 Layout]
    </main>
  );
};

export { NotFoundLayout };
