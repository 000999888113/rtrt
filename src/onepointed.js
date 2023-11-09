import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { Link } from 'react-router-dom';
const Onepointed = () =>{
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

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;



    const calOnepointed = (x0) => {
        var x0,fx,fxnew,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj={};
        scope = {
            x:x0,
        }
        fx = evaluate(Equation, scope)
        
        do{
           
            scope = {
                x:fx,
            }
            fxnew = evaluate(Equation, scope)
           
            obj = {
                iteration:iter,
                Fx:fx,
            }
            ea = error(fx,fxnew);
            fx = fxnew;
            data.push(obj)
            iter ++;

        }while(ea>e && iter<MAX)
        setFX(fx)
    }


    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueFX, setValueFX] = useState([]);
 
    

    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(2*x+1)/4")
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
       
        calOnepointed(x0num);
        
        setHtml(print());
        
        console.log(valueIter)
        console.log(valueFX)
       
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
export default Onepointed