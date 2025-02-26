import clsx from 'clsx'
import CONTENT_INFO, { CharmInfo } from '../../../data/items'
import InventoryContent from '../InventoryContent/InventoryContent'

type CharmShopProps = {
  isActive: boolean
}
const INFO_ARRAY = CONTENT_INFO.filter(
  ({ name }) => name !== 'blocker'
) as CharmInfo[]

export default function CharmsShop({ isActive }: CharmShopProps) {
  return (
    <div className={clsx('charms_shop', isActive && 'active')}>
      <div className="row">
        {INFO_ARRAY.map(({ name, ...data }) => {
          return <InventoryContent id={name} type={name} {...data.info} />
        })}
      </div>
    </div>
  )
}
