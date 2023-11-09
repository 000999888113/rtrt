import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { Link } from 'react-router-dom';
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/10.10.0/math.min.js"></script>



const Newtonraphson = () =>{
    const print = () =>{
        setValueIter(data.map((x)=>x.iteration));
        setValueFX(data.map((x)=>x.Fx));
       
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

 
    

    const calNewton= (x0) => {
        var x0,scope,fx,xold,xnew;
        var iter = 0;
       
        var obj={};
        const math = require('mathjs');
        var df = math.derivative(Equation, 'x').toString();
        var MAX = 50;
        const e = 0.00001;
        
        
       
        scope = {
            x:x0,
        }
        fx = evaluate(Equation, scope)
        
        scope = {
            x:x0,
        }
        dfx = evaluate(df, scope)
        xold = x0 - (fx/dfx); 


        do{
            obj = {
                iteration:iter,
                Fx:xold,
               
            }
            var scope,dfx
            
           
                
            scope = {
                x:xold,
            }
            fx = evaluate(Equation, scope)
            
            scope = {
                x:xold,
            }
            dfx = evaluate(df, scope)
            

            xnew = xold - (fx/dfx); 
            var ea = Math.abs((xnew-xold)/xnew)*100;

           
            data.push(obj)
            

            
            xold = xnew;

            iter ++;
        }while(ea>e && iter<MAX)
        setFX(xold)
    }


    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueFX, setValueFX] = useState([]);
 
    

    const [html, setHtml] = useState(null);
    var [Equation,setEquation] = useState("x*x-7")
    const [x0,setX0] = useState(0)
    const [FX,setFX] = useState(0)
    
    



   
   
    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }

   
    const calculateRoot = () =>{
        const x0num = parseFloat(x0)
       
        calNewton(x0num);
        
        setHtml(print());
     

       
    }

    return (
        <Container>
           
            <Form >
                <Form.Group className="mb-3">
                <Form.Label>Input f(x)</Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    <Form.Label>Input X0</Form.Label>
                    <input type="number" id="XL" onChange={inputX0} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    
                   
                </Form.Group>
                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
            </Form>
            <br></br>
            <h5>Answer = {FX.toPrecision(7)}</h5>
            <Container>
            {html}
            </Container>
        </Container>
        
    
    )
}
export default Newtonraphson