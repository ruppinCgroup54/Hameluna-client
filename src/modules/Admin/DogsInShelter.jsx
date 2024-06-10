import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import BackgroundLayout from '../../layouts/BackgroundLayout'

export default function DogsInShelter() {


  return (
    <>
      <Suspense>
        <BackgroundLayout style={{alignItems:'start'}}>

          <Outlet />
        </BackgroundLayout>
      </Suspense>
    </>
  )
}
