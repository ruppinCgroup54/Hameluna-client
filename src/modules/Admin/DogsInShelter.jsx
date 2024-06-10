import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export default function DogsInShelter() {


  return (
    <>
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  )
}
