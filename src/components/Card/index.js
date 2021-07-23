import styles from './Card.module.scss';

export const Card = ({
  name,
  imgUrl,
  cost,
  sneakerId,
  id,
  addedToCart,
  addedToFavorite,
  onChangeItem,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          onClick={() => onChangeItem('favorite', { name, imgUrl, cost, sneakerId, id })}
          src={addedToFavorite ? '/img/liked.svg' : '/img/heart.svg'}
          alt="unliked"
        />
      </div>
      <img width={133} height={112} src={`/img/sneakers/${imgUrl}`} alt="Sneakers" />
      <h5> {name}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена: </span>
          <b>{cost}</b>
        </div>
        <img
          onClick={() => onChangeItem('cart', { name, imgUrl, cost, sneakerId, id })}
          className={styles.plus}
          src={addedToCart ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt="plus"
        />
      </div>
    </div>
  );
};
