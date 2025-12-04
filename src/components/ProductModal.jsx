import React, { useEffect, useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import productPlaceholder from "../assets/img/product_Placeholder.png"
import { fetchCategories } from '../services/category.service';
import { fetchUnits } from '../services/unit.services';

const ProductModal = () => {
    const [image, setImage] = useState(null)
    const [imagePreview,setImagePreview] =useState(null)
    const [showBtns,setShowBtns] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [units,setUnits] = useState([])
    const [brand,setBrand] =useState("")

    const onChangeImage = (file) => {
        if (!file) return
        const url = URL.createObjectURL(file)
        setImagePreview(url)
        setImage(file) 
    }
    const triggerFileOpen =()=>document.getElementById('image').click()

    const triggerBtns = () =>{
        if(imagePreview){
            setShowBtns(true)
        }
    }
    const handleFetchCategories = async ()=>{
        try {
            const response = await fetchCategories()
            if(response?.success){
                setCategories(response?.data)
            }  
        } catch (error) {
            console.log("Error Fetching Category")
        }
    }
    useEffect(()=>{
        handleFetchCategories()
    },[])

  return (
    <div className=''>
        {/* Upper Title */}
        <div className='flex p-4 items-center w-full gap-3 shadow-md'>
            <div className='w-fit rounded-xs flex justify-center items-center p-2 shadow-xs shadow-gray-500 cursor-pointer active:opacity-40 hover:bg-gray-200'>
                <IoMdArrowBack size={20}/>
            </div>
            <div>
                <p className='text-xs text-gray-500'>Back to List</p>
                <p className='text-lg font-semibold text-background'>Add New Product</p>
            </div>
        </div>

        {/* Middle Form Container */}
        <div className='p-5 flex gap-5 items-start bg-[#FAFAFA] h-screen'>
            {/* Image Form Box */}
            <div className='flex-1/3 border border-gray-50 bg-white rounded-md'>
                <h2 className='p-4 font-semibold text-lg mb-2 border-b border-gray-300'>Product Image</h2>
                <div className='p-4 flex flex-col gap-3'>
                    <p className={``}>Product Images</p>
                    <div className='relative w-full' 
                        onMouseEnter={triggerBtns}
                        onMouseLeave={()=>setShowBtns(false)}
                    >
                        <img id="uploaded" className="w-full rounded-xl" src={imagePreview ?? productPlaceholder} alt="" />
                        {
                            showBtns && 
                            <div className='absolute inset-0 bg-black/10 flex flex-col gap-4 items-center justify-center'>
                                <span className='cursor-pointer hover:bg-gray-300 active:opacity-30 bg-white px-5 py-2 rounded-lg text-primary'
                                    onClick={triggerFileOpen}
                                >Replace</span>
                                <span className='cursor-pointer hover:bg-gray-300 active:opacity-30 bg-white px-5 py-2 rounded-lg text-red-500'
                                    onClick={()=>{
                                        setImagePreview(null)
                                        setShowBtns(false)
                                    }}
                                >Remove</span>
                            </div>
                        }
                    </div>
                    <div className='p-3 border border-gray-300 rounded-sm flex items-center gap-4 hover:bg-gray-200 active:opacity-40 cursor-pointer mb-3'
                        onClick={triggerFileOpen}
                    >
                        <MdOutlineFileUpload size={20}/>
                        Upload Product Image
                    </div>
                    <input
                    type="file"
                    multiple={false}
                    accept="image/*"
                    name="image"
                    id="image"
                    className="hidden"
                    onChange={(e) => onChangeImage(e.target.files[0])}
                    />
                    
                </div>
            </div>
            {/* Details Form Box */}
            <div className='flex-2/3 border border-gray-50 bg-white rounded-md'>
                <h2 className='p-4 font-semibold text-lg mb-2 border-b border-gray-300'>General Information</h2>
                <form className='p-4 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Product Name</label>
                        <input className='p-3 border border-gray-200 rounded-md' type="text" placeholder='Enter prooduct name'/>
                    </div>
                    <div className='flex gap-4'>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="category">Category</label>
                            <select className='p-3 border border-gray-200 rounded-md' name="cateogry" 
                                value={selectedCategory}
                                onChange={(e)=>setSelectedCategory(e.target.value)}
                            >
                            <option value="" disabled>Choose Product Category</option>
                                {
                                    categories.length !== 0 
                                    ?
                                    categories.map((category,i)=>
                                        <option key={i} value={category?._id}>
                                            {category?.name}
                                        </option>
                                    )
                                    : null
                                }
                            </select>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label>Brand</label>
                            <select className='p-3 border border-gray-200 rounded-md' value={brand}>
                                <option value="" disabled>Select Brand</option>
                                <option value="Apple">Apple</option>
                                <option value="Samsung">Samsung</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='flex flex-col w-full gap-2'>
                            <label>Price</label>
                            <div className='p-3 flex items-center gap-2 border border-gray-200 rounded-md' >
                                SGD
                                <input type="text" placeholder='Price' className='outline-none' />             
                            </div>
                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <label>Discount <span className='text-sm text-gray-400'>(Optional)</span></label>
                            <input type="text" placeholder='Discount' className='p-3 border border-gray-200 rounded-md' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <label>Product Description</label>
                        <textarea className='p-3 border border-gray-200 rounded-md' placeholder='Write Product Description'></textarea>
                    </div>
                    <div className='flex gap-4'>
                        <div className='p-3 w-full text-center bg-gray-500 text-white rounded-md active:opacity-40 hover:bg-gray-500/70 cursor-pointer'>Cancel</div>
                        <button className='p-3 w-full text-center bg-primary text-white rounded-md active:opacity-40 hover:bg-primary/70 cursor-pointer'>Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ProductModal
