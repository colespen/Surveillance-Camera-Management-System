import React, { ReactNode } from "react";
import Navigator from "./Navigator";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Navigator />
    <div className="layout">{props.children}</div>
  </div>
);

export default Layout;
