import React from "react";

import '../App.css'

const UserProfile = () => {
    return (
        <div className="padding">
            <div className="row">
                <div className="col-lg">
                    <div className="row">
                        <img src="img-1.png" alt="user-profile-pic"/>
                        <h3>User-Name</h3>
                    </div>
                </div>

                <div className="col">
                    <div className="row">
                        <h1>About Me</h1>
                        <div className="about-me">
                            <h3>A Lead UX & UI designer based in Canada</h3>
                            <h4>
                                I design and develop services for customers of all sizes, 
                                specializing in creating stylish, 
                                modern websites, web services and online stores. 
                                My passion is to design digital user experiences through the bold interface and meaningful interactions.
                            </h4>
                        </div>

                        <div className="personal-info">
                        <div className="row about-list">
                                    <div className="col-md-6">
                                        <div className="media">
                                            <label>Birthday</label>
                                            <p>4th april 1998</p>
                                        </div>
                                        <div className="media">
                                            <label>Age</label>
                                            <p>22 Yr</p>
                                        </div>
                                        <div className="media">
                                            <label>Residence</label>
                                            <p>Canada</p>
                                        </div>
                                        <div className="media">
                                            <label>Address</label>
                                            <p>California, USA</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="media">
                                            <label>E-mail</label>
                                            <p>info@domain.com</p>
                                        </div>
                                        <div className="media">
                                            <label>Phone</label>
                                            <p>820-885-3321</p>
                                        </div>
                                        <div className="media">
                                            <label>Skype</label>
                                            <p>skype.0404</p>
                                        </div>
                                        <div className="media">
                                            <label>Freelance</label>
                                            <p>Available</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row" style={{marginTop:"4rem", border:"1px solid black"}}>
                <div class="col-6 col-lg-3">
                    <div class="count-data text-center">
                        <h6 class="count h2" data-to="500" data-speed="500">500</h6>
                        <p class="m-0px font-w-600">Friends</p>
                    </div>
                </div>
                <div class="col-6 col-lg-3">
                    <div class="count-data text-center">
                        <h6 class="count h2" data-to="150" data-speed="150">150</h6>
                        <p class="m-0px font-w-600">Account Created At</p>
                    </div>
                </div>
                <div class="col-6 col-lg-3">
                    <div class="count-data text-center">
                        <h6 class="count h2" data-to="850" data-speed="850">850</h6>
                        <p class="m-0px font-w-600">Photo Capture</p>
                    </div>
                </div>
                <div class="col-6 col-lg-3">
                    <div class="count-data text-center">
                        <h6 class="count h2" data-to="190" data-speed="190">190</h6>
                        <p class="m-0px font-w-600">Telephonic Talk</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;