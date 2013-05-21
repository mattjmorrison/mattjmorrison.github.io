---
layout: post
title:  "My Crusade for Agility: Part 3"
date:   2010-10-01
---

Welcome to the third installment of My Crusade for Agility. In the first two
parts, I outlined the beginning of my career as a professional developer. I
didn't really know what it meant to be agile, but I knew about some of the agile
practices (like pair programming and tdd) and I really liked what I was seeing
and hearing, but not yet doing. I wanted to be in a place where I could develop
that way, I wanted to have more control over my own environment and be able to
change it when it was not working. Part two left off with me deciding to accept
an opportunity with a new employer. I felt confident that this new employer could
provide me with the type of environment that I was seeking.


My new employer was a significantly smaller company, which was very appealing to
me. Here I might have some say in what goes on, my opinions and ideas might be
heard, and really listened to, and maybe even implemented. I knew going into it
that the team that I was going to be working with was using Linux (as opposed to
Windows like the rest of the company), MySQL instead of DB2, Apache instead of
IIS and Python instead of Perl. Since the "corporate standard mold" had been
broken, I was sure that they would be receptive to new ideas. I just need to
build up some street cred and get past "the new guy" phase so I can start
throwing some ideas into the ring.


Right off the bat, there were some things that concerned me. They were using a
web framework that they had developed in house, which was less than ideal. Their
proprietary framework was similar to the Java Servlet API, which is not a problem
in and of itself. The problem was that there was not really any other organization
or structure beyond that. There were HTML strings being pieced together, SQL
strings being built, and business logic all happening in the same Python method.
My first day on the job I was given a project, a new subsystem for this
application. After digging through the existing code base and not seeing any
indication of some sort of MVC structure I asked if I could write this new
subsystem using the Django framework.

I thought that introducing a popular, robust, open source solution for something
that they had historically done themselves could score some popularity points for
me. I think, on my first day, I still had that "new guy smell" or something
because nobody was really interested in letting me change everything they'd
already done. So I played ball, I developed the new subsystem using their
proprietary framework (with the addition of my own MVC layer on top of their
framework). I did, however, introduce jQuery to do some ajax autocomplete in my
subsystem, which was well received. I think the introduction of jQuery opened
some minds to the use of open source frameworks.


The company agreed to send myself and another developer to PyCon and after the
conference, and once jQuery had been accepted, and with my persistent inquiries
into using Django, and the help of Cal Henderson's "Why I Hate Django" PyCon
talk they finally caved in. (Apparently Cal's take on Django backfired, luckily
for me, thanks Cal.) We took a few months to re-write the entire application
using Django. I felt like this was a huge step forward. We now had an ORM, a
full MVC, and a huge, active community helping us do our jobs. This was only the
beginning, more, even greater changes were coming.

Check back soon for part 4 of My Crusade for Agility.
