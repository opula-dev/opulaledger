import { useEffect, useState } from "react";

type properties = {
  path: string;
  children: JSX.Element;
};

/**
 * @remarks Track changing of href to route to a different page element
 * https://github.com/ncoughlin/react-widgets/blob/master/src/components/Route.js
 */
const Route = (properties: properties) => {
  // state to track URL and force component to re-render on change
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // define callback as separate function so it can be removed later with cleanup function
    const onLocationChange = () => {
      // update path state to current window URL
      setCurrentPath(window.location.pathname);
    };

    // listen for popstate event
    window.addEventListener("silentNav", onLocationChange);

    // clean up event listener
    return () => {
      window.removeEventListener("silentNav", onLocationChange);
    };
  }, []);

  return currentPath === properties.path ? properties.children : <></>;
};

export default Route;
