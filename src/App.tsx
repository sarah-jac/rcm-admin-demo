import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Row, Col, Button } from 'react-bootstrap'
import FormInput from './FormInput';
import FormDropdown from './FormDropdown';
import FormMultiSelect from './FormMultiSelect';
import { checkValidity } from './helper'
import { useOSCStore } from './useOSCStore';
function App() {
  const formResponse = useOSCStore(
    state => state.formResponse
  );
  const data = {
    buttonBackgroundColor: '#0000ff',
    buttonColor: '#fff',
    formBorderColorOnFocus: '#0000ff',
    errorTextColor: 'pink',
    formFields: [
      {
        elementTitle: "CEI Code",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "CEI Code"
        },
        value: "",
        validation: {
          required: true,
          error: ""
        },
        valid: false,
        touched: false,
        width: 12
      },
      {
        elementTitle: "CEI Description",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "CEI Description"
        },
        value: "",
        validation: {
          required: true,
          error: ""
        },
        valid: false,
        touched: false,
        width: 6
      },
      {
        elementTitle: "CEI Type",
        elementType: "dropdown",
        elementConfig: {
          type: "dropdown",
          placeholder: "CEI Type",
          options: [
            {
              id: 1,
              value: "type1",
              label: "type1"
            },
            {
              id: 2,
              value: "type2",
              label: "type2"
            },
            {
              id: 3,
              value: "type3",
              label: "type3"
            }
          ]
        },
        value: "type3",
        validation: {
          required: true,
          error: ""
        },
        valid: false,
        touched: false,
        width: 6
      },
      {
        elementTitle: "Primary Columns",
        elementType: "select",
        elementConfig: {
          type: "select",
          placeholder: "Primary Columns",
          options: [
            {
              id: 1,
              value: "field1",
              label: "field1"
            },
            {
              id: 2,
              value: "field2",
              label: "field2"
            },
            {
              id: 3,
              value: "field3",
              label: "field3"
            }
          ]
        },
        value: "",
        validation: {
          required: true,
          error: ""
        },
        valid: false,
        touched: false,
        width: 6
      }
    ]
  }
  const [form, setForm] = useState(data)
  const updateFormField = (title: any, val: any) => {
    const formTemp = JSON.parse(JSON.stringify(form))
    formTemp.formFields.find(field => field.elementTitle === title).value = val;

    setForm(formTemp)
  }
  const onSubmitForm = () => {
    console.log(form, 'form')
    const formTemp = JSON.parse(JSON.stringify(form))

    formTemp.formFields.forEach(f => {

      f.valid = checkValidity(f.elementConfig.placeholder, formResponse[f.elementTitle], f.validation)

    })
    console.log(formTemp, 'form')
    setForm(formTemp);
console.log(formResponse,'res')
  }
  return (
    <>
      <Row className="App">
        {form.formFields.map(field => {
          switch (field.elementType) {
            case "input":
              return <Col md={field.width}><FormInput fieldDetails={field} updateForm={updateFormField} /></Col>

            case "dropdown":
              return <Col md={field.width}><FormDropdown fieldDetails={field} updateForm={updateFormField} /></Col>

            case "select":
               return <Col md={field.width}><FormMultiSelect fieldDetails={field} updateForm={updateFormField} /> </Col>
          }
        })}
      </Row>
      <Button onClick={onSubmitForm}>
        Submit
      </Button>
    </>
  );
}

export default App;
