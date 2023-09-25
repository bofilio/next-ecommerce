import { isDrawerOpenVar } from '../../apollo/client/cache';
import { useStoreState } from '../../state/store';

import Logo from '../logo';
import OpenDrawerButton from './open-drawer-button';
import SideDrawer from './side-drawer';

export default function HeaderMobile({ viewer }) {
  const { sideDrowerOpen, toggleDrawer } = useStoreState((store) => ({
    toggleDrawer: store.toggleDrawer,
    sideDrowerOpen: store.sideDrowerOpen,
  }));

  return (
    <div className="header-mobile">
      <OpenDrawerButton openDrawer={toggleDrawer} />

      <SideDrawer closeDrawer={toggleDrawer} />

      <Logo />

      <style jsx>{`
        .header-mobile {
          display: flex;
          align-items: center;
          padding: 18px 48px;
        }
      `}</style>
    </div>
  );
}
