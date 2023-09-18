import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import {
  FaCartArrowDown,
  FaCartPlus,
  FaRegHeart,
  FaHeart,
} from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import Page from '../../components/page';
import ErrorAlert from '../../components/alerts/error';
import { useMywishlist, useOneProduct } from '../../react-query/query_hooks';
import { useStoreState } from '../../state/store';
import LoadingPage from '../../components/loading-page';
import { useToggleWishList } from '../../react-query/mutation_hooks';
import { pb } from '../../pocketbase';
import Button from '../../components/form/button';
import { useMemo } from 'react';

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const cart = useStoreState(store => store.cart)
  const toggleCart = useStoreState(store => store.toggleCart)
  const { data: wishlist } = useMywishlist()
  const { mutate: toggleWishlist } = useToggleWishList(id as string)
  const { data: product, isLoading, isError } = useOneProduct(id as string);
  const imgs_urls = product ? product.images.map(img => pb.getFileUrl(product, img)) : null
  const InCart = useMemo(() => cart.map(prod => prod.id).includes(id as string), [cart.length])
  const InwishList = useMemo(() => wishlist?.map(prod => prod.id)?.includes(id as string), [wishlist?.length])


  if ((isError || !product) && !isLoading) {
    return (
      <Page title="BZ E-commerce - Products" description="">
        <ErrorAlert message="This product is not found!"></ErrorAlert>
      </Page>
    );
  } else if (isLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <Page title="BZ E-commerce - Products" description={""}>
      <article>
        <div className="top-buttons">
          <button
            className="add-wishlist"
            onClick={() => toggleWishlist(id as string)}
          >
            {InwishList ?
              <FaHeart size={20} color="#FFBFBF" />
              :
              <FaRegHeart size={20} color="#D8D8D8" />
            }
          </button>
        </div>

        <div className="product-img-box">
          {imgs_urls && <img className="product-img" src={imgs_urls[0]} />}
        </div>
        <div className='info-box'>
          <h1 className="product-name">{product.name}</h1>
          <div className="rating">
            <StarRatings
              rating={product.rating}
              starRatedColor="#F9AD3D"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="1px"
            />
          </div>
          <div className="price">
            <p className="price-value">${product.price}</p>
          </div>
          <div className="product-description" dangerouslySetInnerHTML={{ __html: product.description ?? "" }} />

          <div className='buttons-box'>
            <Button
              className="add-cart"
              title={InCart ? 'Remove' : 'Add'}
              onClick={() => toggleCart(product)}
              leftIcon={InCart ? <FaCartArrowDown size={18} /> : <FaCartPlus size={18} />}
              bg={InCart ? "#252B48" : undefined}
            />

            <Button
              className="add-cart"
              title={'Order Now'}
              bg="#F94C10"
            />
          </div>

        </div>







        <style jsx>{`
          article {
            position:relative;
            display: flex;
            flex-direction: row;
            box-sizing: border-box;
            height: 100%;
            width: 100%;
            padding: 24px;
            background: white;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
            border-radius: 6px;
          }
          .top-buttons {
            position:absolute;
            top:1rem;
            right:1rem;
          }
          .info-box{
            width:50%;
            padding:1rem;
          }
          .buttons-box{
            display:flex;
            gap:1rem;
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
            width:50%;
            display:flex;
            justify-content:center;
          }
          .product-img {
            width:90%;
            height: auto;
            object-fit: contain;
          }
          .product-name {
            line-height: 20px;
            text-decoration: none;
            font-weight: 600;
            font-size: 22px;
            color: #27005D;
            margin-bottom: 28px;
          }
          .product-description {
            line-height: 22px;
            text-decoration: none;
            font-weight: 400;
            font-size: 16px;
            color: #777777;
            margin-top: 18px;
            margin-bottom: 24px;
          }
          .rating {
            margin-bottom: 18px;
          }
          .price {
            display: flex;
            align-items: center;
            font-weight: 900;
            font-size: 20px;
            color: #27005D;
          }
          .price .add-cart {
            background: none;
            border: none;
            margin-left: 5px;
          }
          .price .add-cart:focus {
            outline: none;
          }
          @media (max-width: 1000px) {
            article{
              flex-direction:column;
              align-items:center;
            }
            .product-img {
              width: 225px;
              height: 180px;
              margin-bottom: 28px;
            }
            .product-name {
              width: 100%;
              line-height: 20px;
              text-decoration: none;
              font-weight: 600;
              font-size: 18px;
              text-align: center;
              color: #27005D;
              margin-bottom: 18px;
            }
            .price{
              display:block;
              text-align: center;
             }
             .rating {
              display:flex;
              justify-content:center;
              }
            .product-description {
              width: 100%;
              line-height: 22px;
              text-decoration: none;
              font-weight: 400;
              font-size: 16px;
              color: #777777;
              text-align: justify;
              margin-bottom: 18px;
            }
            .info-box{
              width:100%;
              padding:0;
            }
            .product-img-box {
              width:100%;
            }
          }
        `}</style>
      </article>
    </Page>
  );
}
