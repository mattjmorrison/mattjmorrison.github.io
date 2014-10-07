---
layout: post
title:  "Python Mixins"
date:   2011-11-22
tags: ['python', 'code']
---

I am very fond of the concept of mixins as well as the Python language. The
Python language does not really have the concept of mixins, however it does
provide multiple inheritance. Although mixins and multiple inheritance are
similar, or can be used similarly, in a lot of ways there are some very
important differences.

Here is a simple illustration of mixin behavior in Python.

{% highlight python %}
from datetime import datetime, date
import json

class Jsonable(object):

    def date_handler(self, obj):
        if isinstance(obj, (datetime, date)):
            return obj.isoformat()

    def save_json(self, file_name):
        with open(file_name, 'w') as output:
            output.write(json.dumps(self.__dict__, default=self.date_handler))

class Person(Jsonable):

    def __init__(self, name, bday):
        self.name = name
        self.bday = bday


if __name__ == '__main__':
    matt = Person('matt', date(1983, 07, 12))
    matt.save_json("matt.json")
    assert issubclass(Person, Jsonable)
    assert isinstance(matt, Person)
    assert isinstance(matt, Jsonable)

{% endhighlight %}


In this example, Jsonable is the mixin which provides generic reusable
functionality that can be "mixed into" an existing object. This example is
nothing special, this is a very typical use of inheritance in Python.

Let's take a look at a similar example in Ruby, which provides native mixin
support.

{% highlight ruby %}
require "json"

module Jsonable
  def jsonify
    json_data = {}
    self.instance_variables.each do |v|
      json_data[v.to_s[1..-1]] = self.instance_variable_get(v)
    end
    return json_data.to_json
  end

  def save_json(file_name)
    File.open(file_name, 'w') {|f| f.write(self.jsonify) }
  end

end

class Person
  include Jsonable
  def initialize(name, bday)
    @name = name
    @bday = bday
  end
end

person = Person.new('name', '07/12/1983')
person.save_json('ruby.json')
raise "not instance" unless person.instance_of? Person
raise "is instance" if person.instance_of? Jsonable
raise "subclass" if Person.is_a? Jsonable

{% endhighlight %}

After looking at the assertions at the ends of both the Python and Ruby
examples, it is easy to see the differences between the inheritance approach and
the mixin approach. The inheritance approach in the Python example actually
changes the classification of our class, by making it a subclass, as well as the
classification of our class's instances by making them instances of both Person
and Jsonable. In the mixin approach Person is not a subclass and Person instances
are not instances of Jsonable so there is no re-classification.

Before going any further, I want to say a few things about object oriented
programming. OOP allows developers to categorize pieces of data and functionality
into reusable components that mimic the behavior of the real world business
concepts they are attempting to represent with code. In a perfect world, that
statement would be true, but we all know that objects do not always represent
something in the real world.

Let's analyse some OOP terminology. We have classes, which are CLASSifications of
some functionality. We have superclasses, which are high level broad
classifications (or SUPERsets of functionality) and subclasses which are more
specific classifications (or SUBsets of functionality). Given that classes are
for CLASSifying functionality, where do we, as developers, draw the line between
how we classify our objects and what our objects are capable of doing? Good
question.


Is an object classified by what it can do, or by what it is? I am a Person. I am
a Developer. I am a Male. I can do a somersault and stand on my head, but I'm not
a Gymnast, and I would never classify myself as one. I can do those things, like
many other People, many other Developers, and many other Males but so can Females
and Gymnasts and probably even some kinds of Monkeys and maybe some kinds of
Fish. Really, the only thing shared between all of these groups is that they have
the ability to do the same action.

So, we have a bunch of different classifications of objects that share only a
single ability. We could categorize them all as Somersaulters, but is that really
a valid classification? I can do a somersault, but I wouldn't call myself a
somersaulter, because as far as my abilities go that is quite insignificant.
There are much more important and significant things that should classify me.
When I meet someone on the street are they more likely to say, "Are you a
somersaulter?" or "Can you do a somersault?" ? Honestly, probably neither. I
would think the latter is more likely, however.

The point that I am alluding to is that using multiple inheritance to "mix in"
some type of functionality to an object causes us to do some things that I
consider breaking the rules, and we all know that "...Special cases aren't
special enough to break the rules...". Referring back to the Python code example,
we are reclassifying Person by making it a subclass of Jsonable. Is the fact that
the Person can `save_json` significant enough that it should define it? Think
about the relationship between Jsonable and Person. Person is a subclass of
Jsonable, which means that Person should further define Jsonable to be more
specific, right? Does it? No, I don't think so. A Person doesn't further define
anything about Jsonable, other than the fact that it prints Person related json
data, but Jsonable already does that without any further definition.

tl;dr - I know, so I'll cut it off here. There will be a follow up post about
mixins because there was a lot I didn't cover. First class functions as mixin
alternatives, why some think that mixins are harmful, and classification of
bacteria and lichen. Hope you check back soon, thanks for reading!


