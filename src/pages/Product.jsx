import React,{useState} from 'react'
import ProductModal from '../components/ProductModal'

const Product = () => {
  const [isShowingForm, setisShowingForm] = useState(true)
  return <div className=''>

      {
        isShowingForm && 
        <ProductModal 

        />
      }

  </div>
}

export default Product
