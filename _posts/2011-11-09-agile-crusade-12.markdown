---
layout: series
title:  "My Crusade for Agility: Part 12"
date:   2011-11-09
category: agile-crusade
tags: ['agile']
part: 12
---

Welcome to the 12th installment of My Crusade for Agility. My crusade began
nearly two years ago when I changed employers. In that time I have seen more
change than I would think many developers have seen in their entire career.
Fortunately, I've got a great team to work with who are all on board with
implementing changes that allow our team to be more adaptive.

We're doing a lot of good things that include but are not limited to:

* test driven development
* pair programming
* a weekly code kata
* continuous integration
* automated deployments
* automated database migrations
* contributing to open source
* development sprints


Fairly recently we added some monitors in our common development area that
displays all of our builds on one monitor and scrolls through each build
individually (to show more details for each build) on the other monitor.
We also recently got some new (awesome) laptops for our development machines and
added a third pairing station in our development area. 

We also did a bit of redecorating. We raised some desks to standing height
(like the rest of our desks) for both our build display monitors and a dedicated
IE testing machine (see below). We also added some shelves for our growing
library of technical books. 

Our team has grown quite a bit recently also. When I first started there was
myself and 2 other developers working on our project, now we have 3 full time
web developers, 1 part time web developer, 1 half web developer / half manager, and
3 developers who have been primarily supporting the legacy system who are
recently getting more involved with web development.

Another challenge
Along side all of the agile adoption changes that have been going on there has
been another very important thing happening. We are transitioning from our
legacy desktop application technology (written in PC Cobol) to the web (written
in Python). We are trying to approach this as iteratively as possible, swapping
out components and sub-systems and integrating with the legacy system where
necessary. This is a fairly significant amount of work to do, but the challenge
is training ourselves.

The fact that the replacement system is written in a completely different
technology for a completely different platform makes the transition very
difficult for the developers and maintainers of the legacy system. Also, the fact
that the legacy system is so vast with a large number of undocumented features
complicates the process of providing the same business value in a new platform.
We need to simultaneously iteratively develop a replacement product and train the
existing developers in the new technology and the new developers on the legacy
system. The technical training is more than just learning a new language or
platform, it's also learning OOP, Python, JavaScript, CSS, HTML, HTTP, SQL (and
relational databases), etc, plus all of the various open source libraries that
we use.

To help with the technical training we started doing a weekly code kata. We
started with Uncle Bob's bowling kata to practice pair programming and TDD. We
have had quite a few katas now, each has added some type of functionality to our
original bowling game, and have largely focused on pairing/mentoring and TDD. I
have found that the katas that seem to go the most smoothly are those that we
start with some failing acceptance tests.

That concludes part 12 of My Crusade for Agility. Thanks for reading and I hope
you check in again for future installments.
