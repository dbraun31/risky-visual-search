---
author: Dave Braun
date: January 12, 2023
knit: (function(input, encoding, output) {knitr::knit(input=input, encoding = encoding,
  output='../md/prospect-theory-modeling-tests.md')})
output:
  md_document:
    df_print: paged
    standalone: true
    toc: true
    variant: markdown_github
tags: []
title: Prospect Theory Modeling Tests
---
   
# Prospect Theory Modeling Tests   
   
## Simulate data   
   
I'm going to do a pretty simple simulation with a small set of parameters (not nested within subjects or anything), with the usual value function (maybe constraining $\alpha = \beta$) and a greatly simplified probability weighting function.   
   
Overall value for a prospect with two outcomes updated to include a cost function instead of value function:   
   
$$
V = \Sigma~\pi(p)\cdot -Cost(x)
$$   
   
Cost function   
   
$$
Cost(x) = \begin{cases}
-(x)^{\alpha} & \text{if } x \geq 0 \\
\lambda(-x)^{\beta} & \text{if } x < 0
\end{cases}
$$   
   
The scale of $x$ here gets a bit tricky. If I'm manipulating effort demand as a response time window, then effort demand decreases as the response window increases. I think my approach will be to flip the sign of $x$ in the function, which is a bit confusing. But I think it's more important to have the range of the cost function scale with some aversive quantity, rather than just flipping it into a value function. And of course, in keeping with prospect theory, $x$ is coded relative to a reference point.   
   
$x$ reflects the response time window, which is inversely related to objective effort demand and therefore subjective effort cost. That is to say, as there is more time to response, the task becomes less effortful. So, in keeping with mainstream views in the literature, the subjective sense of effort cost $Cost(x)$ scales as a positive, monotonic function of effort demand, which is the inverse of the response time window $-x$. And for simplicity, $\alpha = \beta$. And $\alpha > 1$ to reflect increasing sensitivity in the context of experienced costs.   
   
I'll plot this to make it more clear:   
   
<img src="figures/plot-value-function-1.png" title="plot of chunk plot-value-function" alt="plot of chunk plot-value-function" style="display: block; margin: auto;" />   
   
   
Probability weighting function, modified for simplicity   
   
   
$$
\begin{align*}
\pi(p) = \begin{cases}
p \cdot \gamma & \text{if } p = 0.5\\
1 & \text{if } p = 1
\end{cases}\\
\gamma \in (0, 1)\\
p \in \{0.5, 1\}
\end{align*}
$$   
   
Logistic choice rule   
   
   
$$
p(safe) = \frac{1}{1 + e^{\varphi[V(risky) - V(safe)]}}
$$   
   
Where when $\varphi=0;~p(safe)=0.5$ and the choice becomes more   
deterministically in line with subjective value as $\varphi$ approaches $1$.   
   
So the full set of parameters is $\{\alpha, \lambda, \gamma, \varphi\}$.   
   
Some fixed values:   
   
   
$$
\begin{align*}
\alpha = 1.5^*\\
\lambda = 2\\
\gamma = 0.7\\
\varphi = 0.8
\end{align*}
$$   
   
\* *$\alpha>1$ reflects increasing sensitivity prediction.*   
   
### Run simulation   
   
Let's assume the response time window is manipulated discretely, and standardized relative to individual subjects so it'll be on the scale of quantile. So let's define the space of possible prospects as ($(outcome_1, probability_1; \ldots;~outcome_n, probability_n)$):   
   
   
$$
\begin{align*}
\text{Moderate gain: }[(0, 0.5; 0.5, 0.5), (0.25, 1)]\\
\text{Moderate loss: }[(0, 0.5; -0.5, 0.5), (-0.25, 1)]\\
\text{Extreme gain: }[(0, 0.5; 1, 0.5), (0.5, 1)]\\
\text{Extreme loss: }[(0, 0.5; -1, 0.5), (-0.5, 1)]\\
\end{align*}
$$   
   
   
   
```
##    risky  safe     ssd_p ssd
## 1   -1.0 -0.50 0.5915759   1
## 2   -0.5 -0.25 0.5326997   0
## 4    0.5  0.25 0.4836326   1
## 5    1.0  0.50 0.4538215   0
## 11  -1.0 -0.50 0.5915759   0
## 21  -0.5 -0.25 0.5326997   1
```
   
    
   
   
If I'm not missing anything obvious, these tests are strongly pointing to the idea that probability of choice is *strongly* influenced by the absolute levels of $x$. The ordinal predictions aren't, but the effect size totally is...