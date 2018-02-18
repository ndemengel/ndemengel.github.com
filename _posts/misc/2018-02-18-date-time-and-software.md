---
layout: post
theme:
  name: twitter
title: 'Date, time, and software'
category: misc
tags: [date, time, time zone, java, javascript, mongodb]
---
Today I've decided to get a refresher regarding date & time handling in software, especially in Java, JavaScript and MongoDB, which I happen to use a lot at work.

Well, the Internet being what it is, I've learnt a lot about time in general. Time is hard, humans struggle to get a stable measure and sufficient accuracy for their applications. Actually, we also have difficulties to define the very notion of time. Here are some Wikipedia articles that I've found of interest:
* [Time](https://en.wikipedia.org/wiki/Time), for the notion of time itself
* [Solar time](https://en.wikipedia.org/wiki/Solar_time)
* [Sidereal time](https://en.wikipedia.org/wiki/Sidereal_time)
* [International Atomic Time](https://en.wikipedia.org/wiki/International_Atomic_Time)
* [Universal Time](https://en.wikipedia.org/wiki/Universal_Time)
* [Leap second](https://en.wikipedia.org/wiki/Leap_second)

Here are some lessons learnt (or re-learnt), and other considerations. I may be wrong about some of them (if you happen to read this, please correct me!). When in doubt, I've read more docs and source code (java.time, MongoDb driver, Jackson), and have run various JS and Java unit tests or MongoDB manual tests.
I record those considerations here for future reference or in case it can help anyone. No reference is provided, as this post exists mostly for me, I and myself; plus it is straightforward to find the documentation and source code of the projects mentioned below.

* Java's `Date` is only a long counting milliseconds since Unix epoch, GMT. It doesn't care about time zone except for its `toString()` method which formats the date/time according to system's time zone. The `Calendar` utility type has been an (awefull) way of working around the limited Date. Thanks to Java 8's time API, we don't need it anymore.

* One should not compute the difference between two Unix times, since it might not equal to the duration in seconds of the period between the corresponding points in time, [due to leap seconds](https://en.wikipedia.org/wiki/Unix_time#Leap_seconds).

* JavaScript's `Date` type is a copy of Java's one, therefore it acts the same way.

* MongoDB's `ISODate` is a JavaScript `Date` and thefore it also represents date/times as a number of milliseconds since Unix epoch, GMT. Also, dates are then stored in BSON as 64bits signed integers.

* Java 8 brought a far better time API, based on the awesome work made on the Joda Time library. That said Joda Time still has some more features (see later), but it is now possible to work efficiently with time in Java. Still, one has to use the right tool for the problem at hand.

* Some DB drivers and libraries took time before supporting the Java 8's time API but now the problem seems to be solved: JDBC, JPA, Hibernate, Spring Data MongoDB, Jongo + Jackson all supports those types. That said, it may not always be practicable to use to the "new" types within a code base that started its existence when they weren't there (especially when it comes to interract with existing data).

* If directly mapping Java 8's time types to data is not possible, there are several possibilities - depending on the problem to solve:
  * only store instants a number of milliseconds since Unix epoch GMT, i.e. direclty map old `Date`s
  * also explicitly store the type of data one wants to represent (for instance, a date without time)
  * additionnally store the time zone if there is a risk to use/present the wrong date to a user<br><br>

* Some examples and problems that came to my mind:
  * When storing the instant of an event, using the old `Date` implementation previously described is OK as it designates the instant without ambiguity (that is... if one keeps in mind the previous points).
  * When storing the date of an event (as opposed to the instant, meaning that the event spans a whole day and time is irrelevant), using the old `Date` implementation may also be OK as long as one chooses a convention for the time part that will be stored, and sticks to it. A possible convention being to always store such dates with the time set to "00:00:00.000".
  * Related to previous point: an event spanning a day somewhere on the Earth may be better stored with a time zone if we need to tell to someone else on the planet when it starts and when it ends from their point of view.
  * An event spanning a day may be even better represented by a time range with a time zone.
  * When users do something (say posting a message) and we want to record at what time it was from their point of view (was the message posted during the night?) we need to collect and store their time zone together with the date/time.
  * Should two people A and B located at two opposite sides of the World decide to do something together via an application, how should the application store and present the start time of the event? Using the time zone of A, of B? That looks more like a problem that should be adressed by the domain model rather than like a purely technical problem.<br><br>

* Java 8's time API doesn't provide an `Interval` or `TimeRange` concept (a period of time between two instants, e.g. "2018-02-18T12:21.13.017Z to 2018-02-18T13:18.53.961Z"). It only features a `Duration` concept (e.g. "2 minutes") and a `Period` concept (e.g. "3 months and 4 days"). Joda Time does provide an `Interval` concept. But it doesn't seem too difficult to create an `Interval` type though, from two `ZonedDateTime`s.

* The apparent overlap between `ZonedDateTime` and `OffsetDateTime` disturbs me, and [it looks like it did also disturb Stephen Colebourne](https://github.com/ThreeTen/threeten/issues/148) (creator of Joda Time and lead architect of Java 8's time API). As far as I understand the thing, `OffsetDateTime` only supports time offsets but doesn't support time zones or daylight saving time rules, and exists to accommodate for the same limitations in other products, for instance database using ANSI SQL.
