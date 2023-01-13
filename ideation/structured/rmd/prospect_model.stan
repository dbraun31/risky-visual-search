data {
    int N;
    int risky1[N];
    int risky2[N];
    int safe[N];
    int choice[N];
}

parameters {
    real<lower=0> lambda;
    real<lower=0> alpha;
    real<lower=0> gamma;
    real<lower=0> phi;
}

model {
    real sv[N];
    real risky1v[N];
    real risky2v[N];
    real safev[N];
    
    // priors
    lambda ~ normal(1, 3);
    alpha ~ normal(1, 3);
    gamma ~ normal(1, 3);
    phi ~ normal(1, 3);
    
    for (i in 1:N) {
        if (risky1[i] < 0) {
            risky1v[i] = lambda * (-risky1[i])^alpha * (0.5*gamma);
            risky2v[i] = lambda * (-risky2[i])^alpha * (0.5*gamma);
            safev[i] = lambda * (-safe[i])^alpha;
        } else {
            risky1v[i] = -(risky1[i])^alpha * (0.5*gamma);
            risky2v[i] = -(risky2[i])^alpha * (0.5*gamma);
            safev[i] = -(safe[i])^alpha;
        }
        sv[i] = inv_logit(phi * ((risky1v[i] + risky2v[i]) - safev[i]));
    }
    choice ~ bernoulli(sv);
}
