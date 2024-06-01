import React, { useContext } from 'react'
import { AdopterContext } from '../context/AdoptersContext'

export default function useAdoptersContext() {
 return useContext(AdopterContext);
}
