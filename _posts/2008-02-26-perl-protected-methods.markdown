---
layout: post
title:  "Object Oriented Perl: Protected Methods"
date:   2008-02-26
---

I've been using Java and Perl both for the past few years and I've noticed things
that I like about each that I wish the other could do. In Perl, of course, the
object oriented syntax is a bit more difficult than in Java. I'll cut to the
chase, I finally figured out how to create a "protected" method in Perl that
mimics the functionally of a protected method in Java. Here is the code:

{% highlight perl %}
sub protectedMethod {
    die("_get is not a visible method") unless caller->isa(__PACKAGE__);
    my $self = shift;
    #do whatever here....
}
{% endhighlight %}
