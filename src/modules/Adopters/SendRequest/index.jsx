import { useLoaderData, useNavigate, useParams } from "react-router-dom";

import AdoptersLayout from "../../../layouts/AdoptersLayout";
import { Button, TextField, Typography, styled } from "@mui/material";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Email } from "@mui/icons-material";
import { useEffect, useState } from "react";
import AlertComp from "../../../components/AlertComp";
import useAdoptersContext from "../../../utilis/useAdoptersContext";
import { Textinput } from "../../../components/Textinput";

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
  const { RemoveFromFavorites } = useAdoptersContext();
  const adopter = useLoaderData();

  const [Alert, setAlert] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      ...adopter,
    },
    resolver: zodResolver(requestSchema),
  });

  const formSubmit = async (data) => {
    let request = {
      requestId: 0,
      dogId: dogId,
      sendDate: new Date().toISOString(),
      status: "open",
      adopter: data,
    };

    localStorage.setItem("adopter", data.phoneNumber);

    await fetch(import.meta.env.VITE_APP_SERVERURL + "AdoptionRequests", {
      method: "POST",
      headers: { "Content-Type": "application/json", dataType: "json" },
      body: JSON.stringify(request),
    }).then((res) => {
      if (res.status === 409) {
        throw new Error(res.text());
      }
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      RemoveFromFavorites({ numberId: dogId });
      navigate(-1);
    }
  }, [isSubmitSuccessful]);

  const handleSubmitAndError = (e) => {
    handleSubmit(formSubmit)(e).catch((err) => {
      setAlert(true);
    });
  };

  return (
    <AdoptersLayout>
      <form onSubmit={handleSubmitAndError} style={formStyle}>
        <Typography variant="body1" textAlign={"center"} fontWeight={900}>
          שלח לנו את הפרטים שלך לגבי <u>{dogName}</u>
        </Typography>
        <Textinput
          size="small"
          // onBlur={fetchAdpterData}
          {...register("phoneNumber")}
          label="מספר פלאפון"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />
        <Textinput
          size="small"
          InputProps={{ ...register("firstName") }}
          label="שם פרטי"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <Textinput
          size="small"
          {...register("lastName")}
          label="שם משפחה"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />

        <Textinput
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
        <AlertComp
          handleClose={() => setAlert(false)}
          isOpen={Alert}
          type="error"
          color="error"
          text={"כבר שלחת בקשה על הכלב הזה, נווו...."}
        />
      </form>
    </AdoptersLayout>
  );
}
