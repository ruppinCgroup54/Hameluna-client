import { Box, Skeleton } from '@mui/material'
import React from 'react'

export default function CellsSkeleton() {
  const arr = [1,2,3,4,5,6,7,8]
  return (
    < >
    {arr.map((i)=><Skeleton sx={{width:'20%', height:'160px', borderRadius:'10px'}} animation='wave' variant='rounded' key={i}/>)}
    </>
  )
}
