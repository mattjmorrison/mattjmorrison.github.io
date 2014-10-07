---
layout: post
title:  'JavaScript Syntax "Bugs" Me'
date:   2013-01-02
tags: ['javascript', 'code', 'coffeescript']
---

JavaScript happens to be one of the most popular and widely used programming languages in existence. It also
happens to be very widely hated and in some cases avoided all together. I used to be in the camp of hating
and avoiding the language, that is until I actually spent the time to learn it.

I will gladly admit that JavaScript has it's faults and quirks, as do all languages, however at it's core
JavaScript is really quite elegant. The prototypal object system seems extremely strange at first, but once
you grock it it's actually pretty neat and very simple. I could talk all day about the good and bad features
of JavaScript, but there is one thing in particular that I would like to address: object literals.

Object literals are JavaScript code that define an object by listing all of it's attributes using key/value
pairs. Here is a simple example:

{% highlight javascript %}

var person = {
  firstName: "Matt",
  lastName: "Morrison",
  doSomething: function(){
    return "I'm working on it";
  },
  numbers: [1, 2, 3, 4, 5],
  otherThings: {
    one: 1,
    two: 2,
    five: 5
  }
};

{% endhighlight %}

One important thing to notice is there are no trailing commas (after the 5 in the 'numbers' list, after the 5
in the 'otherThings' object literal, and after the 'otherThings' object literal). Trailing commas are not
valid in JavaScript object literals, and actually cause syntax errors in some browsers and JSON (JavaScript
Object Notation) parsers. This is one of the ugly warts of JavaScript. Most languages allow trailing commas,
which makes this wart even uglier.  Here is a Ruby equivalent:

{% highlight ruby %}
person = {
  :firstName => 'Matt',
  :lastName => 'Morrison',
  :doSomething => lambda { "I'm working on it" },
  :numbers => [1, 2, 3, 4, 5,],
  :otherThings => {
    :one => 1,
    :two => 2,
    :five => 5,
  },
}
{% endhighlight %}

and Python:

{% highlight python %}
person = {
  'firstName': "Matt",
  'lastName': "Morrison",
  'doSomething': lambda: "I'm working on it",
  'numbers': [1, 2, 3, 4, 5,],
  'otherThings': {
    'one': 1,
    'two': 2,
    'five': 5,
  },
}
{% endhighlight %}

As you can see in the Ruby and Python examples, there is a comma after each key/value pair keeping a
consistent syntax for each and every entry in the "object literal". This provides a major benefit:
modification. Since each and every key/value pair ends with a comma, order is not important. Entries can be
freely moved around in the object literal without modification. In the JavaScript example, parts of it can be
moved without modification as long as it is not the last entry in the object. When moving the last entry a
trailing comma must be added, and the new last element created by moving the previous last element must have
the trailing comma removed.

Note the following changes.

{% highlight javascript %}
var person = {
  firstName: "Matt",
  lastName: "Morrison",
  doSomething: function(){
    return "I'm working on it";
  },
  otherThings: { // moved up a line
    five: 5 // moved to first position
    one: 1,
    two: 2,
  }
  numbers: [1, 2, 3, 5 4,], // Moved 5 to 4th position
};
{% endhighlight %}

Notice how our syntax is now invalid due to an extra comma at the very end, a missing comma between the 5 and
the 4 in the "numbers" list, a missing comma after the "otherThings" object literal and the "numbers" list, a
missing comma after the "five" key in the "otherThings" object literal, and an extra comma at the end of the
"otherThings" object literal. By making 3 trivial and what should have been non-breaking changes 5 separate
syntax errors were introduced. Something as simple as moving a bit of code around, like I've done in this
example, should not have as large of an impact as it did.

Another reason that the whole "no trailing commas" is a problem is that often times people who are developing
in JavaScript also are developing in one of the languages that allow trailing commas. Switching back and
forth between a language that allows and does not allow the same syntax increases the probability that a
trailing comma will be introduced. Going back to existing code and adding or removing items from an object
literal can often times leave trailing commas behind and, in JavaScript, introduce bugs.

Other languages (like Ruby and Python) provide an object literal-ish syntax that are really just hashes (in
Ruby terms) or dictionaries (in Python terms) as you've seen. These are not quite exactly the same thing as
an object literal in JavaScript, but they can be treated as something very similar.

Here is an example of using an attribute defined in a JavaScript object literal:

{% highlight javascript %}

var person = {
  firstName: "Matt",
  lastName: "Morrison",
  doSomething: function(){
    return "I'm working on it";
  },
  numbers: [1, 2, 3, 4, 5],
  otherThings: {
   one: 1,
   two: 2,
   five: 5
  }
};
 
console.log(person.doSomething());
// > "I'm working on it"

{% endhighlight %}

compared to Python, which has some additional syntactic noise 

{% highlight python %}
person = {
  'firstName': "Matt",
  'lastName': "Morrison",
  'doSomething': lambda: "I'm working on it",
  'numbers': [1, 2, 3, 4, 5,],
  'otherThings': {
    'one': 1,
    'two': 2,
    'five': 5,
  },
}

print person['doSomething']()
# > "I'm working on it"

{% endhighlight %}

and Ruby, which has some additional syntactic noise as well 

{% highlight ruby %}
person = {
  :firstName => 'Matt',
  :lastName => 'Morrison',
  :doSomething => lambda { "I'm working on it" },
  :numbers => [1, 2, 3, 4, 5,],
  :otherThings => {
    :one => 1,
    :two => 2,
    :five => 5,
  },
}

puts person[:doSomething].call
# > "I'm working on it"

{% endhighlight %}

While Python, Ruby and other languages provide a similar concept to JavaScript's object literals they also
provide an alternative syntax to create objects. For example Ruby and Python both provide class objects.
JavaScript provides an alternative syntax as well: functions.

Here is an example of a class in Ruby defining a similar object:

{% highlight ruby %}
class Person

  def initialize
    @first_name = "Matt"
    @last_name = "Morrison"
    @numbers = [1, 2, 3, 4, 5]
    @other_things = {:one => 1, :two => 2, :five => 5}
  end

  def do_something
    "I'm working on it"
  end

end

puts Person.new.do_something
# > "I'm working on it"
{% endhighlight %}

And a similar class in Python:

{% highlight python %}
class Person:

  def __init__(self):
    self.first_name = "Matt"
    self.last_name = "Morrison"
    self.numbers = [1, 2, 3, 4, 5]
    self.other_things = {'one': 1, 'two': 2, 'five': 5}

  def do_something(self):
    return "I'm working on it"

print Person().do_something()
# > "I'm working on it"

{% endhighlight %}

And finally, JavaScript's function:
{% highlight javascript %}
function Person(){
  this.firstName = "Matt";
  this.lastName = "Morrison";
  this.numbers = [1, 2, 3, 4, 5];
  this.otherThings = {one: 1, two: 2, five: 5};
}

Person.prototype.doSomething = function(){
  return "I'm working on it";
};

console.log(new Person().doSomething());
// > "I'm working on it"
{% endhighlight %}

Using Javascript functions you avoid the trailing comma issue all together. Code is no longer coupled to it's
location in a larger structure and can be freely moved around without needing to both add and remove
punctuation. There is an unfortunate amount of extra boilerplate syntax that goes along with this style (I
will talk about fixing that in a bit), but the punctuation is actually sane and cannot break your code in the
way that object literals can.

The trailing comma problem with JavaScript is only the catalyst of the thing that bugs me about the
JavaScript language. What really bugs me isn't really the JavaScript language or even object literals, but
how they are being used. If you take a look through some of the examples in [TodoMVC][todomvc] you will see that a large
number of JavaScript frameworks make heavy use of object literals. Most of these libraries have implemented
their own abstraction that sits between JavaScript's object system and the framework's api.

I'm not suggesting to avoid libraries that use object literals in this way. It is, however, unfortunate that
it is necessary for framework authors to build their own object system on top of JavaScript. It would be nice
if the language provided the features that developers needed natively. Having every library implement it's
own object system on top of JavaScript's is really pretty sad.

If you are writing JavaScript, regardless of which frameworks you are using, first and foremost you should be
testing and linting your code to prevent punctuation errors from ever being committed. Object literals or
not, you need to do test and lint your code. One last time, just to drive the point home: test and lint your
JavaScript!

I have two recommendations (in addition to testing and linting). One is to avoid object literals when working
with your JavaScript objects. If you would use a class in another language, use a function in JavaScript
instead of an object literal. If you are using a framework that requires you to use an object literal, try
something like this:

{% highlight javascript %}

// Instead of
Someframework.object.create({
  my: 'attributes',
  go: 'here'
});

// Try doing this
function MyObject(){
  this.my = "attributes";
  this.go = "here";
}

Someframework.object.create(new MyObject());

{% endhighlight %}

My second recommendation, going back to the extra boilerplate syntax that using JavaScript functions over
object literals introduces, is to take a look at CoffeeScript. The example that we've been looking at in
CoffeeScript looks something like this:

{% highlight coffeescript %}
class Person
  constructor: ->
    @firstName = "Matt"
    @lastName = "Morrison"
    @numbers = [1, 2, 3, 4, 5]
    @otherThings =
      one: 1
      two: 2
      five: 5

  doSomething: ->
    "I'm working on it"

console.log(new Person().doSomething())

{% endhighlight %}

This CoffeeScript translates into the following JavaScript, but saves you all of the extra keystrokes.

{% highlight javascript %}
var Person;

Person = (function() {

  function Person() {
    this.firstName = "Matt";
    this.lastName = "Morrison";
    this.numbers = [1, 2, 3, 4, 5];
    this.otherThings = {
      one: 1,
      two: 2,
      five: 5
    };
  }

  Person.prototype.doSomething = function() {
    return "I'm working on it";
  };

  return Person;

})();

console.log(new Person().doSomething());
{% endhighlight %}

Also, object literals in CoffeeScript fix the whole punctuation issue for free (notice there is almost no
punctuation and also extra punctuation in the list):

{% highlight coffeescript %}
person =
  firstName: "Matt"
  lastName: "Morrison"
  doSomething: ->
    "I'm working on it"
  otherThings:
    five: 5
    one: 1
    two: 2
  numbers: [1, 2, 3, 5, 4,]

{% endhighlight %}

Which translates into the following JavaScript:

{% highlight javascript %}

var person;

person = {
  firstName: "Matt",
  lastName: "Morrison",
  doSomething: function() {
    return "I'm working on it";
  },
  otherThings: {
    five: 5,
    one: 1,
    two: 2
  },
  numbers: [1, 2, 3, 5, 4]
};

{% endhighlight %}

I think that about wraps it up for now, thanks for reading and remember Test, Lint and CoffeeScript!


[todomvc]: http://addyosmani.github.io/todomvc/
