import { useLoaderData, useNavigate, useParams } from "react-router-dom";

import AdoptersLayout from "../../../layouts/AdoptersLayout";
import {
  Box,
  Button,
  TextField,
  Typography,
  colors,
  styled,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Email } from "@mui/icons-material";
import useFetch from "../../../utilis/useFetch";
import { useEffect, useState } from "react";

const StyledTextfield = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-notchedOutline": {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  "&:hover:not(.Mui-focused)": {
    "& .MuiOutlinedInput-notchedOutline": {
      border: `2.5px solid ${theme.palette.primary.main}`,
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
  },
  "& .MuiInputBase-root": {
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: "20px",

    "&:before": {
      borderBottom: "none",
      content: "none",
    },
  },
}));

const formStyle = {
  backgroundColor: "rgba(255,255,255,0.5)",
  width: "clamp(200px,80vh,500px)",
  borderRadius: "20px",
  height: "fit-content",
  width: "clamp(300px,50vw,500px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  padding: "5%",
};

const requestSchema = z.object({
  firstName: z
    .string()
    .regex(
      new RegExp("^[a-zA-Z\u0590-\u05FF\u200f\u200e ]+$"),
      "שם חייב להכיל אותיות בעברית או באנגלית"
    ),
  lastName: z
    .string()
    .regex(
      new RegExp("^[a-zA-Z\u0590-\u05FF\u200f\u200e ]+$"),
      "שם חייב להכיל אותיות בעברית או באנגלית"
    ),
  phoneNumber: z.string().regex(new RegExp("^05+[0-9]{8}$"), "מספר לא תקין"),
  email: z.string().email("אימייל לא תקין"),
});

export default function SendRequest() {
  const { dogId, dogName } = useParams();

  const navigate=useNavigate();

  const adopter = useLoaderData();

  console.log("adopter", adopter);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting ,isSubmitSuccessful},
  } = useForm({
    defaultValues: {
      ...adopter,
    },
    resolver: zodResolver(requestSchema),
  });

  const formSubmit = async (data) => {
    let request = {
      requestId: 0,
      dogId: 0,
      sendDate:new Date().toISOString(),
      status: "open",
      adopter: data,
    };

    localStorage.setItem('adopter',data.phoneNumber)

    await fetch(import.meta.env.VITE_APP_SERVERURL + "AdoptionRequests", {
      method: "POST",
      headers: { "Content-Type": "application/json","dataType": "json", },
      body: JSON.stringify(request) 
    })
  };


  useEffect(() => {
    isSubmitSuccessful&&navigate(-1)
  }, [isSubmitSuccessful])
  

  console.log("first", errors);
  return (
    <AdoptersLayout>
      <form onSubmit={handleSubmit(formSubmit)} style={formStyle}>
        <Typography variant="body1" textAlign={"center"} fontWeight={900}>
          שלח לנו את הפרטים שלך לגבי <u>{dogName}</u>
        </Typography>
        <StyledTextfield
          size="small"
          // onBlur={fetchAdpterData}
          {...register("phoneNumber")}
          label="מספר פלאפון"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />
        <StyledTextfield
          size="small"
          InputProps={{ ...register("firstName") }}
          label="שם פרטי"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <StyledTextfield
          size="small"
          {...register("lastName")}
          label="שם משפחה"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />

        <StyledTextfield
          size="small"
          {...register("email")}
          label="אימייל"
          error={!!errors.email}
          helperText={errors.email?.message}
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
      </form>
    </AdoptersLayout>
  );
}
