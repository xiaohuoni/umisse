import { useOutlet } from 'umi';

const DefaultLayout = () => {
  const outlet = useOutlet();
  return (
    <main
      style={{
        textAlign: 'center',
        padding: '40px 16px',
      }}
    >
      {outlet}
      [Default Layout]
    </main>
  );
};

export { DefaultLayout };
