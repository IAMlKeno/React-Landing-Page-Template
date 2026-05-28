import React from "react";
import CartIcon from "../features/cart/components/CartIcon";
import { NavigationData, NavigationItemsData } from "../types";
import JsonData from "../data/data.json";

export const Navigation = () => {
  const data: NavigationData = JsonData.Navigation;
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <span className="cart-icon-wrapper visible-xs-inline-block">
            <CartIcon />
          </span>
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            { data.logo.type == 'text'
                ? data.logo.value
                : "Not applicable"
            }
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            {data &&
              data.items.map((item: NavigationItemsData) => (
                <li key={item.href}>
                  <a href={item.href} className={item.className.join(' ')} >
                    {item.label}
                  </a>
                </li>
              ))
            }
            <li className="hidden-xs"><CartIcon /></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
