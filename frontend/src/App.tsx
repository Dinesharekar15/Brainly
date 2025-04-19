import { useState } from 'react'
import './App.css'
import {PluseIcon} from "./assets/Pluse"
import {Button} from "../src/components/ui/button"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button  starticon={<PluseIcon size='lg'/>} variant='secondary' size='lg' text='Add Content'/>
      <Button starticon={<PluseIcon size='lg'/>} variant='primary' size='md' text='Add Content'/>
    </>
  )
}

export default App
