import React, { useState } from 'react';
import './App.css';
import { Row, Col, Button } from 'react-bootstrap'
import FormInput from './components/FormInput';
import FormDropdown from './components/FormDropdown';
import FormMultiSelect from './components/FormMultiSelect';
import FormCreatable from './components/FormCreatable';
import FormTextArea from './components/FormTextArea';
import FormNumberInput from './components/FormNumberInput';
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
        style: {
          width: 12
        }
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
        style: {width: 6}
      },
      {
        elementTitle: "Measure Period",
        elementType: "date",
        elementConfig: {
          type: "date",
          placeholder: "Measure Period"
        },
        value: null,
        validation: {
          required: true,
          error: ""
        },
        valid: false,
        touched: false,
        style: {width: 12}
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
        style: {width: 6}
      },
      {
        elementTitle: "Risk Exposure",
        elementType: "select",
        elementConfig: {
          type: "select",
          placeholder: "Risk Exposure",
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
        style: {width: 6}
      },
      {
        elementTitle: "Primary Columns",
        elementType: "creatable",
        elementConfig: {
          type: "creatable",
          placeholder: "Primary Columns",
        },
        value: "",
        validation: {
          required: true,
          error: ""
        },
        valid: false,
        touched: false,
        style: {width: 6}
      },
      {
        elementTitle: "Rating Threshold",
        elementType: "textarea",
        elementConfig: {
          type: "textarea",
          placeholder: "Rating Threshold"
        },
        value: "",
        validation: {
          required: true,
          error: ""
        },
        valid: false,
        touched: false,
        style: {width: 12}
      },
    ]
  }
  const [form, setForm] = useState(data);
  const updateFormField = (title: any, val: any) => {
    const formTemp = JSON.parse(JSON.stringify(form));
    formTemp.formFields.find(field => field.elementTitle === title).value = val;
    setForm(formTemp);
  }
  const onSubmitForm = () => {
    const formTemp = JSON.parse(JSON.stringify(form));
    formTemp.formFields.forEach(f => {
      f.valid = checkValidity(f.elementConfig.placeholder, formResponse[f.elementTitle], f.validation);
    })
    setForm(formTemp);
  }
  return (
    <>
    <div className='ms-4 mt-4 me-4'>
      <Row className="App">
          <b>CEI Configuration</b>
          {form.formFields.map(field => {
            switch (field.elementType) {
              case "input":
                return <Col md={field.style.width}><FormInput fieldDetails={field} updateForm={updateFormField} /></Col>
              case "dropdown":
                return <Col md={field.style.width}><FormDropdown fieldDetails={field} updateForm={updateFormField} /></Col>
              case "date":
                return <Col md={field.style.width}>
                  <>
                    <FormNumberInput key='days' fieldDetails={field} updateForm={updateFormField} title={true}/>
                    <FormNumberInput key='hours'  fieldDetails={field} updateForm={updateFormField} title={false}/>
                    <FormNumberInput key='seconds'  fieldDetails={field} updateForm={updateFormField} title={false}/>
                    <FormNumberInput key='milliseconds'  fieldDetails={field} updateForm={updateFormField} title={false}/>
                  </>
                  </Col>
              case "select":
                return <Col md={field.style.width}><FormMultiSelect fieldDetails={field} updateForm={updateFormField} /> </Col>
              case "creatable":
                return <Col md={field.style.width}><FormCreatable fieldDetails={field} updateForm={updateFormField} /> </Col>
              case "textarea":
                return <Col md={field.style.width}><FormTextArea fieldDetails={field} updateForm={updateFormField} /></Col>
              
            }
          })}
       
      </Row>
      <Button onClick={onSubmitForm} className="mt-3 ms-auto">
        Submit
      </Button>
      </div>
    </>
  );
}

export default App;
