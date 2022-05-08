/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import React from 'react';
import Nav from './Nav';
import Drawer from './Drawer';
import useSWR from 'swr';
import Copyright from '../Copyright';
import Loading from './Loading';

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Layout({ children }: any) {
  const { data, error } = useSWR('/api/getRows/admin!A3:Z24', fetcher);
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
  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <>
        <Nav toggleDrawer={toggleDrawer} />
        <Loading></Loading>
      </>
    );
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
