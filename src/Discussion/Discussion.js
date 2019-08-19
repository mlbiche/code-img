import React  from 'react';
import './Discussion.css';


function Discussion ({username, date,image}) {
  
    return (
           <div id="discusson-container">
               <h3>{username} {date.toDateString()} </h3>
               <img src={image}  alt={image}/>
           </div>
    );
}
 
export default Discussion;