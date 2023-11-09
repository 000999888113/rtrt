import React, { useState  } from 'react';
import { Button, Container, Form } from "react-bootstrap";


import './App.css';
const Lu= () => {
  const [rowCount, setRowCount] = useState(3);
  const [colCount, setColCount] = useState(3);
  const [matrix, setMatrix] = useState(() => initializeMatrix(rowCount, colCount));
  const [matrixB, setMatrixB] = useState(() => initializeMatrix(rowCount, 1));
  
  const [gaussStepsL, setgaussStepsL] = useState([]);
  const [gaussStepsU, setgaussStepsU] = useState([]);

  const [L,setL] = useState([]);
  const [U,setU] = useState([]);
 
 
  
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
      setMatrixB(initializeMatrix(newSize, 1));
    }
  };


  function luDecomposition(matrix) {
    const n = matrix.length;
    let L = [];
    let U = [];

    // Initialize L and U matrices
    for (let i = 0; i < n; i++) {
        L[i] = [];
        U[i] = [];
        for (let j = 0; j < n; j++) {
            L[i][j] = 0;
            U[i][j] = 0;
        }
    }

    for (let i = 0; i < n; i++) {
        // U matrix
        for (let k = i; k < n; k++) {
            U[i][k] = matrix[i][k];
            for (let j = 0; j < i; j++) {
                U[i][k] -= L[i][j] * U[j][k];
            }
        }

        // L matrix
        for (let k = i; k < n; k++) {
            if (i == k) {
                L[k][i] = 1;
            } else {
                L[k][i] = matrix[k][i];
                for (let j = 0; j < i; j++) {
                    L[k][i] -= L[k][j] * U[j][i];
                }
                L[k][i] /= U[i][i];
            }
        }
    }

    return { L, U };
}


    
   
    
    function gauss(inputMat,inputmatrixB) {
        const N = colCount;
        let row = 0, col = 0;

        //not change original 
        const mat = JSON.parse(JSON.stringify(inputMat));
        const steps = [JSON.parse(JSON.stringify(mat))];

        for (let i = 0; i < rowCount; i++) {
          mat[i] = mat[i].concat(inputmatrixB[i][0]);
        }

        for (let k = 0; k < N - 1; k++) {
            for (let i = 1; i < N - row; i++) {
                let x = mat[i + row][col] / mat[row][col];
                console.log(`Dividing row ${i + row} by ${mat[row][col]}:`, x);
                for (let j = 0; j < N + 1; j++) {
                    mat[i + row][j] -= (x * mat[row][j]);
                }
                steps.push(JSON.parse(JSON.stringify(mat)));
            }
            row++;
            col++;
        }
        row = N - 1;
        col = N - 1;
        for (let k = 0; k < N - 1; k++) {
            for (let i = row - 1; i >= 0; i--) {
                let x = mat[i][col] / mat[row][col];
                for (let j = 0; j < N + 1; j++) {
                    mat[i][j] -= (x * mat[row][j]);
                }
                steps.push(JSON.parse(JSON.stringify(mat)));
            }
            row--;
            col--;
        }
        for (let i = 0; i < N; i++) {
            let divisor = mat[i][i];
            if (divisor !== 0) {
                for (let j = 0; j < N + 1; j++) {
                    mat[i][j] /= divisor;
                }
                steps.push(JSON.parse(JSON.stringify(mat)));
            }
        }

        const x = initializeMatrix(rowCount, 1);
        for (let i = 0; i < N; i++) {
            console.log("N"+N);
            x[i][0] = mat[i][N];
            console.log(x[i][0]);
        }
    
        return {steps , x} ;
    }
 
    
    const MatrixDisplay = ({ matrix }) => {
        return (
        <div className='matrix-container'>
            <table  className='matrix'>
            <tbody>
                {matrix.map((row, rowIndex) => (
                <tr key={rowIndex} >
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} className={colIndex === colCount  ? 'split-matrix-cell' : "matrix-cell"}> {cell.toFixed(4)} </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        );
    };
   
    const calculateRoot = () =>{
    
        const { L, U} = luDecomposition(matrix);
        setL(L);
        setU(U);
    

        const {steps : stepsL, x : Y} = gauss(L,matrixB);
      
        setgaussStepsL(stepsL);
      
    
        
         const { steps: stepsU, x: xU } = gauss(U, Y);
         setgaussStepsU(stepsU);
         setHtml(print());     
        
       
     
    }
    const [html,setHtml] = useState(null);

    const print = () =>{
        return (
            <Container>
                
                <h5>L</h5>
                <MatrixDisplay matrix={L} />

                <h5>U</h5>
                <MatrixDisplay matrix={U} />

                <h5>LY = B</h5>
                {gaussStepsL.map((step, index) => (
                    <div key={index}>
                        <h5>L : Step {index + 1}</h5>
                        <MatrixDisplay matrix={step} />
                    </div>
                ))}   

            

                <h5>Ux = Y</h5>
                {gaussStepsU.map((step, index) => (
                    <div key={index}>
                        <h5>U : Step {index + 1}</h5>
                        <MatrixDisplay matrix={step} />
                    </div>
                ))}   
         </Container>


        )
    }
  return (

    <Container>
            
            <Form >
                <div>
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
                                <td key={colIndex}  >
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
            <br></br>
            <hr /> 
            <h5>Answer = </h5>
            <Button variant="dark" onClick={calculateRoot}>
                    Calculate
            </Button>
            <Container>
                  
                  {html}
            </Container>
        </Container>
        
    
  );
};

export default Lu;
