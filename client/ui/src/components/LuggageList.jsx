import React, { useState, useEffect} from 'react';
import axios from 'axios';
import LuggageCard from './LuggageCard';
import "./luggageList.css";

const LuggageList = () => {

  const [luggages, setLuggages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/luggages")
    .then((res) => {
      setLuggages(res.data);
      console.log(res.data);
    })
      .catch(() => {
      console.log("Error while getting data");
    });
  }, []);

  const luggagesList = luggages.length === 0 
  ? "No luggages found" 
  : luggages.map((luggage, index) => 
  (<LuggageCard key = {index} luggage = {luggage}/>
  ));

  return (

    
    <div  className= "showLuggageList">
      <div className = "container">
        <div className= "list">
        {luggagesList}
          </div> 
      </div>
    </div>
  )
}

export default LuggageList
