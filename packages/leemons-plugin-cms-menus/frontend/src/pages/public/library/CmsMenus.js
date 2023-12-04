import React, { useEffect, useState } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';

function cleanPath(path) {
  return path.replace('//', '/');
}



const LibraryPage = () => {
  const { path } = useRouteMatch();
  const [showSideBar, setSideBar] = useState(true);
  const location = useLocation();
  const { pathname, search } = location;



  useEffect(() => {
    console.log(window.location.pathname, 'pathname');
    if (window.location.pathname.includes("/video")) {
      setSideBar(false);
    } else {
      setSideBar(true);
    }
  }, [window.location.pathname]);

  return (
    <>


    </>
  );
};

export default LibraryPage;
