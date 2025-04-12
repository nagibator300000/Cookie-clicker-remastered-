import clsx from 'clsx';
import CONTENT_INFO, { CharmInfo } from '@data/items';
import { ShopItem } from '..';

type CharmShopProps = {
  isActive: boolean;
};
const INFO_ARRAY = CONTENT_INFO.filter(
  ({ name }) => name !== 'blocker'
) as CharmInfo[];

export default function CharmsShop({ isActive }: CharmShopProps) {
  return (
    <div className={clsx('charms_shop', isActive && 'active')}>
      <div className="row">
        {INFO_ARRAY.map(({ name }) => {
          return <ShopItem type={name} />;
        })}
      </div>
    </div>
  );
}
