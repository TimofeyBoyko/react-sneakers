export const Info = ({ title, description, imgUrl, onClose }) => {
  return (
    <div className={`cart-empty d-flex align-center justify-center flex-column flex`}>
      <img className="mb-20" width={120} height={120} src={`${imgUrl}`} alt="empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => onClose(false)} className="greenButton">
        <img src="/img/arrow.svg" alt="arrow" />
        Вернуться назад
      </button>
    </div>
  );
};
