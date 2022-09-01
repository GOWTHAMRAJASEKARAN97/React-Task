import React, { useState } from 'react'

const Test = () => {
  const [value, setValue] = useState('')

  const uploadImage = (e) => {
    setValue(URL.createObjectURL(e.target.files[0]))
    console.log(e.target.files[0])
  }

  return (
    <>
      <img src={value} alt="custom-pic" style={{ height: 50, width: 50 }} />
      <input type="file" onChange={uploadImage} />
    </>
  )
}

export default Test
