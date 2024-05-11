import { useState } from "react";
import { Textinput } from "../../../components/Textinput";
import AdoptersLayout from "../../../layouts/AdoptersLayout";
import { Paper } from "@mui/material";
import NewMessage from "./NewMessage";
import MessagesBox from "./MessagesBox";

const mess = [
  { "role": "assistant", "content": "היי, אני דוגי ואני כאן כדי לעזור לך למצוא את הכלב המושלם. אז שנתחיל? תספר לי קצת עליך ועל מי שגר איתך... " },
  { "role": "user", "content": "אני סטונדט להנדסה, גר במרתף עם בת זוג" },
  { "role": "assistant", "content": "אוקי מעולה, עכשיו אשמח לדעת כמה זמן הכלב יהיה לבד בבית?" },
  { "role": "user", "content": "הכלב יהיה כ-6 שעות לבד" },
  { "role": "assistant", "content": "אוקי מעולה, עכשיו אשמח לדעת כמה פעמים תוכל לקחת אותו לטיול?" },
  { "role": "user", "content": " פעמיים ביום" },

]


export default function ChatBot() {

  const [messages, setMessages] = useState(mess);

  const sendMessage =  (e) => {

    e.preventDefault();

    const form = e.target;

    
    let temp = {
      role:'user',
      content:form.content.value
    }

    setMessages(prev=>[...prev,temp]);
    
    getResponse(form.content.value);

    form.reset();

    form.content.focus();

  }

  const getResponse= async (value)=>{
    const response = await fetch(import.meta.env.VITE_APP_SERVERURL + "GPT", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "query": value })
    })
    const res = await response.json();

   
    let temp = {
      role:'assistant',
      content:res
    }
    
    setMessages(prev=>[...prev,temp]);
  }

  console.log('nessages', messages)

  return (
    <AdoptersLayout>
      <Paper sx={{ height: '75vh', width: '80%', borderRadius: '15px',  display: 'flex', flexDirection: 'column' }} elevation={10} >

        <MessagesBox messages={messages} />
        <NewMessage addMessage={sendMessage} />
      </Paper>


    </AdoptersLayout>
  );
}
