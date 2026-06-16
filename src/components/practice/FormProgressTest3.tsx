import { useEffect, useRef, useState } from "react"

export default function FormProgressTestThree() {
  const [progress, setProgress] = useState(0);
  const [formState, setFormState] = useState({});
  const [noOfInputs, setNoOfInputs] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    const form = formRef.current;
    const currentFormState: any = Object.fromEntries(new FormData(form).entries());
    const inputs = Object.entries(currentFormState).length;
    setNoOfInputs(inputs);
    setFormState(currentFormState);
  }, []);

  const handleInputChange = (e) => {
    const cur = e.currentTarget;
    const value = cur.value;
    const name = cur.name;
    let hasError: boolean = false;

    if (cur.hasAttribute('minLength')) {
      hasError = !isValidInputLength(cur);
    } else if (cur.hasAttribute('min')) {
      hasError = !isValidNumber(cur);
    } else {
      hasError = !isValidInputValue(cur);
    }
    const inputValue = { [name]: { value, hasError } };
    const currentState = { ...formState, ...inputValue };
    setFormState(currentState);
    handleUpdateProgress(currentState);
  }

  const handleUpdateProgress = (currentState?) => {
    let currentProgress = 0;
    const state = currentState ?? formState;
    if (state) {
      for (const value of Object.values<any>(state)) {
        if (value && !value.hasError) {
          currentProgress++;
        }
      }
    }

    setProgress(currentProgress / noOfInputs * 100);
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    handleUpdateProgress();
    let msg = '';
    if (progress == 100) {
      msg = 'Form ready to submit';
    } else {
      msg = 'The form is not valid';
    }
    alert(msg);
  }

  const isValidInputLength = (input: HTMLTextAreaElement | HTMLInputElement) => input.value.length >= input.minLength && input.value.length <= input.maxLength;

  const isValidNumber = (input: HTMLInputElement) => input.value >= input.min && input.value <= input.max;

  const isValidInputValue = (input: HTMLSelectElement) => Boolean(input.value);

  return (<>
    <div id="form-test" className="text-center practice-components">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Progression Form Test 3</h2>
        </div>
        <div className="row" style={{ width: "100%", border: "1px solid blue", marginTop: '150px' }}>
          <div className="form-test-three" style={{ margin: "auto", width: '45%' }}>
            <form ref={formRef} id="test-form-three" onSubmit={handleSubmit}>
              <div className="form-control">
                <label htmlFor="fname">First name</label>
                <input type="text" id="fname" name="fname" minLength={3} maxLength={120} required onChange={handleInputChange} />
              </div>
              <div className="form-control">
                <label htmlFor="lname">Last name</label>
                <input type="text" id="lname" name="lname" minLength={3} maxLength={120} required onChange={handleInputChange} />
              </div>
              <div className="form-control">
                <label htmlFor="dbx-character">Fav DBZ Character</label>
                <input
                  type="text"
                  id="dbx-character"
                  name="dbx-character"
                  minLength={3}
                  maxLength={120}
                  required
                  onChange={handleInputChange} />
              </div>
              <div className={`form-control ${true && 'error'}`}>
                <label htmlFor="reason">Reason *</label>
                <select id="reason" name="reason" required onBlur={handleInputChange} >
                  <option value="">-- Please Select --</option>
                  <option value="complaint">Complaint</option>
                  <option value="compliment">Compliment</option>
                </select>
              </div>
              <div className={`form-control ${formState["description"]?.hasError && 'alert alert-danger hasError'}`} style={{ height: "auto" }}>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" rows={5} minLength={3} maxLength={4096} required onChange={handleInputChange} />
              </div>
              <hr />
              <input type="submit" className="btn btn-success" disabled={progress !== 100} />
            </form>
            <hr />
            <div className="progression-wrapper" style={{ display: "flex", alignContent: "center", justifyContent: "space-between", margin: 'auto', width: '50%' }}>
              <div className="progress-number-container" style={{ marginRight: '10px' }}><span className="progress-number">{progress}%</span></div>
              <div className="progress-container" style={{ width: "250px", height: "20px", backgroundColor: "lightgray" }}>
                <div className="progress-container" style={{ height: "100%", width: `${progress}%`, backgroundColor: "green" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}
