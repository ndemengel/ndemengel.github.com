---
layout: post
theme:
  name: twitter
title: Implementing a Java-Like Mapped Diagnostic Context (MDC) for Logging Within an Express Application
category: nodejs
tags: [nodejs mdc context logging express bunyan continuation-local-storage]
---
Common Java loggers (Log4j, Logback, etc.) implement a Mapped Diagnostic
Context (MDC), i.e. a simple map that is associated to the current thread. This
allows for storing contextual information to be logged together with whatever
message is emitted by the application.  
Typically one will want to log:

- which user/session is responsible for the currently logged statement (for
audit purposes)
- which request led to a given action (for debugging purposes, how actions are
correlated one to each-other)

Being fully asynchronous, nodejs does not allow for attaching such a context to
a thread. Fortunately, some smart people are currently
[introducing into node](http://nodejs.org/docs/v0.11.11/api/process.html#process_async_listeners)
a way of following asynchronous execution stacks, to which a context map can be
attached.  
For now, [a shim is available](https://github.com/othiym23/async-listener), and
[node-continuation-local-storage](https://github.com/othiym23/node-continuation-local-storage)
already allows for persisting contexts.

As an example of it, I set-up an [Express](http://expressjs.com/) application
using `continuation-local-storage` to initiate a logging context for each
request and then pass it to [Bunyan](https://github.com/trentm/node-bunyan)
every time something is logged.

You can find the example [on my Github account](https://github.com/ndemengel/node-mdc-example).

