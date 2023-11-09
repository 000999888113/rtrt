const math = require('mathjs');

function cubicSplineCoefficients(x, y) {
    const n = x.length - 1; // Number of intervals
    const h = [];
    const alpha = [];
    const l = [];
    const mu = [];
    const z = [];
    const c = [];
    const b = [];
    const d = [];

    // Calculate the h values
    for (let i = 0; i < n; i++) {
        h[i] = x[i + 1] - x[i];
    }

    // Calculate alpha values
    for (let i = 1; i < n; i++) {
        alpha[i] = (3 / h[i]) * (y[i + 1] - y[i]) - (3 / h[i - 1]) * (y[i] - y[i - 1]);
    }

    // Solve for l and mu
    l[0] = 1;
    mu[0] = 0;
    z[0] = 0;

    for (let i = 1; i < n; i++) {
        l[i] = 2 * (x[i + 1] - x[i - 1]) - h[i - 1] * mu[i - 1];
        mu[i] = h[i] / l[i];
        z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
    }

    // Initialize c, b, and d
    for (let j = 0; j <= n; j++) {
        c[j] = 0;
        b[j] = 0;
        d[j] = 0;
    }

    l[n] = 1;
    z[n] = 0;
    c[n] = 0;

    // Solve for c, b, and d
    for (let j = n - 1; j >= 0; j--) {
        c[j] = z[j] - mu[j] * c[j + 1];
        b[j] = (y[j + 1] - y[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3;
        d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
    }

    // Return the coefficients for each segment
    const coefficients = [];
    for (let i = 0; i < n; i++) {
        coefficients.push({
            a: y[i],
            b: b[i],
            c: c[i],
            d: d[i],
            x0: x[i],
            x1: x[i + 1],
        });
    }
    return coefficients;
}

// Example data
const x = [2, 4, 6, 8, 10];
const y = [9.5, 8, 10.5, 39.5, 72.5];

// Calculate cubic spline coefficients
const splineCoefficients = cubicSplineCoefficients(x, y);

// Print the coefficients for each segment
splineCoefficients.forEach((segment, i) => {
    console.log(`Segment ${i + 1}:`);
    console.log(`a: ${segment.a}`);
    console.log(`b: ${segment.b}`);
    console.log(`c: ${segment.c}`);
    console.log(`d: ${segment.d}`);
    console.log(`x0: ${segment.x0}`);
    console.log(`x1: ${segment.x1}`);
    console.log('----------------');
});

// Function to calculate f(x) for a given x
function cubicSplineInterpolation(xValue, coefficients) {
    for (let i = 0; i < coefficients.length; i++) {
        if (xValue >= coefficients[i].x0 && xValue <= coefficients[i].x1) {
            const xDiff = xValue - coefficients[i].x0;
            const result =
                coefficients[i].a +
                coefficients[i].b * xDiff +
                coefficients[i].c * Math.pow(xDiff, 2) +
                coefficients[i].d * Math.pow(xDiff, 3);
            return result;
        }
    }
    return null; // Return null if xValue is outside the range of the data
}

// Calculate f(4.5)
const xValue = 4.5;
const result = cubicSplineInterpolation(xValue, splineCoefficients);

console.log(`f(${xValue}) = ${result}`);