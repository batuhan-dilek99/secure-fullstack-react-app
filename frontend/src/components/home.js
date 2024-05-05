import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';




function Home(){

    const [userToken, setUserToken] = useState({});
    const [token, setToken] = useState('');
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchParam, setSearchParam] = useState();
    const history = useHistory();


    
    useEffect(() => {       //Initial control for the token
      const token = sessionStorage.getItem('token')
      setToken(token)
      fetch('http://127.0.0.1:8081/verifyToken', {
          method:'GET',
          headers: {
          'jwt-token': token,
          },
      })
          .then((res) => {
            if(res.status === 200){
              res.json();
            } 
            else{
              history.push('/');
            }
          }) 
          .then((data) =>  {
            setUserToken(data);
          })
      }, []);


    const searchuser = async a => {
      a.preventDefault()
      const formData = new FormData(a.target);
      const usersearch = formData.get('usersearch');

      fetch("http://127.0.0.1:8081/search", {
        method:'POST',
        body: JSON.stringify({search: usersearch}),
        headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
      })
      .then(res => res.json())
      .then(data => {
        
        if(data.result == false){
          document.getElementById("result").innerHTML = "No result";
        }
        else {
 
          setSearchResults(data.result);
          setSearchParam(data.search);
        }

      });

    }

    const submit = async e => {
      e.preventDefault()
      const formData = new FormData(e.target);
      const post = formData.get('post');
      
      const token = sessionStorage.getItem('token')
      setToken(token)
      fetch('http://127.0.0.1:8081/verifyToken', {
          headers: {
          'jwt-token': token,
          },
      })
          .then((res) => res.json())
          .then((data) => {
              const jsonData = {
                  post: post,
                  username: data.username,
              }
              fetch('http://127.0.0.1:8081/post',{
                  method:'POST',
                  body: JSON.stringify(jsonData),
                  headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
              })
              .then(res => res.json)
              .then(history.push("/home"))
              .then(document.getElementById('post').value = '');
          })
    }

    useEffect(() => {
        fetch('http://127.0.0.1:8081/getAllPosts', {
            method:'GET',
        })
        .then(res => res.json())
        .then(data => {
            setPosts(data);
        })
    });

    useEffect(() => {
      const token = sessionStorage.getItem('token')
      setToken(token)
      fetch('http://127.0.0.1:8081/verifyToken', {
        method:'GET',
        headers: {
          'jwt-token': token,
        },
      })
      .then(res => res.json())
      .then(function(data){
        fetch('http://127.0.0.1:8081/userdata', {
            method:'POST',
            body: JSON.stringify({'username':data.username}),
            headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
          })
          .then(res => res.json())
          .then(data => {
            setUserData(data[0]);
          })
        })
      }, [])


    if(token){  
        return (
            <div className="w3-container w3-content" style={{maxWidth: '1400px', marginTop: '80px'}}>    
                  {/* The Grid */}
                  <div className="w3-row">
                    {/* Left Column */}
                    <div className="w3-col m3">
                      {/* Profile */}
                      <div className="w3-card w3-round w3-white">
                        <div className="w3-container">
                          <h4 className="w3-center">My Profile</h4>
                          <p className="w3-center"><img src={userData.file} className="w3-circle" style={{height: '106px', width: '106px'}} alt="Avatar" /></p>
                          <h4 className="w3-center">{userData.username}</h4>
                          <hr />
                          <a href='/home'><i className="fa fa-home fa-fw w3-margin-right w3-text-theme" />Homepage</a><br></br>
                          <a href='/account'><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme" />Manage account</a>
                          <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme" /> April 1, 1988</p>
                        </div>
                      </div>
                      <br />
                      {/* Accordion */}
                      <div className="w3-card w3-round">
                        <div className="w3-white">
                          <button onclick="myFunction('Demo1')" className="w3-button w3-block w3-deep-purple w3-left-align"><i className="fa fa-circle-o-notch fa-fw w3-margin-right" /> My Groups</button>
                          <div id="Demo1" className="w3-hide w3-container">
                            <p>Some text..</p>
                          </div>
                          <button onclick="myFunction('Demo2')" className="w3-button w3-block w3-deep-purple w3-left-align"><i className="fa fa-calendar-check-o fa-fw w3-margin-right" /> My Events</button>
                          <div id="Demo2" className="w3-hide w3-container">
                            <p>Some other text..</p>
                          </div>
                          <button onclick="myFunction('Demo3')" className="w3-button w3-block w3-deep-purple w3-left-align"><i className="fa fa-users fa-fw w3-margin-right" /> My Photos</button>
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
                              <p>Share your thougts</p>
                              <form onSubmit={submit}>
                                  <textarea placeholder='Write your post here!' className='form-control' id="post" name="post"></textarea><br></br>
                                  <button type='submit' className='btn btn-success w3-deep-purple'><i className="fa fa-pencil" />Post</button>
                              </form>
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
                                    <p >{item.content}</p>
                                </div>    
                                
                            
                        ))}
                      {/* End Middle Column */}
                    </div>
                    {/* Right Column */}
                    <div className="w3-col m2">
                      <div className="w3-card w3-round w3-white w3-center">
                        <div className="w3-container">
                          <p>Search users</p>
                          <form onSubmit={searchuser}>
                            <input type='text' className='form-control' id='usersearch' name='usersearch'></input> <br></br>
                            <p><button type='submit' className="w3-button w3-block w3-deep-purple">Search</button></p>
                          </form>
                          <div id="result">

                          {searchResults.map((item, index) => (
                              <div className="w3-container w3-card w3-white w3-round w3-margin"><br />
                                <img src={item.file} className="w3-left w3-circle w3-margin-right" style={{width: '34px'}}></img>
                                <span className="w3-right w3-opacity">{item.created_at}</span>
                                <a key={index} href="/userpage?UID=" id={item.username} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width: '60px'}}onClick={() => {
                                    var url = document.getElementById(item.username);
                                    url.href = "/userpage?UID=" + item.UID;
                                }}>{item.username}</a>
                              </div> 
                          ))}
                          </div>
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
    else{
        return(
            <div className="home">
                <h2>Must sign in first</h2>
            </div>
        );
    }
}

export default Home;