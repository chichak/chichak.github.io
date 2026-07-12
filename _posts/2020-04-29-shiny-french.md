
---
layout: post
title:  "Shiny for french accents use"
date: '2020-04-29 14:25:00 +0100'
categories: IT
---


If you are using shiny server in ubuntu.  
In order to use french alphabet with shiny, Create a file named:
.Renviron  -  (notice the dot in the filename) in /home/shiny directory with this content:

LANG=fr_FR.UTF-8
