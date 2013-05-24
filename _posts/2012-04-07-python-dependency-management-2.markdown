---
layout: post
title:  "Python Dependency Management: Part 2"
date:   2012-04-07
---

If you read my post about Python Dependency Management, I'm sorry. I've changed
my opinion about Buildout. While Buildout is still a great tool and does an
excellent job of isolating your Python environment, it falls short in a few
different areas.

The first area is documentation. It is sparse. Buildout is a tool that does a lot
of things, I would even say too much, but you would never guess it by looking at
the docs. While I'm sure that there are plenty of people who use Buildout, when
you run into a problem and you can't find the solution on StackOverflow, IRC is
really your only chance at getting help. Most likely, the only help you will find
online is initial setup tutorials for using Buildout. Finally, buildout has the
concept of recipes, which is an awesome idea. You can define your own custom
recipe to build your project or a dependency or whatever you want. If you decide
to go that route, you're completely on your own. The API for building a recipe is
completely undocumented and you're better off copying an existing recipe and
hacking on it until it does what you want. (that's what I did and it sort of
worked).

Another thing that is an annoyance with Buildout is the bin directory. When I am
working on a project that uses buildout I have to remember that
`$PROJECT_ROOT/bin/python` is where my dependencies are and system python doesn't
know anything about my project's dependencies. Some sort of shell wrapper (like
RVM or Virtualenv which I will talk about later) would greatly improve the
developer experience.

Lastly, I don't like having to have a bootstrap.py script that I have to run to
set up Buildout, then a bin/buildout script that I have to run that requires a
buildout.ini file and a setup.py. That seems like too much configuration, and too
much cruft in my repo to manage a single thing. Maybe this is a bit nit picky,
but the alternative is much less intrusive to my code base.

The alternative that I prefer is Virtualenv. Virtualenv has some of it's own
weirdness that you need to overcome. First step is installing Virtualenv. This is
easy:

`sudo pip install virtualenv`

Yes, I did use sudo there, but that's the only time (well almost) that you will
need to install anything in system python. But something that manages isolated
python environments is just fine to install system wide.

The next thing is creating a virtulaenv which looks something like this:

`virtualenv sample_env`

Once you've created it, then you have to use it. That's the first bit of
weirdness. To use a virtualenv you do something like this:

`source sample_env/bin/activate`

Once that is done your prompt will change to look something like this:

`(sample_env)$`

Now you are using a virtualenv, at any time to stop using that virtualenv you can
do this:

`deactivate`

The big problem that I have with this is that now instead of Buildout's 3
required files in my project I have a directory that contains, geeze what is in
there, oh yeah, ALL OF PYTHON. Sure I could just add that virtualenv name to my
.gitignore, but the virtualenv's name is arbitrary, the next time I clone my
project and create a new virtualenv I could call it `blueberry_pie` and I'd have
to add that to .gitignore also. The alternative is creating the virtualenv
somewhere outside of my project. So where should it go? I don't know, maybe I'll
just have a bunch of virtualenvs floating all over my file system wherever I need
them.


That sound bite pretty much sums up my feelings on that topic. Before I even get
into what having a virtualenv means and what it can do, lets talk about how we
can fix all that rigmarole. The first step is installing Virtualenvwrapper:

{% highlight bash %}
sudo pip install virtualenvwrapper
echo "export WORKON_HOME=$HOME/virtualenvs" >> ~/.bashrc
{% endhighlight %}

You may have noticed that this installation requires you to modify your
`~/.bashrc`. There is a very good reason for that. Virtualenvwrapper needs a
single directory on your file system that it will use to house all of your
virtualenvs. YAY! Also, I used sudo again. This is the last time, I promise.
(sudo is ok for pip, virtualenv, and virtualenvwrapper and that's it!). Now that
we are all set up with virtualenvwrapper, how do we use it? Easy. First step,
like before, is create a virtualenv like so:

{% highlight bash %}
mkvirtualenv sample_env
{% endhighlight %}

Well, well, well, would you look at that. Our prompt looks like:
{% highlight bash %}
(sample_env)$
{% endhighlight %}

after only a single command! Also, to stop using a virtualenv, it is the same as
before:
{% highlight bash %}
deactivate
{% endhighlight %}

But wait, how do I get back to it? Do I have to cd into `$WORKON_HOME` and do the
whole:
{% highlight bash %}
source sample_env/bin/activate
{% endhighlight %}

rigmarole again? I think not! To activate a virtualenv using virtualenvwrapper
simply do this:
{% highlight bash %}
workon sample_env
{% endhighlight %}

Another extremely useful thing to do with the "workon" command is to run it with
no arguments. Doing this will show you a list of every virtualenv on your system
that you can activate using the "workon" command. Pretty great right?

But what does it all mean? What does an active virtualenv buy you? I'll tell you
what it buys you, FREEDOM! Now when you type "python" in your shell you are
actually using the python command that lives inside the bin directory of your
virtualenv, same with pip, and same with any other python module that you install
into your virtualenv. You don't have to do anything special, just use python and
pip like you normally do (which you Do do, right?). If you get into trouble and
you've installed a bad version of a package or you've manually screwed something
up. Just deactivate your virtualenv and create a new one. No harm done.

What if you're done with a virtualenv? Just delete it like so:
{% highlight bash %}
rmvirtualenv env_name_to_delete
{% endhighlight %}

Virtualenvwrapper provides many very useful, very succinct commands that you
should check out. Now that you have all the tools you need to create a completely
isolated Python environment you can use PIP to manage the dependencies required
by your project. One guideline that I personally try to adhere to is that I set
up a deployable project slightly differently than I set up a project that will be
used as a library.

When I'm developing a deployable project, like a web application, I keep all of
my dependencies listed in a requirements.txt file that pip can install using the
'-r' flag. When developing a library I typically just list the dependencies in
the setup.py using `install_requires`. I have, on occasion, made setup.py just read
a requirements.txt file and populate the `install_requires` option dynamically,
which may be a better approach. Also, in either case, keeping a separate
development.txt requirements file that includes any testing dependencies and also
includes a '-r requirements.txt' line is a must. The latter approach for managing
dependencies for libraries using a requirements file is required when doing this.

One last thing I will mention about creating libraries is that make sure that you
either document how to run your tests OR hook your test runner into "setup.py
test". If everyone did the latter, the world would be a better place.

As with Buildout and virtualenv, virtualenvwrapper also has it's shortcomings.
What I really want to see is something similar to RVM from the Ruby space. RVM
allows you to create an isolated Ruby environment also, but it goes above and
beyond what virtualenv and virtualenvwrapper provides. With RVM you can install
different versions of ruby, and easily switch between which version is "active",
and create different gemsets (a gemset would be similar to a virtualenv) and
switch between which gemsets are active and install gems into a single gemset.

{% highlight bash %}
rvm install 1.9.3
rvm use 1.9.3
rvm gemset create sample
rvm use 1.9.3@sample
gem install rails
rvm install jruby
rvm use jruby
{% endhighlight %}

Virtualenvwrapper is excellent and if you're writing Python, you should be using
it. Hopefully, someday, virtualenvwrapper will get to the point where it can
manage versions of Python as well as installed Python modules. When that day
comes I will be on board, until then I'm more than happy with PIP, virtualenv and
virtualenvwrapper to manage my Python environments.
