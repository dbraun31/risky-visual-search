# Modeling

This is a homepage for everything related to modeling before observing the
data---eg, model specification, model simulation, parameter recovery,
hypothetical hypothesis testing, etc.

I think the two main modeling approaches I'll be interested in using are
modeling a prospect-theory inspired cost function, and a sequential
sampling approach that's informed by mouse hover behavior. 

## Modeling sandbox

This is a space for general learning exercises that I'm 
undertaking prior to diving into this modeling more formally.

* [[bayes-play|Bayes play]]
    * A document where I follow along with this first tutorial in [this](https://link.springer.com/article/10.3758/s13428-016-0746-9) paper to use `rstan` to recover the lambda parameter of a simple exponential model.

* [[prospect-theory-modeling-tests|Prospect theory modeling tests]]
    * Doing initial tests of simulating data from prospect theory and recovering parameters from a model implemented in stan. Not worrying about group-level effects here, just assuming a single set of parameters.

## Cost function

* See [here](https://doi.org/10.1016/j.jmp.2010.08.006) for fitting hierarchical Bayesian model to CPT.
* Great overview of fitting prospect theory with MLE [here](https://www.thegreatstatsby.com/posts/2021-03-08-ml-prospect/).
    * Sample risky choice data [here](https://github.com/paulstillman/thegreatstatsby/blob/main/_posts/2021-03-08-ml-prospect/data_all_2021-01-08.csv).

I think a great way to piece this all together is to first get the full, hierarchical model specification from [here](https://doi.org/10.1016/j.jmp.2010.08.006), get intuitions for defining a likelihood function from [here](https://www.thegreatstatsby.com/posts/2021-03-08-ml-prospect/), and get intuitions for implementing a Bayesian hierarchical model in stan from [here](https://www.youtube.com/watch?v=QqwCqPYbatA).


How to integrate all the individual difference control measures?

Check out [this](https://www.biorxiv.org/content/biorxiv/early/2022/05/07/2020.10.09.333310.full.pdf) paper for integrating computational model estimates into regression equations.

## Sequential sampling
