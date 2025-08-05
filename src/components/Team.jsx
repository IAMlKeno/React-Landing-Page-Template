import React from "react";

export const Team = (props) => {
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Meet the Team</h2>
        </div>
        <div id="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
                  <div className="thumbnail">
                    {" "}
                    <a href={ d.links.website } target="blank">
                      <img src={d.img} alt="..." className="team-img" />
                    </a>
                    <div className="caption">
                      <h4>{d.name}</h4>
                      <p>{d.job}</p>
                      <p className="links">
                        <a href={ d.links.facebook } target="blank"><span className="fa fa-facebook icons"></span></a>
                        &nbsp;&nbsp;&nbsp;
                        <a href={ d.links.instagram } target="blank"><span className="fa fa-instagram icons"></span></a>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
