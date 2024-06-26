import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";

import AdoptersLayout from "../../../layouts/AdoptersLayout";
import { Button, TextField, Typography, styled } from "@mui/material";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Email } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import AlertComp from "../../../components/AlertComp";
import { Textinput } from "../../../components/Textinput";
import useAdoptersContext from "../../../utilis/useAdoptersContext";
import { AdopterContext } from "../../../context/AdoptersContext";
import { postFetch } from "../../../Data/Fetches";
import { getDatabase, ref, set } from "firebase/database";
import { adoptionRequestSchema } from "../../../Data/Schemas";
import { object } from "prop-types";

const formStyle = {
  backgroundColor: "rgba(255,255,255,0.5)",
  borderRadius: "20px",
  height: "fit-content",
  width: "clamp(300px,50vw,500px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  padding: "5%",
};


export default function SendRequest() {
  const { state } = useLocation();
  const { dog } = state;
  const { RemoveFromFavorites } = useContext(AdopterContext);
  let adopter = useLoaderData();
  console.log('adopter', adopter)
  const [Alert, setAlert] = useState({open:false,message:""});

  const navigate = useNavigate();
  adopter = typeof adopter === 'object' ? adopter : {}
  let defaultRequest = {
    requestId: -1,
    adopter: {
      ...adopter,
      "dateOfBirth": "",
      "houseMembers": "",
      "dogsPlace": "",
      "additionalPets": "",
      "experience": "",
      "note": "",
      address:null
    },
    sendate: new Date().toISOString(),
    status: 'pending',
    dog: dog,
  }

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: defaultRequest,
    resolver: zodResolver(adoptionRequestSchema),
  });

  const formSubmit = async (data) => {

    localStorage.setItem("adopter", data.adopter.phoneNumber);

    const sucPostRequest = (data) => {


      const db = getDatabase();
      set(ref(db, 'requests/' + dog.shelterNumber + '/' + data.requestId), data);

      RemoveFromFavorites({ numberId: dog.numberId });
      navigate(-1);


    }
    const errorPostRequest = (err) => {
      setAlert({open:true,message:err});
    }
    postFetch("AdoptionRequests", data, sucPostRequest, errorPostRequest)

  };

  useEffect(() => {
    console.log('errors', errors)
    console.log('watch', watch())
  })


  return (
    <AdoptersLayout>
      <form onSubmit={handleSubmit(formSubmit)} style={formStyle}>
        <Typography variant="body1" textAlign={"center"} fontWeight={900}>
          שלח לנו את הפרטים שלך לגבי <u>{dog.name}</u>
        </Typography>
        <Textinput
          size="small"
          // onBlur={fetchAdpterData}
          {...register("adopter.phoneNumber")}
          label="מספר פלאפון"
          error={!!errors.adopter?.phoneNumber}
          helperText={errors.adopter?.phoneNumber?.message}
        />
        <Textinput
          size="small"
          InputProps={{ ...register("adopter.firstName") }}
          label="שם פרטי"
          error={!!errors.adopter?.firstName}
          helperText={errors.adopter?.firstName?.message}
        />
        <Textinput
          size="small"
          {...register("adopter.lastName")}
          label="שם משפחה"
          error={!!errors.adopter?.lastName}
          helperText={errors.adopter?.lastName?.message}
        />

        <Textinput
          size="small"
          {...register("adopter.email")}
          label="אימייל"
          error={!!errors.adopter?.email}
          helperText={errors.adopter?.email?.message}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          endIcon={<Email fontSize="large" />}
        >
          שלח פרטים
        </Button>
        <AlertComp
          handleClose={() => setAlert({open:false})}
          isOpen={Alert.open}
          type="error"
          color="error"
          text={Alert.message}
        />
      </form>
    </AdoptersLayout>
  );
}
