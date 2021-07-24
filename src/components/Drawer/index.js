import styles from './Drawer.module.scss';
import { Info } from '../Info';

export const Drawer = ({
  onClose,
  items = [],
  onRemove,
  totalCost,
  isOrderComplete,
  setIsOrderComplete,
  completeOrder,
  orderId,
  isLoading,
}) => {
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
        {isOrderComplete ? (
          <Info
            title="Заказ оформлен"
            description={`Ваш заказ #${orderId} скоро будет перед курьерской службе`}
            imgUrl="/img/complete-order.jpg"
            onClose={() => {
              onClose();
              setIsOrderComplete();
            }}
          />
        ) : items.length > 0 ? (
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
                  <b>{totalCost} руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{+totalCost * 0.05}</b>
                </li>
              </ul>
              <button onClick={() => completeOrder()} className={styles.greenButton}>
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />{' '}
              </button>
            </div>
          </>
        ) : (
          <Info
            title="Корзина пуста"
            description="Добавьте хотябы одну пару кросовок, чтобы сделать заказ"
            imgUrl="/img/empty-cart.jpg"
            onClose={() => onClose()}
          />
        )}
      </div>
    </div>
  );
};
