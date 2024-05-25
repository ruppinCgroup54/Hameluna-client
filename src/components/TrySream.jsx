import React, { useCallback, useEffect, useState } from 'react'


const GetData = async (setValue) => {
  const response = await fetch('https://localhost:7280/api/GPT/asyncsale');
  if (!response.ok)
    throw new Error(await response.text());

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let sentence = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }

    sentence += decoder.decode(value, { stream: true });

    setValue(sentence);
  };
}

export default function TrySream() {
  const [data, setData] = useState("");
  
useEffect(() => {
  GetData(setData)
}, [])

 
  return (
    <div>{data}</div>
  )
}
