import { useState } from "react";

interface Props {
  data?: string;
}

export default function ToggleTextDisplay({ data }: Props) {
  const [displayText, setDisplayText] = useState(true);

  const msg = data ?? 'Some Text'

  const handleClick = (e) => {
    e.preventDefault();
    setDisplayText(!displayText);
  }

  return (<>
    <div id="toggle-test" className="text-center practice-components">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Toggle Element (Basic)</h2>
          <div>
            <small>
              <ul>
                <li>
                  Goal: Build a basic UI element that shows and hides text.
                </li>
                <li>
                  Concepts Tested: useState hook, conditional rendering.
                </li>
                <li>
                  Requirements: Create a button that toggles a message between "Show" and "Hide" when clicked.
                </li>
              </ul>

            </small>
          </div>
        </div>
        <div className="row" style={{ width: "100%", border: "1px solid blue" }}>
          <div className="custom-text-container">
            <button className="btn toggle-text-btn" onClick={handleClick}>
              <span className="btn-text">Toggle Text</span>
              &nbsp;
              <div
                className="btn-toggle-status"
                style={{
                  display: 'inline-block',
                  height: '20px',
                  width: '10px',
                  verticalAlign: 'top',
                  backgroundColor: `${displayText ? 'green' : 'red'}`
                }}></div>
            </button>
            <div className="toggled-text" style={{ visibility: `${displayText ? 'visible' : 'hidden'}` }}>{msg}</div>
          </div>
        </div>
      </div>
    </div>
  </>)
}
