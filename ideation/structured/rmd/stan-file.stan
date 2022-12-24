data {
    int LENGTH;
    vector[LENGTH] Y;
}
parameters {
    real<lower=0> lambda;
}
model {
    real alpha;
    real beta;
    alpha <- 1.0;
    beta <- 1.0;
    lambda ~ gamma(alpha, beta);
    Y ~ exponential(lambda);
}
generated quantities {
    real pred;
    pred <- exponential_rng(lambda);
}
