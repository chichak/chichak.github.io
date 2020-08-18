---
title: About Me
permalink: /about/
header:
  image: /images/banner.png
published: true
---
I am a computer science Engineer who Loves to solve problems through data science :)

Article about style transfer learning {% link _posts/2020-03-18-style-transfer-learning.md %} or {% post_url 2020-03-18-style-transfer-learning %} or maybe 

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
