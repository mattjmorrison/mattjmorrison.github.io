---
layout: post
title:  "Language Exploration: Part 1"
date:   2011-10-19
tags: ['code']
---

I went to college at Indian Hills Community College in Ottumwa Iowa, which I do
not regret in the slightest. The Software Development program was outstanding and
I'm actually fairly impressed by how the curriculum changes over the years.
During my time there, one class in particular really stood out as the one class
that taught me the most. This class was called "Language Exploration". The
syllabus was simple, take a program that you wrote for one of your other classes
and re-write the exact same program in 3 different languages. The reason why I
thought this class was the one that I learned more from than any other was
because this was one of my first experiences with learning new languages on my
own. In this class I basically taught myself how to teach myself new languages.

At IHCC we were taught quite a few different languages which included C, C++, C#,
VisualBasic .NET, COBOL, CICS, JCL, Java, PHP, and SQL. For a 2 year program that
is quite a wide variety. After graduation I was hired as a COBOL developer and 2
short years later I transitioned to web development using Java and I also
supported some VisualBasic 6 applications. During my stint with COBOL I was doing
web development using the standard web stack (HTML, CSS, JavaScript) with PHP and
Perl. Then I moved to a new employer and started using primarily Python and began
a few side gigs using Ruby and PHP.

I've always enjoyed learning new languages. When I've moved from project to
project there are certain things that get lost. After using Python for a while
and not looking at any Perl code, going back and looking at Perl's data
structures takes a few minutes to wrap your brain around (with all of the
referencing/dereferencing). Moving between Java and Ruby is difficult because of
semi-colons and return types. There are a million different reasons why switching
back and fourth between different languages can cause trip-ups.

These little trip-ups are the reasons why I wanted to create a repository
dedicated to language comparison. I wanted to recreate my experiences in the
language exploration class on a larger scale. Instead of the class's 3 languages
I decided to go with 16. My first task was to choose languages. I started with
languages that I know, and languages that I've dabbled in then I added a few
others that I've heard about but never really used. I decided to cap it at 16
languages for no real reason other than that is how many languages that I came up
and seventeen just seemed like too many and fifteen just didn't seem like enough.

The languages are as follows:
* C (my code)
* Clojure (my code)
* CoffeeScript (my code)
* C++ (my code)
* C# (my code)
* Erlang (my code)
* F# (my code)
* Haskell (my code)
* Java (my code)
* JavaScript (Node.js) (my code)
* Perl (my code)
* PHP (my code)
* Python (my code)
* Ruby (my code)
* Scala (my code)
* XSLT (my code)

With a list of languages to work with, my next task was to write a "Hello World"
in each of them. I opted to limit that to "Hi". So I wrote 16 programs that
printed "Hi" to stdout, one in each of the above languages. That was pretty
simple, so I decided to take on a slightly more challenging task. Here are the
guidelines that I started with.

1. Must print the nth number of the fibonacci sequence
2. Must be a command line executable program that takes a single integer argument
3. Must print the number from the fibonacci sequence that corresponds to the
command line argument to stdout (including 0 so that given 5 the result should be
3, 6 should be 5 and so on)
4. Must use recursion

That took a bit more time. Truthfully, the fibonacci sequence is fairly easy to
implement using recursion in any of these languages. The hardest part was
figuring out how to parse command line arguments and convert it into an integer.
Erlang seemed to give me the most trouble here, in the end the solution was not
all that difficult, I just had to figure out what it was which ended up taking a
lot of time. XSLT was sort of a special exception rather than accepting the
number from the command line it was parsed from an input xml file.


My long term goal is to continue to add new simple examples that show how a
problem can be solved in each of the 16 languages, and hopefully I will be able
to demonstrate some advantages that some languages provide over others.

If you care to browse the examples, please do https://github.com/mattjmorrison/polyglot.
Also, I am absolutely not an expert in all of these languages, so if you are and
you have some tips for me please submit a patch.

