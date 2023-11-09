import React, { useState } from 'react';
import { Button, Container, Form, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
const Matrixinversion= () => {
  const [rowCount, setRowCount] = useState(3);
  const [colCount, setColCount] = useState(3);
  const [matrix, setMatrix] = useState(() => initializeMatrix(rowCount, colCount));
  const [gaussSteps, setgaussSteps] = useState([]);



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

  const handleRowCountChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (newSize > 0) {
      setRowCount(newSize);
      setMatrix(initializeMatrix(newSize, colCount));
    }
  };

  const handleColCountChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (newSize > 0) {
      setColCount(newSize);
      setMatrix(initializeMatrix(rowCount, newSize));
    }
  };

  
    
    
    function gauss(inputMat) {
        const N = colCount;
        let row = 0, col = 0;
        const identityMatrix = [];

        //not change original
        const mat = JSON.parse(JSON.stringify(inputMat));
        const steps = [JSON.parse(JSON.stringify(mat))];


        for (let i = 0; i < rowCount; i++) {
            const row = [];
            for (let j = 0; j < colCount; j++) {
                if (i === j) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            }
            identityMatrix.push(row);
        }
    
        // Append identity matrix to the right of the original matrix
        for (let i = 0; i < rowCount; i++) {
            mat[i] = mat[i].concat(identityMatrix[i]);
        }
        
        
        
       



        for (let k = 0; k < N - 1; k++) {
            for (let i = 1; i < N - row; i++) {
                let x = mat[i + row][col] / mat[row][col];
                console.log(`Dividing row ${i + row} by ${mat[row][col]}:`, x);
                for (let j = 0; j < N *2; j++) {
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
                for (let j = 0; j < N *2; j++) {
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
                for (let j = 0; j < N *2; j++) {
                    mat[i][j] /= divisor;
                }
                steps.push(JSON.parse(JSON.stringify(mat)));
            }
        }

        return steps;
    }
 
    
    const MatrixDisplay = ({ matrix }) => {
        return (
        <div className='matrix-container'>
            <table className='matrix'>
            <tbody>
                {matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                    <td key={colIndex}  className = {colIndex === colCount ? 'split-matrix-cell' : "matrix-cell"}>  {cell.toFixed(4)}  </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        );
    };

   
    const calculateRoot = () =>{
    
        const gaussSteps = gauss(matrix );
        setgaussSteps(gaussSteps);
    
    }
 
  return (

    <Container>
           
            <Form >
                <div>
                    <label>
                        Rows:
                        <input
                        type="number"
                        value={rowCount}
                        min="1"
                        onChange={handleRowCountChange}
                        />
                    </label>
                    <label>
                        Columns:
                        <input
                        type="number"
                        value={colCount}
                        min="1"
                        onChange={handleColCountChange}
                        />
                    </label>
                    <table>
                        <tbody>
                        <h6>A</h6>
                        {matrix.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex}>
                                <input
                                    type="number"
                                    value={cell}
                                    onChange={(e) => handleInputChange(rowIndex, colIndex, +e.target.value)}
                                />
                                </td>
                            ))}
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
                {gaussSteps.map((step, index ) => (
                  <div key={index}>
                    <h5>Step {index + 1 }</h5>
                    <MatrixDisplay matrix={step} />
                  </div>
                ))}     
            </Container>
        </Container>
        
    
  );
};

export default Matrixinversion;
