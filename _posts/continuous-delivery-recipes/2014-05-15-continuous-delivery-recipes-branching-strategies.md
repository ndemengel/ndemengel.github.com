---
layout: post
title: 'Continuous Delivery Recipes - Development Flow: Branching Strategies'
category: continuous delivery recipes
tags: [continuous delivery, branching, git, code review]
---
While not directly related to continuous delivery, the strategy you use for branching will affect how you implement your deployment pipeline, and can shorten or lengthen your feedback loop.

Let's make it clear from the beginning, one can't safely do continuous delivery with long-running branches of code. Meanwhile, we may gain some benefits from cleverly using short-lived branches. The point of this article is to present some branching strategies with their advantages and drawbacks.

Preliminary note: while there is no reason the following couldn't work with all SCMs, it will clearly benefit from using git or another tool where branches are first citizens.

## Mainline Only

“Mainline” (a.k.a “trunk”, “master” or “baseline”) is the branch of your repository that contains the latest stable state of your development, and on which all other branches converge. The idea here is to commit only on mainline, which means you won't have any other branches, except maybe for proofs of concept.

In this set-up, features are usually built in a bottom-up approach (user interface last), so that they only become visible when they are ready, with the latest commit that is part of their implementation. Alternatively, [feature toggles](http://martinfowler.com/bliki/FeatureToggle.html) may be used to activate features when the time has come.

What about maintenance branches? When you walk on the path of Continuous Delivery, you deliver, well, continuously... Therefore you won't have any maintenance branch anymore but you will rather implement and deploy fixes as part of you regular development.


Pros:

- The process is *really* easy to explain and follow for new developers.
- Continuous integration is easy to implement too: no silly branches to handle.
- All commits are integrated as soon as they are pushed, no one is left behind.

Cons:

- It takes a fair amount of conscience and control to every developer to ensure that a commit will never break the build or integration tests. Shall the build break, all developers are impacted since they can't push their code until it is repaired.
- It makes it hard to review a set of commits at once, as they may be interleaved with other non-related commits. This might only be an issue if you do code reviews.

Advice:

- It may be more suitable for teams to program in pairs, with highly disciplined developers that launch as much tests as possible locally, before pushing their code.
- As a corollary, all tests should be rocket fast in order for developers to have no excuse not to launch them all before pushing (a pre-push hook or script could then be used to automate this step).


## A Branch per Feature

In this set-up, every feature is developed in its own branch. It is important at this point to define what a “feature” means in this context: it should be the smallest possible development that add a functionality to the system, in order for branches to be integrated into mainline as frequently as possible. Therefore a feature as seen by your client might be implemented as a set of many sub-features as just defined (small sets of related tasks).

Pros:

- Features appear cleanly separated in the SCM.
- With git: one can choose whether to only track the integration of a feature code to mainline (merge in non fast forward mode) or to verse all the feature development history with the code (fast forward mode).
- Code reviews can be made on a per-feature basis, via a diff of the feature branch. This step is a breeze with tools like GitLab (merge requests) or Github (pull requests, using repositories rather than branches).

Cons:

- If one wait for feature branches to be merged into mainline to see the result of integrating them with the other developments, the feedback loop is considerably longer, and the build can break on mainline.
- Alternatively, preventing this effect is possible, but the continuous integration pipeline is more demanding to set-up (see variants proposed below).

Advice:

- Ensure that your feature branches never last more than a few days (2 days seems a good limit for most “features”).
- Adopt one the variants proposed thereafter to keep a short feedback loop.


### Variant 1: Branch Integration on Merge

This variant consists in creating a build pipeline for each feature branch, that will be triggered as soon as code is pushed on the branch. Being kind of annoying to do manually, the idea is to automate the pipeline creation when a branch is detected. The same can be done for branch/pipeline deletion as well. A future article of these series will present a way to exactly do that using GitLab and GoCD, but it could be done with for instance regular git hooks and some Jenkins magic.

Pros:

- The code is now tested on each push, whatever the branch.

Cons:

- Feature branches are still isolated until merged: there is no way to know whether they will integrate well with the other developments, so merging to mainline can still bring its bag of surprises.
- As already written, the automatic pipeline creation can be demanding to set-up.
- Depending on the size of the team and of the project, this strategy may require more machines to execute the pipelines.


### Variant 2: Continuous Branch Integration

This variant goes one step further by merging **all** feature branches in another temporary branch, for each push detected on any of those branches. Tests will then be executed on that temporary branch (and only that branch). I *did not* try it yet, since I've first heard about it two weeks ago, at [Mix-IT](http://www.mix-it.fr/session/381/des-petits-pas-vers-le-continuous-delivery) when the guys behind [LesFurets.com](https://www.lesfurets.com/) presented their own way to continuously deliver.

The idea here is to:

- detect conflicts before they occur,
- *really* integrate all the code at any time.

With this technique, should a conflict be detected:

- either the code can be modified to avoid it,
- or one of the conflicting branches should now depend on the other conflicting one, so that it can be rebased on it.

Note: as far as I know, those guys first merge all branches at once, and should a conflict occur, they retry it one branch after the other, to detect which branches are responsible for the conflict.

Here are the advantages and drawbacks, _a priori_ (once again, I did not test it yet):

Pros:

- All developments are integrated at any time.
- There are only two pipelines to set-up (mainline and the temporary merge branch).

Cons:

- The "merge all" behavior can still be demanding to set-up.


## Conclusion

There is no definite answer to question of the best branching strategies, as it will mostly depend on your team and on your constraints. But it is important to know that there exist several such strategies, and that each one comes with its tradeoffs.

While this article is not exhaustive and only presents my views on branching, I sincerely hope it will bring ideas to some people, me included. So please comment!
