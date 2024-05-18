import React, { useEffect, useState } from 'react'
import BackgroundLayout from '../../layouts/BackgroundLayout'
import BackgroundImage from '../../assets/images/Layouts/LogIn.png'
import { FormStyle } from './components/ModalAddDog'
import { useForm } from 'react-hook-form'
import AdminForm from './components/AdminForm'
import ShelterForm from './components/ShelterForm'
import AddressForm from './components/AddressForm'


export default function Register() {

  const [admin, setAdmin] = useState();
  const [shelter, setShelter] = useState();

useEffect(() => {
  console.log('admin', admin);
  console.log('shelter', shelter);  
}, [admin,shelter])


  return (
    <BackgroundLayout image={BackgroundImage} dir={"col"} style={{justifyContent:"center"}} >

      <FormStyle >
        <AdminForm sendData={setAdmin} />
        <AddressForm/>

      </FormStyle>

    </BackgroundLayout>
  )
}
