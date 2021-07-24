import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import { Drawer } from '../components/Drawer';
import { Card } from '../components/Card';

export const HomePage = ({ cartOpened, setCartOpened, showFavorite, setTotalCost, totalCost }) => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(undefined);

  const completeOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`https://60f9305fee56ef0017975c7e.mockapi.io/order`, {
        items: cartItems,
      });
      setIsOrderComplete(true);
      setOrderId(data.id);
      cartItems.forEach((item) => onRemoveItem('cart', item));
    } catch (e) {
      alert('Не удалось создать заказ :(');
    }
    setIsLoading(false);
  };

  //count total cost
  useEffect(() => {
    let cost = 0;
    cartItems.forEach((item) => (cost += Number(item.cost)));
    setTotalCost(cost);
  }, [cartItems]);

  const onChangeSerachInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onClearSearchValue = () => {
    setSearchValue('');
  };

  //checking the entry of item into cart or favorite lists
  const checkSneakerIn = (type, item) => {
    return item
      ? type === 'cart'
        ? cartItems.some((obj) => obj.sneakerId === item.sneakerId)
        : favoriteItems.some((obj) => obj.sneakerId === item.sneakerId)
      : false;
  };

  //get item id in cart or favorite lists
  const getIdInScheme = (type, sneakerId) => {
    return type === 'cart'
      ? cartItems.filter((obj) => obj.sneakerId === sneakerId)[0].id
      : favoriteItems.filter((obj) => obj.sneakerId === sneakerId)[0].id;
  };

  //this function is called when sneakers are added to cart or favorite lists
  const addItemIn = async (type, item) => {
    try {
      const { data } = await axios.post(
        `https://60f9305fee56ef0017975c7e.mockapi.io/${type}`,
        item,
      );
      type === 'cart'
        ? setCartItems((prev) => [...prev, data])
        : setFavoriteItems((prev) => [...prev, data]);
    } catch (e) {
      alert('Не удалось удалить кроссовки в список');
    }
  };

  //this function is called when sneakers are removed from cart or favorite lists
  const onRemoveItem = async (type, item) => {
    try {
      const id = getIdInScheme(type, item.sneakerId);
      await axios.delete(`https://60f9305fee56ef0017975c7e.mockapi.io/${type}/${id}`);
      type === 'cart'
        ? setCartItems((prev) => prev.filter((obj) => obj.sneakerId !== item.sneakerId))
        : setFavoriteItems((prev) => prev.filter((obj) => obj.sneakerId !== item.sneakerId));
    } catch (e) {
      alert('Не удалось удалить кроссовки из списка');
    }
  };

  //this function is called when adding or removing sneakers to lists
  const onChangeItem = (type, item) => {
    !checkSneakerIn(type, item) ? addItemIn(type, item) : onRemoveItem(type, item);
  };

  //get data from server
  const getItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const sneakersData = await axios.get('https://60f9305fee56ef0017975c7e.mockapi.io/items');
      const cartData = await axios.get('https://60f9305fee56ef0017975c7e.mockapi.io/cart');
      const favoriteData = await axios.get('https://60f9305fee56ef0017975c7e.mockapi.io/favorite');

      setIsLoading(false);
      setItems(sneakersData.data);
      setCartItems(cartData.data);
      setFavoriteItems(favoriteData.data);
    } catch (e) {
      console.log(e);
    }
  }, [setItems, setCartItems, setFavoriteItems]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  const renderItems = () => {
    const filteredItems = () =>
      items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

    return (isLoading ? [...Array(12)] : filteredItems()).map((item, index) => (
      <Card
        key={index}
        isLoading={isLoading}
        {...item}
        addedToCart={checkSneakerIn('cart', item)}
        addedToFavorite={checkSneakerIn('favorite', item)}
        onChangeItem={onChangeItem}
      />
    ));
  };

  return (
    <>
      {cartOpened && (
        <Drawer
          items={cartItems}
          totalCost={totalCost}
          onRemove={onChangeItem}
          onClose={() => setCartOpened(false)}
          isOrderComplete={isOrderComplete}
          setIsOrderComplete={() => setIsOrderComplete(false)}
          completeOrder={completeOrder}
          orderId={orderId}
          isLoading={isLoading}
        />
      )}
      <div className="content p-40">
        {showFavorite ? (
          <>
            <div className="d-flex align-center mb-40 justify-between">
              <h1>Мои закладки</h1>
            </div>
            <div className="d-flex flex-wrap">
              {favoriteItems &&
                favoriteItems.map((item) => (
                  <Card
                    key={`${item.sneakerId}`}
                    {...item}
                    addedToCart={checkSneakerIn('cart', item)}
                    addedToFavorite={checkSneakerIn('favorite', item)}
                    onChangeItem={onChangeItem}
                  />
                ))}
            </div>
          </>
        ) : (
          <>
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
            <div className="d-flex flex-wrap">{renderItems()}</div>
          </>
        )}
      </div>
    </>
  );
};
