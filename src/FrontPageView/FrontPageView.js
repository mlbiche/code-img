import React from 'react';

import img1 from '../mock-img/books-3733892_640.jpg';
import img2 from '../mock-img/mountain-4387827_640.jpg';
import img3 from '../mock-img/nature-4353699_640.jpg';
import img4 from '../mock-img/plane-4301615_640.png';
import img5 from '../mock-img/sunset-4405820_640.jpg';
import Discussion from '../Discussion/Discussion';



const MOCKUP_Discussions = [
    { username: 'Krystine', date: new Date(),image: img1},
    { username: 'Irma',     date: new Date(),image: img2},
    { username: 'Maureen',  date: new Date(),image: img3},
    { username: 'Ursella',  date: new Date(),image: img4},
    { username: 'Sherley',  date: new Date(),image: img5}
  ];
function FrontPageView (){

    return (
        
        <div id="FronPageView-container">
            <div id="FrontPage-title">
                 <h2>Discussions</h2>
            </div>
            {
                MOCKUP_Discussions.map((mockup_discussion)=> (
                    <Discussion username={mockup_discussion.username}
                     date={mockup_discussion.date} 
                     image={mockup_discussion.image} />
                ))
            }
        </div>

    );


}

export default FrontPageView;