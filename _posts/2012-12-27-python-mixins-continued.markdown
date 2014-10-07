---
layout: post
title:  Python Mixins Continued
tags: ['python', 'code']
date:   2012-12-27
---

This is the second part of my original Python Mixins post. I left off mentioning first class functions vs.
mixins, mixins being harmful, and classification of bacteria and lichen.

Let's start off talking about first class functions vs. mixins. What does a first class function have in common
with a mixin or how could one replace the other, you may ask. To answer that question lets take a look at the
Jsonable mixin from the original post.

{% highlight  python %}
import datetime
import json
 
class Jsonable(object):
 
    def date_handler(self, obj):
        return obj.isoformat() if isinstance(obj, (datetime.datetime, datetime.date)) else None
    
    def save_json(self, file_name):
        with open(file_name, 'w') as output:
            output.write(json.dumps(self.__dict__, default=self.date_handler))
 
class Person(Jsonable):
    
    def __init__(self, name, bday):
        self.name = name
        self.bday = bday
 
 
if __name__ == '__main__':
    matt = Person('matt', datetime.date(1983, 07, 12))
    matt.save_json("matt.json")
    assert issubclass(Person, Jsonable)
    assert isinstance(matt, Person)
    assert isinstance(matt, Jsonable)
{% endhighlight %}

Now let's see how we can instead use a first class function to do the same thing.

{% highlight python %}
import datetime
import json
 

def date_handler(obj):
    return obj.isoformat() if isinstance(obj, (datetime.datetime, datetime.date)) else None
 
 
def save_json(file_name, data):
    with open(file_name, 'w') as output:
        output.write(json.dumps(data.__dict__, default=date_handler))
 
 
class Person(object):
    
    def __init__(self, name, bday):
        self.name = name
        self.bday = bday
 
 
if __name__ == '__main__':
    matt = Person('matt', datetime.date(1983, 07, 12))
    save_json("matt.json", matt)
    assert isinstance(matt, Person)
{% endhighlight %}

Let's look at some pros and cons of the mixin approach vs. the first class function approach. I like the
function approach. It is simple, it gets the job done, and it is reusable. So, what is wrong with the function
approach? As it currently is, nothing. However, when things change we may run into an issue. The issue is
extensibility. Let's say that the save_json and date_handler functions are part of a 3rd party library that my
application is using. If my application runs into a special scenario that requires some customization this
approach becomes more difficult. What happens when I need to use a different date handler? With these functions
existing in a 3rd party library my application cannot control the date handling without modification to the 3rd
party library.

The mixin approach to Jsonable allows the extensibility where the first class functions do not. In our mixin
example, our Person class could implement it's own date_handler method to modify the original functionality of
Jsonable without having to modify the 3rd party source. Granted, both the mixin and the first class function
approach can both be written in an extendable way but the mixin approach will result in cleaner code. To modify
the function approach to meet our needs for a different date format we could either:

Pass the date format we want to the save_json function

Pass the date handler function to the save_json function

In this scenario, adding one additional argument is probably fine, but if we do not control that code, we don't
have that many options. Also, while using functions in place of mixins can be extensible, at some point a
function will end up having far too many parameters. The function approach is a good one as long as the
functions are very small both in size and complexity. The functions should do one thing, do it well, and have
hooks that allow for extensibility while maintaining a balance of simplicity and functionality. I think of
mixins as an object oriented alternative to this first class utility function approach.

Mixins need to follow similar guidelines to first class functions. They should do one thing, do it well and
have hooks to allow for extensibility while maintaining that perfect balance of simplicity and functionality.
Mixins, like anything, can be abused. This article goes into more detail and gives some specific examples of
why Mixins should be considered harmful. I do not think that any single design pattern should be considered
harmful, however any design pattern can be abused.

I'd like to go take a step back now and examine classes, inheritance, multiple inheritance and mixins.

Let's start with some definitions:

Class - A construct that defines a type of object, the state that object may have and the behavior that it may
exhibit.

Inheritance - A mechanism in which classes can extend other classes to fine-tune the classification of the
parent class by providing additional state and/or behavior. Typically a class can extend one and only one
parent class.

Multiple Inheritance - A mechanism in which classes can extend multiple other classes to not only fine-tune the
classification of the parent classes but also combine those classifications into a new single entity.

Mixins - A collection of behavior that can be plugged into classes for reuse.

My hope is that you already have at least a basic understanding of classes and inheritance. If not I would be
surprised if you're still reading. Let's take a look at a valid use of multiple inheritance.

{% highlight python %}
class Fungi(object):                                                            
    def release_spores(self):
        return "spores"
 
class Algae(object):
    def photosynthesize(self):
        return "aah, sunlight"
 
class Lichen(Fungi, Algae):
    """
    ... some additional behavior
    """
 
if __name__ == '__main__':
    l = Lichen()
    print l.photosynthesize()
    print l.release_spores()
{% endhighlight %}

Lichen are composite organisms that consist of a fungus and a symbiotic photosynthetic partner (like green
algae). This is actually an excellent example of something where single inheritance falls short and multiple
inheritance shines. With multiple inheritance a class is a composite of other classes, just like how lichen is
a composite of other organisms.

Inheritance is a very powerful tool, and multiple inheritance is an even more powerful tool. These tools have
their uses, but I feel like "mixing in" functionality is not one of them. There are much different reasons and
uses for inheriting functionality from a parent and mixing in functionality from elsewhere. Inheritance is a
tool that does not necessarily fit all use cases. Bacteria is a good example where the parent / child
relationship breaks down. While bacteria reproduce asexually and technically do have a single parent, they are
also capable of evolving a number of different ways which makes it difficult to nail down an exact parent /
child relationship which will always hold true.

I'm going to cut this off here, I still have more material that I would like to cover regarding mixins in
general and more specifically in Python, but this post is plenty long at this point. I will be posting a follow
up to hopefully conclude my thoughts on mixins.

Thanks for reading!
