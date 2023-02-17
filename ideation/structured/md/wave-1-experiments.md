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

* How to control for individual differences in risk preferences?
    * See methods of [this](https://www.sciencedirect.com/science/article/abs/pii/S0006899309013213?fr=RR-1&ref=cra_js_challenge) paper.
    * Also [here](https://escholarship.org/uc/item/9pm4x231)
    * Challenges around measuring individual differences in risk preference ([paper](https://www.frontiersin.org/articles/10.3389/fpsyg.2011.00298/full)).
    * Different approaches for eliciting risk preferences ([paper](https://doi.org/10.1016/j.jebo.2012.12.023)).
    * Just ask one question "How willing are you to take risks in general" and 11 point
        response scale.
        * Evidence that responses to this question are associated with risk behavior in
            gambling task ([paper](https://doi.org/10.1111/j.1542-4774.2011.01015.x)).
    * Probably the best one I've seen yet ([paper](https://doi.org/10.1126/sciadv.1701381)).
        * Yea this shows that trying to estimate risk preferences from
            behavioral tasks is real problematic.
        * Other ways to assess the cost function:
            * WTA, visual perception (think sensitivity generally), the mason door / symbol approach, labor supply, Caplin's K ([Ham's paper](https://psyarxiv.com/wubv4/)).
* Consider incorporating Cog-ED
    * Maybe before and after?
* How to control for time costs?
    * Look at Mason et al., for equating run time within some mean and sd
* Need some way to control for accuracy bias
    * Some discussion of it [here](https://psycnet.apa.org/doi/10.1037/xhp0000957)
    * But like how in the heck do you disentangle this from task automaticity?
    * Might just have to swallow this one.
* Ensure relatively equal effort sampling (ie, no choice trials; Mason et al)
    * Also no risk trials
    * Gotta decide on relative proportions
* What about control efficacy?
* How to present outcomes (in what units) to participants in DST


### Procedure

**Practice.**


*Trial sequence.*

* Receive general instructions
    * You should respond as quickly and accurately as possible regardless
* Perform N trials per time window
    * Start around 3,500 ms
    * Decrease until incorrect or timeout on all five trials
        * In increments of ~ 50 ms
    * Need to consider some minimum safeguard (ie, someone who isn't trying or paying
        attention)
        * Or just post hoc check this


**Main task.**

* Largely the same as visual search and previous versions of risky dst
* Calibrate choice set from individual performance
*


*Resolved*

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

