---
layout: agile-crusade
title:  "My Crusade for Agility: Part 4"
date:   2010-10-16
category: agile-crusade
part: 4
---

This is my 4th installment of My Crusade for Agility. In previous installments
I've discussed my career up to the point where I'm aware of agile practices and
I want to be in the agile space but I don't really know enough about agile to
implement it myself. What I do know a little bit about is source control,
continuous integration, automated tests and deployments. Luckily for me, my new
employer already has the entire code base in Subversion. I had been toying around
with TDD so there were some unit tests in our code base, but not many. I decided
that if I could set up a continuous integration server and show the other
developers how all of my tests automatically ran after every commit, they may
begin to see some value in writing tests of their own.


I approached my lead about installing Hudson on our test server, to which he did
not object. So I got it installed and spent more time than I care to remember
trying to get Django's unit tests, Python's coverage, pylint, and clonedigger all
running and working together and with Hudson's fancy graphs. I did get everything
working though, and it was worth the extra effort. Now we had a way to test our
code and check the quality of our code every time anyone would commit a change.
The next thing that came was Trac integration, which was actually the suggestion
of my lead. I felt like this was a huge win for my cause. Not only had someone
else gone out and found a free open source alternative to our proprietary ticket
system, but they also wanted to integrate it with our CI system. With Hudson's
Trac integration we could link our commit messages directly to our tickets and
vice versa.


The next thing that I wanted to implement was automated deployments. Unfortunately,
this was not going to be very easy. Django has an excellent ORM, but it does not
do anything to handle changes to existing tables, it really only handles the
creation of new tables. To solve that problem, I found a project called South.
South allowed us to create database migrations, so now we can easily apply any
and all database (schema and data) changes quickly and easily using a Django
management command.


Now that the database changes can be automated, I was ready to automate deployment.
Previously, our deployment process was not very complex, but fairly manual. It
consisted of SSHing to our test server and running a bash script that did an
export from our Subversion repository. After running that script, we needed to
restart WSGI (Apache's mod_wsgi - persistent Python interpreter) and ideally we
needed to hit the website to get the start-up overhead out of the way. The first
step that I took in making this process more automated was adding the running of
our migrations, the wsgi restart, and a curl to our base url into the deploy
script. That limited our deployment to SSHing to our test server and running a
script. Then, it was a simple task to move that script into Hudson and have
Hudson execute that script over SSH. Finally, having our build job trigger the
deploy job in Hudson completed our deployment automation.


Now we were working in an environment where we could code, commit, see our tests,
our coverage and other metrics, and then shortly after (with no further action on
our parts after the commit) see our changes reflected on our test server. It
doesn't get much better than that, does it? Oh, yes it does. We were still just
getting started. Lots more to come, tune in for Part 5 coming soon to a web
browser near you.
