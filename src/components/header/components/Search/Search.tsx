import { Input } from "antd";
import { useState } from "react";
import Menu from "../Menu/Menu";
import MenuTab from "../Menu/MenuTab";
import "./styles.scss";
const Search = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

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
        <Input.Search
          className={"search-field"}
          placeholder="Tìm phim tại đây"
          // onSearch={onSearch}
        />
      </div>
    </div>
  );
};

export default Search;
