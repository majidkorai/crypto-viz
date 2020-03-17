import React, { useState } from "react";
import Store from "../src/stores";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import MenuRounded from "@material-ui/icons/MenuRounded";
import { Root, Header, Nav, Content, Footer, presets } from "mui-layout";
import Menu from "./components/shared/Menu";
import AppContent from "./components/shared/AppContent";
import { BrowserRouter } from "react-router-dom";
function App() {
  const baseTheme = createMuiTheme();
  const config = presets.createDefaultLayout();
  const [store] = useState(new Store());
  const [menuItems, setMenuItems] = useState([
    { text: "Home", route: "/" },
    { text: "About", route: "/about" }
  ]);

  return (
    <ThemeProvider theme={baseTheme}>
      <Root config={config}>
        <BrowserRouter>
          <Header
            renderMenuIcon={open => (open ? <ChevronLeft /> : <MenuRounded />)}
          >
            <div></div>
          </Header>
          <Nav
            renderIcon={collapsed =>
              collapsed ? <ChevronRight /> : <ChevronLeft />
            }
          >
            <Menu items={menuItems}></Menu>
          </Nav>
          <Content>
              <AppContent store={store} />
          </Content>
          <Footer>footer</Footer>
        </BrowserRouter>
      </Root>
    </ThemeProvider>
  );
}

export default App;
