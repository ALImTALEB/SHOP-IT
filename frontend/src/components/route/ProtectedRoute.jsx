import React, {  useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import { loadUser } from '../../actions/userActions'
import Loader from '../layout/Loader'

const ProtectedRoute = ({ children, isAdmin }) => {

  const { isAuthenticated, loading, user } = useSelector(state => state.auth)
  
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect ( () => {
        if(!user) {
            dispatch(loadUser())
        }
    }, [dispatch, isAuthenticated, loading, user] )
  
  if (loading) return <Loader />

  if ( !loading && isAuthenticated) {
    if( isAdmin === true && user.role !== 'admin' ) {
        return navigate('/')
    }
    return children
  } else {
    return navigate('/login')
  }

  
}

export default ProtectedRoute