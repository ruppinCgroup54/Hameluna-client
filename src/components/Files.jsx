import React from 'react'

export default function Files() {

  const uploadFile = (e) => {
    e.preventDefault();
    // let data = e.currentTarget.stam.files
    const data = new FormData();

    const files= e.currentTarget.stam.files

    if(files.length){
      for (let i = 0; i < files.length; i++) {
        console.log('files[i]', files[i])
          data.append("images",files[i]);       
      }
    }
    console.log('data', data.get("images"))

    fetch(import.meta.env.VITE_APP_SERVERURL + 'Images/1', {
      method: "POST",
      body: data,368
    }).then((res) => {
      console.log('res', res)
      return res.json()
    }).then((data) => console.log('data', data))

    return false
  }

  return (
    <form onSubmit={uploadFile}>

      <input type="file" name="stam" id="stam" multiple={true} />

      <button>שלח</button>
    </form>
  )
}
