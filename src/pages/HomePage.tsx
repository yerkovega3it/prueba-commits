import { useStoreAuth } from '@/stores'

export default function HomePage() {

  //Store auth
  const user = useStoreAuth(state => state.user)
  console.log('User in HomePage:', user)

  return (
    <div>
      HOME
    </div>
  )
}
