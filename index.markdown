---
layout: default
title: mattjmorrison.com
nocomments: true
---

<div class="well">
  Hi, I'm Matthew J Morrison. I write software. I also write and speak about writing software.
</div>

<div class="well">
  <h2>Latest Blog</h2>
  {% assign post = site.posts.first %}
  <a href="{{ post.url }}"><h4>{{ post.date | date: "%B %d, %Y" }}: {{ post.title }}</h4></a>
</div>

<div>
  <a href="http://twitter.com/mattjmorrison" alt="@mattjmorrison" title="@mattjmorrison">
    <img src="https://g.twimg.com/Twitter_logo_blue.png" width="150px" />
  </a>
  <a href="http://github.com/mattjmorrison" alt="mattjmorrison" title="mattjmorrison">
    <img src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png" width="150px" />
  </a>
</div>

