---
title: About Me
permalink: /about/
header:
  image: /images/banner.png
published: true
---

I am a computer science Engineer who Loves to solve problems through data science :)

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
