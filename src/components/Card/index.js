import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';

export const Card = ({
  name,
  imgUrl,
  cost,
  sneakerId,
  id,
  isLoading,
  addedToCart,
  addedToFavorite,
  onChangeItem,
}) => {
  const contentLoader = () => {
    return (
      <div>
        <ContentLoader
          speed={2}
          width={165}
          height={250}
          viewBox="0 0 165 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />5
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      </div>
    );
  };

  return (
    <div className={styles.card}>
      {isLoading ? (
        contentLoader()
      ) : (
        <>
          <div className={styles.favorite}>
            <img
              onClick={() => onChangeItem('favorite', { name, imgUrl, cost, sneakerId, id })}
              src={addedToFavorite ? '/img/liked.svg' : '/img/unliked.svg'}
              alt="unliked"
            />
          </div>
          <img width="100%" height={135} src={`/img/sneakers/${imgUrl}`} alt="Sneakers" />
          <h5> {name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена: </span>
              <b>{cost} руб.</b>
            </div>
            <img
              onClick={() => onChangeItem('cart', { name, imgUrl, cost, sneakerId, id })}
              className={styles.plus}
              src={addedToCart ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
              alt="plus"
            />
          </div>
        </>
      )}
    </div>
  );
};
