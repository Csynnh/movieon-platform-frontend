import { Input, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Menu from '../Menu/Menu';
import MenuTab from '../Menu/MenuTab';
import './styles.scss';
import useMoviesData from '@/api/listMoviesData';
import { Movie } from '@/api/type';
import { useNavigate } from 'react-router-dom';
const Search = () => {
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [movie, setMovie] = useState<Movie[]>([]);
  const movieData = useMoviesData({ limit: 1000 });
  const [selectValue, setSelectValue] = useState<string | null>(null);

  const searchRef = useRef<any>();
  useEffect(() => {
    if (movieData) {
      setMovie(movieData);
    }
  }, [movieData]);

  const handleClickMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const onSearch = async (value: string) => {
    await navigate(`/movie/${value}`);
    searchRef.current.blur();
    setSelectValue(null);
    await window.location.reload();
  };

  return (
    <div className={'search'}>
      <div className={'search-container'}>
        <div className='search-menu'>
          <Menu handle={handleClickMenu}></Menu>
          {isOpenMenu && <MenuTab></MenuTab>}
        </div>
        <Select
          ref={searchRef}
          value={selectValue}
          className={'search-field'}
          placeholder='Tìm phim tại đây'
          showSearch
          optionFilterProp='children'
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          onChange={(value: string) => {
            setSelectValue(value);
            onSearch(value);
          }}
          options={movie.map((item) => ({
            value: item._id,
            label: item.title,
          }))}
        />
      </div>
    </div>
  );
};

export default Search;
