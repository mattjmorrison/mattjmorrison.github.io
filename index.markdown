---
layout: default
title: mattjmorrison.com
nocomments: true
---

Hi, I'm Matthew J Morrison. I write software. I also write about writing software.

<h2>Latest Blog</h2>
{% assign post = site.posts.first %}
<a href="{{ post.url }}"><h4>{{ post.date | date: "%B %d, %Y" }}: {{ post.title }}</h4></a>

<a class="twitter-timeline" href="https://twitter.com/mattjmorrison" data-widget-id="512812513532993537">Tweets by @mattjmorrison</a>
<script>
!function(d,s,id){
  var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
  if(!d.getElementById(id)){
    js = d.createElement(s);
    js.id = id;
    js.src = p + "://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
  }
}(document,"script","twitter-wjs");
</script>
