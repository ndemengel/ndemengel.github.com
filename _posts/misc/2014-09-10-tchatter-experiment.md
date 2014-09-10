---
layout: post
title: 'Tchatter Experiment: Scalable App, Deployable Without Service Interruption'
category: misc
tags: [nodejs express websocket ansible docker angular redis]
---
## Introduction

Some months ago, my colleague [Sylvain Chabert](https://www.linkedin.com/in/sylvainchabert) and I started to study together some technologies and tools frequently encountered in blog posts, conferences and so on, during our lunch times. The idea here being to go further than what we already did separately: either only reading about those tools or merely coding "hello world"s. As often, being two people helped us keeping focus and increased our motivation.

I propose to quickly sum up one of those experiments in this blog post: the development of scalable chat application, deployable without service interruption. The main technologies/tools involved are: nodejs, WebSockets, Docker, Ansible, and some AngularJS.

We knew <abbr title="Ansible, Mocha, Chai, Sinon">some of the tools</abbr> well, we already had given a try to <abbr title="Node/Express, Angular, Docker, Vagrant, WebSockets">others</abbr> without further use, and <abbr title="Grunt, Bower, Karma, Protractor, WebdriverJS, SockJS">a last bunch of those</abbr> tools were totally foreign to us.

(For me, it was also my first time doing real stuff using IntelliJ rather Eclipse, and it definitely convinced me.)

This post only keeps a raw record of what we wanted to achieve, how we proceeded, and what we learned. For technical details, the code is available [on my Github account](https://github.com/ndemengel/tchatter).

## Development Phases

This experiment has been developed in two very distinct phases, the second one being based on the work made during the first phase. Here is a description of those phases.

### Phase 1: Web App Built With State-of-the-Art Tools and Practices

**Objective**

Studying the current state of a commonly-used modern JS stack, test first, by developping a simple chat application: _Tchatter_.

**Tools**

Node/Express, Angular, SockJS, Grunt, Bower, Mocha, Chai, Sinon, Karma, Protractor, WebdriverJS

**Duration**

~2 weeks of lunch breaks, mostly during April.

**Comment**

Everything has been coded with several tests first, at least one test by "layer" concerned (server, client) and one end-to-end test. This process was a bit dumb (some things were tested several times) on purpose, to force us in using all tools we wanted to discover (namely: Grunt, Karma and Protractor).  
(During phase 2, some of those tests have been removed from the code base).


### Phase 2: Cloud-Like Infrastructure Allowing Zero-Downtime Updates

**Objective**

Diving into the building of a typical "cloud" environment for our application, with zero-downtime deployments via rolling updates and some design best practice.  
Being part of one of our bi-annual free sessions at [Stormshield](http://www.stormshield.eu/), we built it with a specific demonstration scenario in mind. Indeed, we populated our chat with _Reservoir Dogs_ characters who automatically talk to each other — (implemented with an ugly addition in the client part of the app).

**Tools**

HAProxy, Redis, Docker, Ansible

**Duration**

1 week

**Comment**

We started with adding sessions to our application, then we deployed the app as a docker container.  
We then concentrated on sharing messages between two instances of our app, and for that purpose we introduced Redis — as a docker container too — to setup a simple external publish/subscribe mechanism.  
From that point we could introduce HAProxy — once again, deployed as a docker container — to load balance the traffic between several instances of our application.  
We chose Ansible to orchestrate the setup of our architecture, especially to help us in performing "rolling updates".

We were in an extreme prototyping mood with direct feedback, therefore tests have clearly been left behind :-)

As for the "no service interruption part", we're not exactly there. Indeed, on service restart, there is a disconnection/reconnection for each browser client (the WebSocket is recreated) and therefore:

- the client displays that inadequate information because the disconnection event comes from the server, not the client;
- all messages sent by other clients meanwhile are lost for the disconnected client. Upon reconnection, the client should ask for the missing messages.


**Overview**

![Tchatter Infrastructure](https://raw.githubusercontent.com/ndemengel/tchatter/abf30081ac936d8f8a964f3dd890dc699ac08758/doc/free-session-demo.png)


## Feedback

**Angular**: Our web app is not complex enough to have a clear opinion. The double databinding is quite spectacular, but comes at a price: we lost control of the view part,
which can be regained at an expensive cost (directives).

**Protractor**: Can launch many browsers, but only works for angular applications. Besides, it instruments the application, thus changing our tests to white box mode
(for instance, it refuses to launch tests while there is a "setInterval" activity). Instead, we directly used WebDriverJS.

**SockJS**: Cool stuff :) Works perfectly and handles graceful fallback for when WebSockets just won't do.

**Grunt**: Nice tool! There is a plug-in for everything. Next time we should look at Gulp.

**Docker**: Remember, a container is a process, not a VM! For instance, it is of no use to "ssh" into a container.

**Ansible**: rolling updates mechanism is not applicable to docker containers. Ansible allows to loop on hosts,
but containers are not regular hosts (because of the previous point). Our solution can be found [here](https://github.com/ndemengel/tchatter/blob/22bd72147078676053f515e161f983c3f3aec05d/infra/tchatter-app-nodes.yml).

**Redis**: simple pub/sub channels implementation. That said, in our case, we would need some mechanism to ensure no messages are lost if there is no consumer.
