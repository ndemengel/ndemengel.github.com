---
layout: post
theme:
  name: twitter
title: Continuous Delivery Recipes - Introduction
category: continuous delivery recipes
tags: [continuous delivery]
---
We reached a point where most IT organizations have understood the benefits of [Continuous Integration](http://martinfowler.com/articles/continuousIntegration.html) (CI) and a non-negligible part of us have now moved or are moving to [Continuous Delivery](http://martinfowler.com/delivery.html) (CD) or even [Continuous Deployment](http://continuousdelivery.com/2010/08/continuous-delivery-vs-continuous-deployment/). Being something quite demanding to set-up, I think that people moving to CD don't just see it as a hype practice but as a truly worthy one, and that's great!

The aim of these series is not to sell the idea of CD or to describe all of its aspects: some very smart people already wrote about it, as you can read by following the links in the previous paragraph. Instead, I would like to focus on specific examples of practices and tools that can help us in reaching this graal.

Indeed, until recently you couldn't set-up your deployment pipeline without coding or configuring a good load of tools, and without a fair amount of thoughts and tries to organize your development. To be honest, I know there have been some products dedicated to this problem for long, but not anyone can afford their cost!
Fortunately, things are moving fast: new tools are created, some existing ones are open-sourced, and more and more people are sharing about their experience going CD.

During the past year, I had the opportunity to start two projects in a continuous delivery fashion on my assignments. So my team and I have evaluated several tools and approaches. My hope with these series is that sharing about our experience will help someone to adopt CD!

## Provisional Agenda

I plan to write the following articles, in no specific order and without any warranty of completion...

1. [Development Flow: Branching Strategies]({{ BASE_PATH }}/2014/05/15/continuous-delivery-recipes-branching-strategies)
2. **TODO** Versioning
3. **TODO** How to Set-Up a Deployment Pipeline With GoCD
4. **TODO** How to Set-Up Multi-Branch Continuous Integration Using GitLab and GoCD
5. **TODO** How to Manage Multiple Environments With Ansible
6. **TODO** How to Create Fresh VMs Using KVM and Ansible
7. **TODO** How to Quickly Create Fresh Test Environments With Docker
