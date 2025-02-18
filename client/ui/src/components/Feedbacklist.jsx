import React,  {useState, useEffect} from 'react'
import axios from 'axios'
import Feedbackcard from './Feedbackcard'
import "./Feedbacklist.css"
import DownloadReviewsButton from './DownloadReviewsButton';

const Feedbacklist = () => {
  const [reviews, setReviews] = useState([])

  useEffect(()=> {
    axios.get("http://localhost:3000/api/reviews").then((res)=>{
      setReviews(res.data)
      console.log(res.data)
    })
    .catch(()=>{
      console.log("Error while getting data")
    })
  }, [])

  const feedbacklist = 
    reviews.length == 0 
    ? "no employees found !" 
    : reviews.map((review,index)=>(<Feedbackcard key={index} review={review} />)
    )



  return (
    <div className = "Show_Feedbacklist">
      <div className = "container">
      <br/>
     
      <DownloadReviewsButton/>
      <br/>
      <br/>
      <div className = "list">{feedbacklist}
      </div>
      </div>
     
      
    </div>
  )
}

export default Feedbacklist
