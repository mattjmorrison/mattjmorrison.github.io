---
layout: post
title:  "Continuous Integration: Where working code goes to die"
date:   2012-07-12
---

It all started on July 1st, 2012, our continuous integration server (Ubuntu running Jenkins) was
maxing out the CPU due to the leap second bug and had to be restarted. After the restart, Jenkins
tried to "catch up", I guess, and kicked off a whole bunch of builds. Much to my surprise, many
of the builds failed. After sifting through the failures, I realized that most of them had not run
in months which isn't surprising considering that the code in the corresponding repository also had
not changed in months. But what was going on here? No code had changed, yet the build was somehow
mysteriously broken.

Let's take a step back and review our development process. We do test driven development and use continuous
integration. Let's start with a quick TDD recap.

Our mantra is Red, Green, Refactor...

1. Write a failing test.
2. Run it.
3. Make sure it fails for the reason we expected.
4. Write code to make it pass.
5. Run the test.
6. Refactor our code (to make it right vs. just making it work).
7. Run the test.
8. Go to Step 1

That happens until a feature is complete and ready to be delivered to a QA environment. At that time
the code changes are pushed to some central location and a continuous integration server is notified
of that change (either via polling or post-receive hook). Continuous integration then will run a
barrage of tests, some static analysis, code complexity, coverage stats and generate a bunch of neat
charts and graphs and give you all kinds of interesting information about your code.

Then, assuming that our tests all pass and that our code complexity and quality are within the allowed
thresholds a deployment job is triggered and our code is delivered to the target QA environment. That's
great! Code is changed, tested, measured and delivered. Process complete, success, everybody is happy
and everybody wins!

Then what happens? Say you've gone through this process, your application is live and stable and being
used every day. The users are satisfied and you have moved on to developing a different component. Your
original repository is not changing, your CI environment is not running any tests or giving you any
feedback about the status of your production code. It is still living breathing production code, but it is
not being tested anymore. But why would it need to be tested when it isn't changing? I'll tell you why, just
because your code is not changing does not mean the rest of the world stopped changing also. What about:

* Newer versions of dependencies
  - there could be bug fixes, deprecations or changes to the api
* Server Updates
  - New OS versions, OS package updates
* Newer versions of your language
  - Java, Python, Ruby, whatever
* Newer versions of Browsers
  - that may or may not be compatible with your version of Selenium or your client side code

Running tests when code changes is not frequently enough, especially when code is not changing. I know that
from now on our builds will not only be triggered by code changes but also run on a periodic schedule, probably
daily. So that as soon as something changes (code or not) that will cause a build to break I will know about it.
A build that has been broken for months but never run is just not fun to fix.