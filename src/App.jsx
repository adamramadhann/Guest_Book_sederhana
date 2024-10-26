import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainScren from './screen/MainScren'
import HandleDataQuest from './screen/HandleDataQuest'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainScren/>} />
      <Route path='/quest' element={<HandleDataQuest />} />
    </Routes>
  )
}

export default App