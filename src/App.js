import { useEffect } from "react";
import "./App.css";
import socket from "./server.js";
import { useState } from "react";
import InputField from "./components/InputField/InputField.jsx";
import MessageContainer from "./components/MessageContainer/MessageContainer.js";
function App() {
  const[user,setuser]= useState(null);
  const[message,setMessage] = useState('');
  const[messageList,setmessageList] = useState([]);
  console.log("message List",messageList);
  useEffect(()=>{
    socket.on('message',(message)=> {
      setmessageList((prevState) => prevState.concat(message));
    })
    askUserName();
  },[])
  const askUserName=()=>{
    const userName = prompt("당신의 이름을 입력하세요!");
    console.log("uuu",userName);
    socket.emit("login",userName,(res) => {
      if(res?.ok){
        setuser(res.data);
      }
    })
  }
  const sendMessage = (event) => {
      event.preventDefault();
      socket.emit("sendMessage", message, (res) => {
          console.log("sendMessage res", res);
      });
  };

  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user={user}/>
        <InputField message={message} setMessage={setMessage}
        sendMessage={sendMessage}
        />  
      </div>
    </div>
  );
}

export default App;
