---
layout: post
title:  "Testing Inheritance with Inheritance"
date:   2012-04-14
---

Unit testing and test driven development are things that I am very passionate
about. Writing good unit tests is not always as straight forward as you would
hope and it takes practice to really get good at it. Even then, there are still
things that are inherently hard to test.

Inheritance is one area where unit testing becomes difficult. The difficulty does
not necessarily come from actually writing the tests themselves (though
obviously, some of it may be) but more in figuring out which tests to write, and
how to go about doing it.

Say, for instance, I have the following class
{% highlight python %}
class FirstGradeMath(object):

    def __init__(self, first_number, second_number):
        self.first_number = first_number
        self.second_number = second_number

    def add(self):
        return self.first_number + self.second_number

    def subtract(self):
        return self.first_number - self.second_number
{% endhighlight %}

with the following tests
{% highlight python %}
import unittest
import first_grade
 
class FirstGradeMathTests(unittest.TestCase):

    def setUp(self):
        self.sut = first_grade.FirstGradeMath(2, 2) 

    def test_addition(self):
        self.assertEqual(4, self.sut.add())

    def test_subtraction(self):
        self.assertEqual(0, self.sut.subtract())
{% endhighlight %}

And I want to extend this class for second graders to include multiplication and
division. This is where I run into a dilemma. What is my first test for the
second grade math implementation? I could start a number of different ways:
* I could re-test drive addition and subtraction and refactor by adding
FirstGradeMath as a parent class
* I could copy the tests from FirstGradeMathTests and paste them into
SecondGradeMathTests
* I could assert that SecondGradeMath is a subclass of FirstGradeMath
* I could Inherit the FirstGradeMath Tests
I'd like to review the pros and cons of each of those options.

With the first option, re-test driving addition and subtraction then making
SecondGradeMath a subclass of FirstGradeMath seems like a tedious waist of time.
This approach will not scale. Can you imagine writing the tests for Algebra,
Trigonometry, and Calculus when each time you have to start with addition?
However, this is probably the most pure test driven approach. If you prefer
purity over pragmatism this may be your preferred approach.

In the second option, copying all of the tests and pasting them is going to be
painful. Now you have identical tests that are exactly duplicated. Hopefully, you
have some sort of static analysis tool that will let you know that you are
sinning if you choose this approach. If, at some point, there are additional
tests added for some edge cases the addition tests you will have to remember to
duplicate them for FirstGradeMath and SecondGradeMath. This has the same scaling
issue as the previous approach. How many tests are you going to have to copy, and
how many times? On the positive side, your tests for SecondGradeMath do not make
any assumptions about the implementation and assert that addition and subtraction
both work correctly in addition to multiplication and division.

{% highlight python %}
import first_grade

class SecondGradeMath(first_grade.FirstGradeMath):

    def multiply(self):
        return self.first_number * self.second_number

    def divide(self):
        return self.first_number / self.second_number
{% endhighlight %}

The third option takes a very different approach than the first two. This option
makes the assumption that FirstGradeMath is a solid implementation that has been
thoroughly tested and is as correct as possible. The problem with this approach
is that both the addition and the subtraction methods depend on data that is set
in the constructor of FirstGradeMath. If, for some reason, the SecondGradeMath
implementation does something differently in the constructor, it could
potentially break the implementations of addition and subtraction. This may be a
viable solution if you are comfortable making the necessary assumptions. If you
control both the parent and the child class implementations, maybe you don't need
to make any assumptions. This approach definitely has the least amount of
friction, but has the potential to be risky.

The final option is somewhat of a middle ground between all of the first three
approaches. By creating new tests for SecondGradeMath that inherit from the
FirstGradeMath Tests you are getting a similar effect of copying the original
FirstGradeMath tests. So you are covered from a regression standpoint. At the
same time your test code is mirroring the implementation, so since
SecondGradeMath extends FirstGradeMath, SecondGradeMathTests extends
FirstGradeMathTests. 

Lets take a look at what the code would look like for the initial SecondGradeMath
tests and implementation with the addition of multiplication and division:

There is one major issue with the tests at this point. They violate one of the
FIRST rules of unit testing. (Fast, Isolated, Repeatable, Self-Validating,
Timely). These tests aren't isolated. Each test is dependent upon some instance
variable called "sut" being set up prior to the test running, and each test is
dependent upon that object's state. Maybe this is alright if the only thing that
we will ever need to add, subtract, multiply or divide is 2 and 2, but that is
not the case here.

Inheriting unit tests requires an abstraction, an instance of a *GradeMath,
however is not the correct abstraction. If we remove the "sut" variable from the
setUp methods and just instantiate FirstGradeMath in the FirstGradeMathTests and
SecondGradeMath in the SecondGradeMathTests then inheriting the FirstGradeMath
tests are not going to really test anything about SecondGradeMath. Our
abstraction level needs to be higher than an instance, so let's move up one level
to the class. Here are the revised tests:

{% highlight python %}
import first_grade
import second_grade
import unittest
 
class FirstGradeMathTests(unittest.TestCase):
    sut_class = first_grade.FirstGradeMath

    def test_addition(self):
        sut = self.sut_class(2, 2) 
        self.assertEqual(4, sut.add())

    def test_subtraction(self):
        sut = self.sut_class(2, 2) 
        self.assertEqual(0, sut.subtract())

class SecondGradeMathTests(FirstGradeMathTests):
    sut_class = second_grade.SecondGradeMath

    def test_multiplication(self):
        sut = self.sut_class(2, 2)
        self.assertEqual(4, sut.multiply())

    def test_division(self):
        sut = self.sut_class(2, 2)
        self.assertEqual(1, sut.divide())

{% endhighlight %}

This is much better. Now each test class tests exactly one implementation but is
free to instantiate that implementation however is necessary for the test at
hand. This provides the isolation that the previous tests were missing.

I prefer this method of testing when inheritance is in the picture over most
others. In the end, the best approach is most likely different depending on the
situation.
