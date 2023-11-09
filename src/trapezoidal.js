import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'

import './App.css';
const Trapezoidal = () =>{
    const math = require('mathjs');

    let data = [];
 
    function calculateIntegration() {
        const h = (b - a) / N;
        console.log("h",h)
        var fx ;
        var i = 0;
        var obj={};
        var atemp= parseFloat(a);
        var sum = 0;
        var scope  

        scope = {
            x:a,
        }
        fx = evaluate(equation, scope)
        console.log("f(a)",fx)
        obj = {
            iteration:i,
            Fx:fx,
        }
        data.push(obj);
        sum += fx;
        console.log("sum",sum)
        i++;
         

       

        atemp = atemp + h;
       
       
         
        while (atemp <=b) {
            
            if ( atemp == b ) {
                scope = {
                    x:b,
                }
                fx = evaluate(equation, scope)
                console.log("i",i)
                console.log("a",atemp)
                console.log("f(b)",fx)
                obj = {
                    iteration:N,
                    Fx:fx,
                }
                data.push(obj)
                sum += fx;
                console.log("sum",sum)
                 break;
            }else{
                scope = {
                    x:atemp,
                }
                fx = evaluate(equation, scope)
                console.log("i",i)
                console.log("a",atemp)
                console.log("f(a)",fx)
               
                sum += 2 * fx;
               
                obj = {
                    iteration:i,
                    Fx:fx,
                }
                data.push(obj)
            }
            console.log("sum",sum)
            atemp = atemp + h;
            i++;
        }
        
        sum *= h / 2;
        const e =exact();
        const error = ((e-sum) / e)*100;
        setError(error)
        setX(sum)
        console.log(typeof X)
        console.log(typeof error)
    }
    
    function exact() {
        const result = evaluate(equation, { x: b }) - evaluate(equation, { x: a });
        return result;
    }
    
    
 

    const [N,setN] = useState(0)
    const [a,setA] = useState(0)
    const [b,setB] = useState(0)

    const [error,setError] = useState(0)
    const [X,setX] = useState(0)
    
    const [equation,setEquation] = useState("(x^7+2*x^3+1)");


    const inputEquation = (event)=>{
        console.log(event.target.value)
        setEquation(event.target.value);
    }
   
    const inputN = (event) =>{
        console.log(event.target.value)
        setN(event.target.value)
    }
    const inputA = (event) =>{
        console.log(event.target.value)
        setA(event.target.value)
    }
    const inputB = (event) =>{
        console.log(event.target.value)
        setB(event.target.value)
    }
  
    

    const [html,setHtml] = useState(null);

    const print = () =>{
     
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">Fx</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Fx}</td>
                                
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
        
        );
    }

    const calculateRoot = () =>{
        console.log(equation)
        calculateIntegration();
        setHtml(print());
    }
    
    
    



     
    return (
        
        <Container>
            <Form >
                <Form.Group className="mb-3">
                    <Container className="inin"> 
                        <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation" value={equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input a</Form.Label>
                        <input type="number" id="a"  onChange={inputA} style={{width:"20%", margin:"auto auto"}} className="form-control"></input>
                        <Form.Label>Input b</Form.Label>
                        <input type="number" id="b"  value={b}onChange={inputB} style={{width:"20%", margin:"auto auto"}} className="form-control"></input>
                        <Form.Label>Input N</Form.Label>
                        <input type="number" id="n" value={N} onChange={inputN} style={{width:"20%", margin:"auto auto"}} className="form-control"></input>
                    </Container>
                  
                    
                </Form.Group>
               

                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
            </Form>
            <Container>
            {html}
            </Container>
            <br></br>
            <h5>Answer = {X.toPrecision(7)}</h5>
            <h5>Error = {error.toPrecision(7)}</h5>
           
        </Container>
        
    
    )
}
export default Trapezoidal