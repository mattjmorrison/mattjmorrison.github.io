---
layout: series
title:  "My Crusade for Agility: Part 6"
date:   2010-11-27
category: agile-crusade
tags: ['agile']
part: 6
---


This is the sixth installment of My Crusade for Agility, welcome. I've been
writing about my adventures in implementing agile development practices at my
place of employment. In the past eleven months (since I began working for my
current employer) a lot has changed. We have implemented all of the following
things:

* Co-Locate our team members
* Morning Stand Ups
* Managing our work loads using Story Cards and White Boards
* Added over a thousand Unit Tests (with 72% coverage)
* Started releasing more regularly
* Added a Hudson CI server that runs all tests, coverage, and other metrics with every commit
* Automated Deployments to our test server after successful builds
* Started using jQuery
* Replaced proprietary web framework with Django
* Handle Database schema changes using South migrations
* Automated dependency management with Buildout
* Replaced our proprietary ticket system with Trac
* Started developing on our own Ubuntu machines instead of WindowsXP
* Migrated from Subversion to Git
* Migrated from PyDev to PyCharm
* Started a "library" which consists of the following books
  *  Practices of an Agile Developer
  *  High Performance Websites
  *  Coaching Agile Teams
  *  Test Driven Development: By Example
  *  The Pragmatic Programmer: From Journeyman to Master

There are (at least) two more things that we have began doing, which are to me,
the most exciting. The first of the two is Test Driven Development. TDD is
something that I have been doing for the past few months, but I found myself
falling back into old habits of writing production code first and writing the
tests after or not writing a test at all. TDD takes a lot of discipline and it
is unfortunately easy to not write tests when you are working alone. Now that
I've been doing TDD for a little while, I am much more confident in my
self-discipline to write tests before any code without falling into old habits.


The second new and exciting thing that we've started doing is Pair Programming.
Pair programming is what really helped me to develop my self-discipline for TDD.
With a second pair of eyes, and most importantly a second brain, working through
code and making sure that no code is written without a failing test first, it is
significantly easier to... well... do everything. TDD by yourself is hard,
especially when you're just starting. TDD when you're pair programming, even if
you're just starting with TDD, is much easier because instead of just having that
little voice in your head that says, "it's ok to not write a test for this code",
you've got a real audible voice right next to you saying, "Oh no you don't!".


Looking back 11 months; our code, our process, nearly everything is nearly
unrecognizable. Everyone has welcomed these changes, and has seen success in the
quality of work that has been done since implementing them. We still have plenty
of work to do, but we have come a long way in a very short amount of time. There
are still big plans for the future of our office, both our physical location and
our workflow process, so stop back for Part 7.
