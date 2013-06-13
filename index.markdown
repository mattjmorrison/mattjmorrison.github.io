---
layout: default
title: mattjmorrison.com
---

{% assign post = site.posts.first %}
{% assign content = post.content %}
<h2>{{ post.title }}</h2>
<p class="meta">{{ post.date | date: "%B %d, %Y" }}</p>
<div id="post">
{{ content }}
</div>


