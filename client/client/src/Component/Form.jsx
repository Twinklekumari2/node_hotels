import React from 'react'
import { useState } from 'react'
import axios from "axios"

const Form = () => {
    const [formData,setFormData] = useState({
      name:"",
      age:"",
      email:"",
      mobile:"",
      work:"",
      salary:"",
      address:""
    })

    function handleChange(e){
      setFormData({
        ...formData,
        [e.target.name]:e.target.value
      })
    }

    async function handleSubmit(e){
      e.preventDefault();
        try{
          const response = await axios.post("http://localhost:3000/person",formData);
          console.log(response.data)

        }catch(err){
          console.log(err);

        }
    }
    
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen bg-black '>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center border-2 border-amber-50 bg-white/10 backdrop-blur-md shadow-lg rounded-2xl w-[500px] h-[500px] gap-[20px] text-amber-50'>
        <div className='flex gap-4'>
         <label className='text-3xl font-mono '>Name:</label>
         <input type="text" name="name" value={formData.name} onChange={(e) => handleChange(e)} className='outline-none border rounded-2xl p-2' />
        </div>
        <div className='flex gap-4'>
         <label className='text-3xl font-mono '>Age:</label>
         <input type="number" name="age" value={formData.age} onChange={(e) => handleChange(e)} className='outline-none border rounded-2xl p-2 ' />
        </div>
        <div className='flex gap-4'>
         <label className='text-3xl font-mono '>Email:</label>
         <input type="email" name="email" value={formData.email} onChange={(e) => handleChange(e)} className='outline-none border rounded-2xl p-2' />
        </div>
        <div className='flex gap-4'>
         <label className='text-3xl font-mono '>Mobile:</label>
         <input type="number" name="mobile" value={formData.mobile} onChange={(e) => handleChange(e)} className='outline-none border rounded-2xl p-2' />
        </div>
        <div className='flex gap-4'>
         <label className='text-3xl font-mono '>Work:</label>
         <input type="text" name="work" value={formData.work} onChange={(e) => handleChange(e)} className='outline-none border rounded-2xl p-2' />
        </div>
        <div className='flex gap-4'>
         <label className='text-3xl font-mono '>address:</label>
         <input type="text" name="address" value={formData.address} onChange={(e) => handleChange(e)} className='outline-none border rounded-2xl p-2' />
        </div>
        <div className='flex gap-4'>
         <label className='text-3xl font-mono '>salary:</label>
         <input type="number" name="salary" value={formData.salary} onChange={(e) => handleChange(e)} className='outline-none border rounded-2xl p-2' />
        </div>
        
  <div className="text-2xl font-mono flex items-center gap-2">
    <input type="submit"  className='outline-none border rounded-2xl px-4 py-2' />
  </div>

      </form>
    </div>
  )
}

export default Form
