import Link from 'next/link';
import {
  FaCartArrowDown,
  FaCartPlus,
  FaRegHeart,
  FaHeart,
} from 'react-icons/fa';

import StarRatings from 'react-star-ratings';
import { pb } from '../pocketbase';
import { ProductRecord } from '../react-query/types';
import { useStoreState } from '../state/store';
import { useToggleWishList } from '../react-query/mutation_hooks';

type Props = {
  data: ProductRecord
}
export default function ProductSection(props: Props) {
  const { id, name, rating, images, price } = props.data
  const { cart, toggleCart } = useStoreState(store => ({ cart: store.cart, toggleCart: store.toggleCart }))
  const user = useStoreState(store => store.user)
  const { mutate: toggleWishlist, isLoading } = useToggleWishList(props.data.id)
  const img_url = pb.getFileUrl(props.data, images[0])

  return (
    <article>
      <div className="top-buttons">
        <button className="add-wishlist" onClick={() => toggleWishlist(id)}>
          {user?.wishlist.includes(id) && (
            <FaHeart size={20} color="#FFBFBF" />
          )}
          {!user?.wishlist.includes(id) && (
            <FaRegHeart size={20} color="#D8D8D8" />
          )}
        </button>
      </div>

      <div className="product-img-box">
        <Link href={`/product/${id}`}>
          <img className="product-img" src={img_url} />
        </Link>
      </div>

      <Link href={`/product/${id}`}>
        <a className="product-name">{name}</a>
      </Link>

      <div className="rating">
        <StarRatings
          rating={rating}
          starRatedColor="#F9AD3D"
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="1px"
        />
      </div>

      <div className="price">
        <p className="price-value">${price}</p>
        {/* <button className="add-cart" onClick={() => toggleCart(props.data)}>
          {cart.map(prod => prod.id).includes(id) && (
            <FaCartArrowDown size={18} color="#EF9595" />
          )}
          {!cart.map(prod => prod.id).includes(id) && (
            <FaCartPlus size={18} color="#4682A9" />
          )}
          </button>*/}
      </div>

      <style jsx>{`
        article {
          display: flex;
          align-items: center;
          flex-direction: column;
          box-sizing: border-box;
          height: 100%;
          padding: 24px;
          background: white;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
          border-radius: 6px;
        }
        .top-buttons {
          margin-bottom: 24px;
          align-self: flex-end;
        }
        .top-buttons .add-wishlist {
          background: none;
          border: none;
          cursor:pointer;
        }
        .top-buttons .add-wishlist:focus {
          outline: none;
        }
        .product-img-box {
          margin-bottom: 28px;
          cursor:pointer;
        }
        .product-img {
          width: 225px;
          height: 160px;
          object-fit: contain;
        }
        .product-name {
          width: 80%;
          line-height: 20px;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          text-align: center;
          color: #666666;
          margin-bottom: 18px;
        }
        .product-name:hover {
          text-decoration: underline;
          font-weight: 600;
        }
        .rating {
          margin-bottom: 24px;
        }
        .price {
          display: flex;
          align-items: center;
          font-weight: 900;
          font-size: 16px;
          color: #666666;
        }
        .price .add-cart {
          background: none;
          border: none;
          margin-left: 5px;
          cursor:pointer;
        }
        .price .add-cart:focus {
          outline: none;
        }
      `}</style>
    </article>
  );
}
