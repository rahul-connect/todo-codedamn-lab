import React,{useState,useEffect} from 'react';
import './App.css';



function App(){
  const [currentAccount,setCurrentAccount] = useState("");
  const [correctNetwork,setCorrectNetwork] = useState(false);

  const connectWallet = async()=>{
    try{
       // Write here 
       
    }catch(error){
      console.log("Error Connecting to metamask",error);
    }
  }

  


  useEffect(()=>{
    connectWallet();
  },[]);


  return (
    <div>
      {currentAccount == '' ? (
        <center><button className='button' onClick={connectWallet}>Connect Wallet</button></center>
      ) : correctNetwork ? (
        <div className='App'>
          <h2>Meta mask connected Successfully !</h2>
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
