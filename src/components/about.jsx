import React from "react";
import ejsquat from '../assets/ejsquat.jpg'

export const About = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src={ejsquat} className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About</h2>
              {props.data ? props.data.paragraphs.map((p, idx) => <p key={idx}>{p}</p>) : "loading..."}

            </div>
            <a data-toggle="collapse" href="#signup-form-container" className="btn btn-custom btn-lg page-scroll">
              Sign Up Now!
            </a>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
