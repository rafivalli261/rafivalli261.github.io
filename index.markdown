---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: custom-home
author_profile: true
header:
  image: /assets/images/hero_banner.png
  title: "Rafi Valli Homepage"
  subtitle: "Place to write some articles, guides, etc. Mainly about education, research, and games"
#   cta_label: "Get Started"
#   cta_url: "/getting-started/"

menu_one:
  title: "Articles"
  description: "In-depth professional insights, well-researched topics, and expert opinions."
  button:
    text: "Read some Thoughts"
    url: "/articles/"

menu_two:
  title: "Guides"
  description: "Step-by-step tutorials, how-to articles, both casual and professional."
  button:
    text: "Dive into Guides"
    url: "/guides/"

menu_three:
  title: "Posts"
  description: "Casual thoughts, personal stories, random musings."
  button:
    text: "Express your Ideas"
    url: "/posts/"
---
<!-- This loops through the paginated posts -->
<!-- {% for post in paginator.posts %}
  <h1><a href="{{ post.url }}">{{ post.title }}</a></h1>
  <p class="author">
    <span class="date">{{ post.date }}</span>
  </p>
  <div class="content">
    {{ post.content }}
  </div>
  <div class="content">
    {{ post.content }}
  </div>
{% endfor %} -->