
---
layout: post
title:  "Understanding web scraping with R"
categories: [blog, AI]
tags: [artificial intelligence, ml]
---

#First, we load the library we'll be using 
library(rvest)

page <- read_html("https://www.imdb.com/search/title/?groups=top_250&sort=user-rating")


header_nodes <- html_nodes(page, css = ".lister-item-header a")
rating_nodes <- html_nodes(page, css = ".ratings-imdb-rating strong")

#header_nodes
#rating_nodes

title <- html_text(header_nodes)
#title
rating <- html_text(rating_nodes)
links <- html_attr(header_nodes, "href")

title_rating_df <- data.frame(title, rating, links)

title_rating_df

This is just for test ---

<script type="text/javascript" src="//cdn.datacamp.com/dcl-react.js.gz"></script>

