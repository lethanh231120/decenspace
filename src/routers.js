import { Navigate, Outlet } from 'react-router-dom'
import { getCookie, STORAGEKEY } from './utils/storage'
import { useSelector } from 'react-redux'

export const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = Boolean(getCookie(STORAGEKEY.ACCESS_TOKEN))
  return isAuthenticated ? <Component /> : <Navigate to='/login' />
}

export const PublicRouter = ({ component: Component }) => {
  const isAuthenticated = Boolean(getCookie(STORAGEKEY.ACCESS_TOKEN))
  return isAuthenticated ? <Navigate to='/' /> : <Component />
}

export const checkPermission = (roles) => {
  const { user } = useSelector((state) => state.userInfo)
  return roles.includes(user.roles[0].title)
}

export const RoleRoute = ({ role }) => {
  const checkRole = checkPermission(role)
  return checkRole ? <Outlet /> : <Navigate to='/' />
}
