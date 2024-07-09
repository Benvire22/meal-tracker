import React from 'react';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <header></header>
      <main className="container-fluid">
        {children}
      </main>
    </>
  );
};

export default Layout;