
import { useState, useEffect } from "react";

 const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};


function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = localStorage.getItem(key);
  return saved!=undefined ? JSON.parse(saved):defaultValue;
}


export default useLocalStorage;