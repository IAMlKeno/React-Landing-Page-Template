import React from "react";
import type { AboutData } from "../types";

interface Props {
  data?: AboutData;
}

export const About = ({ data }: Props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About Us</h2>
              <p>{data ? data.paragraph : "loading..."}</p>
              <h3>{data?.whyHeader ?? "Why Choose Us?"}</h3>
              <div className="list-style">
                
                {data?.listOfWhys.length &&
                  data?.listOfWhys.map((whys, i) => (
                    <div key={`div_${whys}_${i}`} className="col-lg-6 col-sm-6 col-xs-12">
                      <ul key={`ul_${whys}_${i}`}>
                        {whys.map((why, i) => (
                          <li key={`${why}_${i}`}>{why}</li>
                        ))}
                      </ul>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
