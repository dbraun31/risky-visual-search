// comes from here:
// https://github.com/javascript-machine-learning/logistic-regression-gradient-descent-javascript/blob/master/src/index.js

// almost giving up, but try:
// https://stats.stackexchange.com/questions/344309/why-using-newtons-method-for-logistic-regression-optimization-is-called-iterati


function glm(X, y) {
    // assuming X and y are both vectors (ie, X is one dimensional)
    // returns coefficients of a logistic regression
    
    m = y.length;
    n = X[0].length;

    // append intercept to data
    X = math.concat(math.ones([m, 1]).valueOf(), X);

    // create zeros beta vector
    // beta = Array(n + 1).fill().map(() => [0]);
    beta = [[0], [0]];

    // gradient descent hyper parameters
    const ALPHA = 0.01;
    const ITERATIONS = 400;

    // perform gradient descent
    beta = gradient_descent(X, y, beta, ALPHA, ITERATIONS);

    return beta;
}

function sigmoid(Z) {
    let y_hat = math.evaluate(`1 ./ (1 + e.^-Z)`, {
        Z,
    });
    return y_hat;
}

function gradient_descent(X, y, beta, ALPHA, ITERATIONS) {

    const m = y.length;

    for (let i = 0; i < ITERATIONS; i++) {
        let y_hat = sigmoid(math.evaluate(`X * beta`, {
            X,
            beta,
        }));

        beta = math.evaluate(`beta - ALPHA / m * ((y_hat - y)' * X)'`, {
            beta,
            ALPHA,
            m,
            X,
            y,
            y_hat,
        });
    }

    return beta;
}

