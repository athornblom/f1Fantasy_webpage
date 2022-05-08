/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import React from 'react';
import Nav from './Nav';
import Drawer from './Drawer';
import useSWR from 'swr';
import Copyright from '../Copyright';
import Loading from './Loading';
import { sheetQuery } from '../utils/sheetQuery';

export async function getServerSideProps() {
  const data = await sheetQuery('admin', 'A3:Z24');
  console.log(data);
  return {
    notFound: data.length == 0 ? true : false,
    props: {
      data,
    },
  };
}

function Layout({ children, data }: any) {
  const [showDrawer, setDrawerState] = React.useState(false);

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerState(open);
  };
  return (
    <>
      <Nav toggleDrawer={toggleDrawer} />
      <Drawer data={data} showDrawer={showDrawer} toggleDrawer={toggleDrawer} />
      <main>{children}</main>
      <Copyright />
    </>
  );
}

export default Layout;
