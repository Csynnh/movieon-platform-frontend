import { Icon } from "@hilla/react-components/Icon";
import { TextField } from "@hilla/react-components/TextField";
import UserPropType from "../../components/header/User";
import { useState } from "react";
import Menu from "./Menu";
import MenuTab from "./MenuTab";

const Search = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  // const [countClick, setCountClick] = useState(1);
  // const handleClickMenu = () => {
  //   setCountClick(countClick + 1);
  //   console.log("countClick :>> ", countClick);
  //   if (countClick % 2 != 0) {
  //     setIsOpenMenu(true);
  //   } else {
  //     setIsOpenMenu(false);
  //   }
  // };\
  const handleClickMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  return (
    <div className={"search"}>
      <div className={"search-container"}>
        <div className="search-menu">
          <Menu handle={handleClickMenu}></Menu>
          {isOpenMenu && <MenuTab></MenuTab>}
        </div>
        <TextField
          placeholder={"Search"}
          onChange={(e) => console.log(e.target.value)}
          className={"search-field"}
          color={"secondary"}
        >
          <Icon slot="suffix" icon="vaadin:search" />
        </TextField>
        <UserPropType />
      </div>
    </div>
  );
};

export default Search;
