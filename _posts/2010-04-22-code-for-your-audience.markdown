---
layout: post
title:  Code for your Audience
date:   2010-04-22
tags: ['agile']
---

Audience is the most important aspect of and driver behind software. In software,
there are multiple audiences who play a role. Lets take a look at what some of
the audiences are, and what roles they play.

Users. If the user isn't happy, then no body's happy. If the users don't stay
happy, then you don't stay employed. Slow systems, buggy systems, long turnaround
time for bug fixes and enhancements are all things that make users less than
happy. Users thrive on good communication and constant updates. The user is
really a simple creature, and they need simple, straight forward software that
lets them do their job quickly and easily with minimal work and minimal thought.

Developers. If a developer can't quickly decipher what the code behind the
software is doing and why, then they can't do there job effectively. If a
developer can't do their job effectively, then the development time is slower and
more bugs are introduced, which means that the users begin to see the fallout.
When users see fallout, they're not happy, and we know what happens when users
aren't happy.

Tests. Tests run your software, which makes them an audience of your code. The
tests expect a simple api, that is easily testable, mockable, and dependency
injectable. Since tests are also code, developers are the audience of tests, so
the same rules apply to tests as other code. A developer needs to be able to
quickly decipher what the tests are doing and why.

Metrics. Code metrics are also an audience of software. Metrics analyse your code
and give you some objective feedback on the quality, complexity, test coverage,
etc. Making metrics happy usually means having well factored code, which makes
your api(s) clean and concise, which make your tests and developers happy.

Source Control. Version control systems are also audiences to your code. Keeping
a clean, organized, well factored code base makes navigating easier for
developers. The easier 'simple things', like source control, are for developers
the less time they need to spend searching, moving files around, merging changes,
etc. The less time they have to spend on that type of thing, the more time can be
devoted to making the users happy.

Continuous Integration. Continuous integration systems are audiences of not only
your code, but your source control system, the results of your tests, and
metrics, and probably other tools as well. Keeping your continuous integration
system simple opposed to having a bunch of convoluted scripts, will reduce the
burden on developers for maintaining it. The last thing developers need to
maintain is software that maintains the software that those same developers
maintain.

Managers. Managers are a very important audience. If the users are happy but your
manager is not, you will probably still be out of the job. While communication is
also a key part of making managers happy, continuous integration also makes them
happy. Managers love to see charts and graphs that reflect what you've been doing
with your time. They also like to see quick turn around time on bug fixes and
enhancements. Quick turn around time comes from through tests, well factored
code, and good code quality.

Keeping all software audiences happy is a balancing act. If the balance gets off,
things start to break down. Say you've got a large legacy system of poorly
lactored code and no tests or CI system to speak of, but it works, and works
well. The users are happy because the system helps them to get their job done.
The managers will be happy because the users are happy. The developers are most
likely going to be miserable, or even worse complacent. Bug fixes and
enhancements will have slow turn around time, and will undoubtedly introduce
additional bugs. When the users begin to notice the new bugs they'll be unhappy,
and they'll be "bugging" the managers, so they'll be unhappy. Once the
unhappiness trickles down from the users and the managers to the already unhappy
developers, the developers will be come even more miserable and probably will
begin to seek new career opportunities.

It is a vicious cycle, so do it right, and code for all of your audiences.
