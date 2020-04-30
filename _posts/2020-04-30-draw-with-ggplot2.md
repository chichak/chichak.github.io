
---
layout: post
title:  "AWS for beginners"
---


## 1. Patterns in nature
<p><img style="float: left;margin:2px 2px 2px 2px" src="https://assets.datacamp.com/production/project_62/img/phyllotaxis2.png" height="300" width="300">  </p>
<p><em>"The scientist does not study nature because it is useful; he studies it because he delights in it, and he delights in it because it is beautiful." (Henri Poincar??)</em></p>
<p>There are many examples of <em>natural facts</em> that can be described in mathematical terms. Nice examples are the shape of snowflakes, the <em>fractal geometry</em> of romanesco broccoli or how self-similarity rules the growth of plants.</p>
<p>R is a tool for doing serious analysis, but not everything in life is serious. Life is also funny, and R can be used to have fun and to do beautiful things. Its graphical power can be used to produce artistic images like the one that illustrates this section, which is inspired by how plants arrange their leaves. This fact is called <em>phyllotaxis</em> and will serve as the basis of this project.</p>
<p>In this notebook, we are using the <code>ggplot2</code> package. Apart from having fun, we will learn many important features of it that will be useful not only to do art but also to represent data in real-life problems. Let's start by loading the library.</p>


```R
# Set plot images to a nice size
options(repr.plot.width = 4, repr.plot.height = 4)

# Load the ggplot2 package
library(ggplot2)
```



## 2. Warming up: drawing points on a circle
<p>There are many ways to represent data with <code>ggplot2</code>: from simple scatter plots to more complex violin plots. The functions that start with <code>geom_</code> define the type of plot. In this notebook, we will only work with <code>geom_point()</code> which plots points in two dimensions. We'll need a dataset with two variables; let's call them <code>x</code> and <code>y</code>.</p>
<p>We'll start by drawing 50 points on a circle of radius 1. As every <code>(x, y)</code> point should be in the unit circle, it follows that x?? + y?? = 1. We can get this using the <em>super famous</em> Pythagorean trigonometric identity which states that sin??(??) + cos??(??) = 1 for any real number ??.</p>


```R
# Create circle data to plot
t <- seq(0, 2*pi, length.out = 50)
x <- sin(t)
y <- cos(t)
df <- data.frame(t, x, y)

# Make a scatter plot of points in a circle
p <- ggplot(df, aes(x, y))
p + geom_point()
```


![png](/images/drawflower/output_4_0.png)



## 3. Make it harmonious with the Golden Angle
<p>Plants arrange their leaves in spirals. A spiral is a curve which starts from the origin and <em>moves away</em> from the origin as it revolves around it. In the plot above all our points are the same distance from the origin. A simple way to arrange them in a spiral is to multiply <code>x</code> and <code>y</code> by a factor which increases for each point. We <em>could</em> use <code>t</code> as that factor, as it meets these conditions, but we will do something more <em>harmonious</em>. We will use the <a href="https://en.wikipedia.org/wiki/Golden_angle">Golden Angle</a>:</p>
<p style="text-align: center;">Golden Angle = ??(3 ??? ???5)</p>
<p>This number is inspired by the Golden Ratio, one of the most famous numbers in the history of mathematics. Imagine that you have a circumference and you break up it into two arcs with lengths <code>a</code> and <code>b</code>, with <code>a&gt;b</code> (an arc is a portion of the circumference). The angle that <em>breaks</em> the circle so that <code>a/b=(a+b)/a</code> is called the Golden Angle. In other words: the Golden Angle <em>breaks up</em> a circle so that the ratio of the big arc to the little arc is the Golden Ratio. This image (from Wikipedia) illustrates the previous definition:</p>
<p><img src="https://assets.datacamp.com/production/project_62/img/Golden_Angle.png" height="300" width="300"></p>
<p>The Golden Angle is the angle subtended by the smaller (red) arc. Both the Golden Ratio and the Golden Angle appear in unexpected places in nature. Apart of flower petals and plant leaves, you'll find them in seed heads, pine cones, sunflower seeds, shells, spiral galaxies, hurricanes, etc.</p>
<p>It's time to <em>spiralize</em>!</p>


```R
# Define the number of points
points <- 500
# Define the Golden Angle
angle <- pi*(3-sqrt(5))
t <- (1:points) * angle
x <- sin(t)
y <-cos(t)
df <- data.frame(t, x, y)

# Make a scatter plot of points in a spiral
p <- ggplot(df, aes(x*t, y*t))
p + geom_point()
```


![png](/images/drawflower/output_7_0.png)




## 4. Remove everything unnecessary
<p>Apart from data, a plot includes many other components that define its final appearance. Our previous plot contains:</p>
<ul>
<li>a <strong>background</strong> filled with grey color</li>
<li>a <strong>grid</strong> of horizontal and vertical white lines</li>
<li><strong>ticks</strong> along the axis</li>
<li>a <strong>title</strong> on each axis</li>
<li><strong>text</strong> along axes to label marks</li>
</ul>
<p>Art does not get along with most of these elements, so it's time to move to action.</p>


```R
df <- data.frame(t, x, y)

# Make a scatter plot of points in a spiral and remove some plot components
p <- ggplot(df, aes(x*t, y*t))
p + geom_point() +
theme(panel.grid = element_blank() ,axis.text = element_blank() ,axis.title = element_blank() ,axis.ticks = element_blank(), panel.background = element_rect(fill="white"))
```


![png](/images/drawflower/output_10_0.png)




## 5. A bit of makeup: size, color and transparency
<p>Our drawing is starting to look like a plant, but we can better. By changing color, transparency (also called <em>alpha</em>), and size of the points, the image will become more appealing.</p>


```R
# Change the code from Task 4 to modify the 
# size, transparency, and color of the points
p <- ggplot(df, aes(x*t, y*t))
p + geom_point(size = 8, alpha = 0.5, color = "darkgreen") +
theme(axis.text = element_blank() ,axis.title = element_blank() ,axis.ticks = element_blank(), panel.background = element_rect(fill="white"))
```


![png](/images/drawflower/output_13_0.png)




## 7. Put all it together: the sunflower
<p>Plants not only use the Golden Angle to arrange leaves. The Golden Angle is also found in the arrangement of sunflower seeds. We don't need anything new to draw a sunflower; we just need to combine some of the things we already know.</p>


```R
# Copy the code from Task 5 and modify the 
# color, size, and shape of the points
p <- ggplot(df, aes(x*t, y*t, alpha = 0.5))
p + geom_point(aes(size = t), shape = 17, color = "yellow") +
theme(legend.position = "none", axis.text = element_blank() ,axis.title = element_blank() ,axis.ticks = element_blank(), panel.background = element_rect(fill="darkmagenta"))
```


![png](/images/drawflower/output_19_0.png)





## 8. What if you modify the angle?
<p>These patterns are very sensitive to the angle between the points that form the spiral. Small changes to the angle can generate very different images. Let's look at an example of that.</p>


```R
# Change the value of the angle
angle <- 2.0
points <- 1000

t <- (1:points)*angle
x <- sin(t)
y <- cos(t)
df <- data.frame(t, x, y)

# color, size, and shape of the points
p <- ggplot(df, aes(x*t, y*t, alpha = 0.5, color = "yellow"))
p + geom_point(aes(size = t), shape = 17) +
theme(legend.position = "none", axis.text = element_blank() ,axis.title = element_blank() ,axis.ticks = element_blank(), panel.background = element_rect(fill="darkmagenta"))
```


![png](/images/drawflower/output_22_0.png)




## 9. All together now: imaginary flowers
<p><img style="float: left;margin:2px 2px 2px 2px" src="https://assets.datacamp.com/production/project_62/img/flower.png" height="280" width="280"></p>
<p>The techniques we've used so far allow us to create an <em>infinite</em> number of patterns inspired by nature: the only limit is our imaginations. But making art has also been a fun excuse to learn to use <code>ggplot2</code>. All the tricks we have seen in this notebook are useful when plotting <em>real</em> data too.</p>
<p>The image on the left is a simple variation of the previous flower and is in essence very similar to the first figure in which we plotted 50 points in a circle. I hope you've enjoyed the journey between that simple circle and this beautiful flower.</p>


```R
# Change the values of angle and points
angle <- 13*pi/180
points <- 2000

t <- (1:points)*angle
x <- sin(t)
y <- cos(t)
df <- data.frame(t, x, y)

# Adjust the plot parameters to create the magenta flower
p <- ggplot(df, aes(x*t, y*t))
p + geom_point(size = 80, alpha = 0.1, shape =1, color = "magenta4")+
  theme(legend.position="none",
        panel.background = element_rect(fill = "white"),
        panel.grid=element_blank(),
        axis.ticks=element_blank(),
        axis.title=element_blank(),
        axis.text=element_blank())
```


