import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
  

const HeaderScreen = () => {

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')  
  const [dataList, setDataList]  = useState([])
  const [dataMessasge, setDataMessage] = useState([])


  function handleFormDelete() {
    setName('')
    setAddress('')
    setMessage('')
  }


  async function handleSubmit(e) {
    e.preventDefault()

    const data =  { name, address, message }

    try {
      const response = await fetch("http://localhost:3000/api/guest/create/body", {
        method : 'POST',
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify(data)
      })
      const dataTes= await response.json()
      console.info(dataTes)

      setDataList(prev => [...prev, dataTes])

      handleFormDelete()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get('http://localhost:3000/api/quest?')
        setDataMessage(data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  },[])


  

  return (
    <div className={` w-full text-2xl flex flex-col items-center p-2  `}>
        <h1 className='text-center  text-pink-300 ' > Welcome Wedding A & K</h1>
        <div className='border-y-4 border-x-4 p-5 mt-10 ' >
            <img src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className='shadow-lg  rounded-sm' />
        </div>
        <div className={`h-[400px] bg-[#C4C4C4] flex items-end justify-center relative  w-[350px]`}> 
            <div className={`h-[300px] w-[287px] border-2 mb-3 text-center flex flex-col gap-3  `}>
                <h3 className='pt-9'> WEDDING CEREMONY </h3>
                <h2>A <br /> & <br /> K</h2>
                <p className={`text-[15px] `} >Monday, April 8th 2022 <br /> 07.00 PM  </p>
                <h2 className={`text-[22px] -mt-4`} >Kp. pitara No57, Depok</h2>
            </div>
            <div className={`w-[146px]  h-[54px] bg-[#909090] absolute top-[70px] rounded-sm shadow-md `}></div>
        </div> 
        <form className='h-[300px] w-[287px] border-2 mb-3 text-center flex flex-col gap-3 p-3 mt-5 ' onSubmit={handleSubmit} >
          <h1>Form Message</h1>
          
          <input 
          type="text" 
          placeholder='Nama Anda' 
          className='text-lg outline-none border p-2' 
          value={name}
          onChange={(e) => setName(e.target.value)} />

          <input 
          type="text" 
          placeholder='Masukan Alamat Anda' 
          className='text-lg outline-none border p-2' 
          value={address}
          onChange={(e) => setAddress(e.target.value)} />

          <textarea name="" id="" 
          placeholder='Masukan Pesan anda !!' 
          className='text-lg w-full h-36 outline-none border p-2' 
          value={message}
          onChange={(e) => setMessage(e.target.value)} />
          <button 
          type='submit' className='text-base px-5 py-1 bg-blue-500 text-white'  >
            Kirim Message
          </button>
        </form> 
        <div>
          {
            dataList.map((e, index) => (
              <h1>{e.name}</h1>
            ))
          }
        </div>
        <div>
          <h1 className='text-center mb-5 ' >Message Guest</h1>
            {
              dataMessasge.map((e) => (
                <div key={e.name} className='w-full h-20 border mb-5 p-2' >
                  <h1 className='text-lg' >{e.name}</h1>
                  <h4 className='' >{e.message}</h4>
                </div>
              ))
            }
        </div>
        <NavLink to={'/quest'} >Dashboard</NavLink>
    </div> 
  )
}

export default HeaderScreen