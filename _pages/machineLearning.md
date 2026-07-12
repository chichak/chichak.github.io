---
title: "Machine learning field notes"
permalink: /Machine-Learning/
---

Notes on models, experiments, data quality, and the engineering work required to make machine learning useful.

{% for post in site.posts %}
{% if post.title contains "Learning" or post.title contains "learning" or post.title contains "Regression" or post.title contains "regression" or post.title contains "Data" %}
- [{{ post.title }}]({{ post.url | relative_url }}) — {{ post.date | date: "%Y" }}
{% endif %}
{% endfor %}
