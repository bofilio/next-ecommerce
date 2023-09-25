import { useMemo, useState } from 'react';
import { useStoreState } from '../state/store';
import { useCreateOrder } from '../react-query/mutation_hooks';
import Input from './form/input';
import { useRouter } from 'next/router';

export default function FinishOrderCart() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const { cart, resetCart, user } = useStoreState((store) => ({ cart: store.cart, resetCart: store.resetCart, user: store.user }));
  const totalPrice = useMemo(() =>
    cart.reduce((count, item) => Math.round(count + item.product.price * item.qt), 0)
    , [cart]);
  const totalItems = useMemo(() =>
    cart.reduce((count, item) => count + item.qt, 0)
    , [cart]);
  const { mutate: createOrder, isLoading } = useCreateOrder()

  function handleFinishOrder() {

    createOrder(cart?.map(item => (
      {
        user: user?.id,
        qt: item.qt,
        product: item.product.id,
        phone: phone || (user?.phone ?? ""),
        status: "pending",
      }
    )), {
      onSuccess: () => {
        resetCart()
        router.push('/')
      }
    })

  }
  return (
    <div className="finishOrder">
      <div className="info">
        <p className="total">Total({totalItems} Item):</p>
        <p className="price">$ {totalPrice}</p>
      </div>
      {!user?.phone &&
        <div>
          <Input
            id='phone'
            type="phone"
            name="phone"
            placeholder="Phone Number"
            handleChange={(value: string) => setPhone(value)}
            value={phone ?? user?.phone}
          />
        </div>
      }

      <button onClick={handleFinishOrder}>Finish Order</button>

      <style jsx>{`
        .finishOrder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #ffff;
          border-radius: 6px;
          width: 280px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
          padding-top: 30px;
          padding-bottom: 30px;
        }
        .finishOrder .info {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-bottom: 30px;
        }
        .finishOrder .info p.total {
          font-weight: 500;
          font-size: 20px;
          color: #666666;
          padding-right: 8px;
        }
        .finishOrder .info p.price {
          font-weight: 900;
          font-size: 22px;
          color: #666666;
        }
        .finishOrder button {
          width: 220px;
          color: #fff;
          background: #808080;
          border-radius: 6px;
          border: none;
          padding-bottom: 16px;
          padding-top: 16px;
          font-weight: bold;
          font-size: 15px;
          transition: 0.7s;
          cursor:pointer;
        }
        .finishOrder button:focus {
          outline: none;
          opacity: 0.5;
        }
        @media (max-width: 1100px) {
          .finishOrder {
            flex-grow: 1;
            width: 100%;
            margin-bottom: 30px;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </div>
  );
}
