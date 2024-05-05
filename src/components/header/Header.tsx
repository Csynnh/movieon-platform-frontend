import { Tabs } from "@hilla/react-components/Tabs";
import { Tab } from "@hilla/react-components/Tab";
import { NavLink } from "react-router-dom";
// @ts-ignore
import Logo from "../../asset/icon/Logo.tsx";
import "./index.scss";
import Search from "../../components/header/Search";

const Header = (props: { hasSearch?: boolean }) => {
  return (
    <>
      <div className={"header"}>
        <header className=" header-container">
          <h1 slot="navbar" className={"header-logo"}>
            <NavLink to="/">
              <Logo />
            </NavLink>
          </h1>
          <Tabs
            slot="navbar"
            className="flex gap-s header-nav"
            theme={"equal-width-tabs"}
          >
            <Tab>
              <a href="#showtime">Phim</a>
            </Tab>
            <Tab>
              <NavLink to="/about">Thông tin rạp</NavLink>
            </Tab>
            <Tab>
              <NavLink to="/contact">Liên hệ</NavLink>
            </Tab>
          </Tabs>
        </header>
      </div>
      {props?.hasSearch && <Search />}
    </>
  );
};

export default Header;
