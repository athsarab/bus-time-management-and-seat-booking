import React,{ useState, useEffect} from 'react'
import axios from "axios";
import BusCards from './Buscards';



const BusCardlist = () => {

    const [buscards, setbus] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:3000/api/luggages").then((res)=>{
            setbus(res.data);
            console.log(res.data);
        })
        .catch(()=>{
        log("Error while getting data")
    })
},[]);

const buslist = 
buscards.length === 0 
? "No reservations found !!!"
:buscards.map((buscard, index)=>
(<BusCards key={index} buscard ={buscard} />)
);
 
  return (
    <div className="Show_Reservationlist">
     <div className="container">
      <h1 >Available Buses</h1>
      <br/>
        <div className="list">{buslist}</div>
     </div>

    </div>
  )
}

export default BusCardlist
