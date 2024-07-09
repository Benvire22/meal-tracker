import React from 'react';
import ToolBar from '../ToolBar/ToolBar';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <header className="mb-5">
        <ToolBar />
      </header>
      <main className="container-fluid">
        {children}
      </main>
    </>
  );
};

export default Layout;