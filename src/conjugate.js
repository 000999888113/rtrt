import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";

const math = require('mathjs');
const Conjugate = () =>{
    const [rowCount, setRowCount] = useState(3);
    const [colCount, setColCount] = useState(3);
    const [matrix, setMatrix] = useState(() => initializeMatrix(rowCount, colCount));
    const [matrixB, setMatrixB] = useState(() => initializeMatrix(rowCount,1));
    const [matrixX, setMatrixX] = useState(() => initializeMatrix(rowCount,1));
    
    const [X,setX] = useState(0);
    const inputX = (event) =>{
        const Value = parseFloat(event.target.value);
        setX(Value)
       
    }
    function initializeMatrix(rows, cols) {
        const newMatrix = [];
        for (let i = 0; i < rows; i++) {
          newMatrix.push(new Array(cols).fill(0));
        }
        return newMatrix;
      }

      function initializeMatrixX(rows, cols) {
        const newMatrix = [];
        for (let i = 0; i < rows; i++) {
          newMatrix.push(new Array(cols).fill(X));
        }
        return newMatrix;
     
      }
     
      const handleInputChange = (rowIndex, colIndex, value) => {
        const newMatrix = [...matrix];
        newMatrix[rowIndex][colIndex] = parseFloat(value);
        setMatrix(newMatrix);
      };
  
      const handleInputChangeB = (rowIndex, value) => {
          const newMatrixB = [...matrixB];
          newMatrixB[rowIndex][0] = parseFloat(value);
          setMatrixB(newMatrixB);
      };
      
     
    
      const handleRowCountChange = (e) => {
        const newSize = parseInt(e.target.value, 10);
        if (newSize > 0) {
          setRowCount(newSize);
          setColCount(newSize);
          setMatrix(initializeMatrix(newSize, newSize));
          setMatrixB(initializeMatrix(newSize,newSize));
          setMatrixX(initializeMatrix(newSize,newSize));
        }
      };




     

      const MatrixDisplay = ({ matrix }) => {
       
        return (
        <div className='matrix-container'>
            <table  className='matrix'>
            <tbody>
                {matrix.map((row, rowIndex) => (
                <tr key={rowIndex} >
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} className={colIndex === colCount  ? 'split-matrix-cell' : "matrix-cell"}> 
                            {typeof cell === 'number' ? cell.toFixed(4) : cell}
                     </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        );
     };
     
    

    function calConjugate(arrA, arrb, tolerance = 1e-5, maxIterations = 100) {
        let xxx = initializeMatrixX(rowCount,1)
        let x = math.matrix(xxx);
        let b = math.matrix(arrb);
        let A = math.matrix(arrA);
        console.log("Matrix A:", A);
        console.log("Matrix b:", b);
        console.log("matrixX:", x);
       
        let r = math.subtract(b, math.multiply(A, x)); // Residual vector
        console.log("r",r);
        let d = math.subtract(math.matrix([0]),math.clone(r)); // Initial search direction
        console.log("d",d);

        let ArrayX = math.matrix(x).toArray();  // math.matrix to js array
        console.log(ArrayX);
        const steps = [JSON.parse(JSON.stringify(ArrayX))];
      
        for (let i = 0; i < maxIterations; i++) {
            let Ad = math.multiply(A, d);
          
            let dt = math.transpose(d);
         
            let alpha = math.divide(math.multiply(dt, r), math.multiply(dt, Ad));
    
            x = math.add(x, math.multiply(alpha, d)); // Update approximation
            let ArrayX = math.matrix(x).toArray();// math.matrix to js array
           
            steps.push(JSON.parse(JSON.stringify(ArrayX)));


            let Ax = math.multiply(A,x);
            let rNew = math.subtract(b, Ax); // Update residual
            let error = math.multiply(math.transpose(rNew), rNew);
           
            if (error < tolerance) {
                break; // Convergence achieved
            }
    
            let beta = math.divide(math.multiply(math.transpose(rNew), Ad), math.multiply(dt, Ad));
            d = math.add(rNew, math.multiply(beta, d)); // Update search direction
            r = rNew; // Update residual for next iteration
        }
        
        return steps;
    }
    
   






    const [conjugateSteps,setconjugateSteps] = useState([]);
   
    const calculateRoot = () =>{
       
            console.log("Matrix A:", matrix);
            console.log("Matrix B:", matrixB);
            console.log("X:", X);
        
        
        const Steps = calConjugate(matrix,matrixB);
        setconjugateSteps(Steps);
   

    }
    

    return(
        <Container>
            <Form >
                <div>
                    <label>
                        initialize x(i):
                        <input
                        type ="number"
                        value={X}
                     
                        onChange={inputX}
                        />
                    </label>
                    <label>
                        Set matrix:
                        <input
                        type="number"
                        value={rowCount}
                        min="1"
                        onChange={handleRowCountChange}
                        />
                    </label>
                    
                    <table>
                      
                        <tbody>
                        <h6>A</h6>
                        {matrix.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex}   >
                                  <input
                                      type="number"
                                      value={cell}
                                      onChange={(e) => handleInputChange(rowIndex, colIndex, +e.target.value)}
                                  />
                                </td>
                                 
                            ))}
                             
                            </tr>
                        ))}
                         
                        <br></br>
                        <h6>B</h6>
                        {matrixB.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td key={0}>
                                    <input
                                        type="number"
                                        value={row[0]} // <-- Updated value prop
                                        onChange={(e) => handleInputChangeB(rowIndex, e.target.value)} // <-- Updated handler
                                    />
                                </td>
                            </tr>
                        ))}
                        

                        </tbody>
                    </table>
                </div>
            </Form> 
            <h5>Answer = </h5>
            <Button variant="dark" onClick={calculateRoot}>
                    Calculate
            </Button>
            <Container>
                {conjugateSteps.map((step, index) => (
                  <div key={index}>
                    <h5>Step {index + 1}</h5>
                    <MatrixDisplay matrix={step} />
                  </div>
                ))}     
            </Container>
        </Container>


    )

}

export default Conjugate;

