import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";

import './App.css';
const Lagrange = () =>{
   

    function calLagrange(value) {
        const usePoint = [{ x: 0.0, fx: 0.0 }];
        let L = 0;
        let sum1 = 1;
        let sum2 = 1;
        let result = 0;
        for (let k = 0; k < npoint; k++) {
           usePoint[k] = inputValues[arrPoint[k]];
           console.log("dsa" , usePoint[k]);
        }
        for (let k = 0; k <  usePoint.length; k++) {
            for (let i = 0; i <  usePoint.length; i++) {
                if (i !== k) {
                    sum1 *= (  usePoint[i].x - value);
                    sum2 *= (  usePoint[i].x -   usePoint[k].x);
                }
            }
            L = sum1 / sum2;
            result += L *   usePoint[k].fx;
            sum1 = 1;
            sum2 = 1;
        }
    
        setX(result)
    }


    const data =[];
   

    
    
    const [N,setN] = useState(1)
    
    const [npoint,setNPoint] = useState(2)

    const [X,setX] = useState(0)
    const [value,setValue] = useState(0)
   
    const inputNPoint = (event) =>{
        console.log(event.target.value)
        setNPoint(event.target.value)
    }
    
    const inputN = (event) =>{
        console.log(event.target.value)
        setN(event.target.value)
    }
  
    const inputValue = (event) =>{
        console.log(event.target.value)
        setValue(event.target.value)
    }
    const [inputValues, setInputValues] = useState([{ x: 0, fx: 0 }])
    const [arrPoint, setArrPoint] = useState([])

    const calculateRoot = () =>{
       
        calLagrange(value);
    
    }
    
    
    
    const handleInputChange = (event, index, type) => {
        const newValue = event.target.value;
        const updatedInputValues = [...inputValues];
        if (!updatedInputValues[index]) {
            updatedInputValues[index] = { x: 0, fx: 0 };
          }
        if (type === 'x') {
          updatedInputValues[index].x = parseFloat(newValue);
        } else if (type === 'fx') {
          updatedInputValues[index].fx = parseFloat(newValue);
        }
    
        setInputValues(updatedInputValues);
    }

      const renderUserInputForm = () => {
        const inputFields = [];
      
        for (let i = 0; i < N; i++) {
          inputFields.push(
            <tr key={i}>
              <td>
                <input type="number" onChange={(e) => handleInputChange(e, i, 'x')} className="form-control" />
              </td>
              <td>
                <input type="number" onChange={(e) => handleInputChange(e, i, 'fx')} className="form-control" />
              </td>
            </tr>
          );
        }
      
        return (
          <Container>
            <Table bordered style={{ width: "30%" }}>
              <thead>
                <tr>
                  <th >X</th>
                  <th >f(x)</th>
                </tr>
              </thead>
              <tbody>
                {inputFields}
              </tbody>
            </Table>
          </Container>
        );
      }



      const handleInputPoint = (event, index) => {
        const newValue = event.target.value;
        const updatedarrPoint = [...arrPoint];
        if (!updatedarrPoint[index]) {
            updatedarrPoint[index] = 0;
        }
       
        updatedarrPoint[index] = (newValue-1);
        setArrPoint(updatedarrPoint);
      }

      const renderforminputpoint = () =>{
        const inputFields = [];
        for (let i = 0; i < npoint; i++) {
            inputFields.push(
              <tr key={i}>
                <td>
                  <input type="number" onChange={(e) => handleInputPoint(e, i)} className="form-control" />
                </td>
              </tr>
            );
        }
          
        return (
            <Container>
                {inputFields}
            </Container>
        );
      }

    return (
        
        <Container>
        
          
            <Form >
                <Form.Group className="mb-3">
                    <Container className="inin"> 
                        <Form.Label>Input N</Form.Label>
                        <input type="text" id="n" value={N} onChange={inputN} style={{width:"20%", margin:"auto auto"}} className="form-control"></input>
                    </Container>
                    {renderUserInputForm()}
                    <Container className="inin"> 
                        <Form.Label>Input (n) point</Form.Label>
                        <input type="text" id="equation"  onChange={inputNPoint} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    </Container>
                    
                    {renderforminputpoint()}
                    <Container className="inin"> 
                        <Form.Label>Input value</Form.Label>
                        <input type="text" id="equation" value={value} onChange={inputValue} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    </Container>
                    
                </Form.Group>
               

                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
            </Form>
            <br></br>
            <h5>Answer = {X.toPrecision(7)}</h5>
            
        </Container>
        
    
    )
}
export default Lagrange