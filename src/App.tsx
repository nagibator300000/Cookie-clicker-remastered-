import styles from './App.module.scss'
import { useState } from 'react'
import {
  Game,
  Login,
  Account,
  Inventory,
  Avatar,
  Saving,
  Shop,
  NotificationsDisplay,
} from './components'
import useGameStats from './hooks/useGameStats'
import useUser from './hooks/useUser'
import { FetchError } from './utils'
import useInterval from './hooks/useInterval'
import useGameStore from './stores/game'

function App() {
  const gameStats = useGameStats()

  const { periodTime, autoClick } = useGameStore()

  const [isOpenProfile, setIsOpenProfile] = useState(false)

  const user = useUser()

  useInterval(() => {
    autoClick()
  }, periodTime * 1000)
  if (user.isLoading || gameStats.isLoading) {
    return (
      <div className={styles.load}>
        <div className={styles.loadAnim}></div>
      </div>
    )
  }
  if (user.error instanceof FetchError && user.error.status === 401) {
    return <Login></Login>
  }
  if (user.error || !user.data || gameStats.error) {
    console.log(gameStats.error)
    return (
      <div className={styles.oops}>
        <h1>Oops</h1>
        <h5>We've got some problems with backend</h5>
      </div>
    )
  }
  return (
    <div className={styles.clicker}>
      <div className={styles.inventoryHandler}>
        <Inventory></Inventory>
      </div>
      <Game></Game>
      <Shop></Shop>
      {isOpenProfile && (
        <Account
          url={user.data.picture}
          name={user.data.name}
          onClose={() => {
            setIsOpenProfile(false)
          }}
        />
      )}
      <button className={styles.account} onClick={() => setIsOpenProfile(true)}>
        Profile
        <Avatar img={user.data.picture} />
      </button>
      <NotificationsDisplay />
      <Saving isSaving={gameStats.isSaving} />
    </div>
  )
}

export default App
