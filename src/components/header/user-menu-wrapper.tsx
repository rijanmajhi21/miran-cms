import { getSession } from '@/app/(frontend)/(backend)/actions/auth'
import UserMenu from './user-menu'

export default async function UserMenuWrapper() {
  const user = await getSession()
  return <UserMenu user={user} />
}
