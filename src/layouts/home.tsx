import { useOutlet } from 'umi';
import React from 'react';

const HomeLayout = () => {
  const outlet = useOutlet();
  return (
    <main
      style={{
        textAlign: 'center',
        padding: '40px 16px',
      }}
    >
      {outlet}
      [Home Layout]
    </main>
  );
};

export { HomeLayout };
