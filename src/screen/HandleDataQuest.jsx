import axios from 'axios'
import React, { useEffect, useState } from 'react'


const HandleDataQuest = () => {

    const [data, setData] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [editData, setEditData] = useState({
        id : '',
        name : '',
        address : '',
        message : ''
    })


   useEffect(() => {
    const dataMap = async () => {
        try {
            const datanya = await axios.get('http://localhost:3000/api/quest?')
            setData(datanya.data)
        } catch (error) {
            console.log(error)
        }
    }
    dataMap()
   }, [])


   const handleDelete = async (id) => {
    const consf = window.confirm('yakin ingin mehapus data ini ??')
    if (consf) {
        try {
        await axios.delete(`http://localhost:3000/api/guest/delete/${id}`)
        setData(data.filter(items => items.id !== id))
        } catch (error) {
            console.error(error)
        }
    } else {
        return consf
    }
   }

   function handleClick(e) {
    if (e) {
        setEditData({
            id : e.id,
            name : e.name,
            address : e.address,
            message : e.message
        })
    }
    setOpenModal(prev => prev = !prev)
   }

   function handleChange(e) {
    const {name, value} = e.target
    setEditData({...editData, [name] : value}) 
   }





   async function handleEdit(e) {
    e.preventDefault()
    try {
        await axios.put(`http://localhost:3000/api/guest/update/${editData.id}`, editData)
        setData(prev => prev.map(item => item.id === editData.id ? editData : item))
        handleClick()
    } catch (error) {
        console.error(error)
    }
   }

   

  return ( 
    <div>
        <table className='w-full border ' >
            <thead>
                <tr className='text-white select-none' >
                    <th className='border bg-slate-500' >Id</th>
                    <th className='border bg-slate-500' >Name</th>
                    <th className='border bg-slate-500' >Address</th>
                    <th className='border bg-slate-500' >Message</th>
                    <th className='border bg-slate-500' >Action</th>
                </tr>
            </thead>
            <tbody className='h-10' >
                    {
                        data.map((e) => (
                            <tr>
                                <td className='border bg-slate-500 text-center ' >{e.id}</td>
                                <td className='border bg-slate-500 text-center' >{e.name}</td>
                                <td className='border bg-slate-500 text-center' >{e.address}</td>
                                <td className='border bg-slate-500 text-center' >{e.message}</td>
                                <td className='border bg-slate-500 text-center flex items-center gap-2 justify-between h-10 px-1  '>
                                    <button className='w-full border bg-red-500' onClick={() => handleDelete(e.id)} >Delte</button>
                                    <button className='w-full border bg-blue-500' onClick={() => handleClick(e)}  >Edit</button>
                                </td>
                            </tr>
                        ))
                    }
            </tbody>
        </table>
       {
        openModal && (
            <div className='absolute inset-0 top-0 w-screen h-screen  ' >
            <div className='bg-black top-0 absolute w-full h-full backdrop-blur-sm opacity-20 inset-0 ' ></div>
            <div className='flex items-center justify-center h-full flex-col'>
                <div className='w-[300px] h-[400px] z-50 relative flex flex-col items-center bg-white shadow-xl rounded-xl ' >
                    <h1 className='text-xl font-extrabold mt-5 mb-5 ' >Form Edit</h1>
                    <form className='z-50' onSubmit={handleEdit} >
                        <div className='flex flex-col mb-5 gap-2' >
                            <label htmlFor="name">Name :</label>
                            <input type="text" id='name' placeholder='Edit Name' name='name' className='border px-3 py-2 rounded-md' onChange={handleChange} value={editData.name}  />
                        </div>
                        <div className='flex flex-col mb-5 gap-2' >
                            <label htmlFor="address">address</label>
                            <input type="text" id='address' placeholder='Edit address' name='address' className='border px-3 py-2 rounded-md' onChange={handleChange} value={editData.address}  />
                        </div>
                        <div className='flex flex-col mb-5 gap-2' >
                            <label htmlFor="message">message</label>
                            <input type="text" id='message' placeholder='Edit message' name='message' className='border px-3 py-2 rounded-md' onChange={handleChange} value={editData.message} />
                        </div>
                        <button type='submit' >Save</button>
                    </form>
                </div>
            </div>
            <button className='absolute top-2 px-2 right-2 bg-red-500 text-white ' onClick={handleClick}  >close</button>
        </div>
        )
       }
    </div>
  )
}

export default HandleDataQuest