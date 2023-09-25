import Link from 'next/link';
import SearchBox from '../search-box';
import { useStoreState } from '../../state/store';
import { GrClose, GrHome } from 'react-icons/gr'
import { IoIosCart } from 'react-icons/io'
import { BsHeart } from 'react-icons/bs'
import { AiOutlineLogin, AiOutlineUser } from 'react-icons/ai'
import { useRouter } from 'next/router';
import { useMywishlist } from '../../react-query/query_hooks';
import { useMemo } from 'react';
export default function SideDrawer({ closeDrawer }: { closeDrawer: () => void }) {
  const user = useStoreState(store => store.user)
  const isDrawerOpen = useStoreState((store) => store.sideDrowerOpen);
  const toggleDrawer = useStoreState((store) => store.toggleDrawer);
  const { data: wishlist } = useMywishlist()
  const cart = useStoreState(store => store.cart)
  const cartCount = cart.reduce((prev: number, curr) => curr.qt + prev, 0)
  const router = useRouter()
  function handleNavigation(href: string) {
    router.push(href)
    toggleDrawer()
  }
  const menu = useMemo(() => [
    {
      href: "/",
      label: "Home",
      Icon: GrHome
    },
    {
      href: "/cart",
      label: `Cart (${cartCount})`,
      Icon: IoIosCart
    },
    {
      href: "/wishlist",
      label: `Wishlist (${wishlist?.length ?? 0})`,
      Icon: BsHeart
    },

  ], [wishlist])
  return (

    <div
      className={`side-drawer ${isDrawerOpen ? 'show' : 'hide'}`}
      id="side-drawer"
    >
      <button className={`overlay ${isDrawerOpen ? 'show' : 'hide'}`} onClick={toggleDrawer} />
      <button className="close-drawer" onClick={closeDrawer}>
        <GrClose size={20} />
      </button>

      <div className="search">
        <SearchBox />
      </div>

      <ul className="items">
        {
          menu.map(item => (
            <li key={item.label} id="home" className="item">
              <a onClick={() => handleNavigation(item.href)}>
                <item.Icon size={18} />
                {item.label}
              </a>
            </li>
          ))
        }
        <li id="contact" className="item">
          {user ?
            <a onClick={() => handleNavigation("/user/profile")}>
              <AiOutlineUser size={18} />
              {user.name ?? user.email?.split('@')[0]}
            </a>
            :
            <a onClick={() => handleNavigation("/user/login")}>
              <AiOutlineLogin size={18} />
              Sign In
            </a>
          }
        </li>
      </ul>

      <style jsx>{`
        .overlay{
          position: absolute;
          z-index: 99;
          top: 0;
          right: -20vw;
          width: 20vw;
          height: 100vh;
          background: #00000020;
          border:none;
          display:none;
          cursor:pointer;
        }
        .overlay.show{
          display:block;
        }
        .side-drawer {
          display: flex;
          flex-direction: column;
          position: fixed;
          z-index: 999;
          top: 0;
          left: 0;
          width: 80vw;
          height: 100vh;
          background: #fff;
          box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.5);
          transform: translateX(-100%);
          transition: transform 0.3s ease-out;
        }
        .side-drawer.show {
          transform: translateX(0);
        }
        .side-drawer .search {
          padding-top: 1rem;
          width: 80%;
          align-self: center;
        }
        .side-drawer .items {
          padding-top: 3rem;
          box-sizing: border-box;
          width: 100%;
        }
        .side-drawer .items .item + .item {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #6666;
        }
        .item a{
          display:flex;
          align-items:center;
          gap:0.5rem;
        }
        .side-drawer .items .item a {
          padding-left: 4rem;
          color: #4d4d4d;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.2rem;
          transition: opacity 0.4s;
        }
        .side-drawer .items .item a:hover,
        .side-drawer .items .item a:active {
          opacity: 0.8;
        }
        .side-drawer .close-drawer {
          width: 100%;
          padding: 1.2rem 2rem;
          text-align: right;
          background: none;
          border: none;
          font-size: 1.8rem;
          font-weight: 500;
          color: #4d4d4d;
          transition: opacity 0.2s;
          cursor:pointer;
        }
        .side-drawer .close-drawer:hover {
          opacity: 0.8;
        }
        .side-drawer .close-drawer:focus {
          outline: none;
        }
      `}</style>
    </div>

  );
}

