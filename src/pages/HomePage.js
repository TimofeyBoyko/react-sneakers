import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import { Drawer } from '../components/Drawer';
import { Card } from '../components/Card';

export const HomePage = ({ cartOpened, setCartOpened }) => {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const onChangeSerachInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onClearSearchValue = () => {
    setSearchValue('');
  };

  //checking the entry of item into cart or favorite lists
  const checkSneakerIn = (type, item) => {
    return type === 'cart'
      ? cartItems.some((obj) => obj.sneakerId === item.sneakerId)
      : favoriteItems.some((obj) => obj.sneakerId === item.sneakerId);
  };

  //get item id in cart or favorite lists
  const getIdInScheme = (type, sneakerId) => {
    return type === 'cart'
      ? cartItems.filter((obj) => obj.sneakerId === sneakerId)[0].id
      : favoriteItems.filter((obj) => obj.sneakerId === sneakerId)[0].id;
  };

  //add item from cart or favorite lists
  const addItemIn = async (type, item) => {
    try {
      await axios.post(`https://60f9305fee56ef0017975c7e.mockapi.io/${type}`, item);
      if (type === 'cart') {
        cartItems.length > 0 ? (item.id = +cartItems[cartItems.length - 1].id + 1) : (item.id = 1);
        setCartItems((prev) => [...prev, item]);
      }
      if (type === 'favorite') {
        favoriteItems.length > 0
          ? (item.id = +favoriteItems[favoriteItems.length - 1].id + 1)
          : (item.id = 1);
        setFavoriteItems((prev) => [...prev, item]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //remove item from cart or favorite lists
  const onRemoveItem = async (type, item) => {
    try {
      const id = getIdInScheme(type, item.sneakerId);
      await axios.delete(`https://60f9305fee56ef0017975c7e.mockapi.io/${type}/${id}`);
      type === 'cart'
        ? setCartItems((prev) => prev.filter((obj) => obj.sneakerId !== item.sneakerId))
        : setFavoriteItems((prev) => prev.filter((obj) => obj.sneakerId !== item.sneakerId));
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeItem = (type, item) => {
    !checkSneakerIn(type, item) ? addItemIn(type, item) : onRemoveItem(type, item);
  };

  //get data from server
  const getItems = useCallback(async () => {
    const sneakersData = await axios.get('https://60f9305fee56ef0017975c7e.mockapi.io/items');
    setItems(sneakersData.data);
    const cartData = await axios.get('https://60f9305fee56ef0017975c7e.mockapi.io/cart');
    setCartItems(cartData.data);
    const favoriteData = await axios.get('https://60f9305fee56ef0017975c7e.mockapi.io/favorite');
    setFavoriteItems(favoriteData.data);
  }, [setItems, setCartItems, setFavoriteItems]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <>
      {cartOpened && (
        <Drawer items={cartItems} onRemove={onChangeItem} onClose={() => setCartOpened(false)} />
      )}
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input onChange={onChangeSerachInput} value={searchValue} placeholder="Поиск..." />
            {searchValue && (
              <img
                onClick={onClearSearchValue}
                className="clear cu-p"
                src="/img/btn-remove.svg"
                alt="clear"
              />
            )}
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items &&
            items
              .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
              .map((item) => (
                <Card
                  key={`${item.sneakerId}`}
                  {...item}
                  addedToCart={checkSneakerIn('cart', item)}
                  addedToFavorite={checkSneakerIn('favorite', item)}
                  onChangeItem={onChangeItem}
                />
              ))}
        </div>
      </div>
    </>
  );
};
