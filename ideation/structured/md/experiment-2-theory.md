---
title: 'Experiment 2 Theory'
author: 'Dave Braun'
date: December 23, 2022
output:
    md_document:
        variant: markdown_github
        toc: TRUE
        df_print: 'paged'
        standalone: TRUE
knit: (function(input, encoding, output) {knitr::knit(input=input, encoding = encoding, output='../md/experiment-2-theory.md')})
---

# Experiment 2 Theory

In this document I will be putting together an absolutely beautiful summary of the theory behind Experiment 2. This theory relies both on [[measurement.md]] and [[stimuli.md]].



## Prospect theory

The form of prospect theory is:

$$
V = \pi(p) \cdot v(x)
$$


Let's look more closely at the probability weighting function:

$$
\pi(p) = \frac{p^{\gamma}}{(p^{\gamma} + (1 - p)^{\gamma})^{1/\gamma}}
$$

Let's look at this function over various parameter level specifications:


![](figures/unnamed-chunk-1-1.png)


This is truly profound.


















