---
layout: post
title:  "My Crusade for Agility: Part 9"
date:   2011-10-17
---

Welcome to the 9th installment of My Crusade for Agility.  Just before starting
to write this post I went back and re-read the previous 8, not to toot my own
horn, but I think it was pretty good. I'm extremely glad that I had the foresight
to write these posts as it was happening. Looking back, I would never remember all
of the details and the order of events if I had tried to sit down and write
everything all at once after the fact. Score 1 for iteration. So I'm going to go
ahead and give myself a pat on the back, not only for the whole agile crusade but
also the documentation of said crusade.

In past installments I have discussed a lot of different things. Most of which
have centered around the introduction of agile software development to my current
employer. It has been going extremely well. Our main code base just recently
passed the 90% test coverage mark, which is exciting. We have started writing
some acceptance tests using lettuce and we have over 20 automated builds which
include not only testing and static analysis but also deployments. 

In Part 7 I mentioned that our workflow process needed work and that so far
everything that I've tried so hard to introduce really has only benefited
developers. This has pretty much held true until recently. I'll get to our
workflow problem in just a minute, first I want to discuss adding value to the
rest of the team (non-developers).  The whole team is made of up 6-7 developers
and 5-6 non-developers (the non-developers are a combination of management,
marketing and customer service). We do not currently have any formal business
analysts or quality assurance team members, which is not ideal but we get by OK
without them for now (we could definitely benefit a lot by getting both a
dedicated QA and BA team member).

During a typical week every team member (for the most part) stays in their silo,
either developer or non-developer. The non-developers do use the software created
by the developers to troubleshoot and configure things for our customers, but the
developers do not communicate much if anything about recent changes or things that
are in progress. In a hopeful attempt to open up some communication between the
devs and the non-devs I suggested that we start doing a weekly retrospective
meeting with the whole team. 

In our very first retrospective the non-devs brought up the fact that we had some
data entry screens that were extremely tedious and very time consuming. The
following week we were able to demo an import/export feature that ended up saving
days of manual data entry. We knew, as developers, that we had created a user
interface that was very tedious to work with, but we had never really gotten any
feedback complaining about it. These meetings have been very successful. They've
given the developers a chance to hear what the customers are saying to our
customer service team members and the customer service folks a chance to see what
is in the works and what exciting new features have been added to make their
lives easier. 

So, going back to our workflow problem that I mentioned earlier. In Part 6 and
Part 7 I mentioned that we were using story cards and a white board to manage our
(developer) work load. We were, but it didn't last. Our story cards basically
corresponded to tickets that we keep in trac and the prioritization of the
stories on the white board was pretty much non-existent. We probably spent more
time working on things that never made it into trac or onto the white board than
we did on anything else. 

Our problem was in the way that we were prioritizing tasks, we weren't, not in
advance anyway. We would pretty much work on whatever the boss said to work on
whenever he said to work on it. The major problem with this is that the
developers are always having to ask "What's next?" and the boss is always having
to figure out what is next whenever one of the developers asks, so there is more
work for everyone to try to figure all of that out on the fly. Somebody always
get caught like a deer in headlights. The boss would say, "What are you working
on?". The developer answers, "Uh, um, I don't know, what do you want me to work
on?" and the boss replies, "Uh, um, I don't know, I'll get back to you." and in
the meantime nothing is getting done.

We've known for a long time that this was something that needed to be fixed, we
have also known that the way that we were going to try to fix it was by doing
development sprints. Our biggest problem here was that we didn't know what to do.
We knew that we needed to dedicate some work to a timeframe and that is about the
extent of it. Luckily for us, Trent from CDS Global, agreed to come to our office
on a Friday afternoon and do some sprint training. He provided us with all of the
missing info that we needed in order to get started. 

After meeting with Trent, we were able to do some backlog grooming to prioritize
all of the work that needed to be done, followed by a sprint planning meeting
where we created stories and scored them, and broke stories out into tasks. We
decided that, as Trent suggested, we would create a theoretical story that we
would score with a 1. Our dummy story ended up being something along the lines
of, "Add a field to a web page and save it in the database". Using that as a
reference point, we went through the backlog and wrote and scored 13 stories for
a total of 39 points and decided that was going to be our first sprint.


Today was the first day of our first sprint. We've been going through the stories
in priority order and we actually got 8 of the 13 done today. That might sound
impressive, but those 8 stories only account for 9 points, so we've got a ways go
to, which is a good thing considering that we've got 9 days left. I can already
tell that this is going to be an excellent way to keep on track. My hope is that
once we finish this sprint we will have a sprint retrospective (which will most
likely be a separate get-together from our current weekly retrospective - we
should probably work on calling them something different) so we can figure out
how to improve our sprinting process, and also have a demo at the end so we can
show (hopefully some customers) what our sprint accomplished.

I'm pretty excited about our first sprint. I think it is going to work out really
well. I will make sure to post a follow up after our sprint because I'm sure
you're just dying to know how it turns out. Tune in next time to hear more about
My Crusade for Agility.
