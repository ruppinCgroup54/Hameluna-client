import React from 'react'

export default function AdminLayout({children}) {
    
    const layOutStyle={
        width:'100%'
    }


  return (
    <div style={{width}}>
        { children }
    </div>
  )
}
