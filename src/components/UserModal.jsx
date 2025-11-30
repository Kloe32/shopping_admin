import React, { useEffect,useState } from 'react'
import { getRoles } from '../services/role.service';
import { IoMdClose } from "react-icons/io";
import { addUser } from '../services/user.service';
import { toast } from 'react-toastify';

const UserModal = ({userData = null,isOpen,setShowForm,setUsers}) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password,setPassword] =useState("")
  const [Roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState(userData?.role?._id || "")
  
  const handleFetchRole =  async () =>{
    try {
      const response = await getRoles()
      if(response.success){
        setRoles(response.data)
      }
    } catch (error) {
      console.log("Error Fetching Roles")
    }
  }

  const closeModal = () =>{
    setName("")
    setEmail("")
    setPassword("")
    setShowForm(false)
  }
  useEffect(()=>{
    handleFetchRole()
  },[])

  const handleSubmit =  async() =>{

    if(name==="" || email ===""){
      return toast.info("Some Value missing!")
    }

    if(!userData || userData === null || userData=== undefined){
      try {
        const payload = {
          name:name,
          email:email,
          password:password,
          role:selectedRole
        }
        const response = await addUser(payload)
        if(response.success){
          toast.success("User Successfully Added")
          closeModal()
          if(!userData){
            setUsers(prev=>[...prev,response.data])
          }else{
            setUsers(prev =>prev.map(user => user._id ===userData?._id ? response.data : user))
          }
          
        }
      } catch (error) {
        console.log(error)
        toast.error("Something Went Wrong!")
      }
    }
  }

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50" onClick={()=>closeModal()}>
        <div className="bg-white rounded-2xl w-full max-w-md shadow-lg p-6 relative">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
              Add New User
          </h2>
          <form className='p-5 flex gap-5 flex-col'
            onClick={(e)=>{
              e.stopPropagation()
            }}
            onSubmit={(e)=>{
              e.preventDefault()
              handleSubmit()
            }}
          >
            <div className='flex items-center w-full justify-center mb-2'>              
              <img src="https://rztmbwyachdqkzksjcsu.supabase.co/storage/v1/object/public/user-profile/placeholder.jpg" alt="" 
                className='w-20 h-20 rounded-full'
                />
            </div>
            {/* <div className='flex items-center gap-20'>
              <img src="https://rztmbwyachdqkzksjcsu.supabase.co/storage/v1/object/public/user-profile/placeholder.jpg" alt="" 
              className='w-18 h-18 rounded-full'
              />
              <button className='px-4 py-3 rounded-full bg-primary text-white flex gap-3 justify-center items-center cursor-pointer hover:scale-105 transition-all active:opacity-65' onClick={()=>handleFileUploadClick()}><FaUpload size={18} />Upload Image</button>
              <input type="file" className='hidden' id='file'/>              
            </div> */}
            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className='border p-3 rounded-xl' placeholder='Enter User Full Name'/>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className='border p-3 rounded-xl' placeholder='Enter User Email' />
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className='border p-3 rounded-xl' placeholder='Enter User Password' />
              <select 
                className='border p-3 rounded-xl w-full'
                value={selectedRole}
                onChange={(e)=>setSelectedRole(e.target.value)}
              >            
                <option value="" disabled>Select User Role</option>
              {
                Roles.length !== 0 ? 
                    
                      Roles.map((role,i) => (
                        <option key={i} value={role._id}>
                          {role.name}
                        </option>
                      ))
                 : null
              }
              </select>
            <div className='flex gap-10 itens-center'>
              <button className='p-3 bg-gray-500 text-white rounded-lg cursor-pointer hover:scale-105 transition-all w-full' onClick={()=>closeModal()}>
                Cancel
              </button>
              <button type="submit" className='p-3 bg-primary text-white rounded-lg cursor-pointer hover:scale-105 transition-all w-full'>
                {userData? "Add User":"Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default UserModal