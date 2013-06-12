---
layout: post
title:  "Language Exploration: Part 2"
date:   2012-07-07
---

The tl;dr version - The fibonacci sequence written in a bunch of languages, each language unit tested in a
library for said language.  Languages with built in REPLs and testing libraries are very nice.

Carl Sagan included audio clips of greetings in 55 human languages on the Voyager Golden Record. If there is
intelligent life outside of our world that discovers this golden record, one can imagine that it would quite
literally be a modern equivalent of the Rosetta Stone.

This language exploration experiment I suppose is a sort of Rosetta Stone in some ways. While it is interesting
to see the same program in a bunch of different languages, it most likely is not the best reference or teaching
tool because, let's be honest, I haven't created the best code in all languages. I've just created code in all
languages. Seeing the syntax for a language is easily a Google search away, however, seeing how to unit test a
given language sometimes is a bit more tricky.

Unit testing is something that I am very passionate about, and all code can be tested. Part 2 of my language
exploration experiment is to add unit testing for each language (now 20) for a simple fibonacci sequence
implementation. There are a few guidelines that I forced myself to follow, like in Part 1.

* Must only use a plain text editor to write tests and code (no fancy IDE's)
* Must be able to run tests via the command line
* Must use a testing framework in each respective language

That's it! One last quick note before we get into the details. Languages that ship with built in testing
frameworks are extremely helpful because you don't have to go through that initial phase of trying to find a
decent and popular testing framework, then figuring out how to install it. Also, languages that ship with a
REPL are much appreciated. Alright, on to the details!


## Python
By day, I write Python, so this was super easy for me. It's what I do day in and day out, write tests for
python and write code to make those tests pass. Here is my code. I used the Python standard library's unittest
module. This was really easy to get going. Nothing to set up, nothing to install, very straight forward.

## Ruby
I also write a lot of Ruby, so this one was also not very challenging for me to throw together. I used Ruby's
built in Test::Unit module. Like Python, there was nothing to set up and nothing to install, it was very easy
to get up and running. Here is my code.

## PHP
I spend some time writing PHP as well. phpunit is pretty straight forward, writing the tests was no problem.
The biggest problem that I had here is just figuring out where to put phpunit and how to get in on the path so
php knew about it. I eventually decided to use pear to install it and then everything pretty much worked. I
ended up installing phpunit system wide, which is a turnoff for me (being used to virtualenv and rvm). Here
is my code.

## Node.js
I am a web developer, so I write a lot of JavaScript and use Jasmine for testing. Here is my code. There were
a few hangups with getting everything running smoothly. You will see in fibonacci.js there is a line at the
end that exports the fib function. The exports object in node.js is the object that is returned from the
require statement. This was necessary because I wanted the fib function to be available to the object returned
from requiring fibonacci.js. The other gotcha was making sure everything was on the path that node uses. This
is the reason that fibonacci.js is inside a directory called node_modules, node.js looks in node_modules by
default, without that the path would have to be manipulated.

## Java
In a former life, I was a full time Java developer. Without an IDE, this was kind of a pain with the junit.jar
dependency and class path garbage (as you can see here), but the tests were easy to write and easy to run once
the classpath was getting set correctly. Here is my code.

## XSLT
XSLT is another language that I used a lot in a past life. As far as unit testing XSLT... wow, just wow. I
honestly wasn't sure that this one was going to be worth my time, but it was surprisingly easy. XSLTUnit is a
proof-of-concept xslt testing framework that seems to work great right out of the box. It's very XSLTish,
XMLish, verbose and pretty gross, but you know what? If I had to write some XSLT, I would use this to test my
code. Here is my code.

## Perl
Again, I wrote a ton of Perl in a former life, but I never really did any testing. Thankfully, this one was
extremely simple and I was actually pleasantly surprised. For something as simple as the fibonacci sequence,
Perl's Test::More is extremely low friction to get the tests written and working. The one weird thing is that
you have to tell the test runner in advance how many tests you intend on running, which I didn't like. Luckily,
I found that you can call a subroutine called `done_testing` and the test runner will just figure it out by
itself. I have a feeling like this may not scale up so well when there are more complex things to test that
require mocking and complex setup, since the tests consist of a series of assertions in a bare file with no
obvious setup/teardown or test isolation mechanism. Here is my code.

## Clojure
Clojure is probably one of the few really interesting languages that I really like, but will most likely never
use. The built-in clojure.test framework was super easy. Here is a great introduction and here is my code.

CoffeeScript
I really like CoffeeScript. I used Jasmine (again) for the tests. After already running into the path and
exports issues for the Node tests I had pretty much already figured out all of the strange gotchas. Using
"console.log module.paths" really helps to figure out why things don't seem to be working. Here is my code.

## C
Writing unit tests, no wait, let me back up, figuring out how to write unit tests, nope let me back up further,
finding libraries to make unit testing easy in C is hard. I attempted and failed to use Check and then Unity
before finally settling with CU. CU works very well, and the documentation is excellent, but it is extremely
tedious and un-dry. It seems like every C unit testing library that I looked at for more than a few minutes
had the same essential flaw... no automatic test discovery. I have to write every test and manually add each
test to a test suite individually. I'm sure there must be a way to automate that process, I wouldn't be
surprised if there is one that I just was not able to find. Maybe someday I will revisit this and discover
what I was missing. Here is a great introduction tutorial to CU and here is my code. As you can see, there is
a lot more than a source file and a test file. There are header files, a makefile, and the source of the CU
framework. It all needs to be compiled and linked before running. It definitely requires some experience to
become proficient in testing C.

## C++
This one started out much like C... there were a lot of options of testing frameworks to choose from and no
obvious choice. Thanks to this article I was able to take a look at some examples and make a decision. I
decided on CPPUnitLite because it looked the easiest to get setup and running. It was pretty easy to get
going, the tests were easy to write and easy to read. Here is my code.

## Scala
ScalaTest is pretty simple, it's easy to use and well documented. This requires the same classpath set up work
as Java, but it's not a very big deal. Here is my code.

## Go
Writing tests was easy, compiling and linking with Makefiles, not so easy. Here is my code. The code I ended
up with doesn't look too bad, getting there was a different story. The first hick-up that I ran into once I
got past the compiling and linking issues was that only functions that start with an upper case letter will
be exported. My original fibonacci.fib did not work until I renamed my fib function to Fib. After I figured
that out, the other thing I noticed was that there weren't any assertions (that I found) in the built in
testing library. I ended up writing my own assertion which works fine, but seems like it should be unnecessary.

## C#
Keep in mind this is C#, on the command line, with no IDE, using mono... this one sucked. There were a few
challenges here. One of which was getting nunit setup, it turns out that nunit ships with mono (of course I
didn't know that until after a lot of waisted time trying to figure out how to install it), so most of my
work ended up being in vein. I ended up just having to add a flag to `gmcs` (which is the mono C# compiler)
to point to nunit. The next challenge was to find where the dll for nunit lives in mono's installation (which
you can see here). Another problem I had here was trying to find good resources online with documentation that
does not refer to some GUI wizard to create tests and compile and run them outside of an editor. Unfortunately
I didn't really come up with any good resources, I found a lot of bits and pieces here and there (mostly on
StackOverflow) and I was able to piece everything together.... along with the --help option on `gmcs` and
`nunit-console`. The actual test code was easy, pretty similar to Java in almost every way. Here is my code.

## Dart
This one took a bit of searching to find a testing framework, and finally I came across bullseye.dart. Our of
the box everything just seemed to work. There was a little bit of weirdness in the test output... I was
seeing something like this:

     null
     0 is 0
     1 is 1
     ...

It took me a while to figure out what "null" was supposed to be, but finally I just randomly came across
something in Bullseye's docs that had a "get description()" function defined. That did the trick and switched
"null" to my test name. Unfortunately, I didn't find a way to "install" bullseye, so I ended up just dropping
it in with my code, which is a smell that I would prefer to avoid. Here is my code.

## Erlang
This was not too bad to get up and running. Eunit was straight forward and well documented. Here is my code.
The biggest challenge that I had here was figuring out how to execute the tests. This post helped out with
that a lot, and I ended up with this.

## Haskell
Hunit was surprisingly easy to set up and very easy to write tests. However, there is no automatic test
discovery that I could see, so you have to manually configure tests into a test suite which isn't ideal.
Here is my code.

## F#
I had a lot of trouble actually getting an F# testing framework to work so I just fell back on NUnit. I'm not
really sure why I couldn't get FsUnit or FsTest to work, they seem very light weight and simple, but I could
not get them to compile. NUnit seems to works fine though. Here is my code.

## OCaml
Finding a unit test library was easy, OUnit. The only tricky bit with getting it installed was that I had to
manually install a prerequisite first, findlib. Once that was installed it was easy sailing. Again, there is
no automatic test discovery, which is a modern convenience that us humans just shouldn't have to be without.
Here is my code.

## tcl
It was nice that tcl has tcltest which ships with the language, that is always a plus. Here is my code. These
tests were easy to write as long as you don't forget the "expr" part. It was a little bit weird at first
because when all tests were passing there was no output from running the tests... I found that adding
"cleanupTests" at the end of the test file will print the final test results.

Finally, so summarize my findings:

Languages that ship with some kind of testing framework are easier to test because you can avoid the searching
for and installing 3rd party libraries. This is especially important when you are new to the language.

Test frameworks without automatic test discovery are excessively tedious and they leave the possibility that
you have real tests that are not actually being executed when you might think they are.

IDEs are not necessary. 

IDEs should be used once it becomes tedious or error prone to not use them (I'm looking at you Java, Scala, C#,
and F#).  

That's it. That is my experience learning to write unit tests for a simple fibonacci algorithm in 20 different
programming languages. Feel free to peruse all the code on github, and let me know if there are improvements
that can be made, or languages that should be added. I would be more than happy to accept pull requests.
