import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
function Choice() {

  return (
    <>
      <section id="choice" data-testid="choice">
        <div id="mens">
          <div className="phototext">
            <Link to="/shop/men" className="choicetext">
              MENS
            </Link>
          </div>
          <img src="/row-1-column-2.png" alt="fashion" />
        </div>
        <div id="womens">
          <div className="phototext">
            <Link to="/shop/women" className="choicetext">
              WOMENS
            </Link>
          </div>
          <img src="/row-1-column-1.png" alt="accessories" />
        </div>
      </section>
    </>
  );
}

export default Choice;
