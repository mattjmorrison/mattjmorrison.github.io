---
layout: post
title:  'Constantly Start Over'
tags: ['agile']
date:   2013-06-22
---

At [Iowa Code Camp][icc] 11 I gave a talk titled "Constantly Start Over,
Never Rewrite". The night before, I decided to slightly modify the title
to "Constantly Start Over, Never Rewrite, Constantly Rewrite" (check out
my slides [here][slides]). I feel like the modified title really fits the
contents much better, you will see why shortly.

Constantly Start Over: In my talk, I wanted to discuss working in
[green field][greenfield] projects (the preferred type of project for
developers) and how it really is not very difficult to minimize your
[brown field][brownfield] project work. There are many different ways
that you can start green field projects rather than adding to an existing
brown field code base.

There are 4 specific strategies that I focused on:

1. Extracting Services
2. Extracting Libraries
3. Extracting Applications
4. Integrating the old with the new

Using these strategies you can be working in green field projects a large
majority of the time without having to halt development to do a major rewrite.

Never Rewrite: the second part of the title. Rewriting software is an inevitability,
otherwise everyone would still be writing [Assembly][assembly] and not using the
internet. The problem with rewriting software is that when you are constantly
starting over you are never moving forward. The problem with rewriting software is
that you have to tell your customers "I will deliver exactly what you have now, but
in a new technology". That is not what customers want to hear. They want to hear that
they will have new features, they could care less about what is going on behind the scenes.

As I mentioned, rewriting software is inevitable. In fact, I encourage it. Without
rewriting software the world would be stuck back in the dark ages of early computing.
However, to successfully rewrite software it must be done iteratively. This is where
the self-contradicting title comes in to play. I really want to drive home to point
that no developer anywhere ever should rewrite software. Software that needs to be
rewritten, for whatever reason, should instead be extracted. Even when you have a
massive system, extract one piece at a time. Once enough pieces have been extracted,
they can be refactored to the extent that they have actually been rewritten.

As a developer you should always be learning, always be writing software and always
be rewriting software. Just make sure that you do it iteratively, one small piece at
a time. If you can do this, you can get by without ever having to worry about "The Big
Rewrite" because you will not have a big piece of software to rewrite.

If this topic interests you and you have questions or comments or you just want to
chat about it, feel free to contact me. I would be more than happy to discuss my
experiences.


[icc]: http://iowacodecamp.com/
[slides]: http://mattjmorrison.com/icc11/
[greenfield]: http://en.wikipedia.org/wiki/Greenfield_project
[brownfield]: http://en.wikipedia.org/wiki/Brownfield_(software_development)
[assembly]: http://en.wikipedia.org/wiki/Assembly_language
