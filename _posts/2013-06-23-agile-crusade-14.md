---
layout: agile-crusade
title:  "My Crusade for Agility: Part 14"
date:   2013-06-23
category: agile-crusade
part: 14
---

It has been over a year since I have posted an update to "My Crusade
for Agility". In that time, there have been significant changes. The
team has grown: we now have 5 full time developers. There have also
been quite a few other changes:

* We are using dual machine pairing stations
* We are building software using a more service oriented approach
* We are building more rich client JavaScript applications
* We are placing more emphasis on integration testing

## Dual Machine Pairing Stations

![Current Pairing Station][pairingstation]

### Hardware
* 2 - 22 inch monitors
* 2 - Laptops (Either a Lenovo running Mint or Ubuntu or a Macbook)
* 2 - Keyboards
* 2 - Mice

### Setup

Each laptop has one external display. The displays are vertically
positioned so that each person will have an upper and a lower display.
Each keyboard / mouse combination controls only one of the two laptops. The
external displays are typically a full screen terminal widow. Using SSH 
and Tmux, the terminal is a shared session that either person can interact
with.

There are a lot of benefits that I have seen using a dual machine pairing
station over a single machine pairing station. Our previous pairing stations
consisted of a single machine with two mice and two keyboards. This worked
very well, however there were some draw backs. When there is only one machine
it can only do one thing at a time. Only one person can be using the mouse or
typing at a time. This can be an advantage because it forces both individuals
to be fully engaged, however it also can prevent some very beneficial parallel
work from being done. The best example that I have is when the driver is coding
the navigator can be searching docs or writing some quick spike code. One last
thing to note is that we really do not practice pairing with formal driver / 
navigator roles. The way that we pair is probably closer to ping pong pairing
but not quite that strict. I think the best way to describe our method of pair
programming would be to call it a discussion between two developers that results
in software.

---------------
## Service Oriented Approach

When we begin building our web based system in 2009, the plan was to build
a web based replacement for our desktop based product. Somewhere along the
line we realized that we had a suite of products to offer as well as
integration between the products instead of just a single all-in-one product.
The product suite approach has many advantages to both us and our customers,
but I will not dive into that discussion right now.

Originally, we started with a single Django project. At this point we are up
to 12 Django projects and 1 Flask project. In addition to the 13 deployable
projects we also have 16 closed source libraries, 21 open source libraries,
and quite a few other miscellaneous code bases for random other reasons. Just
to throw out a few other random facts: we currently have 16 servers (3 on
EC2 and the rest on our internal cloud) that we manage using Chef and we
deploy our applications using Capistrano and capistrano-django.

Building software using a service oriented approach has a lot of benefits. 

* Everyone is always working in a different repository, so you do not have to
worry about running into merge conflicts (most of the time).
* Features can be deployed in isolation without having to take the entire system
off line.
* Code bases are smaller and more single purposed (so easier to maintain)
* No huge build processes, since most code bases are relatively small

As we continue to go down the service oriented path I see more and more
similarities between system architecture and object oriented design. That is
probably a topic for another time.

---------------
## Rich Client JavaScript

Building rich client applications using JavaScript really seems to fit very
will with a service oriented architecture. Exposing raw data completely decoupled
from how that data is going to be used......


---------------
## More Emphasis on Integration Testing



weekly refocus standup meeting
daily standups


[pairingstation]: /assets/images/agile_crusade/pairingstation2.jpg
[tmux]: /dev/null
[mint]: /dev/null
[ubuntu]: /dev/null
[osx]: /dev/null
[django]: /dev/null
[flask]: /dev/null
[chef]: /dev/null
[capistrano]: /dev/null
[capistranodjango]: /dev/null
[ec2]: /dev/null
