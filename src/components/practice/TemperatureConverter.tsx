import { useEffect, useState } from "react";

export default function TemperatureConverter() {
  const [celcius, setCelcius] = useState(0);
  const [fahrenheit, setFahrenheit] = useState(0);

  useEffect(() => {
    setCelcius(0);
    setFahrenheit(convertToFahrenheit(0));
  }, []);

  const convertToFahrenheit = (celcius: number) => {
    const f = (celcius * 9 / 5) + 32;
    setCelcius(celcius);
    setFahrenheit(f);
    return f;
  }

  const convertToCelcius = (fahrenheit: number) => {
    const c = (fahrenheit - 32) * 5 / 9;
    setFahrenheit(fahrenheit);
    setCelcius(c);
    return c;
  }

  const handleSubmit = (e) => e.preventDefault();
  const handleTemperatureChange = (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    const name: string = target.name;
    const value: number = target.value;
    if (!isNaN) return;

    if (name == 'fahrenheit') {
      convertToCelcius(value);
    } else {
      convertToFahrenheit(value);
    }
  }

  return (<>
    <div id="temperature-convert-test" className="text-center practice-components">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Temperature Converter (Intermediate)</h2>
          <div>
            <small>
              <ul>
                <li>
                  Goal: Create a widget that converts values between Celsius and Fahrenheit.
                </li>
                <li>
                  Concepts Tested: State syncing, derived state, lifting state up.
                </li>
                <li>
                  Requirements: Two input fields (one for Celsius, one for Fahrenheit). Updating one should automatically update the other based on mathematical conversion formulas like \(F = C \times \frac{9}{5} + 32\). [1, 2]
                </li>
              </ul>
            </small>
          </div>
          <div style={{ width: "100%", border: "1px solid blue" }}>
            <div className="temperature-controls-container" style={{
              display: 'flex',
              justifyContent: 'center',
              margin: 'auto',
              marginBottom: '20px'
            }}>
              <form id='temp-converter' onSubmit={handleSubmit}>
                <div className="form-control">
                  <label htmlFor="fahrenheit">Fahrenheit</label>
                  <input
                    type="number"
                    name="fahrenheit"
                    value={fahrenheit}
                    onChange={handleTemperatureChange} />
                </div>
                {/* <hr /> */}
                <div className="form-control">
                  <label htmlFor="celcius">Celcius</label>
                  <input
                    type="number"
                    name="celcius"
                    value={celcius}
                    onChange={handleTemperatureChange} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}
