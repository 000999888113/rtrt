
import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { Link } from 'react-router-dom';
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/10.10.0/math.min.js"></script>



const Secant = () =>{

    
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

 
    function f(x) {
        var scope,fx;
        scope = {
            x:x,
        }
        fx = evaluate(Equation, scope)
        return fx;
    }

    const calNewton= (x0,x1) => {
        var x0;
        var iter = 0;

        var obj={};
        
        var MAX = 50;
        const e = 0.00001;
        
        
       

       
        let xnew = x1 - ((f(x1)*(x0-x1))/(f(x0)-f(x1)));
        obj = {
            iteration:iter,
            Fx:xnew
           
        }
        data.push(obj)
        iter ++;
        while (Math.abs((xnew - x1) / xnew) * 100 > e && iter < MAX) {
            console.log(xnew + " ");
            x0 = x1;
            x1 = xnew;
            xnew = x1 - ((f(x1)*(x0-x1))/(f(x0)-f(x1)));
            obj = {
                iteration:iter,
                Fx:xnew,
               
            }
            data.push(obj)
            iter ++;
        }

        
            
       
        setFX(xnew)
    }


    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueFX, setValueFX] = useState([]);
 
    

    const [html, setHtml] = useState(null);
    var [Equation,setEquation] = useState("x*x-7")
    const [x0,setX0] = useState(0)
    const [x1,setX1] = useState(0)
    const [FX,setFX] = useState(0)
    
    



   
   
    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }
    const inputX1 = (event) =>{
        console.log(event.target.value)
        setX1(event.target.value)
    }

   
    const calculateRoot = () =>{
        const x0num = parseFloat(x0)
        const x1num = parseFloat(x1)
        calNewton(x0num,x1num);
        
        setHtml(print());
     

       
    }
	
    return (
        <Container>
           
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    <Form.Label>Input X0</Form.Label>
                    <input type="number" id="X0" onChange={inputX0} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    <Form.Label>Input X1</Form.Label>
                    <input type="number" id="X1" onChange={inputX1} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                   
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
export default Secant
















