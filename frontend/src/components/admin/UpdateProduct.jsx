import React, {Fragment, useState ,useEffect} from 'react'
import Loader from '../layout/Loader'

import MetaData from '../layout/MetaData'
import { useNavigate, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'

import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, getProductDetails ,clearErrors } from '../../actions/productActions'
import Sidebar from './Sidebar'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'


const UpdateProduct = () => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState(0)
    const [seller, setSeller] = useState('')
    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const { error, product } = useSelector(state => state.getProductDetails)
    const { loading, error: updateError , isUpdated } = useSelector(state => state.product)

    const productId = params.id

    useEffect( () => {

        if(product && product._id !== productId) {
            dispatch(getProductDetails(productId) )
        } else {
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setCategory(product.category)
            setSeller(product.seller)
            setStock(product.stock)
            setOldImages(product.images)
        }

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if(updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }
  
        if(isUpdated) {
          navigate('/admin/products')
          alert.success('Product updated successfully')
          dispatch({ type: UPDATE_PRODUCT_RESET })
        }
    }, [dispatch, alert, error, isUpdated, updateError, productId, navigate, product] )

  return (
    <div>UpdateProduct</div>
  )
}

export default UpdateProduct