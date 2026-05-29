import { useEffect, useRef, useState } from "react";

interface IInput {
  type: string;
  label?: string;
  name: string;
  defaultValue?: any;
  value: any|undefined;
  [key: string]: any;
}
interface IForm {
  inputs: IInput[];
}
interface IFormStateValue {
  [key: string]: {
    value: any;
    hasError: boolean;
  }
}

interface IFormState {
  fields: IFormStateValue[];
}

export const form: IForm = {
  inputs: [
    { type: "input", label: "Full name", max: 120, name: "name", placeholder: "John Doe", value: '', minLength: 3 },
    { type: "input", label: "Age", max: 3, name: "age", step: 1, subtype: "number", value: '', min: 18 },
    { type: "input", label: "Favorite Cartoon", max: 255, name: "fav_cartoon", value: '', placeholder: 'Attack on Titan', minLength: 3 },
  ]
}

export const FormProgressTest = ({ props }) => {
  const formRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [formState, setFormState] = useState<IFormState | undefined>(() => {
    const progressForm: any = localStorage.getItem('progress_form')
      ? JSON.parse(localStorage.getItem('progress_form'))
      : undefined;

    return progressForm;
  });

  const noForm = "No form available";
  const buildInput = (input: IInput) => (
    <input 
      type={input.subtype ?? 'text'}
      name={input.name}
      value={ formState && formState.fields[input.name] ? formState.fields[input.name].value : input.defaultValue }
      { ...(input.placeholder && { placeholder: input.placeholder }) }
      { ...(input.max && { max: input.max }) }
      { ...(input.step && { step: input.step }) }
      { ...(input.minLength && { minLength: input.minLength }) }
      { ...(input.min && { min: input.min }) }
      onChange={updateFormState} />
  )

  const validMinNum = (min: number, actual: number): boolean => actual > min;

  useEffect(() => {
    updateProgress();
  }, [formState.fields])

  const updateProgress = () => {
    let newProgress = 0;
    setProgress(newProgress);
    if (formState && formState?.fields) {
      for (const fieldValue of Object.values(formState.fields)) {
        const hasError = fieldValue.hasError == undefined ? true : Boolean(fieldValue.hasError);
        if (fieldValue.value && hasError === false) {
          newProgress += 1;
        }
      }
    }
    setProgress(newProgress / form.inputs.length * 100);
  }

  const updateFormState = (e: React.ChangeEvent<HTMLInputElement>) => {
    let hasError: boolean = false;
    const cur = e.currentTarget;
    const value = cur.value;
    const key = cur.name;
    if (cur.hasAttribute("minlength")) {
      hasError = !validMinNum(Number(cur.getAttribute('minlength')), value.length);
    }
    if (cur.hasAttribute("min")) {
      hasError = !validMinNum(Number(cur.getAttribute('min')), Number(value));
    }

    const currentFormState = { fields: { ...formState?.fields, [key]: { value, hasError } }}

    setFormState(currentFormState);
    if (formState) {
      localStorage.setItem('progress_form', JSON.stringify(currentFormState));
      updateProgress();
    }
  }

  return (
    <>
      {props &&
        <div className="my-form" style={{margin: 'auto'}}>
          <form>
            {props.inputs.map((input: IInput, i: number) => (
              <div className="form-control" key={input.name[i]}>
                <label htmlFor={input.name}>{input.label}</label>
                { buildInput(input) }
              </div>
            ))}

          </form>
          <div className="form-progress" style={{border: "2px solid black", backgroundColor: 'lightgray', height: "15px"}}>
            <div ref={formRef} className="progress-fillin" style={{height: "100%", backgroundColor: "green", width: `${progress}%`}}></div>
          </div>
        </div>
      }
      {!props && noForm}
    </>
  );
}
