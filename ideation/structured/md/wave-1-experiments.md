# Wave 1 Experiments - Methodological Development

The purpose of this wave of experiments is to develop a version of the reference dependent
dst using task switching where effort demand is manipulated by a response time window. I'm
envisioning two experiments:

* A version that closely matches the visual search version, using a small set of window
    times framed around a constant reference point.
* A version that varies the window time parametrically, constrained such that there are
    trials where the same outcomes are framed as gains or losses.

## Experiment 1

**Things to get clear on:**

* Overall length in min {30, 45, 60}
* Run online or in lab?
* How to get a measure of individual differences in switch costs in the practice phase
    * Might be better to just compute that composite measure of ability using RTs and
        error rates
    * But like the whole point of the whole calibration thing is to get a sense of
        individual variability in ability...
* How to control for individual differences in risk preferences?
    * See methods of [this](https://www.sciencedirect.com/science/article/abs/pii/S0006899309013213?fr=RR-1&ref=cra_js_challenge) paper.
    * Also [here](https://escholarship.org/uc/item/9pm4x231)
    * Challenges around measuring individual differences in risk preference ([paper](https://www.frontiersin.org/articles/10.3389/fpsyg.2011.00298/full)).
* Consider incorporating Cog-ED
* How to control for time costs?
* Need some way to control for accuracy bias
* Ensure relatively equal effort sampling (ie, no choice trials; Mason et al)
* The response window manipulation
    * Might not actually be manipulating effort demand for really easy levels
        * If they would've responded before the deadline anyway, the difference between
            two upper bounds on the RTs seems irrelevant.
    * For really difficult levels
        * Might not engage effort intensity if Ps no longer perceive efficacy of their
            efforts
    * We'd want a different window for switch vs. repeat trials
    * The window can probably be calculated based on quantiles of the subject-specific rt distribution
        * This implies an initial practice phase to get those quantiles in the absence of a window
        * And a second phase where they get experience with the different windows, and any adjustments to the windows
            to account for differences in how hard they were trying in the practice... something like that.

### Procedure

**Practice.**

*Random thoughts.* 

**Effort calibration.** For each subject, we get 3D data of difficulty
level (ie, response window time) X transition X accuracy. Fit a simple
logistic function for each subject where:

$$
logit(\text{accuracy}) = \beta_0 + \beta_1 \cdot X_{1} + \beta_2 \cdot X_2 + \beta_3 \cdot X_1 \cdot X_2
$$

Where $X_1$ is response time window and $X_2$ is transition, $x_2 \in
\{\text{0, 1}\}$.

Then I'll need to program from scratch in JavaScript an OLS to find the
parameter values. This will be difficult bc it's a three dimensional
regression equation (see [here](https://mathworld.wolfram.com/LeastSquaresFitting.html) for math).

Yea no that seems way too complicated. I think just call out to python and
do something like [this](https://www.statsmodels.org/stable/examples/notebooks/generated/formulas.html)

We'll want to simultaneously administer practice while getting an individual estimate of
demand level. It'll be important for Ps to explicitly see the ms of the time window when
experiencing the trial, so they can form an association between length of time window and
effort demand. Look back to the Ceyda papers to get a sense of how to calibrate effort
demand (and keep in mind that they felt they didn't extend the range far enough to the
difficult end). 

*Trial sequence.*

* Receive general instructions
    * You should respond as quickly and accurately as possible regardless
* Perform five trials per time window
    * Increase until incorrect or timeout on all five trials
    * Need to consider some minimum safeguard (ie, someone who isn't trying or paying
        attention)
    * Have the level of time window displayed on each trial
    * Will prob want to keep the number of switches in the run constant
* A separate slide telling them 'the response window is now decreasing to X ms'
* We'll want the difficulty gradient to be such that practice lasts [3, 5] min.
* Look back to the sayali preprint to see what those sigmoid methods were for determining
    difficulty per subject

**Main task.**

* Largely the same as visual search and previous versions of risky dst
* Calibrate choice set from individual performance
*
