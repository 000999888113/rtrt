import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";


const Jacobi = () => {
    const [rowCount, setRowCount] = useState(3);
    const [colCount, setColCount] = useState(3);
    const [matrix, setMatrix] = useState(() => initializeMatrix(rowCount, colCount));
    const [matrixB, setMatrixB] = useState(() => initializeMatrix(rowCount, 1));
    const [matrixX, setMatrixX] = useState(() => initializeMatrix(rowCount, 1));



    const [X,setX] = useState();
    const inputX = (event) =>{
        console.log(event.target.value)
        setX(event.target.value)
       
    }
    
    function initializeMatrix(rows, cols) {
      const newMatrix = [];
      for (let i = 0; i < rows; i++) {
        newMatrix.push(new Array(cols).fill(0));
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
        setMatrixB(initializeMatrix(newSize, newSize));
        setMatrixX(initializeMatrix(newSize, newSize));
      }
    };

    const calJacobi = (A, B, maxIterations = 100, tolerance = 0.00001) => {
        const n = A.length;
        let x = new Array(rowCount).fill(X);
        let iterations = []; // arrayx 
    
        for (let iteration = 0; iteration < maxIterations; iteration++) {
            const xNew = new Array(n).fill(0);
    
            for (let i = 0; i < n; i++) {
                let sum = 0;
                for (let j = 0; j < n; j++) {
                    if (j !== i) {
                        sum += A[i][j] * x[j];
                    }
                }
                xNew[i] = (B[i][0] - sum) / A[i][i];   //xi 
            }
    
            iterations.push(xNew.slice());
    
            if (Math.max(...x.map((xi, i) => Math.abs(xNew[i] - xi))) < tolerance) {  //max in x diff between xnew < err
                setiteration(iterations);
                return;
            }
    
            x = xNew;
        }
        
    
        throw new Error("Jacobi method did not converge within the specified number of iterations.");
    }
    

    const [iteration,setiteration] = useState([]);
    const [html,setHtml] = useState(null);


    const print =() =>{
        return(
            <Container> 
                    <h5>Iterations</h5>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                {matrixX.map((_, i) => (
                                    <th key={i}>x{i + 1}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {iteration.map((iter, index) => (
                                <tr key={index}>
                                    {iter.map((xiValue, i) => (
                                        <td key={i}>{xiValue}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
            </Container>


        )

    }


    const calculateRoot = () =>{
        
        calJacobi(matrix,matrixB);
        setHtml(print());
   

    }


    return(
        <Container>
            <Form >
                <div>
                    <label>
                        initialize x(i):
                        <input
                        type = "number"
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
                    {html}
            </Container>

        </Container>


    )


    

}

export default Jacobi;