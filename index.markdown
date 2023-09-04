---
layout: default
title: mattjmorrison.com
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
  <a href="https://linktr.ee/mattjmorrison" alt="Socials" title="@mattjmorrison">Social Links</a>
</div>
