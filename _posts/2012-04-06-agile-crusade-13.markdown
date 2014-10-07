---
layout: series
title:  "My Crusade for Agility: Part 13"
date:   2012-04-06
category: agile-crusade
tags: ['agile']
part: 13
---

Today was a good day, we just got a shipment of 3 brand spanking new white
boards. I'm super excited to get those things hung up on the walls and see how
they look. I'll share pictures as soon as they are available.

This is the 13th write-up that I've done regarding My Crusade for Agility. It has
been 5 months since Part 12 and there have been quite a few really great
developments. In Part 11, I mentioned that we had a new hire starting. He has
been working out great and we have another new hire starting on Monday. We
decided that with 4 full time developers working at our 2 tables in the pit,
things are starting to get a bit cramped. So we decided to tear down some cubicle
walls and make our area larger.

I mentioned "Another Challenge" in Part 12, which is getting the rest of the
development team up to speed on all of the technologies that we are using. It's a
hard problem to solve. Uncle Bob videos and Gary Bernhardt's Destroy All Software
videos have been helpful. Also, regular code katas where we typically pair and use
TDD to solve some problem have yielded positive results. It's difficult to work a
full time job and within that time teach and learn a completely new technology,
or I should say a completely new category of technology that includes dozens of
libraries and multiple languages.

In other news, we have taken another big step towards becoming more agile as far
as our products are concerned. Up until recently we have had a single monolithic
application that does everything. While it is nice as a user to be able to go to
one place and have everything at your fingertips, some users don't want
everything. What if we, as a company, want the ability to sell a single feature
of our application as it's own product? That is difficult to do when all the code
is in one place.

We decided to create an entirely stand alone application for our latest feature
and built a web service API for integration with our existing product. Now our
new feature is still a feature of our current application, but is also a stand
alone product that can be marketed and sold separately. The development of this
feature went extremely smoothly. Without a doubt, we are going to be doing more
features in a similar fashion.

The last thing that I will mention that I believe does contribute to our agility
is Chef and Capistrano. As part of our last new web service feature we also had
to tackle deployment and server setup type tasks. Being developers, we automated
it. We have Chef recipes that set up our web servers, database servers and even
our development machines. We can get some brand new hardware with only an OS and
have it up and ready to serve requests or ready to do some hard core development
in a matter of minutes.

We are in a good place, a great place and more exciting things come up all the
time. I will post a follow up soon with some pictures of our newly expanded
development pit and the new whiteboards once they've been hung. Thanks for
reading, check back soon.
