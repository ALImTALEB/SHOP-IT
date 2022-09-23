import React, {  useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import { loadUser } from '../../actions/userActions'
import Loader from '../layout/Loader'

const ProtectedRoute = ({ children, isAdmin }) => {

    const { isAuthenticated, loading = true , user } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    useEffect ( () => {
        if(!user) {
            dispatch(loadUser())
        }
    }, [dispatch, isAuthenticated, loading, user] )
  
  if (loading) return <Loader />

  if ( !loading && isAuthenticated) {
    if( isAdmin === true && user.role !== 'admin' ) {
        return <Navigate to="/" />
    }
    return children
  } else {
    return <Navigate to={"/login"} />
  }
  
}

export default ProtectedRoute