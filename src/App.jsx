import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import WeddingInvitation from './components/WeddingInvitation'
import WeddingInvitation2 from './components/WeddingInvitation2'
import WeddingInvitation3 from './components/WeddingInviattion3'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <WeddingInvitation/>
    {/* <WeddingInvitation3/> */}
    {/* <WeddingInvitation2/> */}
    
    </>
  )
}

export default App
