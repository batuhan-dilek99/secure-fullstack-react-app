import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState }  from 'react';
import { useLocation } from 'react-router-dom';

function Userpage(){

    //const [UID, setUID] = useState();
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState();
    const [userData, setUserData] = useState([]);
    const [token, setToken] = useState('');
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const UID = params.get('UID');
    let location = useLocation();
    console.log("UID: ", UID);
    console.log(location.search);
    const regex = /UID/
    useEffect(() => {
      if(regex.test(location.search)){
        fetch('http://127.0.0.1:8081/userposts?UID=' + UID, {
            method:'GET',
            headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            fetch('http://127.0.0.1:8081/userdata', {
                method:'POST',
                body: JSON.stringify({'username':data[0].username}),
                headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
            })
            .then(res => res.json())
            .then(data => setUserData(data[0]));
            setPosts(data);
            setUsername(data[0].username);
        });
      }
    }, [])

    return (
        <div className="w3-container w3-content" style={{maxWidth: '1400px', marginTop: '80px'}}>    
                  {/* The Grid */}
                  <div className="w3-row">
                    {/* Left Column */}
                    <div className="w3-col m3">
                      {/* Profile */}
                      <div className="w3-card w3-round w3-white">
                        <div className="w3-container">
                          <h4 className="w3-center">{userData.username}</h4>
                          <p className="w3-center"><img src={userData.file} className="w3-circle" style={{height: '106px', width: '106px'}} alt="Avatar" /></p>
                          <h4 className="w3-center">{userData.username}</h4>
                          <hr />
                        </div>
                      </div>
                      <br />
                      {/* Accordion */}
                      <div className="w3-card w3-round">
                        <div className="w3-white">
                          <button onclick="myFunction('Demo1')" className="w3-button w3-block w3-theme-l1 w3-left-align"><i className="fa fa-circle-o-notch fa-fw w3-margin-right" /> My Groups</button>
                          <div id="Demo1" className="w3-hide w3-container">
                            <p>Some text..</p>
                          </div>
                          <button onclick="myFunction('Demo2')" className="w3-button w3-block w3-theme-l1 w3-left-align"><i className="fa fa-calendar-check-o fa-fw w3-margin-right" /> My Events</button>
                          <div id="Demo2" className="w3-hide w3-container">
                            <p>Some other text..</p>
                          </div>
                          <button onclick="myFunction('Demo3')" className="w3-button w3-block w3-theme-l1 w3-left-align"><i className="fa fa-users fa-fw w3-margin-right" /> My Photos</button>
                          <div id="Demo3" className="w3-hide w3-container">
                            <div className="w3-row-padding">
                              <br />
                              <div className="w3-half">
                                <img src="/w3images/lights.jpg" style={{width: '100%'}} className="w3-margin-bottom" />
                              </div>
                              <div className="w3-half">
                                <img src="/w3images/nature.jpg" style={{width: '100%'}} className="w3-margin-bottom" />
                              </div>
                              <div className="w3-half">
                                <img src="/w3images/mountains.jpg" style={{width: '100%'}} className="w3-margin-bottom" />
                              </div>
                              <div className="w3-half">
                                <img src="/w3images/forest.jpg" style={{width: '100%'}} className="w3-margin-bottom" />
                              </div>
                              <div className="w3-half">
                                <img src="/w3images/nature.jpg" style={{width: '100%'}} className="w3-margin-bottom" />
                              </div>
                              <div className="w3-half">
                                <img src="/w3images/snow.jpg" style={{width: '100%'}} className="w3-margin-bottom" />
                              </div>
                            </div>
                          </div>
                        </div>      
                      </div>
                      <br />
                      {/* Interests */} 
                      <div className="w3-card w3-round w3-white w3-hide-small">
                        <div className="w3-container">
                          <p>Interests</p>
                          <p>
                            <span className="w3-tag w3-small w3-theme-d5">News</span>
                            <span className="w3-tag w3-small w3-theme-d4">W3Schools</span>
                            <span className="w3-tag w3-small w3-theme-d3">Labels</span>
                            <span className="w3-tag w3-small w3-theme-d2">Games</span>
                            <span className="w3-tag w3-small w3-theme-d1">Friends</span>
                            <span className="w3-tag w3-small w3-theme">Games</span>
                            <span className="w3-tag w3-small w3-theme-l1">Friends</span>
                            <span className="w3-tag w3-small w3-theme-l2">Food</span>
                            <span className="w3-tag w3-small w3-theme-l3">Design</span>
                            <span className="w3-tag w3-small w3-theme-l4">Art</span>
                            <span className="w3-tag w3-small w3-theme-l5">Photos</span>
                          </p>
                        </div>
                      </div>
                      <br />
                      {/* Alert Box */}
                      <div className="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
                        <span onclick="this.parentElement.style.display='none'" className="w3-button w3-theme-l3 w3-display-topright">
                          <i className="fa fa-remove" />
                        </span>
                        <p><strong>Hey!</strong></p>
                        <p>People are looking at your profile. Find out who.</p>
                      </div>
                      {/* End Left Column */}
                    </div>
                    {/* Middle Column */}
                    <div className="w3-col m7">
                      <div className="w3-row-padding">
                        <div className="w3-col m12">
                          <div className="w3-card w3-round w3-white">
                            <div className="w3-container w3-padding">
                                <h3>Viewing {userData.username}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {posts.map((item, index) => (
                            
                                
                                <div className="w3-container w3-card w3-white w3-round w3-margin"><br />
                                    <img src={item.file} className="w3-left w3-circle w3-margin-right" style={{width: '60px'}}></img>
                                    <span className="w3-right w3-opacity">{item.created_at}</span>
                                    <a key={index} href="/userpage?UID=" id={index} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width: '60px'}}onClick={() => {
                                        var url = document.getElementById(index);
                                        url.href = "/userpage?UID=" + item.UID;
                                    }}>{item.username}</a>
                                    <hr className="w3-clear" />
                                    <p key={index}>{item.content}</p>
                                </div>    
                                
                            
                        ))}
                      {/* End Middle Column */}
                    </div>
                    {/* Right Column */}
                    <div className="w3-col m2">
                      <div className="w3-card w3-round w3-white w3-center">
                        <div className="w3-container">
                          <p>Upcoming Events:</p>
                          <img src="/w3images/forest.jpg" alt="Forest" style={{width: '100%'}} />
                          <p><strong>Holiday</strong></p>
                          <p>Friday 15:00</p>
                          <p><button className="w3-button w3-block w3-theme-l4">Info</button></p>
                        </div>
                      </div>
                      <br />
                      <div className="w3-card w3-round w3-white w3-center">
                        <div className="w3-container">
                          <p>Friend Request</p>
                          <img src="/w3images/avatar6.png" alt="Avatar" style={{width: '50%'}} /><br />
                          <span>Jane Doe</span>
                          <div className="w3-row w3-opacity">
                            <div className="w3-half">
                              <button className="w3-button w3-block w3-green w3-section" title="Accept"><i className="fa fa-check" /></button>
                            </div>
                            <div className="w3-half">
                              <button className="w3-button w3-block w3-red w3-section" title="Decline"><i className="fa fa-remove" /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="w3-card w3-round w3-white w3-padding-16 w3-center">
                        <p>ADS</p>
                      </div>
                      <br />
                      <div className="w3-card w3-round w3-white w3-padding-32 w3-center">
                        <p><i className="fa fa-bug w3-xxlarge" /></p>
                      </div>
                      {/* End Right Column */}
                    </div>
                    {/* End Grid */}
                  </div>
                  {/* End Page Container */}
                </div>


    );
}


export default Userpage;