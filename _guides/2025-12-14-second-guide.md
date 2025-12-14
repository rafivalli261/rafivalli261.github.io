---
layout: single
title:  "Second Guide"
date:   2025-12-14
categories: guide
---
{{ product.title | handle }}
{% assign user = "Rafi" %}

{{ page.title }}

<p>this is guide exmpale</p>

{% if user %}
  Hello {{ user.name }}!
{% endif %}
