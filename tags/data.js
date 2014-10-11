---
---
[
{% for tag in site.tags %}{% assign posts = 0 %}
    {
        "tag": "{{ tag | first}}",
        "articles": [
            {% for post in site.posts %}{% assign tag_name = tag | first %}{% if post.tags contains tag_name %} {% if posts > 0 %},{% endif %}{
                "date": "{{ post.date | date: "%Y-%m-%d" }}",
                "title": "{{ post.title }}",
                "url": "{{ post.url }}"
            }{% assign posts = 1 %}{% endif %}{% endfor %}
        ]
    }{% if forloop.last == false %},{% endif %}
{% endfor %}
]
