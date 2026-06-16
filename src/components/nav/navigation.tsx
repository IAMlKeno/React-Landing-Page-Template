import { useState } from "react";
import JsonData from "../../data/data.json";
import { NavigationData, NavigationItemsData } from "../../types";
import CartIcon from "../../features/cart/components/CartIcon";

export const Navigation = () => {
  const data: NavigationData = JsonData.Navigation;
  const [showCart, setShowCart] = useState<boolean>(false);

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <span className="cart-icon-wrapper visible-xs-inline-block">
            {showCart ? <CartIcon /> : null}
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
            {showCart ?
              <li className="hidden-xs"><CartIcon /></li>
              : null
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};
