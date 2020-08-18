---
title: DevOps
permalink: /DevOps/
header:
  image: /images/banner.png
published: true
---

<ul>
  {% for post in site.posts.hacks %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul> 

