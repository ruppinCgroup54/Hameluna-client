import { useDroppable } from '@dnd-kit/core';
import { Box } from '@mui/material';
import React from 'react'

export default function DropableCell({ children, cellId, capacity, dogsInCell, style }) {
    const { setNodeRef, over, isOver,active } = useDroppable({
        id: cellId.toString(),
        disabled: capacity === dogsInCell
    });
    
    return (
        <Box ref={setNodeRef}
            sx={{
                filter:(capacity === dogsInCell && active!==null ) &&'grayscale(100%)',
                 boxShadow:isOver &&  '0 0 5px 5px rgba(0, 255, 0, 0.8)',
                ...style
            }}
        >
            {children}
        </Box>
    )
}
