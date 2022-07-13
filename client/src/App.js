import React,{useState,useEffect} from 'react';
import {TextField,Button} from '@mui/material';
import './App.css';
import Task from './Task';

import {ethers} from 'ethers';
const { abi } = require("./abi/contracts/TaskContract.sol/TaskContract.json");

const TaskContractAddress = ""; // Enter your contract address here


// REMEMBER TO DEPLOY YOUR CONTRACT IN GOERLI NETWORK

function App(){

  const [tasks,setTasks] = useState([]); 
  const [input,setInput] = useState("");
  const [currentAccount,setCurrentAccount] = useState("");
  const [correctNetwork,setCorrectNetwork] = useState(false);

  const connectWallet = async()=>{
    try{
      const {ethereum} = window;
      if(!ethereum){
        console.log("Metamask not detected");
      }

      let chainId = await ethereum.request({method:'eth_chainId'});
      console.log("Connected to chain:"+chainId);

      const goerliChainId = "0x5"; // Rinkeby is 0x4
      if(chainId != goerliChainId){
        alert("You are not connected to Goerli network");
        return;
      }else{
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({method:'eth_requestAccounts'});
      console.log("Found account:",accounts[0]);
      setCurrentAccount(accounts[0]);

    }catch(error){
      console.log("Error Connecting to metamask",error);
    }
  }

 
  const addTask = async(e)=>{
    e.preventDefault();
    let task = {
      'taskText':input,
      'isDeleted':false
    };
    try{
      const {ethereum} = window;
      if(ethereum){
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const TaskContract = new ethers.Contract(TaskContractAddress,abi,signer);
          TaskContract.addTask(task.taskText,task.isDeleted).then(resonse => {
            setTasks([...tasks,task]);
          }).catch(err=>{
            console.log("Error occured while adding a new task");
          }); 

      }else{
        console.log("Ethereum object doesnot exist");
      }

    }catch(error){
      console.log("Error submitting the task");
    }
    setInput("");
  }


  const deleteTask = key =>async()=>{
    try{ 
     const {ethereum} = window;
     if(ethereum){
       // ------ Write code here --------------
     }else{
       console.log("Ethereum object doesnt exists");
     }
    }catch(error){
      console.log(error);
    }
 }

 const getAllTasks = async()=>{
  try{
    const {ethereum} = window;
    if(ethereum){
      // ------ Write code here --------------
    }else{
      console.log("Ethereum object doesnt exists");
    }
  }catch(error){
    console.log(error);
  }
}


useEffect(()=>{
  connectWallet();
 // getAllTasks();  // Uncomment this later on
},[]);

  return (
    <div>
      {currentAccount == '' ? (
        <center><button className='button' onClick={connectWallet}>Connect Wallet</button></center>
      ) : correctNetwork ? (
        <div className='App'>
          <h2>Task Management App</h2>
          <form>
            <TextField id='outlined-basic' label='Make Todo' variant='outlined' style={{margin:"0px 5px"}} size="small" value={input} onChange={e=>setInput(e.target.value)}/>
            <Button variant="contained" color="primary" onClick={addTask}> Add Task </Button>
          </form>
          <ul>
            {tasks.map(item=>
               <Task key={item.id} taskText={item.taskText} onClick={deleteTask(item.id)}></Task>
              )}
          </ul>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
           <div>Please connect to the Goerli Testnet and reload the screen</div>
        </div>
      )}
    </div>
  );
  

}

export default App;
