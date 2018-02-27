import React from "react";
import { Menu } from "semantic-ui-react";

export default () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Menu.Item>Sample DApp</Menu.Item>
      <Menu.Menu position="right" />
    </Menu>
  );
};
