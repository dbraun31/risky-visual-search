# https://towardsdatascience.com/logistic-regression-from-scratch-in-python-ec66603592e2


library(tidyverse)

### simulate data

d <- data.frame(x = runif(1000, -100, 100))

## params
b0 <- .25
b1 <- .00159
ps <- plogis(b0 + b1*d$x + rnorm(nrow(d), 0, .2))
d$y <- ifelse(ps > .5, 1, 0)


## r glm
m1 <- glm(y ~ x, data = d, family = binomial(link = 'logit'))


## from scratch

loss <- function(y, y_hat){
    loss <- -mean(y * log(y_hat) + (1-y) * (1-log(y_hat)))
}

