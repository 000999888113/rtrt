import React, { Component } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import './App.css';

class Newtondivide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            N: 1,
            npoint: 2,
            X: 0,
            value: 0,
            inputValues: [{ x: 0, fx: 0 }],
            arrPoint: []
        };
    }

    polynomial(max, min, usePoint) {
        if (max === min) {
            return usePoint[max].fx;
        } else {
            return (
                (this.polynomial(max, min + 1, usePoint) -
                    this.polynomial(max - 1, min, usePoint)) /
                (usePoint[max].x - usePoint[min].x)
            );
        }
    }

    newtonInterpolation(value) {
        const usePoint = [{ x: 0.0, fx: 0.0 }];
        let term = 1.0;
        let sum = 0.0;

        for (let k = 0; k < this.state.npoint; k++) {
            usePoint[k] = this.state.inputValues[this.state.arrPoint[k]];
        }

        for (let i = 0; i < this.state.npoint; i++) {
            for (let j = 0; j < i; j++) {
                term *= value - usePoint[j].x;
            }
            const c = this.polynomial(i, 0, usePoint);
            sum += c * term;
            term = 1;
        }

        this.setState({ X: sum });
    }

    inputNPoint = (event) => {
        this.setState({ npoint: event.target.value });
    };

    inputN = (event) => {
        this.setState({ N: event.target.value });
    };

    inputValue = (event) => {
        this.setState({ value: event.target.value });
    };

    handleInputChange = (event, index, type) => {
        const newValue = event.target.value;
        const updatedInputValues = [...this.state.inputValues];
        if (!updatedInputValues[index]) {
            updatedInputValues[index] = { x: 0, fx: 0 };
        }
        if (type === 'x') {
            updatedInputValues[index].x = parseFloat(newValue);
        } else if (type === 'fx') {
            updatedInputValues[index].fx = parseFloat(newValue);
        }

        this.setState({ inputValues: updatedInputValues });
    };

    handleInputPoint = (event, index) => {
        const newValue = event.target.value;
        const updatedarrPoint = [...this.state.arrPoint];
        if (!updatedarrPoint[index]) {
            updatedarrPoint[index] = 0;
        }

        updatedarrPoint[index] = newValue - 1;
        this.setState({ arrPoint: updatedarrPoint });
    };

    calculateRoot = () => {
        this.newtonInterpolation(this.state.value);
    };

    renderUserInputForm = () => {
        const inputFields = [];

        for (let i = 0; i < this.state.N; i++) {
            inputFields.push(
                <tr key={i}>
                    <td>
                        <input
                            type="number"
                            onChange={(e) => this.handleInputChange(e, i, 'x')}
                            className="form-control"
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            onChange={(e) => this.handleInputChange(e, i, 'fx')}
                            className="form-control"
                        />
                    </td>
                </tr>
            );
        }

        return (
            <Container>
                <Table bordered style={{ width: '30%' }}>
                    <thead>
                        <tr>
                            <th>X</th>
                            <th>f(x)</th>
                        </tr>
                    </thead>
                    <tbody>{inputFields}</tbody>
                </Table>
            </Container>
        );
    };

    renderforminputpoint = () => {
        const inputFields = [];
        for (let i = 0; i < this.state.npoint; i++) {
            inputFields.push(
                <tr key={i}>
                    <td>
                        <input
                            type="number"
                            onChange={(e) => this.handleInputPoint(e, i)}
                            className="form-control"
                        />
                    </td>
                </tr>
            );
        }

        return <Container>{inputFields}</Container>;
    };

    render() {
        return (
            <Container>
                <Form>
                    <Form.Group className="mb-3">
                        <Container className="inin">
                            <Form.Label>Input N</Form.Label>
                            <input
                                type="text"
                                id="n"
                                value={this.state.N}
                                onChange={this.inputN}
                                style={{
                                    width: '20%',
                                    margin: 'auto auto',
                                }}
                                className="form-control"
                            />
                        </Container>
                        {this.renderUserInputForm()}
                        <Container className="inin">
                            <Form.Label>Input (n) point</Form.Label>
                            <input
                                type="text"
                                id="equation"
                                onChange={this.inputNPoint}
                                style={{
                                    width: '20%',
                                    margin: '0 auto',
                                }}
                                className="form-control"
                            />
                        </Container>

                        {this.renderforminputpoint()}
                        <Container className="inin">
                            <Form.Label>Input value</Form.Label>
                            <input
                                type="text"
                                id="equation"
                                value={this.state.value}
                                onChange={this.inputValue}
                                style={{
                                    width: '20%',
                                    margin: '0 auto',
                                }}
                                className="form-control"
                            />
                        </Container>
                    </Form.Group>

                    <Button variant="dark" onClick={this.calculateRoot}>
                        Calculate
                    </Button>
                </Form>
                <br />
                <h5>Answer = {this.state.X.toPrecision(7)}</h5>
            </Container>
        );
    }
}

export default Newtondivide;
