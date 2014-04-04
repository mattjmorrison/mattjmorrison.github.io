---
layout: post
title:  'Testing Ember.js Applications'
date:   2014-04-2
---

One of the highlights from EmberConf 2014 for me was the focus on testing. [Eric Berry][coderberry] put together a great talk (check out his slides [here][coderberry_slides]). However, there was one thing that was a bit unsettling to me. It seemed like the general response to Eric's talk was "Great, now we can test Ember!". I was hoping the response would have been "Great, we're getting more tools to make testing Ember even better!".

This saddened me. I was under the assumption that nobody was writing serious Ember applications without tests. My team currently has 4 Ember applications, all of which are thoroughly tested and none of which are currently using [ember-qunit][ember-qunit]. Ember-qunit is great, and it will absolutely help to optimize very focused unit tests but it is in no way required to write unit level tests. Here is an example of what I mean.

### Ember-Qunit

First, let's take a look at an example of unit testing a route's model hook using ember-qunit.

<a class="jsbin-embed" href="http://jsbin.com/fecet/latest/embed?js,output">EmberJs Unit Testing</a><script src="http://static.jsbin.com/js/embed.js"></script>

In this example, we're using ember-qunit's `moduleFor` to isolate our cars route as well as using `this.subject()` to get an instance of our cars route. The point of our test is to verify that the `model` hook of our `CarsRoute` object returns the expected model object.

### Unit Testing Without Ember-Qunit

Let's take a look at the same test without using ember-qunit.

<a class="jsbin-embed" href="http://jsbin.com/cejow/latest/embed?js,output">EmberJs Unit Testing</a><script src="http://static.jsbin.com/js/embed.js"></script>

Not much different really. The `moduleFor` has been replaced by a vanilla qunit `module` and the `this.subject()` has been replaced with `new App.CarsRoute()`. The ember-qunit approach definitely has some advantages, though they may not be obvious in this example. Either way, unit testing is completely possible both with and without ember-qunit. I don't want to dive into the details a whole lot here with what ember-qunit does (honestly, because I don't know what they all are). I primarily want to express that ember-qunit is a tool that will enhance the ability to write unit tests for Ember applications, but unit testing is completely possible without it as well.

### Only Unit Test When You Need To

Finally, I have one more point to make. This may be a bit controversial so buckle up. Over the past few years my team and I have evolved the way that we test applications. We have found that maintaining unit tests over time tends to be tedious and requires more upkeep than is desirable. Let's dissect our previous examples and see why that style of testing may prove to be brittle.

### Stubbing The Object You Are Testing

The first brittle piece of our test is where we are stubbing out our store. Since you're replacing a piece of production code with a different piece of code you are not really testing your production code as it will exist in production. You are testing a piece of your production code, which is the point, right? However, what happens when the piece of stubbed out production code changes and your stubbed out test version does not? Then you will have a passing test and failing production code, which is a worst case scenario. This type of test is a short term win and a long term burden. While stubbing is not completely avoidable, a good rule to follow is not to stub (or mock) the object that you are testing.

### Calling Methods That You Never Call

The next brittle piece of our test is that we are calling the `model` hook ourselves. In real production code, application code never actually does that. Calling the `model` hook is something that the Ember internals do. I know that the API is stable and is probably not going to change anytime soon, but you are making assumptions about how Ember will be calling the model hook so if that does change your test will continue to pass while your production code will not work.

### Your Tests Are Rigid

The next brittle piece of our test is we are tying down the fact that our store's `find` method is called inside of the route's `model` hook. Honestly, that detail does not really matter. Who cares if we call our store's `find` method in the `model` hook or in `setupController` or somewhere else entirely. The only thing that adding a test like this with this level of granularity is going to provide is a broken test when you try to refactor your code later - which, if you are unfamiliar with refactoring, is not the desired behavior of your tests.

### Do Not Unit Test

For this specific scenario I would recommend not writing a unit test at all, but instead writing an integration test. What my team and I have discovered is that over time the tests that really matter are the high level tests that exercise the functionality of the system without knowing about many of the internals. This provides an excellent [regression][regression] suite and allows you to mercilessly make changes to the structure of your code, the names of your methods, the method signatures and where things happen without having to worry about going to fix every broken unit test along the way.


### Integration Test All The Things

Integration tests, in my experience, over time tend to remain generally unchanged. This may seem counter intuitive, but I have found it to be true. Let me explain why. As code changes over time it gets [refactored][refactoring]. What was once one method becomes multiple methods, what was one object becomes multiple objects, what was once called `x` becomes called `y` and so on. Things grow and change. The problem that appears with "pure" unit tests is that as things are added to the unit that is being tested your tests will break or need to be updated. You can be sure that your code will change over time, it is inevitable.

I find that a majority of the tests I write are 95% integration tests and 5% unit tests. This allows significant refactoring of code without having to change the tests. Which is really what you want to have with a trustworthy test suite. Your tests should tell you that the system is working the way you want. If you have to change your tests every time you change your code, how do you know that you're not introducing a problem in your code and your tests at the same time? You need a reliable test suite that will tell you over and over, "The change that you just made did not break anything, carry on".

Let's take another look at the same ember application tested using Ember's integration testing helpers.

<a class="jsbin-embed" href="http://jsbin.com/levet/latest/embed?js,output">EmberJs Integration Testing</a><script src="http://static.jsbin.com/js/embed.js"></script>

This is quite a bit different from our other examples, yet we are in fact testing that our cars route's `model` hook is calling our store's `find` method, because if we remove that code our test will fail. We also happen to be testing that our route is wired up correctly as is our template. A lot of unit testing purists claim this is a bad thing because we are testing more than one thing and when that test fails it is going to be difficult to know why it is broken. I disagree. There are definitely more places that could cause this test to break, however there are many more places that I can move my code around keeping identical functionality without changing my test code at all.

### Decouple

This test will stand the test of time because of one key word, coupling. It is well known that tightly coupling code is not a good thing. The same is true with tests. If your tests are loosely coupled to your production code that provides more flexibility, more opportunities to refactor without having to go update all of your tests. Our integration tests touch our production code in very few places.

* We must have a `/` route
* We must get our data from an API at `/cars`
* We must have a css class of `car_name` in our template that displays our data.

When you think about it, that seems coupled. However, none of those things actually refer to our Ember code at all. We are free to move and rename everything as long as those 3 things remain unchanged our test will continue to pass. We can add additional functionality also and our test will continue to pass.

Let's compare that to the coupling in the unit test.

* We must have a route named `route:cars` or an object called `App.CarsRoute`.
* Our route object must have a property called `store`.
* The `store` that our route object has must have a method called `find`.
* The `store`'s `find` method must return a model object that contains our data.
* Our route must have a `model` method that returns the same object that was returned from the `find` method on the store.

To me, looking at these two lists, I would rather not care about the 5 implementation details and really just care that when I go to a specific route I see certain data on the page. The implementation details are subject (and likely) to change. I want to focus my testing the parts of my application that are going to remain true for the long term.

### Stub Data, Not Code

In our integration test example we are using a library called [mockjax][mockjax]. This is specific to jQuery's ajax, so keep that in mind if you are not using jQuery - or something that uses jQuery. Our use of mockjax is stubbing out data, not code, just data. We are saying that we expect an ajax request to be sent to `/cars` and when that happens intercept it and return a fixed set of data instead of actually making the call. None of our application code is actually changing here, we are swapping out a very far removed boundary so that all of our code regardless of whether we are testing or we are running in production is completely unchanged.

### What To Unit Test

Although this may seem like a massive ranting rage quit against unit testing, it really is not. Unit testing is important. Unit testing is just a tool, as is integration testing. Because of the long term issues that can arise due to over unit testing and under integration testing, I recommend integration testing everything and adding unit tests sparingly as the need arises. So, when does the need arise? Let's look at another example.

<a class="jsbin-embed" href="http://jsbin.com/jikit/latest/embed?js,output">EmberJs Integration Testing</a><script src="http://static.jsbin.com/js/embed.js"></script>

This, I think, is a perfect use case for unit tests. You have one piece of code, validation is a good example, that you need to throw a whole bunch of different permutations of data at and expect different results. Notice there is a single input and a single output and no external dependencies and no [side effects][side_effects]. In a scenario like this, you would want to start with an integration test and do a [happy path][happy_path] test and maybe a single error scenario (to make sure error messages and whatnot are working correctly). Then you would want a barrage of unit tests to test all the different possible edge cases.

### What About Using TDD To Drive My Design

A lot of unit testing purists will claim that if you are starting with integration tests or if you are driving your code with high level tests then you are not letting your tests drive our the design of your code. This is true. However when you are using a framework like Ember, the way I see it, is all of the big application design has already been driven out. In the previous VIN number validation example, there is probably some design work that needs to be done there. If you have never looked into it VIN number validation is fairly complex. Starting with simple unit tests of what are and are not valid VIN numbers you can drive out an object or objects that can take care of picking apart and validating VIN numbers. Don't try to use tests to design objects that have already been designed. Use it where you will actually benefit from the practice of test driven design.

### That's All Folks

Thanks for sticking it out to the end. If you skimmed, you know who you are, I do not blame you. This was a pretty big commitment. I would love to hear from you and hear your stories about testing. What works for you, what hasn't worked for you? I hope you stop by again sometime. Don't forget TEST ALL THE THINGS!

[happy_path]: http://en.wikipedia.org/wiki/Happy_path
[side_effects]: http://en.wikipedia.org/wiki/Side_effect_(computer_science)
[mockjax]: https://github.com/appendto/jquery-mockjax
[regression]: http://en.wikipedia.org/wiki/Regression_testing
[coderberry]: https://twitter.com/coderberry
[mocking]: http://en.wikipedia.org/wiki/Mock_object
[refactoring]: http://en.wikipedia.org/wiki/Code_refactoring
[coderberry_slides]:https://twitter.com/coderberry/status/448974530497626112
[ember-qunit]: https://github.com/rpflorence/ember-qunit
