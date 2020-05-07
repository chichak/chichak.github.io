<h1 itemprop=headline> GLM in R: Generalized Linear Model with Example </h1></div><dl class="article-info muted"> <dt class=article-info-term> Details </dt><dd class=modified> <span class=icon-calendar aria-hidden=true></span> <time datetime=2020-04-13T02:57:53+05:30 itemprop=dateModified> Last Updated: 13 April 2020 </time> </dd> </dl><div itemprop=articleBody><div><div style=float:left;padding-right:6px; class=top-ads-boxes><div id=div-gpt-ad-1565016699961-0> <script>googletag.cmd.push(function(){googletag.display('div-gpt-ad-1565016699961-0');});</script> </div> </div></div><h2><a id=1></a>What is Logistic regression?</h2><p>Logistic regression is used to predict a class, i.e., a probability. Logistic regression can predict a binary outcome accurately. <p>Imagine you want to predict whether a loan is denied/accepted based on many attributes. The logistic regression is of the form 0/1. y = 0 if a loan is rejected, y = 1 if accepted. <p>A logistic regression model differs from linear regression model in two ways. <ul><li>First of all, the logistic regression accepts only dichotomous (binary) input as a dependent variable (i.e., a vector of 0 and 1).</li><li>Secondly, the outcome is measured by the following probabilistic link function called <strong>sigmoid</strong> due to its S-shaped.:</li></ul><p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized18.jpg class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized18.jpg alt=""/></a> <p>The output of the function is always between 0 and 1. Check Image below <p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized1.png class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized1.png alt=""/></a> <p>The sigmoid function returns values from 0 to 1. For the classification task, we need a discrete output of 0 or 1. <p>To convert a continuous flow into discrete value, we can set a decision bound at 0.5. All values above this threshold are classified as 1 <p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized19.jpg class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized19.jpg alt=""/></a> <p>In this tutorial, you will learn <ul> <li><a href=#1>What is Logistic regression? </a></li> <li><a href=#2>How to create Generalized Liner Model (GLM) </a> </li> <li><a href=#3>Step 1) Check continuous variables </a> </li> <li><a href=#4>Step 2) Check factor variables </a> </li> <li><a href=#5>Step 3) Feature engineering </a> </li> <li><a href=#6>Step 4) Summary Statistic </a> </li> <li><a href=#7>Step 5) Train/test set </a> </li> <li><a href=#8>Step 6) Build the model </a> </li> <li><a href=#9>Step 7) Assess the performance of the model </a> </li> </ul><h2><a id=2></a>How to create Generalized Liner Model (GLM)</h2><p>Let's use the <strong>adult</strong> data set to illustrate Logistic regression. The "adult" is a great dataset for the classification task. The objective is to predict whether the annual income in dollar of an individual will exceed 50.000. The dataset contains 46,033 observations and ten features: <ul><li>age: age of the individual. Numeric</li><li>education: Educational level of the individual. Factor.</li><li>marital.status: Marital status of the individual. Factor i.e. Never-married, Married-civ-spouse, ...</li><li>gender: Gender of the individual. Factor, i.e. Male or Female</li><li>income: Target variable. Income above or below 50K. Factor i.e. &gt;50K, &lt;=50K</li></ul><p>amongst others <pre>
library(dplyr)
data_adult &lt;-read.csv("https://raw.githubusercontent.com/guru99-edu/R-Programming/master/adult.csv")
glimpse(data_adult)
</pre><p><strong>Output:</strong> <pre>
Observations: 48,842
Variables: 10
$ x               &lt;int&gt; 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,...
$ age             &lt;int&gt; 25, 38, 28, 44, 18, 34, 29, 63, 24, 55, 65, 36, 26...
$ workclass       &lt;fctr&gt; Private, Private, Local-gov, Private, ?, Private,...
$ education       &lt;fctr&gt; 11th, HS-grad, Assoc-acdm, Some-college, Some-col...
$ educational.num &lt;int&gt; 7, 9, 12, 10, 10, 6, 9, 15, 10, 4, 9, 13, 9, 9, 9,...
$ marital.status  &lt;fctr&gt; Never-married, Married-civ-spouse, Married-civ-sp...
$ race            &lt;fctr&gt; Black, White, White, Black, White, White, Black, ...
$ gender          &lt;fctr&gt; Male, Male, Male, Male, Female, Male, Male, Male,...
$ hours.per.week  &lt;int&gt; 40, 50, 40, 40, 30, 30, 40, 32, 40, 10, 40, 40, 39...
$ income          &lt;fctr&gt; &lt;=50K, &lt;=50K, &gt;50K, &gt;50K, &lt;=50K, &lt;=50K, &lt;=50K, &gt;5...
</pre><p>We will proceed as follow: <ul><li>Step 1: Check continuous variables</li><li>Step 2: Check factor variables</li><li>Step 3: Feature engineering</li><li>Step 4: Summary statistic</li><li>Step 5: Train/test set</li><li>Step 6: Build the model</li><li>Step 7: Assess the performance of the model</li><li>step 8: Improve the model</li></ul><p>Your task is to predict which individual will have a revenue higher than 50K.<div><div id=div-gpt-ad-9092914-1> <script>googletag.cmd.push(function(){googletag.display('div-gpt-ad-9092914-1');});</script> </div> </div><p>In this tutorial, each step will be detailed to perform an analysis on a real dataset. <h3><a id=3></a>Step 1) Check continuous variables</h3><p>In the first step, you can see the distribution of the continuous variables. <pre>continuous &lt;-select_if(data_adult, is.numeric)
summary(continuous)</pre><p>Code Explanation <ul><li>continuous &lt;- select_if(data_adult, is.numeric): Use the function select_if() from the dplyr library to select only the numerical columns</li><li>summary(continuous): Print the summary statistic</li></ul><p><strong>Output:</strong> <pre>##        X              age        educational.num hours.per.week 
##  Min.   :    1   Min.   :17.00   Min.   : 1.00   Min.   : 1.00  
##  1st Qu.:11509   1st Qu.:28.00   1st Qu.: 9.00   1st Qu.:40.00  
##  Median :23017   Median :37.00   Median :10.00   Median :40.00  
##  Mean   :23017   Mean   :38.56   Mean   :10.13   Mean   :40.95  
##  3rd Qu.:34525   3rd Qu.:47.00   3rd Qu.:13.00   3rd Qu.:45.00  
##  Max.   :46033   Max.   :90.00   Max.   :16.00   Max.   :99.00	
</pre><p>From the above table, you can see that the data have totally different scales and hours.per.weeks has large outliers (.i.e. look at the last quartile and maximum value). <p>You can deal with it following two steps: <ul><li>1: Plot the distribution of hours.per.week </li><li>2: Standardize the continuous variables</li></ul><ol><li>Plot the distribution</li></ol><p>Let's look closer at the distribution of hours.per.week <pre>
# Histogram with kernel density curve
library(ggplot2)
ggplot(continuous, aes(x = hours.per.week)) +
    geom_density(alpha = .2, fill = "#FF6666")
	</pre><p><strong>Output:</strong> <p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized2.png class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized2.png alt=""/></a> <p>The variable has lots of outliers and not well-defined distribution. You can partially tackle this problem by deleting the top 0.01 percent of the hours per week. <p>Basic syntax of quantile: <pre>quantile(variable, percentile)
arguments:
-variable:  Select the variable in the data frame to compute the percentile
-percentile:  Can be a single value between 0 and 1 or multiple value. If multiple, use this format:  `c(A,B,C, ...)
- `A`,`B`,`C` and `...` are all integer from 0 to 1.</pre><p>We compute the top 2 percent percentile <pre>
top_one_percent &lt;- quantile(data_adult$hours.per.week, .99)
top_one_percent
</pre><p>Code Explanation <ul><li>quantile(data_adult$hours.per.week, .99): Compute the value of the 99 percent of the working time</li></ul><p><strong>Output:</strong> <pre>## 99% 
##  80	</pre><p>98 percent of the population works under 80 hours per week. <p>You can drop the observations above this threshold. You use the filter from the dplyr library. <pre>
data_adult_drop &lt;-data_adult %&gt;%
filter(hours.per.week&lt;top_one_percent)
dim(data_adult_drop)</pre><p><strong>Output:</strong> <pre>## [1] 45537    10	</pre><ol start=2><li>Standardize the continuous variables</li></ol><p>You can standardize each column to improve the performance because your data do not have the same scale. You can use the function mutate_if from the dplyr library. The basic syntax is: <pre>mutate_if(df, condition, funs(function))
arguments:
-`df`: Data frame used to compute the function
- `condition`: Statement used. Do not use parenthesis
- funs(function):  Return the function to apply. Do not use parenthesis for the function</pre><p>You can standardize the numeric columns as follow:<div><div id=div-gpt-ad-9092914-2> <script>googletag.cmd.push(function(){googletag.display('div-gpt-ad-9092914-2');});</script> </div> </div> <pre>
data_adult_rescale &lt;- data_adult_drop % &gt; %
	mutate_if(is.numeric, funs(as.numeric(scale(.))))
head(data_adult_rescale)</pre><p>Code Explanation <ul><li>mutate_if(is.numeric, funs(scale)): The condition is only numeric column and the function is scale </li></ul><p><strong>Output:</strong> <pre>
##           X         age        workclass    education educational.num
## 1 -1.732680 -1.02325949          Private         11th     -1.22106443
## 2 -1.732605 -0.03969284          Private      HS-grad     -0.43998868
## 3 -1.732530 -0.79628257        Local-gov   Assoc-acdm      0.73162494
## 4 -1.732455  0.41426100          Private Some-college     -0.04945081
## 5 -1.732379 -0.34232873          Private         10th     -1.61160231
## 6 -1.732304  1.85178149 Self-emp-not-inc  Prof-school      1.90323857
##       marital.status  race gender hours.per.week income
## 1      Never-married Black   Male    -0.03995944  &lt;=50K
## 2 Married-civ-spouse White   Male     0.86863037  &lt;=50K
## 3 Married-civ-spouse White   Male    -0.03995944   &gt;50K
## 4 Married-civ-spouse Black   Male    -0.03995944   &gt;50K
## 5      Never-married White   Male    -0.94854924  &lt;=50K
## 6 Married-civ-spouse White   Male    -0.76683128   &gt;50K
</pre><h3><a id=4></a>Step 2) Check factor variables</h3><p>This step has two objectives: <ul><li>Check the level in each categorical column</li><li>Define new levels</li></ul><p>We will divide this step into three parts: <ul><li>Select the categorical columns</li><li>Store the bar chart of each column in a list</li><li>Print the graphs</li></ul><p>We can select the factor columns with the code below: <pre># Select categorical column
factor &lt;- data.frame(select_if(data_adult_rescale, is.factor))
	ncol(factor)</pre><p>Code Explanation <ul><li>data.frame(select_if(data_adult, is.factor)): We store the factor columns in factor in a data frame type. The library ggplot2 requires a data frame object.</li></ul><p><strong>Output:</strong> <pre>## [1] 6	</pre><p>The dataset contains 6 categorical variables <p>The second step is more skilled. You want to plot a bar chart for each column in the data frame factor. It is more convenient to automatize the process, especially in situation there are lots of columns. <pre>
library(ggplot2)
# Create graph for each column
graph &lt;- lapply(names(factor),
    function(x) 
	ggplot(factor, aes(get(x))) +
		geom_bar() +
		theme(axis.text.x = element_text(angle = 90)))</pre><p>Code Explanation <ul><li>lapply(): Use the function lapply() to pass a function in all the columns of the dataset. You store the output in a list</li><li>function(x): The function will be processed for each x. Here x is the columns</li><li>ggplot(factor, aes(get(x))) + geom_bar()+ theme(axis.text.x = element_text(angle = 90)): Create a bar char chart for each x element. Note, to return x as a column, you need to include it inside the get() </li></ul><p>The last step is relatively easy. You want to print the 6 graphs. <pre>
# Print the graph
graph</pre><p><strong>Output:</strong> <pre>## [[1]]</pre><p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized3.png class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized3.png alt=""/></a> <pre>## ## [[2]]</pre><p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized4.png class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized4.png alt=""/></a> <pre>## ## [[3]]</pre><p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized5.png class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized5.png alt=""/></a> <pre>## ## [[4]]</pre><p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized6.png class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized6.png alt=""/></a> <pre>## ## [[5]]</pre><p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized7.png class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized7.png alt=""/></a> <pre>## ## [[6]]</pre><p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized8.png class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized8.png alt=""/></a> <p>Note: Use the next button to navigate to the next graph<div><div id=div-gpt-ad-9092914-6><script>googletag.cmd.push(function(){googletag.display('div-gpt-ad-9092914-6');});</script></div></div><p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized9.png class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized9.png alt=""/></a> <h3><a id=5></a>Step 3) Feature engineering</h3><h3>Recast education</h3><p>From the graph above, you can see that the variable education has 16 levels. This is substantial, and some levels have a relatively low number of observations. If you want to improve the amount of information you can get from this variable, you can recast it into higher level. Namely, you create larger groups with similar level of education. For instance, low level of education will be converted in dropout. Higher levels of education will be changed to master. <p>Here is the detail: <table class="table1 table-striped"><thead><tr><th><p>Old level </th><th><p>New level </th></tr></thead><tr><td><p>Preschool </td><td><p>dropout </td></tr><tr><td><p>10th </td><td><p>Dropout </td></tr><tr><td><p>11th </td><td><p>Dropout </td></tr><tr><td><p>12th </td><td><p>Dropout </td></tr><tr><td><p>1st-4th </td><td><p>Dropout </td></tr><tr><td><p>5th-6th </td><td><p>Dropout </td></tr><tr><td><p>7th-8th </td><td><p>Dropout </td></tr><tr><td><p>9th </td><td><p>Dropout </td></tr><tr><td><p>HS-Grad </td><td><p>HighGrad </td></tr><tr><td><p>Some-college </td><td><p>Community </td></tr><tr><td><p>Assoc-acdm </td><td><p>Community </td></tr><tr><td><p>Assoc-voc </td><td><p>Community </td></tr><tr><td><p>Bachelors </td><td><p>Bachelors </td></tr><tr><td><p>Masters </td><td><p>Masters </td></tr><tr><td><p>Prof-school </td><td><p>Masters </td></tr><tr><td><p>Doctorate </td><td><p>PhD </td></tr></table><pre>recast_data &lt;- data_adult_rescale % &gt; %
	select(-X) % &gt; %
	mutate(education = factor(ifelse(education == "Preschool" | education == "10th" | education == "11th" | education == "12th" | education == "1st-4th" | education == "5th-6th" | education == "7th-8th" | education == "9th", "dropout", ifelse(education == "HS-grad", "HighGrad", ifelse(education == "Some-college" | education == "Assoc-acdm" | education == "Assoc-voc", "Community",
    ifelse(education == "Bachelors", "Bachelors",
        ifelse(education == "Masters" | education == "Prof-school", "Master", "PhD")))))))</pre><p>Code Explanation <ul><li>We use the verb mutate from dplyr library. We change the values of education with the statement ifelse </li></ul><p>In the table below, you create a summary statistic to see, on average, how many years of education (z-value) it takes to reach the Bachelor, Master or PhD. <pre>
recast_data % &gt; %
	group_by(education) % &gt; %
	summarize(average_educ_year = mean(educational.num),
		count = n()) % &gt; %
	arrange(average_educ_year)</pre><p><strong>Output:</strong> <pre>
## # A tibble: 6 x 3
## education average_educ_year count			
##      &lt;fctr&gt;             &lt;dbl&gt; &lt;int&gt;
## 1   dropout       -1.76147258  5712
## 2  HighGrad       -0.43998868 14803
## 3 Community        0.09561361 13407
## 4 Bachelors        1.12216282  7720
## 5    Master        1.60337381  3338
## 6       PhD        2.29377644   557
</pre><h3>Recast Marital-status</h3><p>It is also possible to create lower levels for the marital status. In the following code you change the level as follow: <table class="table1 table-striped"><thead><tr><th width=50%><p>Old level </th><th><p>New level </th></tr></thead><tr><td><p>Never-married </td><td><p>Not-married </td></tr><tr><td><p>Married-spouse-absent </td><td><p>Not-married </td></tr><tr><td><p>Married-AF-spouse </td><td><p>Married </td></tr><tr><td><p>Married-civ-spouse </td><td><br/></td></tr><tr><td><p>Separated </td><td><p>Separated </td></tr><tr><td><p>Divorced </td><td><br/></td></tr><tr><td><p>Widows </td><td><p>Widow </td></tr></table><pre>
# Change level marry
recast_data &lt;- recast_data % &gt; %
	mutate(marital.status = factor(ifelse(marital.status == "Never-married" | marital.status == "Married-spouse-absent", "Not_married", ifelse(marital.status == "Married-AF-spouse" | marital.status == "Married-civ-spouse", "Married", ifelse(marital.status == "Separated" | marital.status == "Divorced", "Separated", "Widow")))))</pre> You can check the number of individuals within each group. <pre>table(recast_data$marital.status)</pre><p><strong>Output:</strong> <pre>
## ##     Married Not_married   Separated       Widow
##       21165       15359        7727        1286	</pre><p><h3><a id=6></a>Step 4) Summary Statistic</h3><p>It is time to check some statistics about our target variables. In the graph below, you count the percentage of individuals earning more than 50k given their gender. <pre># Plot gender income
ggplot(recast_data, aes(x = gender, fill = income)) +
    geom_bar(position = "fill") +
    theme_classic()</pre><p><strong>Output:</strong> <p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized10.png class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized10.png alt=""/></a> <p>Next, check if the origin of the individual affects their earning. <pre># Plot origin income
ggplot(recast_data, aes(x = race, fill = income)) +
    geom_bar(position = "fill") +
    theme_classic() +
    theme(axis.text.x = element_text(angle = 90))</pre><p><strong>Output:</strong> <p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized11.png class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized11.png alt=""/></a> <p>The number of hours work by gender. <pre>
# box plot gender working time
ggplot(recast_data, aes(x = gender, y = hours.per.week)) +
    geom_boxplot() +
    stat_summary(fun.y = mean,
        geom = "point",
        size = 3,
        color = "steelblue") +
    theme_classic()</pre><p><strong>Output:</strong> <p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized12.png class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized12.png alt=""/></a> <p>The box plot confirms that the distribution of working time fits different groups. In the box plot, both genders do not have homogeneous observations. <p>You can check the density of the weekly working time by type of education. The distributions have many distinct picks. It can probably be explained by the type of contract in the US. <pre># Plot distribution working time by education
ggplot(recast_data, aes(x = hours.per.week)) +
    geom_density(aes(color = education), alpha = 0.5) +
    theme_classic()</pre><p>Code Explanation <ul><li>ggplot(recast_data, aes( x= hours.per.week)): A density plot only requires one variable</li><li>geom_density(aes(color = education), alpha =0.5): The geometric object to control the density</li></ul><p><strong>Output:</strong> <p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized13.png class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized13.png alt=""/></a> <p>To confirm your thoughts, you can perform a one-way ANOVA test: <pre>
anova &lt;- aov(hours.per.week~education, recast_data)
summary(anova)</pre><p><strong>Output:</strong> <pre>
##                Df Sum Sq Mean Sq F value Pr(&gt;F)    
## education       5   1552  310.31   321.2 &lt;2e-16 ***
## Residuals   45531  43984    0.97                   
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
</pre><p>The ANOVA test confirms the difference in average between groups. <h3>Non-linearity</h3><p>Before you run the model, you can see if the number of hours worked is related to age. <pre>
library(ggplot2)
ggplot(recast_data, aes(x = age, y = hours.per.week)) +
    geom_point(aes(color = income),
        size = 0.5) +
    stat_smooth(method = 'lm',
        formula = y~poly(x, 2),
        se = TRUE,
        aes(color = income)) +
    theme_classic()
	</pre><p>Code Explanation <ul><li>ggplot(recast_data, aes(x = age, y = hours.per.week)): Set the aesthetic of the graph</li><li>geom_point(aes(color= income), size =0.5): Construct the dot plot</li><li>stat_smooth(): Add the trend line with the following arguments:<ul><li>method='lm': Plot the fitted value if the linear regression</li><li>formula = y~poly(x,2): Fit a polynomial regression</li><li>se = TRUE: Add the standard error</li><li>aes(color= income): Break the model by income </li></ul></li></ul><p><strong>Output:</strong> <p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized14.png class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized14.png alt=""/></a> <p>In a nutshell, you can test interaction terms in the model to pick up the non-linearity effect between the weekly working time and other features. It is important to detect under which condition the working time differs. <h3>Correlation</h3><p>The next check is to visualize the correlation between the variables. You convert the factor level type to numeric so that you can plot a heat map containing the coefficient of correlation computed with the Spearman method. <pre>
library(GGally)
# Convert data to numeric
corr &lt;- data.frame(lapply(recast_data, as.integer))
# Plot the graphggcorr(corr,
    method = c("pairwise", "spearman"),
    nbreaks = 6,
    hjust = 0.8,
    label = TRUE,
    label_size = 3,
    color = "grey50")
	</pre><p>Code Explanation <ul><li>data.frame(lapply(recast_data,as.integer)): Convert data to numeric</li><li>ggcorr() plot the heat map with the following arguments:<ul><li>method: Method to compute the correlation</li><li>nbreaks = 6: Number of break</li><li>hjust = 0.8: Control position of the variable name in the plot</li><li>label = TRUE: Add labels in the center of the windows</li><li>label_size = 3: Size labels</li><li>color = "grey50"): Color of the label</li></ul></li></ul><p><strong>Output:</strong> <p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized15.png class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized15.png alt=""/></a> <h3><a id=7></a>Step 5) Train/test set</h3><p>Any supervised machine learning task require to split the data between a train set and a test set. You can use the "function" you created in the other supervised learning tutorials to create a train/test set. <pre>
set.seed(1234)
create_train_test &lt;- function(data, size = 0.8, train = TRUE) {
    n_row = nrow(data)
    total_row = size * n_row
    train_sample &lt;- 1: total_row
    if (train == TRUE) {
        return (data[train_sample, ])
    } else {
        return (data[-train_sample, ])
    }
}
data_train &lt;- create_train_test(recast_data, 0.8, train = TRUE)
data_test &lt;- create_train_test(recast_data, 0.8, train = FALSE)
dim(data_train)</pre><p><strong>Output:</strong> <pre>## [1] 36429     9</pre> <pre>dim(data_test)</pre><p><strong>Output:</strong> <pre>## [1] 9108    9	</pre><p><h3><a id=8></a>Step 6) Build the model</h3><p>To see how the algorithm performs, you use the glm() package. The <strong>Generalized Linear Model</strong> is a collection of models. The basic syntax is: <pre>
glm(formula, data=data, family=linkfunction()
Argument:
- formula:  Equation used to fit the model- data: dataset used
- Family:     - binomial: (link = "logit")			
- gaussian: (link = "identity")			
- Gamma:    (link = "inverse")			
- inverse.gaussian: (link = "1/mu^2")			
- poisson:  (link = "log")			
- quasi:    (link = "identity", variance = "constant")			
- quasibinomial:    (link = "logit")			
- quasipoisson: (link = "log")	
</pre><p>You are ready to estimate the logistic model to split the income level between a set of features. <pre>
formula &lt;- income~.
logit &lt;- glm(formula, data = data_train, family = 'binomial')
summary(logit)
</pre><p>Code Explanation <ul><li>formula &lt;- income ~ .: Create the model to fit</li><li>logit &lt;- glm(formula, data = data_train, family = 'binomial'): Fit a logistic model (family = 'binomial') with the data_train data.</li><li>summary(logit): Print the summary of the model</li></ul><p><strong>Output:</strong> <pre>
## 
## Call:
## glm(formula = formula, family = "binomial", data = data_train)
## ## Deviance Residuals: 
##     Min       1Q   Median       3Q      Max  
## -2.6456  -0.5858  -0.2609  -0.0651   3.1982  
## 
## Coefficients:
##                           Estimate Std. Error z value Pr(&gt;|z|)    
## (Intercept)                0.07882    0.21726   0.363  0.71675    
## age                        0.41119    0.01857  22.146  &lt; 2e-16 ***
## workclassLocal-gov        -0.64018    0.09396  -6.813 9.54e-12 ***
## workclassPrivate          -0.53542    0.07886  -6.789 1.13e-11 ***
## workclassSelf-emp-inc     -0.07733    0.10350  -0.747  0.45499    
## workclassSelf-emp-not-inc -1.09052    0.09140 -11.931  &lt; 2e-16 ***
## workclassState-gov        -0.80562    0.10617  -7.588 3.25e-14 ***
## workclassWithout-pay      -1.09765    0.86787  -1.265  0.20596    
## educationCommunity        -0.44436    0.08267  -5.375 7.66e-08 ***
## educationHighGrad         -0.67613    0.11827  -5.717 1.08e-08 ***
## educationMaster            0.35651    0.06780   5.258 1.46e-07 ***
## educationPhD               0.46995    0.15772   2.980  0.00289 ** 
## educationdropout          -1.04974    0.21280  -4.933 8.10e-07 ***
## educational.num            0.56908    0.07063   8.057 7.84e-16 ***
## marital.statusNot_married -2.50346    0.05113 -48.966  &lt; 2e-16 ***
## marital.statusSeparated   -2.16177    0.05425 -39.846  &lt; 2e-16 ***
## marital.statusWidow       -2.22707    0.12522 -17.785  &lt; 2e-16 ***
## raceAsian-Pac-Islander     0.08359    0.20344   0.411  0.68117    
## raceBlack                  0.07188    0.19330   0.372  0.71001    
## raceOther                  0.01370    0.27695   0.049  0.96054    
## raceWhite                  0.34830    0.18441   1.889  0.05894 .  
## genderMale                 0.08596    0.04289   2.004  0.04506 *  
## hours.per.week             0.41942    0.01748  23.998  &lt; 2e-16 ***
## ---## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## ## (Dispersion parameter for binomial family taken to be 1)
## ##     Null deviance: 40601  on 36428  degrees of freedom
## Residual deviance: 27041  on 36406  degrees of freedom
## AIC: 27087
## 
## Number of Fisher Scoring iterations: 6
</pre><p>The summary of our model reveals interesting information. The performance of a logistic regression is evaluated with specific key metrics. <ul><li>AIC (Akaike Information Criteria): This is the equivalent of <strong>R2</strong> in logistic regression. It measures the fit when a penalty is applied to the number of parameters. Smaller <strong>AIC</strong> values indicate the model is closer to the truth.</li><li>Null deviance: Fits the model only with the intercept. The degree of freedom is n-1. We can interpret it as a Chi-square value (fitted value different from the actual value hypothesis testing).</li><li>Residual Deviance: Model with all the variables. It is also interpreted as a Chi-square hypothesis testing.</li><li>Number of Fisher Scoring iterations: Number of iterations before converging.</li></ul><p>The output of the glm() function is stored in a list. The code below shows all the items available in the logit variable we constructed to evaluate the logistic regression. <p># The list is very long, print only the first three elements <pre>lapply(logit, class)[1:3]</pre><p><strong>Output:</strong> <pre>
## $coefficients
## [1] "numeric"
## 
## $residuals
## [1] "numeric"
## 
## $fitted.values
## [1] "numeric"
</pre><p>Each value can be extracted with the $ sign follow by the name of the metrics. For instance, you stored the model as logit. To extract the AIC criteria, you use: <pre>logit$aic</pre><p><strong>Output:</strong> <pre>## [1] 27086.65</pre><h3><a id=9></a>Step 7) Assess the performance of the model</h3><h5>Confusion Matrix</h5><p>The <strong>confusion matrix</strong> is a better choice to evaluate the classification performance compared with the different metrics you saw before. The general idea is to count the number of times True instances are classified are False. <p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized16.png class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized16.png alt=""/></a> <p>To compute the confusion matrix, you first need to have a set of predictions so that they can be compared to the actual targets. <pre>
predict &lt;- predict(logit, data_test, type = 'response')
# confusion matrix
table_mat &lt;- table(data_test$income, predict &gt; 0.5)
table_mat
</pre><p>Code Explanation <ul><li>predict(logit,data_test, type = 'response'): Compute the prediction on the test set. Set type = 'response' to compute the response probability.</li><li>table(data_test$income, predict &gt; 0.5): Compute the confusion matrix. predict &gt; 0.5 means it returns 1 if the predicted probabilities are above 0.5, else 0.</li></ul><p><strong>Output:</strong> <pre>
##        
##         FALSE TRUE
##   &lt;=50K  6310  495
##   &gt;50K   1074 1229	
</pre><p>Each row in a confusion matrix represents an actual target, while each column represents a predicted target. The first row of this matrix considers the income lower than 50k (the False class): 6241 were correctly classified as individuals with income lower than 50k (<strong>True negative</strong>), while the remaining one was wrongly classified as above 50k (<strong>False positive</strong>). The second row considers the income above 50k, the positive class were 1229 (<strong>True positive</strong>), while the <strong>True negative</strong> was 1074. <p>You can calculate the model <strong>accuracy</strong> by summing the true positive + true negative over the total observation <p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized20.jpg class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized20.jpg alt=""/></a> <pre>
accuracy_Test &lt;- sum(diag(table_mat)) / sum(table_mat)
accuracy_Test</pre><p>Code Explanation <ul><li>sum(diag(table_mat)): Sum of the diagonal</li><li>sum(table_mat): Sum of the matrix.</li></ul><p><strong>Output:</strong> <pre>## [1] 0.8277339	</pre><p>The model appears to suffer from one problem, it overestimates the number of false negatives. This is called the <strong>accuracy test paradox</strong>. We stated that the accuracy is the ratio of correct predictions to the total number of cases. We can have relatively high accuracy but a useless model. It happens when there is a dominant class. If you look back at the confusion matrix, you can see most of the cases are classified as true negative. Imagine now, the model classified all the classes as negative (i.e. lower than 50k). You would have an accuracy of 75 percent (6718/6718+2257). Your model performs better but struggles to distinguish the true positive with the true negative. <p>In such situation, it is preferable to have a more concise metric. We can look at: <ul><li>Precision=TP/(TP+FP)</li><li>Recall=TP/(TP+FN)</li></ul><h3>Precision vs Recall</h3><p><strong>Precision</strong> looks at the accuracy of the positive prediction. <strong>Recall</strong> is the ratio of positive instances that are correctly detected by the classifier; <p>You can construct two functions to compute these two metrics <ol><li>Construct precision</li></ol><pre>
precision &lt;- function(matrix) {
	# True positive
    tp &lt;- matrix[2, 2]
	# false positive
    fp &lt;- matrix[1, 2]
    return (tp / (tp + fp))
}
</pre><p>Code Explanation <ul><li>mat[1,1]: Return the first cell of the first column of the data frame, i.e. the true positive</li><li>mat[1,2]; Return the first cell of the second column of the data frame, i.e. the false positive</li></ul><pre>
recall &lt;- function(matrix) {
# true positive
    tp &lt;- matrix[2, 2]# false positive
    fn &lt;- matrix[2, 1]
    return (tp / (tp + fn))
}
</pre><p>Code Explanation <ul><li>mat[1,1]: Return the first cell of the first column of the data frame, i.e. the true positive</li><li>mat[2,1]; Return the second cell of the first column of the data frame, i.e. the false negative</li></ul><p>You can test your functions <pre>
prec &lt;- precision(table_mat)
prec
rec &lt;- recall(table_mat)
rec
</pre><p><strong>Output:</strong> <pre>
## [1] 0.712877
## [2] 0.5336518</pre><p>When the model says it is an individual above 50k, it is correct in only 54 percent of the case, and can claim individuals above 50k in 72 percent of the case. <p>You can create the <a href=/images/r_programming/032918_1106_Generalized21.jpg class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized21.jpg alt=""/></a> score based on the precision and recall. The <a href=/images/r_programming/032918_1106_Generalized21.jpg class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized21.jpg alt=""/></a> is a harmonic mean of these two metrics, meaning it gives more weight to the lower values. <p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized22.jpg class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized22.jpg alt=""/></a> <pre>
f1 &lt;- 2 * ((prec * rec) / (prec + rec))
f1
</pre><p><strong>Output:</strong> <pre>## [1] 0.6103799	</pre><h3>Precision vs Recall tradeoff</h3><p>It is impossible to have both a high precision and high recall. <p>If we increase the precision, the correct individual will be better predicted, but we would miss lots of them (lower recall). In some situation, we prefer higher precision than recall. There is a concave relationship between precision and recall. <ul><li>Imagine, you need to predict if a patient has a disease. You want to be as precise as possible.</li><li>If you need to detect potential fraudulent people in the street through facial recognition, it would be better to catch many people labeled as fraudulent even though the precision is low. The police will be able to release the non-fraudulent individual.</li></ul><h3>The ROC curve</h3><p>The <strong>Receiver Operating Characteristic</strong> curve is another common tool used with binary classification. It is very similar to the precision/recall curve, but instead of plotting precision versus recall, the ROC curve shows the true positive rate (i.e., recall) against the false positive rate. The false positive rate is the ratio of negative instances that are incorrectly classified as positive. It is equal to one minus the true negative rate. The true negative rate is also called <strong>specificity</strong>. Hence the ROC curve plots <strong>sensitivity</strong> (recall) versus 1-specificity <p>To plot the ROC curve, we need to install a library called RORC. We can find in the conda <a href=https://anaconda.org/r/r-rocr>library</a>. You can type the code: <p>conda install -c r r-rocr --yes <p>We can plot the ROC with the prediction() and performance() functions. <pre>
library(ROCR)
ROCRpred &lt;- prediction(predict, data_test$income)
ROCRperf &lt;- performance(ROCRpred, 'tpr', 'fpr')
plot(ROCRperf, colorize = TRUE, text.adj = c(-0.2, 1.7))
</pre><p>Code Explanation <ul><li>prediction(predict, data_test$income): The ROCR library needs to create a prediction object to transform the input data</li><li>performance(ROCRpred, 'tpr','fpr'): Return the two combinations to produce in the graph. Here, tpr and fpr are constructed. Tot plot precision and recall together, use "prec", "rec".</li></ul><p><strong>Output:</strong> <p style="text-align: center;"><a href=/images/r_programming/032918_1106_Generalized17.png class=jh-image-popup-colorbox><img src=/images/r_programming/032918_1106_Generalized17.png alt=""/></a> <p><strong>Step 8)</strong> Improve the model <p>You can try to add non-linearity to the model with the interaction between <ul><li>age and hours.per.week </li><li>gender and hours.per.week.</li></ul><p>You need to use the score test to compare both model <pre>
formula_2 &lt;- income~age: hours.per.week + gender: hours.per.week + .
logit_2 &lt;- glm(formula_2, data = data_train, family = 'binomial')
predict_2 &lt;- predict(logit_2, data_test, type = 'response')
table_mat_2 &lt;- table(data_test$income, predict_2 &gt; 0.5)
precision_2 &lt;- precision(table_mat_2)
recall_2 &lt;- recall(table_mat_2)
f1_2 &lt;- 2 * ((precision_2 * recall_2) / (precision_2 + recall_2))
f1_2
</pre><p><strong>Output:</strong> <pre>## [1] 0.6109181	</pre><p>The score is slightly higher than the previous one. You can keep working on the data a try to beat the score. <h2>Summary</h2><p>We can summarize the function to train a logistic regression in the table below: <table class="table2 table-striped"><thead><tr><th><p>Package </th><th><p>Objective </th><th><p>function </th><th><p>argument </th></tr></thead><tr><td><p>- </td><td><p>Create train/test dataset </td><td><p>create_train_set() </td><td><p>data, size, train </td></tr><tr><td><p>glm </td><td><p>Train a Generalized Linear Model </td><td><p>glm() </td><td><p>formula, data, family* </td></tr><tr><td><p>glm </td><td><p>Summarize the model </td><td><p>summary() </td><td><p>fitted model </td></tr><tr><td><p>base </td><td><p>Make prediction </td><td><p>predict() </td><td><p>fitted model, dataset, type = 'response' </td></tr><tr><td><p>base </td><td><p>Create a confusion matrix </td><td><p>table() </td><td><p>y, predict() </td></tr><tr><td><p>base </td><td><p>Create accuracy score </td><td colspan=2 style="word-break: break-word;"><p>sum(diag(table())/sum(table() </td></tr><tr><td><p>ROCR </td><td><p>Create ROC : Step 1 Create prediction </td><td><p>prediction() </td><td><p>predict(), y </td></tr><tr><td><p>ROCR </td><td><p>Create ROC : Step 2 Create performance </td><td><p>performance() </td><td><p>prediction(), 'tpr', 'fpr' </td></tr><tr><td><p>ROCR </td><td><p>Create ROC : Step 3 Plot graph </td><td><p>plot() </td><td><p>performance() </td></tr></table><p>The other <strong>GLM</strong> type of models are: <p>- binomial: (link = "logit") <p>- gaussian: (link = "identity") <p>- Gamma: (link = "inverse") <p>- inverse.gaussian: (link = "1/mu^2") <p>- poisson: (link = "log") <p>- quasi: (link = "identity", variance = "constant") <p>- quasibinomial: (link = "logit") <p>- quasipoisson: (link = "log") <p id=slidetag>&nbsp;</p></div>
