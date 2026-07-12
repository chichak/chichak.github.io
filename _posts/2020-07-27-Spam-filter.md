<div><p>On the previous screen, we read in the dataset and saw that about 87% of the messages are ham ("ham" means non-spam), and the remaining 13% are spam. Now that we've become more familiar with the dataset, we can move on to building the spam filter.</p>
<p>Our project is a machine learning problem, specifically a classification problem. The goal of our project is to <strong>maximize</strong> the predictive ability of our algorithm. This is in contrast to what we would usually do in something like hypothesis testing, where the goal is proper statistical inference. </p>
<p>We want to optimize our algorithm's ability to correctly classify messages that it hasn't seen before. We'll want to create a process by which we can tweak aspects of our algorithm to see what produces the best predictions. The first step we need to take towards this process is divide up our <code>spam</code> data into 3 distinct datasets. </p>
<ul>
<li>A <strong>training set</strong>, which we'll use to "train" the computer how to classify messages.</li>
<li>A <strong>cross-validation set</strong>, which we'll use to assess how different choices of <span class="MathJax_Preview" style="color: inherit; display: none;"></span><span class="MathJax_SVG" id="MathJax-Element-1-Frame" tabindex="0" data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mi>a</mi><mi>l</mi><mi>p</mi><mi>h</mi><mi>a</mi></math>" style="font-size: 100%; display: inline-block; position: relative;" role="presentation"><svg xmlns:xlink="http://www.w3.org/1999/xlink" width="5.661ex" height="2.461ex" viewBox="0 -779.8 2437.5 1059.6" role="img" focusable="false" style="vertical-align: -0.65ex;" aria-hidden="true"><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"><use xlink:href="#MJMATHI-61" x="0" y="0"></use><use xlink:href="#MJMATHI-6C" x="529" y="0"></use><use xlink:href="#MJMATHI-70" x="828" y="0"></use><use xlink:href="#MJMATHI-68" x="1331" y="0"></use><use xlink:href="#MJMATHI-61" x="1908" y="0"></use></g></svg><span class="MJX_Assistive_MathML" role="presentation"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>a</mi><mi>l</mi><mi>p</mi><mi>h</mi><mi>a</mi></math></span></span><script type="math/tex" id="MathJax-Element-1">alpha</script> affect the prediction accuracy</li>
<li>A <strong>test set</strong>, which we'll use to test how good the spam filter is with classifying new messages.</li>
</ul>
<p>We're going to keep 80% of our dataset for training, 10% for cross-validation and 10% for testing. We typically want to keep as much data as possible for training. The dataset has 3,184 messages, which means that:</p>
<ul>
<li>The training set will have 2,547 messages</li>
<li>The cross-validation and test sets will have 318 and 319 messages respectively</li>
</ul>
<p>We expose the algorithm to examples of spam and ham through the training set. In other words, we develop all of the conditional probabilities and vocabulary from the training set. After this, we need to choose an <span class="MathJax_Preview" style="color: inherit; display: none;"></span><span class="MathJax_SVG" id="MathJax-Element-2-Frame" tabindex="0" data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mi>&amp;#x03B1;</mi></math>" style="font-size: 100%; display: inline-block; position: relative;" role="presentation"><svg xmlns:xlink="http://www.w3.org/1999/xlink" width="1.488ex" height="1.429ex" viewBox="0 -502 640.5 615.1" role="img" focusable="false" style="vertical-align: -0.263ex;" aria-hidden="true"><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"><use xlink:href="#MJMATHI-3B1" x="0" y="0"></use></g></svg><span class="MJX_Assistive_MathML" role="presentation"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>α</mi></math></span></span><script type="math/tex" id="MathJax-Element-2">\alpha</script> value. The cross-validation set will help us choose the best one. Throughout this whole process, we have a set of data that the algorithm never sees: the test set. We hope to maximize the prediction accuracy in the <em>cross-validation</em> set since it is a proxy for how well it will perform in the test set. </p>
<p>Let's create our training, cross-validation and a test sets. If you need help, don't forget that you can find the solutions notebook <a target="_blank" href="https://github.com/dataquestio/solutions/blob/master/Mission475Solutions.Rmd">at this link</a>.</p>
<ol>
<li>
<p>Use the <code>sample()</code> function to generate random indices. The idea here to that we want random rows from <code>spam</code>. We can pick random rows by generating random indices and using these to choose data from <code>spam</code>. </p>
<ul>
<li>Keep in mind the range of the random numbers you want. It won't make sense to generate a random number that is higher than the number of rows in the <code>spam</code> dataset. </li>
<li>We don't want duplicate indices either within a dataset or across datasets</li>
<li>Make sure you check the documentation for the <code>sample</code> function if you're lost</li>
</ul>
</li>
<li>
<p>Use these randomized indices to create your training, cross-validation and test sets.</p>
<ul>
<li>You know you'll have it correct when the training, cross-validation and test datasets together form the original dataset</li>
</ul>
</li>
<li>
<p>Find the percentage of spam and ham in all of the datasets. Are the percentages similar to what we have in the full dataset?</p>
</li>
</ol></div>
