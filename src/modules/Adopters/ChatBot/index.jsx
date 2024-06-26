import { useState } from "react";
import { Textinput } from "../../../components/Textinput";
import AdoptersLayout from "../../../layouts/AdoptersLayout";
import { Button, Paper } from "@mui/material";
import NewMessage from "./NewMessage";
import MessagesBox from "./MessagesBox";
import { Link, useLoaderData } from "react-router-dom";
import useLocalStorage from "../../../utilis/useLocalStorge";
import AlertComp from "../../../components/AlertComp";

// const mess = [
//   { "role": "assistant", "content": "היי, אני דוגי ואני כאן כדי לעזור לך למצוא את הכלב המושלם. אז שנתחיל? תספר לי קצת עליך ועל מי שגר איתך... " },
//   { "role": "user", "content": "אני סטונדט להנדסה, גר במרתף עם בת זוג" },
//   { "role": "assistant", "content": "אוקי מעולה, עכשיו אשמח לדעת כמה זמן הכלב יהיה לבד בבית?" },
//   { "role": "user", "content": "הכלב יהיה כ-6 שעות לבד" },
//   { "role": "assistant", "content": "אוקי מעולה, עכשיו אשמח לדעת כמה פעמים תוכל לקחת אותו לטיול?" },
//   { "role": "user", "content": " פעמיים ביום" },

// ]


export default function ChatBot() {

  let mess = [{
    "role": "assistant",
    "content": `
    היי אני דוגבוט ואני הולך למצוא לך את הכלב המושלם!
    ספר לי על עצמך ועל הכלב שאתה מחפש.`
  }];

  const chat = useLoaderData();

  if (chat.id) {
    localStorage.removeItem("_id");
  }

  const [userId, setUserId] = useLocalStorage("_id", { id: chat.id });

  if (chat.chat) {
    mess = chat.chat;
  }

  const [loading, setLoading] = useState(false)

  const [messages, setMessages] = useState(mess);

  const sendMessage = (e) => {

    setLoading(true);

    e.preventDefault();

    const form = e.target;

    let temp = {
      role: 'user',
      content: form.content.value
    }

    setMessages(prev => [...prev, temp]);

    getResponse(temp);

    form.reset();

    form.content.focus();

  }

  const getResponse = async (message) => {
    console.log('userID', userId.id)
    const response = await fetch(import.meta.env.VITE_APP_SERVERURL + "Chats/" + userId.id, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })
    if (response.ok) {

      const res = await response.json();
      setMessages(prev => [...prev, res]);
      setLoading(false)
    }
    else {
      setLoading(false)

    }

  }


  return (
    <AdoptersLayout>
      <Paper sx={{ height: '75vh', width: '80%', borderRadius: '15px', display: 'flex', flexDirection: 'column' }} elevation={10} >

        <MessagesBox messages={messages} loading={loading} />

        <NewMessage addMessage={sendMessage} />
      </Paper>


    </AdoptersLayout>
  );
}
