---
layout: post
title:  "Learning Rails: Part 1"
date:   2011-07-23
---

I was recently approached at my place of employment by a co-worker with an idea
for a startup. The idea was great, so I was on board, but I needed to decide what
technology to choose. By day, I write Python and use Django. I'm very comfortable
with that stack, so initially my brain went right to Django. I love Django, but
I've got an opportunity to expand my horizons so why not?


I also considered using at Scala and Lift, Python or Java on Google App Engine,
or some new hotness that I don't even know about. In the end I landed on Ruby on
Rails for a few reasons. The main reason is that since I've been attending the
Iowa Ruby Brigade it seems like the Ruby and the Rails communities are very
dedicated to testing. Cucumber and RSpec are two examples of things that I have
just barely began to use but I already almost can't imagine not being able to use
them.


So, I chose Ruby on Rails (Rails 3) to start this new project with and my
intention with this blog series is to document my learning experiences. I've
really just gotten started, I've got 11 Cucumber scenarios and 10 RSpec unit
tests, I've got one model with about 40 lines of code and one controller with
about 30 lines (lines include white space). This is really the first real Rails
code I've ever written (thanks JR for helping me get started). I've messed around
with Rails in the past, but that usually consisted of me scaffolding some model,
playing with the UI, not knowing what to do next and leaving it at that.


Once I got into writing something real I was overwhelmed by the magic that is
Rails. The first thing that confused me was the routes. It seems like there are
an overabundance of ways to define routes. I think i settled on just using
'match' for everything because I can have it create the magical `_path` variables
that I can use in my controllers. The first thing that really freaked me out was
that it seems like everything is just always in scope. There are all of these
helper functions and objects that I can just use. I don't know where they come
from or how they get there, but they are there and they are pretty great. It is
pretty overwhelming to not have to 'require' anything but have who-knows-how-many
helper functions available to use. It actually reminds me of PHP'sbuilt-in
function's namespacelessness, it's chaos! 


Looking at it from a comparison to Django perspective: if I want to get the url
to an action I would import Django's reverse function and call that providing the
`namespace:view_name` and any additional arguments that may need to be included
in the url. In Django land, that is "The Way" to do it. So far, and again I'm
just starting out, I've seen at least 3 different ways to get a url in Rails, #1
`controller#action`, #2 `render :action => 'action'`, #3 `action_name_path`, and I'm
sure thlest (and also most magical).


RSpec and Cucumber have been pretty easy to pick up and simultaneously fracking
awesome! The ease of writing behavioral tests with Cucumber is an absolute
delight. The way that RSpec allows you to describe a class and describe it's
methods is equally pleasurable. Getting used to setting up expectations in RSpec
is going to take a while because it is so much different (albeit easier and a
hundred times more sane) than what I'm used to with Java and Python.


Overall, I'm really enjoying my time with Ruby and Rails, I'm learning a lot and
the more I learn the more I like it. And, to any Rails haters out there, if
you're reading this, it is not just hype. I'm just barely getting into it and I
can already tell there is some really good stuff going on. Thanks for reading and
tune in next time for more about my experiences with learning Ruby on Rails.
