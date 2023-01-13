---
title: 'Efficient Bayesian Inference with Hamiltonian Monte Carlo'
author: 'Dave Braun'
date: January 13, 2023
output:
    md_document:
        variant: markdown_github
        toc: TRUE
        df_print: 'paged'
        standalone: TRUE
knit: (function(input, encoding, output) {knitr::knit(input=input, encoding = encoding, output='../md/betancourt-bayes-notes.md')})
---





# Hamiltonian Monte Carlo

This is a space for taking notes on a two-part lecture on Bayes and Stan ([part 1](https://www.youtube.com/watch?v=pHsuIaPbNbY), [part 2](https://www.youtube.com/watch?v=xWQpEAyI5s8))

Starting by scoping out a 2d space between sample size and model complexity. Saying that as sample size gets bigger, it's harder to fit more complex models. He aspires to specify complex, scientifically meaningful models and fit them to big data.

A solution is MCMC. Bayesian inference is nice because everything you need for inference is in the posterior distribution.

To answer statistical questions about parameters, one can either use optimizations or expectations:

$$
\begin{align*}
f(\hat{\theta}), \hat{\theta} = \text{argmax}\pi(\theta)\\
\mathbb{E}[f(\theta)] = \int d \theta \pi(\theta) f(\theta)
\end{align*}
$$

He's arguing that expectations are the only things that make sense in high dimensions. He goes into some math as to why, but it's a bit beyond me.

A challenge is that computing integrals in high dimensional systems is computationally hard. Constructing a posterior is straight forward. So MCMC is essentially just a way of computing an integral in high dimensions.

## Stages of MCMC

* Warmup
    * The algorithm runs for a bit until parameter estimates generally settle down over iterations.
    * Goes into a bunch of math. You essentially need to reach an equilibrium convergence.
    * You run into trouble if a parameter has a multi modal distribution
        * Which is why you need to run multiple chains
        * MCMC not well equipped to handle multi modality
* Sampling
    * Typically a hands-off process, meaning the manual interventions mostly occur in warmup
    * Stressing the importance of inspecting chains visually to look for odd behavior
* Analysis
    * Under mild conditions, Monte Carlo expectations are distributed around the true value
        * $\hat{f} \sim \mathcal{N}(\mathbb{E}[f], \text{MCSE}^2)$
        * $\text{MCSE}^2 = \text{Var}(f) / \text{ESS}$, ESS = effective sample size 
        * Effective sample size is roughly the number of independent samples in the chain, see below
        
$$
\text{ESS} = \frac{N}{1 + 2 \Sigma^N_{n=1}\rho_n}
$$
$\rho$ is a measure of autocorrelation. $n$ is number of lag across iterations. You're essentially summing up autocorrelations across many different lags. ESS gets small as autocorrelation gets big (autocorrelation is bad).

### Inspecting MCMC estimates

In the stan output, you get some summary of parameters having to do with the MCMC chain---look at these to assess whether there was something weird with the chain. 

Talks a bit about model validation and some of the difficulty around generating predictions. I guess predictions are difficult because you only have one dataset, so you can't validate predictions against data that the model hasn't seen (?). 

### Motivating Hamilitonian MCMC

He says this part is math heavy, but there's good reason that this HMC is good for high dimensions.

Yea this is over my head and probably not that important. He's just talking about algorithms trying to efficiently explore high dimensional parameter space.


# Implementation

Essentially what Stan is doing is constructing a high dimensional probability density.

## Program blocks to define Stan model

* data
* transformed data
* parameters (required)
* transformed parameters
* model (required)
* generated quantities 

### Data

Read in stuff externally. 

```
data {
    // program looks in the local R environment for these variables 
    int N;
    int x[N]; // an array
    int offset;
}
```

### Transformed data

Where data gets preprocessed.

```
transformed data {
    int y[N];
    for (n in 1:N) {
        y[n] <- x[n] - offset; 
    }
}
```

### Parameters

```
parameters {
    real<lower=0> lambda1;
    real<lower=0> lambda2;
}
```

### Transformed parameters

Only parameters in parameter block get sampled by MCMC
```
transformed parameters {
    real<lower=0> lambda;
    lambda <- lambda1 + lambda2;
}
```

The four blocks above define the scope of variables from which the model is built. 

### Model

Where the posterior is defined.

```
model {
    // y is distributed as a poisson with parameter lambda
    y ~ poisson(lambda);
    // weakly informative priors
    // essentially defining a range for sampling
    lambda1 ~ cauchy(0, 2.5);
    lambda2 ~ cauchy(0, 2.5);
}
```

### Generated quantities

Allows for post processing (eg posterior predictive checks). Can get random variables to generate pseudo data.

```
generated quantities {
    int x_predict;
    x_predict <- poisson_rng(lambda) + offset;
}
```

The order of the blocks is important.

![matrix](matrix.jpg)


## Data types

* int
* real

Can establish upper and lower bounds. 

Stan transforms all variables to unbounded before sampling (via inverse logit). 

Vectors: `real a[10]`  
A few others I'm not getting into. Some special data types for special parameter sets. 

### Usual control statements

`if/then/else`

`for (i in 1:I)`  
`while (i < I)`

### Model sampling

Statements can be vectorized

Instead of defining a distribution for each element, define across entire vector at once.

`y ~ normal(mu, sigma)`

`mu` and `sigma` can be scalars or vectors. 


## Example

Does some crazy stuff to fit a 2d trend with a moderator.

















