---
layout: post
title:  Mocking Django
date:   2011-02-20
permalink: /2011/09/mocking-django.html
tags: ['python', 'django', 'mock', 'testing', 'code']
---

This is going to be a fairly long article, so I'll try not to ramble. I've
been using [Django][Django] for about a year now,
an I've been doing [TDD][TDD] with Django for a while as well. Out of the
box Django includes some pretty awesome testing tools. They've got a test
runner that will bootstrap your database and will take care of cleaning up
the database between tests. Django also includes a super easy way to use
[fixtures][fixtures] in tests, and also has a lot of useful [assertions][assertions].
All of these things are great tools and make test driving Django applications
very easy. The downside is that when you are relying on the database and fixtures
in your unit test suite inevitably it will end up taking a long time to run all
tests, which is where mocking comes in to save the day.

When it comes to mocking in Django, I reccomend the [mock][mock] library. Another
advantage, besides faster tests, of using mocking instead of Django's default
testing behavior is that you don't need django to setup the database to run
your tests, and you can subclass unittest's [TestCase][TestCase] instead of
django [TestCase][DjangoTestCase] (which saves you the database cleanup between
tests). With the examples provided here I can run these with `manage.py test django_testing`
or with `python -m unittest discover -s django_testing` (using Python2.7). Let's jump
right into some code examples.

{% highlight python %}
from django.db import models
 
class SampleManager(models.Manager):
    def get_by_user(self, user):
        self.filter(user=user)
 
class Sample(models.Model):
    pass
{% endhighlight %}
<br />

{% highlight python %}
import unittest
import mock
from django_testing import models
 
class SampleTests(unittest.TestCase):
    def test_filters_by_user(self):
        user = mock.Mock()
        manager = mock.Mock(spec=models.SampleManager)
        models.SampleManager.get_by_user(manager, user)
        manager.filter.assert_called_with(user=user)
{% endhighlight %}
<br />

Let's walk though the test line by line. First, create a mock user.
`user = mock.Mock()`
Second, create a mock manager.
`manager = mock.Mock(spec=models.SampleManager)`
Next, call the method that you want to have do something. You'll notice
something a bit of trickery here, I'm using the actual `SampleManager`
class and passing my manager mock object in as the self argument. This
allows us to capture what our implementation code does with our manager
inside the `get_by_user` method.
`models.SampleManager.get_by_user(manager, user)`
Finally, assert that your desired result occured. Here, we are asserting that
the filter method of our manager mock object was called with the keyword user
argument with the value of our user mock.
`manager.filter.assert_called_with(user=user)`

Let's take a look at a different way to write that same test.
{% highlight python %}
    @mock.patch('django_testing.models.SampleManager.filter', mock.Mock())
    def test_filters_by_user_with_patch(self):
        user = mock.Mock()
        models.Sample.objects.get_by_user(user)
        models.Sample.objects.filter.assert_called_with(user=user)
{% endhighlight %}

Here, I used the mock library's patch decorator to mock the `filter` method on
the `SampleManager` class instead of using the 'mock as self' trickery. Let's
look at one more way to write this test.

{% highlight python %}
    @mock.patch('django_testing.models.SampleManager.filter')
    def test_filters_by_user_with_patch_and_filter_passed_in(self, filter_method):
        user = mock.Mock()
        models.Sample.objects.get_by_user(user)
        filter_method.assert_called_with(user=user)
{% endhighlight %}

In this example, I'm using the patch decorator a little bit differently. By omitting
the second argument, the patch decorator will pass the mock into your test method
which will then allow you to do assertions directly against it. Now, say we want to
check for specific return values, consider this test.

{% highlight python %}
    @mock.patch('django_testing.models.SampleManager.get_last')
    @mock.patch('django_testing.models.SampleManager.get_first')
    def test_result_of_one_query_in_args_of_another(self, get_first, get_last):
        result = models.Sample.objects.get_first_and_last()
        self.assertEqual((get_first.return_value, get_last.return_value), result)
{% endhighlight %}

We want to make sure that the result of `get_first_and_last` returns a tuple of the result
of `get_first` and `get_last`. Our implementation code would look like this.

{% highlight python %}
from django.db import models
 
class SampleManager(models.Manager):
    def get_first(self):
        pass
    def get_last(self):
        pass
    def get_first_and_last(self):
        return self.get_first(), self.get_last()
 
class Sample(models.Model):
    objects = SampleManager()
{% endhighlight %}

That is really all there is to getting started with mocking django. There are a few more
advanced things that I will save for a follow up post, so stay tuned for that. I hope this
has been helpful, thanks for reading.

[Django]: http://www.djangoproject.com/
[TDD]: http://en.wikipedia.org/wiki/Test-driven_development
[fixtures]: http://docs.djangoproject.com/en/dev/topics/testing/#fixture-loading
[assertions]: https://docs.djangoproject.com/en/dev/topics/testing/overview/#assertions
[mock]: http://pypi.python.org/pypi/mock/
[TestCase]: http://docs.python.org/2/library/unittest.html#unittest.TestCase
[DjangoTestCase]: https://docs.djangoproject.com/en/dev/topics/testing/overview/#django.test.TestCase
