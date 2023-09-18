export default function HeaderBarProducts({ setSorting, sorting }) {
  function handleLatestProductsClick() {
    setSorting('-created');
  }
  function handlePopularProductsClick() {
    setSorting('-rating');
  }
  function handleLowPriceProductsClick() {
    setSorting('price');
  }
  function handleHighPriceProductsClick() {
    setSorting('-price');
  }

  return (
    <div className="header">
      <div className="sort-list">
        <a
          id="popular-products"
          className={sorting === '-created' ? 'active' : ''}
          onClick={handleLatestProductsClick}
        >
          Latest products
        </a>
        <a
          id="popular-products"
          className={sorting === '-rating' ? 'active' : ''}
          onClick={handlePopularProductsClick}
        >
          Popular products
        </a>
        <a
          id="low-price"
          className={sorting === 'price' ? 'active' : ''}
          onClick={handleLowPriceProductsClick}
        >
          Low price
        </a>
        <a
          id="high-price"
          className={sorting === '-price' ? 'active' : ''}
          onClick={handleHighPriceProductsClick}
        >
          High price
        </a>
      </div>
      <style jsx>{`
        .header {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: #ffffff;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
          border-radius: 6px;
          margin-bottom: 30px;
        }
        .header .sort-list {
          height: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .header .sort-list a {
          box-sizing: border-box;
          margin-left: 35px;
          padding-top: 18px;
          padding-bottom: 18px;
          text-decoration: none;
          font-weight: bold;
          font-size: 13px;
          text-align: center;
          color: #b3b3b3;
        }
        .header .sort-list a.active {
          color: #1875f0;
          border-bottom: 2px solid #1875f0;
        }
        .header .sort-list a:hover {
          cursor: pointer;
        }
        @media (max-width: 850px) {
          .header {
            width: 80vw;
            justify-content: center;
            align-items: center;
          }
          .header .sort-list {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-left: 24px;
            padding-right: 24px;
          }
          .header .sort-list a {
            font-size: 12px;
            margin-left: 0px;
          }
        }
      `}</style>
    </div>
  );
}
