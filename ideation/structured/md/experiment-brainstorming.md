# Experiment Brainstorming

A mostly unstructured space where I'm just listing out the soup of things I want to
integrate into experiments.

## Higher level ideas

* **Guiding questions**
    1. Are effort costs evaluated relative to a reference point of effort intensity?
        * Does sensitivity to changes in intensity increase or decrease from reference?
    2. How is this evaluation different depending on whether costs are experienced or
       imagined? 
        1. Is it a difference in the 'accuracy' of the estimations?
            * Can't say accuracy without some normative definition
            * But maybe ppl more closely attend the outcomes when they're experienced
                * Should be evidenced by mouse hover times and memory
            * I don't know that a decrease in accuracy of estimation would explain
                complete reversal of risk preference across effort contexts if the
                underlying cost function is the same...
                * Oh I think a sampling bias could probably explain it.
        2. Or does experiencing effort lead to adopting a totally different cost
            function?
            * If so, why and how?
                * **This is really the heart of it**
            * How might this shifting of cost functions across contexts be similar /
                different to that of (eg) monetary domain?
        3. What might be the role of visual attention in both of these possibilites?
            * Experiencing effort &rarr; updating cost function &rarr; guiding top down
                attention (competing with bottom up attention) &rarr; choice.

    3. How can this relative evaluation inform the debate between intrinsic vs. opportunity
        costs?
        * Seems to be evidence in support of costs arising from computations that are
            susceptible to biases like framing.
    4. What might be normative reasons for relative representation of effort costs?

### Attention, effort cost and choice

**Hypothesis 1**
...


* **Empirical avenues** (update this in response to changes above)
    * Question 1
        * Build on existing methods
        * Task switching with a response window
        * Manipulate reference point
    * Question 2
        * Manipulate whether performance is interleaved with choice or blocked at the end
            * Expect that cost function inverted across the two contexts
        * Go to lengths to rule out the idea that it's something about attention or
            sampling (ie, this idea that they're just attending differently to the
            information but that the underlying computations / evaluation is the same).
        * A version where visual display of outcomes is mouse hover contingent
            * Expect that mouse hovers over extreme outcomes more in blocked condition
            * Could potentially model with sequential sampling (variation on aDDM).
            * Introduce a causal version by manipulating length of revealing

## Lower level ideas

* **More precise measurement**
    * Measuring effort intensity
        * Calibrate participant-wise effort demand
        * Individual efficacy (might not be different from the above)
        * Reward sensitivity
        * Eye tracking / pupil dilation
            * Would be logistically challenging
    * Measuring effort cost
        * Subjective ratings of effort
            * NASA-TLX
        * Introduce optional breaks
            * Length of break is a dv
        * Cog-ED
    * Continue measuring NFC
    * Measure baseline differences in risk preference
        * Estimate prospect theory parameters in monetary context

* **Controls**
    * Motivation
        * Need for cognition
            * Intersperse risk absent trials to measure preference for effort per se
                * From Mason et al
            * The NFC scale
        * Time aversion
            * Control for time on task in each run of effort trials
        * Error aversion
            * *Post-hoc:* partition subjects according to those who were more error prone
                for the easier effort demands and see if they have the same choice
                patterns (ie, the kool 2010 method)
                * Not exactly sure whether that makes sense in the context of these risky
                    choices, though
    * Overall engagement
        * Intersperse EV unequal trials
        * Attention checks
        * Low accuracy and excessively low RT (ie button mashing)
        * Ask at the end of study about degree of distraction
            * From Inzlicht boredom
    * Reasoning about probability
    * Effort sampling
        * Intersperse no choice trials so Ps experience all effort levels
            * From Mason et al

* **Manipulations**
    * Which task to use?
        * I'd like to go back to task switching because of the more robust effect size
        * But I'll have to deal with the inconsistency compared to E1
        * Can enforce a response time window in task switching to parametrically
            manipulate effort demand. This would require some manipulation validation,
            though.
        * Tasks from inzlicht boredom paper include the add tasks and symbol counting
            task, as well as stroop
    * Include mouse-hover contingent outcomes
        * This should provide a way to get at the influence of attention on choice
    * Anchoring the reference point high / low
        * Doing so on each trial
            * Effort demand randomly selected
            * Then presented with choices about reductions / increases
    * Parametrically manipulate effort demand to allow for fitting computational models
    * Have Ps indicate (if choosing risky deck) which outcome they want

* **Modeling**
    * Brainstorm some competing candidate models
    * What are ways that parameter estimation could test between competing hypotheses?
    * Sequential sampling models and Bayesian model of expectation dependent evaluation
        ([example](https://psyarxiv.com/2sqyt/)).

* **Misc**
    * Run replications
    * Getting creative about possible converging measures
    * Keeping in mind the distinction between instantaneous vs prospective costs
        * Can do some rapid fire type procedure to test these two
    * Read papers coming out of Shenhav's lab to get a sense of how to incorporate
        modeling and Bayesian hierarchical parameter estimation
    * Remember that each modifcation needs to be motivated by careful consideration of
        questions around the phenomenon. Each addition should help to test between clearly
        outlined competing explanations for the phenomenon.
    * What about framing things as effort prediction errors?
    * From the inzlicht boredom paper
        * Exclusion criteria (specific for investigating boredom):
            * Failed at least one of two attention checks
            * Failed more than 25% of trials on 'effortful but still simple' tasks
            * Self reported at end of study that they did anything else (eg, check phone)
                during the study.
                * They lost 780/2311 Ps over this !!
    * Get some subjective rating of their goals for the experiment
        * eg, get through it with as little effort as possible / learn something new
        * pre and post
        * assess the extent to which their chocies align with their goals
