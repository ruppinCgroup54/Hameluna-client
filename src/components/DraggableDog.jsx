import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material'
import React from 'react'

export default function DraggableDog({ children, dog }) {

    const { attributes, listeners, setNodeRef, transform, isDragging, active } = useDraggable({
        id: dog.numberId.toString(),
        data: {dog: dog},
    attributes:{
        activationConstraint:{
            delay: 250,
            tolerance: 5,
        }
    }
        
      
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };
    return (
        <Box ref={setNodeRef} style={style} {...listeners} {...attributes}
    
            sx={{
                visibility: active === null || isDragging ? 'visible' : 'collapse'
            }}>
            {children}
        </Box>
    )
}
