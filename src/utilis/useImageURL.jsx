import React from 'react'

export default function useImageURL(imagePath) {
  const imageBaseUrl = import.meta.env.VITE_APP_SERVERURL.replace('api/',"")

  return imageBaseUrl+imagePath;
}
