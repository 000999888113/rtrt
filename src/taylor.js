import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { Link } from 'react-router-dom';
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/10.10.0/math.min.js"></script>



const Taylor = () =>{
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
                            <th width="30%">F(x0)</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Fx}</td>
                                <td>{element.Result}</td>
                                
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
        
        );
    }

 
    

    const calTaylor= (x0) => {
        var x0,scope;
        var iter = 0;
        var sum=0;
        var obj={};
        var df = Equation;
       
        
        do{
            const math = require('mathjs');
            var scope,dfx,result;
            
            scope = {
                x:x0,
            }
            dfx = evaluate(df, scope)
           
            
            obj = {
                iteration:iter,
                Fx:df,
                Result:dfx,
               
            }
            data.push(obj)
            

            
            df =math.derivative(Equation, 'x').toString();
            Equation = df
            
            const fac = math.factorial(iter);
            const x_a = X-x0;


          
            
            sum+=dfx*math.pow(x_a,iter)/fac
           
            iter ++;

        }while(iter<MAX)
        setFX(sum)
    }


    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueFX, setValueFX] = useState([]);
 
    

    const [html, setHtml] = useState(null);
    var [Equation,setEquation] = useState("(2*x+1)/4")
    const [x0,setX0] = useState(0)
    const [FX,setFX] = useState(0)
    const [MAX,setMAX] = useState(0)
    const [X,setX] = useState(0)



    const inputX= (event) =>{
        console.log(event.target.value)
        setX(event.target.value)
    }
    const inputMAX= (event) =>{
        console.log(event.target.value)
        setMAX(event.target.value)
    }
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
       
        calTaylor(x0num);
        
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
                    <Form.Label>Input X</Form.Label>
                    <input type="number" id="X" onChange={inputX} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    <Form.Label>Input N</Form.Label>
                    <input type="number" id="MAX" onChange={inputMAX} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
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
export default Taylor