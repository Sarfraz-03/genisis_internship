import { useState } from 'react'

import './App.css'

function App() {
  const [age, setAge] = useState(20)
  const [phone, setPhone] = useState(1234567890)

  return (
    <>
      <h1>
        hello hey how are you!!!!!!
      </h1>
      <h2> we have age vale is {age}</h2>
      <h2> we have phone vale is {phone}</h2>

    </>
  )
}

export default App
