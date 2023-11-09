import React, { useState } from 'react';
import { Button, Container, Form, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Cramer = () =>{
    const [rowCount, setRowCount] = useState(3);
    const [colCount, setColCount] = useState(3);
    const [matrix, setMatrix] = useState(() => initializeMatrix(rowCount, colCount));
    const [matrixB, setMatrixB] = useState(() => initializeMatrix(rowCount, 1));
   
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
      }
    };
  
    
  

    const [solutions, setSolutions] = useState([]);
  
    
    

    function determinant(matrix) {
       
    
        if (matrix.length === 2) {
            return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        }
    
        let det = 0;
        for (let j = 0; j < matrix.length; j++) {
            det += matrix[0][j] * cofactor(matrix, 0, j);
        }
    
        return det;
    }
    
    function cofactor(matrix, row, col) {
        const subMatrix = matrix.filter((_, i) => i !== row)
                               .map(row => row.filter((_, j) => j !== col));
        const sign = (row + col) % 2 === 0 ? 1 : -1;
        return sign * determinant(subMatrix);
    }
    




   

    
    const [DetA, setDetA] = useState();

    const calCramer = () =>{
        try {
            const detA = determinant(matrix);
            setDetA(detA);
            if (detA === 0) {
                throw new Error('Matrix A is singular, Cramer\'s Rule cannot be applied');
            }

            const solutions = [];

            for (let i = 0; i < matrix.length; i++) {
                const tempMatrix = matrix.map(row => row.slice());
                for (let j = 0; j < matrix.length; j++) {
                    tempMatrix[j][i] = matrixB[j][0];
                }
                const detTemp = determinant(tempMatrix);
                solutions.push(detTemp / detA);
            }

            setSolutions(solutions);
        } catch (error) {
            console.error(error.message);
           
            setSolutions([]);
        }

    }


    const MatrixDisplay = ({ matrix }) => {
        return (
        <div className='matrix-container'>
            <table  className='matrix'>
            <tbody>
                {matrix.map((row, rowIndex) => (
                <tr key={rowIndex} >
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} className= "matrix-cell"> {cell.toFixed(4)} </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        );
    };

    
    const calculateRoot = () =>{
        calCramer();
       
       
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
                <div>
                    {solutions.length > 0 ? (
                        <ul>
                            {solutions.map((solution, index) => (
                                <li key={index}>x{index + 1} = {solution.toFixed(4)}</li>
                            ))}
                        </ul>
                    ) : (
                        <p></p>
                    )}
                    {DetA === 0 ? (<h6>MatrixA is singular</h6>):<h></h>}
                </div>
            </Container>

        </Container>


    )
} 

export default Cramer;