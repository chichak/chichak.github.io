## This is the code to build maps for morocco 12 states.
## The geojson file is located here : 
<a href=https://github.com/chichak/Covid19-MA/blob/master/ma-convid19-state.geojson>

```R
library(geojsonio)
spdf <- geojson_read("C:/Users/John Doe/Desktop/Covid/ma-convid19-state.geojson",  what = "sp")


# 'fortify' the data to get a dataframe format required by ggplot2
library(broom)
spdf_fortified <- tidy(spdf)

# Add column "region" and bind it to "names.FR" from first file
spdf_fortified$region <- factor(as.numeric(spdf_fortified$id))
levels(spdf_fortified$region) <- spdf$Name.FR

# Build your informative dataset which contains the information you ant to plot
reg_cases <- data.frame(spdf@data[["Name.FR"]], spdf@data[["Active.cases"]])
names(reg_cases) <- c("region", "active")


#Merge datasets into one full dataset
active_regions <- merge(spdf_fortified, reg_cases)
# Plot it
library(ggplot2)
library(ggthemes)

# Old plot
# ggplot() +
#   geom_polygon(data = spdf_fortified, aes( x = long, y = lat, group = group), fill="#69b3a2", color="black") +
#   theme_void() +
#   coord_map()

ggplotly(ggplot() +
  geom_polygon(data = active_regions, aes( x = long, y = lat, group = group, fill = active)) +
  coord_map() +
  theme_map())

# At the outset this looks fine, but if you count the states, 
# you'll see you only have 14! The reason is that Berlin 
# and Bremen are city-states located within the shape definitions of other states. 
# You can solve this by reording the data (like you did before), 
# or by adding two specific layers, 
# for example, 
# 
# geom_polygon(data = subset(bundes_unemp, id == "Berlin")) 
```
