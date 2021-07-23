import styles from './Drawer.module.scss';

export const Drawer = ({ onClose, items, onRemove }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина{' '}
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="remove"
          />
        </h2>
        {items.length > 0 ? (
          <>
            <div className={styles.items}>
              {items &&
                items.map((item) => (
                  <div
                    key={`${item.sneakerId}`}
                    className={`${styles.cartItem} d-flex align-center mb-20`}>
                    <div
                      style={{ backgroundImage: `url(/img/sneakers/${item.imgUrl}` }}
                      className={`${styles.cartItemImg} mr-20`}></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{item.name}</p>
                      <b>{item.cost}</b>
                    </div>
                    <img
                      onClick={() => onRemove('cart', item)}
                      className={styles.removeBtn}
                      src="/img/btn-remove.svg"
                      alt="remove"
                    />
                  </div>
                ))}
            </div>
            <div className={styles.cartTotalBlock}>
              <ul>
                <li className="d-flex">
                  <span>Итого:</span>
                  <div></div>
                  <b>21 489 руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button className={styles.greenButton}>
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />{' '}
              </button>
            </div>
          </>
        ) : (
          <div
            className={`${styles.cartEmpty} d-flex align-center justify-center flex-column flex`}>
            <img className="mb-20" width={120} height={120} src="/img/empty-cart.jpg" alt="empty" />
            <h2>Корзина пуста</h2>
            <p className="opacity-6">Добавьте хотябы одну пару кросовок, чтобы сделать заказ</p>
            <button onClick={onClose} className={styles.greenButton}>
              <img src="/img/arrow.svg" alt="arrow" />
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
