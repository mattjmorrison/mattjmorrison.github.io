---
layout: post
title:  "Avoiding Monolithic Code"
date:   2011-09-15
tags: ['agile', 'code']
---

Monolithic code is one of the many enemies of clean code. When I say,
"monolithic code", I'm referring to a few different things. A system that does
absolutely everything with very few or no external dependencies 
A system that lives on a single machine and/or uses a single database or data
store
A system that resides entirely in a single source control tree (or no source
control at all - gasp!)
A system written entirely in a single language (excluding typical web languages
like HTML/CSS/Javascript/XML/JSON/...)
Ideally, an application will meet all of these criteria. A system however ideally
would not. When I refer to an application I'm talking about some piece of
software with a single purpose that can stand on it's own whereas when I refer to
a system I'm talking about software that has many features and a higher level
purpose. For example maybe I have a system for social networking, one application
in that system might be instant messaging. The terms "system" and "application"
can be used a lot of different ways, so I hope that helps to clarify how I am
going to be using them.

Monolithic code is a smell that I've been emitting a large majority of my career.
In the past few months I've been trying to break this habit. Here are some of the
reasons that I've found monolithic code to be a smell and what I've done or what
I would like to do to help remedy it.


I think a very common situation is that a company or an architecture team will
choose a technology stack and stick to it come hell or high water. I'm going to
pick on COBOL and Z/OS, first of all because it's easy, secondly because this is
a widely used technology stack in business today, although most likely not a very
appropriate platform for most modern systems.

In the situation where we are running COBOL on a Z/OS mainframe, we are
completely tied down to a specific vendor, some specific hardware, a specific OS
and a specific language. This is a very monolithic architecture. I think it is
fair to say that this technology stack is still so prevalent because it is so
monolithic there is no easy way to gradually move away from it. I think there are
a lot of businesses that are being held back by their commitment to this
technology. They are so invested in it that there is not much they can do, it is
not feasible to ask them to just scrap their entire system and start over. Even
if they did, they would most likely end up committed to a more current but
equally monolithic technology. Because it is familiar to them, it is what they
know and they're used to. "Learn one thing, learn it well, and use it for
everything", would be their battle cry as they march on to slaughter.
(joking...sort of)

When you find yourself in this predicament, something has gone wrong. You are
less able to easily adapt. You can still continue to deliver value to your
customer, but at what cost? How easy is it to deliver highly available web
applications when you're tied down to a single physical mainframe? You're going
to have to build layers on top of the mainframe in order to make that work, which
further couples you to the mainframe and gets you deeper into the problem. With
all of the buzz about "the cloud" these days and all of the benefits, it sounds
insane to balance your entire system on a single point no matter how fast or
stable it may be. If you do, then you need to have some kind of process in place
to handle power outages, freak accidents (like somebody accidentally cutting
through a T1 line), natural disasters, etc.

Say you have all of those process in place, where are you spending your money?
Are you spending money adding value to your business or are you spending it on
trying to protect your huge monolithic basket full of eggs (or jars or gems). It
seems to me like that money would have been better spent trying to advance and
improve rather building a bunker around your monolithic system and even further
committing to it.

Wouldn't approaching a new feature request as if you could open up your tool box
and choose the best tool for the job, make the world a better place to code? Let's
take our mainframe scenario again. We've got a massive mainframe based system and
tons of data stored in DB2. We have a new feature request to have a customer
contact management application so that internal employees can keep track of
customer phone numbers, addresses and whatnot. We already have almost everything
we need in some DB2 tables, but we will need to add a few columns, and update a
few COBOL programs and add some new fields to some CICS screens.


Yuck, I already don't want to do it. I can't very easily pawn this off on some
newbie right out of college either. What are the odds that they know how to add a
field to a CICS screen? What is the point in training them to do this? People
don't want to use these screens anymore, developers (especially newer developers)
do not want to continue coding them, so why should we continue to create and
maintain them? If I used Ruby on Rails I could meet the business's needs and give
them a nice new, web based, and mobile friendly application to work with.

Using Rails' scaffolding, I could generate a large majority of the application
without having to really write much code at all. So, what if instead of enhancing
the COBOL program, the DB2 tables and the CICS screens, what if we just used
Rails and built a web based application that meets the immediate needs of the
current feature request? Then, instead of further coupling ourselves to the
mainframe we could move to a more appropriate platform that is easier to maintain
and more user, and developer, friendly. That sounds nice.

But now we have a problem, we have existing COBOL programs that need that data
and we're taking it away from the mainframe. Yes, yes we are. It's got to happen
at some point. The monolithic mainframe is not an agile place to be. If we need
to be able to adapt to changes in our business and changes in technology we need
to have some flexibility. We need to have independent applications that can talk
to each-other, not one system that just knows everything. A system that knows
everything is dangerous because it is brittle. If it does everything then
changing something could break anything (not to mention the whole skynet thing).
If the mainframe needs the data from our Rails app, it is going to have to come
and get it.

That problem can be solved in a lot of different ways. While none are probably
ideal, I know that the user will appreciate the ability to pull up a website on
their phone and get an immediate response vs. having to dial into the mainframe
and pulling up a CICS screen in order to get a customer's phone number or work
with some slow and unstable layered web framework built on top of the mainframe.

What if we would instead just build a Rails application that access the data
already on the mainframe. That could also work. We now have some CICS screens
that we can throw away, but we still need to update some COBOL programs and now
we will have to update Ruby code as well. So our new single purposed web
application whose sole reason for existing is to maintain contact information
isn't the authoritative source for that information. We've just created a very
un-DRY situation. Sure, we're moving away from the mainframe... on the surface,
but underneath we are just as coupled to it as ever, maybe even more so. Now
we've got COBOL code and Ruby code that is 100% dependent on the mainframe. Just
bite the bullet and cut the tie, it will be better for everyone.

Let's turn that around now, let's say that we've got some existing massive Ruby
on Rails system and our customer comes to us with the same feature request as
before. After thinking about it for a few minutes, lets say that we decide that
Ruby on Rails is the technology choice that we should continue to use. We could
very easily generate a new application in our existing Rails project and get this
thing done and working, but wait... how is this any different than our monolithic
mainframe? We've got a single code base, a single platform, we're deploying to a
single server and using a single database. We are still stuck in a place that is
not very easy to adapt to technology changes. What happens when we look at Rails
6 and decide that it is just massively overcomplicated and full of stuff that we
do not want or need and it no longer aligns with our technology radar?

To avoid getting stuck in this situation, I would say that rather than just adding
a new application to an existing project, just create a new project. A new server,
new database, and a nice clean API for our existing system. Now we're completely
decoupled from our monolithic system and can be more adaptive if/when it comes to
that. We can easily swap out the new Rails project for something written in
Clojure as long as we keep the API the same, it doesn't matter.

Of course, not all applications should have every single individual component live
on a separate server with a web service API, that would be ridiculous. However, I
do think that each individual component should not share the same source control
tree. The API to that component can be whatever is appropriate, it doesn't matter.
Maybe we wrote this contact management application in Ruby. Why don't we just
bundle it into a gem and use that gem in our Rails application. If and when the
time comes (and we're using jRuby) we could potentially re-write that component
in Scala or some other JVM friendly language. We are still coupled to our
monolithic system, but less so, because now our code lives by itself, it can be
maintained independently and re-used elsewhere.

To sum it all up, here is what I recommend:

keep each self-standing component in it's own source tree. 
Don't deploy everything to the same hardware
Don't use the same database for everything
Don't use the same technology stack (including language) for everything

Having recommended that, I can't honestly say that I recommend it because I've
done it and it works. But in theory, this is where I want to be. In practice I
have definitely seen success in keeping separate components in separate source
control repositories.

Keeping components in their own separate source control repository does a few
different things that I really like. It makes you really think about your code
in terms of a stand alone library instead of just being a buried piece of a
system. That alone has made my APIs much cleaner anit a reusable library, but I
end up seeing re-usable pieces in working code that can be extracted into a
library, and hopefully contribute it back to the open source community.

In a recent project my pair and I wrote a proof-of-concept application, then
started over test driving the entire thing into a nice little stand-alone
application. When we were done we extracted one part into a separate project and
open sourced it. Shortly after that, we had a new feature request and we extracted
yet another project from our original and the same thing happened another time, a
new feature comes along and we extract another project so we can re-use it. All
in all we ended up with five different open source libraries that are completely
decoupled and reusable. Almost all of which we are using in at least two different
applications in our system.

Just to drive home the benefit of extracting re-usable components into separate
projects, the first additional feature request, from a user story perspective,
was a significantly larger undertaking than the original. However, we realized
that we had already built all of the infrastructure needed by the second feature
when we implemented the first feature. All of that infrastructure was buried in
the first feature though, so we had a choice. Either we completely combine the
first and second feature into a monolith or extract what is common and have each
feature use that as a dependency. We extracted the common code into it's own
library, and created a library for the first feature and a library for the second
feature. Now we are positioned very well for the future. If another similar
feature comes along, we should be able to implement it extremely quickly with
very little risk of breaking one of the other features.

If you're still with me, thanks for sticking with it. I hope to post a follow up
to this after I am able to implement some more of my own advice.
