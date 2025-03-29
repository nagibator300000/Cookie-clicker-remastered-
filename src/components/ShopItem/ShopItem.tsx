import { getCharm } from '../../../data/items';
import { CharmsTypes } from '../../../schemas/itemTypes';
import { InventoryContent } from '..';
import useGameStore from '@/stores/game';

interface ShopItemProps {
  type: CharmsTypes;
}

export default function ShopItem({ type }: ShopItemProps) {
  const count = useGameStore((state) => state.count);
  const { price, ...charm } = getCharm(type);
  if (!price) {
    throw new Error('No price' + type);
  }
  return (
    <div className="shopItem">
      <InventoryContent
        type={type}
        id={type}
        {...charm}
        disabled={count < price}
      ></InventoryContent>
      <p className="price">{price}</p>
    </div>
  );
}
