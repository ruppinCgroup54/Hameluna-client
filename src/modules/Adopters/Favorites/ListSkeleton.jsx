import { Skeleton } from "@mui/material";

export default function ListSkeleton() {
  return (
    [0,1,2].map((i)=> <Skeleton variant='rounded'  key={i} sx={{
      bgcolor:"primary.light",
    width: "clamp(200px,90vw,400px)",
      height: "200px",
      borderRadius:"15px",
      margin:2,
      padding:0
    }} />
)
    
  )
}
