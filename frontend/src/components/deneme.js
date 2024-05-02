function Deneme(){
    return(
                <div className="w3-container w3-content" style={{maxWidth: '1400px', marginTop: '80px'}}>    
                  {/* The Grid */}
                  <div className="w3-row">
                    {/* Left Column */}
                    <div className="w3-col m3">
                      {/* Profile */}
                      <div className="w3-card w3-round w3-white">
                        <div className="w3-container">
                          <h4 className="w3-center">My Profile</h4>
                          <p className="w3-center"><img src="/w3images/avatar3.png" className="w3-circle" style={{height: '106px', width: '106px'}} alt="Avatar" /></p>
                          <hr />
                          <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme" /> Designer, UI</p>
                          <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme" /> London, UK</p>
                          <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme" /> April 1, 1988</p>
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
                              <h6 className="w3-opacity">Social Media template by w3.css</h6>
                              <p className="w3-border w3-padding" contentEditable="true">Status: Feeling Blue</p>
                              <button type="button" className="w3-button w3-theme"><i className="fa fa-pencil" /> &nbsp;Post</button> 
                            </div>
                          </div>
                        </div>
                      </div>
                      {posts.map((item, index) => (
                            <tr>
                                
                                <div className="w3-container w3-card w3-white w3-round w3-margin"><br />
                                    <img src={item.file} style={{width:"50px", height:"50px"}}></img>
                                    <a key={index} href="/userpage?UID=" id={index} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width: '60px'}}onClick={() => {
                                        var url = document.getElementById(index);
                                        url.href = "/userpage?UID=" + item.UID;
                                    }}>{item.username}</a>
                                    <p key={index}>{item.content}</p>
                                    <p key={index}>{item.created_at}</p>
                                </div>    
                                
                            </tr>
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
          });
    )
}