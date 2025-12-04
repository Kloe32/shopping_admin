import React,{useState} from 'react'
import ProductModal from '../components/ProductModal'

const Product = () => {
  const [isShowingForm, setisShowingForm] = useState(true)

  const handleFormClose = ()=>{
    setisShowingForm(false)
  }

  return <div className=''>
        Products 
      {
        isShowingForm && 
        <ProductModal 
          open={isShowingForm}
          onClose={handleFormClose}
        />
      }

  </div>
}

export default Product
