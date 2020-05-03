
<!DOCTYPE html>
<html lang="en">
  <!-- MIT license | Copyright Dean Attali 2016 -->
  <head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

<header class="header-section ">
<div class="intro-header no-img">
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
        <div class="post-heading">
          <h1>How to get your very own RStudio Server and Shiny Server with DigitalOcean</h1>
		  
		  
		  
       
  </div>
</div>
</header>



<p>If you’ve always wanted to have an RStudio Server of your own so that you can access R from anywhere, or your own Shiny Server to host your awesome shiny apps or Rmarkdown documents, <a href="https://m.do.co/c/358494f80b99">DigitalOcean</a> (DO) can help you get there easily. For example, take a look at <a href="https://attalitech.com/">my Shiny Server</a> to see how useful this can be.</p>

<p>DigitalOcean provides virtual private servers (they call each server a <em>droplet</em>), which means that you can pay <em>$5/month</em> to have your own server “in the cloud” that you can access from anywhere and host anything on.  Check out <a href="https://daattali.com/">my DO droplet</a> to see it in action! Use <a href="https://m.do.co/c/358494f80b99">my referral link</a> to get $10 in credits, which is enough to give you a private server for your first 2 months.</p>

<p>I only found out about DO a couple of months ago when I asked my supervisor, <a href="https://twitter.com/JennyBryan">Jenny Bryan</a>, if there was a way for me to do some R-ing when I’m away from my machine. She told me that she doesn’t have a solution for me, but that I should check out DigitalOcean, so I did. And it turns out that it’s very convenient for hosting my own RStudio Server and anything else I’d like to host, and very affordable <strong>even for my student self</strong>. :) (2017 update: I’m not longer a student, but I do still love the pricing of this service!)</p>

<p>This post will cover how to set up a machine from scratch, set up R, RStudio Server, Shiny Server, and a few other helpful features on a brand new DO droplet (remember: droplet = your machine in the cloud). The tutorial might seem lengthy, but it’s actually very simple, I’m just breaking up every step into very fine details. Based on feedback from others, it should take about 30 minutes to go through this post and get everything set up.</p>

<h1 id="table-of-contents">Table of contents</h1>

<ul>
  <li><a href="#sign-up">Step 1: Sign up to DigitalOcean</a></li>
  <li><a href="#create-droplet">Step 2: Create a new droplet</a></li>
  <li><a href="#login">Step 3: Log in to your very own shiny new server</a></li>
  <li><a href="#safety-first">Step 4: Ensure you don’t shoot yourself in the foot</a></li>
  <li><a href="#nginx">Step 5: See your droplet in a browser</a></li>
  <li><a href="#install-r">Step 6: Install R</a>
    <ul>
      <li><a href="#user-libraries">Note 6.1: Important note re: installing R packages</a></li>
    </ul>
  </li>
  <li><a href="#install-rstudio">Step 7: Install RStudio Server</a></li>
  <li><a href="#install-shiny">Step 8: Install Shiny Server</a>
    <ul>
      <li><a href="#shiny-user-perms">Step 8.1: Set up proper user permissions on Shiny Server</a></li>
      <li><a href="#shiny-git">Step 8.2: Populate Shiny Server with Shiny apps using a git repository</a></li>
      <li><a href="#server-pro">Note 8.3: Shiny Server Open Source vs Shiny Server Pro</a></li>
      <li><a href="#host-rmd">Note 8.4: Hosting R Markdown (Rmd) documents on your Shiny Server</a></li>
    </ul>
  </li>
  <li><a href="#reverse-proxy">Step 9: Make pretty URLs for RStudio Server and Shiny Server</a></li>
  <li><a href="#custom-domain">Step 10: Custom domain name</a></li>
  <li><a href="#updates">Updates</a></li>
  <li><a href="#resources">Resources</a></li>
  <li><a href="#disqus_thread">Comments</a></li>
</ul>

<h1 id="sign-up">Step 1: Sign up to DigitalOcean</h1>

<p>Go to <a href="https://m.do.co/c/358494f80b99">DigitalOcean</a> (use this referral link to get 2 months free!) and sign up. Registration is quick and painless, but in order to verify your account (and to get your $10) you have to provide credit card details.  After signing up, if you go to <a href="https://cloud.digitalocean.com/settings/billing">your Billing page</a> you should see your $10 credit.</p>

<h1 id="create-droplet">Step 2: Create a new droplet</h1>

<p>Now let’s claim one of DO’s machines as our own! It’s so simple that you definitely don’t need my instructions, just click on the big green <em>“Create”</em> button -&gt; <em>“Droplets”</em> -&gt; and choose your settings. I chose the smallest/weakest machine ($5/month plan) and it’s good enough for me.</p>

<p>I chose San Francisco for region because it’s the closest to me, though it really wouldn’t make much of a noticeable difference where the server is located. For operating system, I chose to go with the default Ubuntu 18.04 x64. If you know what SSH keys are (you can learn <a href="https://www.digitalocean.com/community/tutorials/how-to-use-ssh-keys-with-putty-on-digitalocean-droplets-windows-users">here</a>), then I recommend you add an SSH key at the last step if you know how to do that. If not, just proceed without an SSH key.</p>

<p><em>Note: all subsequent steps assume that you are also using the weakest server possible with Ubuntu 18.04 x64. If you chose different settings, the general instructions will still apply but some of the specific commands/URLs might need to change.</em></p>

<p>Even though you probably don’t need it, here’s a short GIF showing how I create a new droplet:
<a href="https://deanattali.com/img/blog/digital-ocean/do-create.gif"><img src="https://deanattali.com/img/blog/digital-ocean/do-create.gif" alt="Create droplet" /></a></p>

<h1 id="login">Step 3: Log in to your very own shiny new server</h1>

<p>Once the droplet is ready (can take a few minutes), you’ll be redirected to a page that shows you information about the new droplet, including its IP. From now on, I’ll use the random IP address <code class="language-plaintext highlighter-rouge">123.456.1.2</code> for the rest of this post, but remember to always substitute your actual droplet’s IP with this one.</p>

<p>One option to log into your droplet is through the “Access” tab on the droplet’s page, but it’s incredibly slow and ugly, so I prefer logging in on my own machine. If you’re on a unix machine, you can just use <code class="language-plaintext highlighter-rouge">ssh 123.456.1.2</code>. I’m on Windows, so I use <a href="http://www.chiark.greenend.org.uk/~sgtatham/putty/">PuTTY</a> to SSH (“login”) into other machines. Use the IP that you see on the page, with the username <code class="language-plaintext highlighter-rouge">root</code>.  If you used an SSH key then you don’t need to provide a password; otherwise, a password was sent to your email. The first time you log in, you may be asked to change the default password.</p>

<p>You should be greeted with a welcome message and some stats about the server that look like this:</p>

<p><a href="https://deanattali.com/img/blog/digital-ocean/login.png"><img src="https://deanattali.com/img/blog/digital-ocean/login.png" alt="Login screen" /></a></p>

<h1 id="safety-first">Step 4: Ensure you don’t shoot yourself in the foot</h1>

<p>The first thing I like to do is add a non-root user so that we won’t accidentally do something stupid as “root”. Let’s add a user named “dean” and give him admin power.  You will be asked to give some information for this new user.</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>adduser dean
gpasswd -a dean sudo
</code></pre></div></div>

<p>From now on I will generally log into this server as “dean” instead of “root”.  If I’ll need to run any commands requiring admin abilities, I just have to prepend the command with <code class="language-plaintext highlighter-rouge">sudo</code>.  Let’s say goodbye to “root” and switch to “dean”.</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>su - dean
</code></pre></div></div>

<p>Now that we’re no longer logged in as the administrator, you may be asked for your password sometimes when trying to run a command.</p>

<h1 id="nginx">Step 5: See your droplet in a browser</h1>

<p>Right now if you try to visit <code class="language-plaintext highlighter-rouge">http://123.456.1.2</code> in a browser, you’ll get a “webpage not available error”. Let’s make our private server serve a webpage there instead, as a nice visual reward for getting this far. Install nginx:</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>sudo apt-get update
sudo apt-get -y install nginx
</code></pre></div></div>

<p>Now if you visit <code class="language-plaintext highlighter-rouge">http://123.456.1.2</code>, you should see a welcome message to nginx. Instant gratification!</p>

<h3 id="quick-nginx-references">Quick nginx references</h3>

<p>The default file that is served is located at <code class="language-plaintext highlighter-rouge">/var/www/html/index.nginx-debian.html</code>, so if you want to change what that webpage is showing, just edit that file with <code class="language-plaintext highlighter-rouge">sudo nano /var/www/html/index.nginx-debian.html</code>. For example, I just put a bit of text redirecting to other pages <a href="https://daattali.com/">in my index page</a>.  The configuration file is located at <code class="language-plaintext highlighter-rouge">/etc/nginx/nginx.conf</code>.</p>

<p>When you edit an HTML file, you will be able to see the changes immediately when you refresh the page, but if you make configuration changes, you need to restart nginx. In the future, you can stop/start/restart nginx with</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>sudo service nginx stop
sudo service nginx start
sudo service nginx restart
</code></pre></div></div>

<h1 id="install-r">Step 6: Install R</h1>

<p>To ensure we get the most recent version of R, we need to first add <code class="language-plaintext highlighter-rouge">bionic</code> (the release name for Ubuntu 18.04) to our <code class="language-plaintext highlighter-rouge">sources.list</code>:</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>sudo sh -c 'echo "deb http://cran.rstudio.com/bin/linux/ubuntu bionic-cran35/" &gt;&gt; /etc/apt/sources.list'
</code></pre></div></div>

<p>Now add the public keys:</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>gpg --keyserver keyserver.ubuntu.com --recv-key E298A3A825C0D65DFD57CBB651716619E084DAB9
gpg -a --export E298A3A825C0D65DFD57CBB651716619E084DAB9 | sudo apt-key add -
</code></pre></div></div>

<p>Now we’re ready to install R</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>sudo apt-get update
sudo apt-get -y install r-base
</code></pre></div></div>

<p>You should now be able to run R and hopefully be greeted with a message containing the latest R version.</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>R
</code></pre></div></div>

<p><a href="https://deanattali.com/img/blog/digital-ocean/R-welcome.png"><img src="https://deanattali.com/img/blog/digital-ocean/R-welcome.png" alt="R welcome" /></a></p>

<p>Now you need to quit R (<code class="language-plaintext highlighter-rouge">quit()</code>) because there are a couple small things to adjust on the server so that R will work well.</p>

<p>If you also chose the weakest machine like I did, many packages won’t be able to install because of not enough memory. We need to add 1GB of swap space:</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>sudo /bin/dd if=/dev/zero of=/var/swap.1 bs=1M count=1024
sudo /sbin/mkswap /var/swap.1
sudo /sbin/swapon /var/swap.1
sudo sh -c 'echo "/var/swap.1 swap swap defaults 0 0 " &gt;&gt; /etc/fstab'
</code></pre></div></div>

<p>Now installing most packages will work. But before installing any package, I always like having <code class="language-plaintext highlighter-rouge">devtools</code> available so that I can install R packages that are on GitHub. <code class="language-plaintext highlighter-rouge">devtools</code> will currently not be able to get installed because it has a few dependencies. Let’s install those dependencies:</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>sudo apt-get -y install libcurl4-gnutls-dev libxml2-dev libssl-dev
</code></pre></div></div>

<p>Ok, now we can start installing R packages, both from CRAN and from GitHub!</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>sudo su - -c "R -e \"install.packages('devtools', repos='http://cran.rstudio.com/')\""
sudo su - -c "R -e \"devtools::install_github('daattali/shinyjs')\""
</code></pre></div></div>

<p>Feel free to play around with R now.</p>

<h2 id="user-libraries">Note 6.1: Important note re: installing R packages</h2>

<p>Note that instead of launching R and installing the packages from R, I’m doing it from the terminal with <code class="language-plaintext highlighter-rouge">sudo su - -c "R ..."</code>. Why? Because if you log into R and install packages, by default they will be installed in your personal library and will only be accessible to the current user (<code class="language-plaintext highlighter-rouge">dean</code> in this case). By running the command the way I do above, it installs the packages as the <code class="language-plaintext highlighter-rouge">root</code> user, which means the packages will be installed in a global library and will be available to all users.</p>

<p>As a demonstration, launch R (simply run <code class="language-plaintext highlighter-rouge">R</code>) and run <code class="language-plaintext highlighter-rouge">.libPaths()</code>. This will show you all the locations where R will search for a package, and the first one is where a new package will get installed.  You’ll probably notice that the first entry, where packages will get installed, is a path under the current user’s home (for me it’s <code class="language-plaintext highlighter-rouge">/home/dean/R/x86_64-pc-linux-gnu-library/3.2</code>). From now on, whenever you want to install a package for the whole system, you should either log in as <code class="language-plaintext highlighter-rouge">root</code> and intall the package, or use the above command. To install an R package for just one user, it’s ok to proceed as normal and just install the package when you’re logged in as the intended user.</p>

<h1 id="install-rstudio">Step 7: Install RStudio Server</h1>

<p>Great, R is working, but RStudio has become such an integral part of our lives that we can’t do any R without it!</p>

<p>Let’s install some pre-requisites:</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>sudo apt-get -y install gdebi-core
</code></pre></div></div>

<p>Download the latest RStudio Server — consult <a href="http://www.rstudio.com/products/rstudio/download-server/">RStudio Downloads page</a> to get the URL for the latest version. Then install the file you downloaded. These next two lines are using the latest version as of writing this post.</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>wget https://download2.rstudio.org/rstudio-server-1.1.442-amd64.deb
sudo gdebi rstudio-server-1.1.442-amd64.deb
</code></pre></div></div>

<p>Done! By default, RStudio uses port 8787, so to access RStudio go to <code class="language-plaintext highlighter-rouge">http://123.456.1.2:8787</code> and you should be greeted with an RStudio login page. (If you forgot what your droplet’s IP is, you can find out by running <code class="language-plaintext highlighter-rouge">hostname -I</code>)</p>

<p><a href="https://deanattali.com/img/blog/digital-ocean/rstudio.png"><img src="https://deanattali.com/img/blog/digital-ocean/rstudio.png" alt="RStudio" /></a></p>

<p>You can log in to RStudio with any user/password that are available on the droplet. For example, I would log in with username <code class="language-plaintext highlighter-rouge">dean</code> and my password. If you want to let your friend Joe have access to your RStudio, you can create a new user for them with <code class="language-plaintext highlighter-rouge">adduser joe</code>.</p>

<p>Go ahead and play around in RStudio a bit to make sure it works fine. I usually like to try out a <code class="language-plaintext highlighter-rouge">ggplot2</code> function, to ensure that graphics are working properly.</p>

<h1 id="install-shiny">Step 8: Install Shiny Server</h1>

<p>You can safely skip this step if you don’t use Shiny and aren’t interested in being able to host Shiny apps yourself. <strong>But</strong> don’t forget that Shiny Server can also be used to host Rmarkdown files, not just shiny apps. This means that even if you don’t develop shiny apps you might still have a use for Shiny Server if you want to host interactive Rmarkdown documents.</p>

<p>To install Shiny Server, first install the <code class="language-plaintext highlighter-rouge">shiny</code> package:</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>sudo su - -c "R -e \"install.packages('shiny', repos='http://cran.rstudio.com/')\""
</code></pre></div></div>

<p>(Note again that we’re installing <code class="language-plaintext highlighter-rouge">shiny</code> in a way that will make it available to all users, as I explained <a href="#user-libraries">above</a>).</p>

<p>Just like when we installed RStudio, again we need to get the URL of the latest Shiny Server <a href="http://www.rstudio.com/products/shiny/download-server/">from the Shiny Server downloads page</a>, download the file, and then install it.  These are the two commands using the version that is most up-to-date right now:</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>wget https://download3.rstudio.org/ubuntu-12.04/x86_64/shiny-server-1.5.6.875-amd64.deb
sudo gdebi shiny-server-1.5.6.875-amd64.deb
</code></pre></div></div>

<p>Shiny Server is now installed and running. Assuming there were no problems, if you go to <code class="language-plaintext highlighter-rouge">http://123.456.1.2:3838/</code> you should see Shiny Server’s default homepage, which includes some instructions and two Shiny apps:</p>

<p><a href="https://deanattali.com/img/blog/digital-ocean/shiny.png"><img src="https://deanattali.com/img/blog/digital-ocean/shiny.png" alt="Shiny Server" /></a></p>

<p>If you see an error on the bottom Shiny app, it’s probably because you don’t have the <code class="language-plaintext highlighter-rouge">rmarkdown</code> R package installed (the instructions on the default Shiny Server page mention this). After installing <code class="language-plaintext highlighter-rouge">rmarkdown</code> in R, the bottom Shiny app should work as well. Don’t forget to install <code class="language-plaintext highlighter-rouge">rmarkdown</code> so that it will be available to all users as described <a href="#user-libraries">above</a>. I suggest you read through the instructions page at <code class="language-plaintext highlighter-rouge">http://123.456.1.2:3838/</code>.</p>

<h3 id="quick-shiny-server-references">Quick Shiny Server references:</h3>

<ul>
  <li>Shiny Server log is at <code class="language-plaintext highlighter-rouge">/var/log/shiny-server.log</code>.</li>
  <li>The default Shiny Server homepage you’re seeing is located at <code class="language-plaintext highlighter-rouge">/srv/shiny-server/index.html</code> - you can edit it or remove it.</li>
  <li>Any Shiny app directory that you place under <code class="language-plaintext highlighter-rouge">/srv/shiny-server/</code> will be served as a Shiny app. For example, there is a default app at <code class="language-plaintext highlighter-rouge">/srv/shiny-server/sample-apps/hello/</code>, which means you can run the app by going to <code class="language-plaintext highlighter-rouge">http://123.456.1.2:3838/sample-apps/hello/</code>.</li>
  <li>The config file for Shiny Server is at <code class="language-plaintext highlighter-rouge">/etc/shiny-server/shiny-server.conf</code>.</li>
  <li>To reload the server after editing the config, use <code class="language-plaintext highlighter-rouge">sudo service shiny-server restart</code>.</li>
  <li>When hosting an Rmarkdown file, name the file <code class="language-plaintext highlighter-rouge">index.rmd</code> and add <code class="language-plaintext highlighter-rouge">runtime: shiny</code> to the document’s frontmatter.</li>
</ul>

<p><strong>Important!</strong> If you look in the config file, you will see that by default, apps are run as user <code class="language-plaintext highlighter-rouge">shiny</code>. It’s important to understand which user is running an app because things like file permissions and personal R libraries will be different for each user and it might cause you some headaches (or many days of headaches in my experience) until you realize it’s because the app should not be run as <code class="language-plaintext highlighter-rouge">shiny</code>. Just keep that in mind.</p>

<p>The fact that apps run as the user <code class="language-plaintext highlighter-rouge">shiny</code> means that any package required in a shiny app needs to be either in the global library or in <code class="language-plaintext highlighter-rouge">shiny</code>’s library. <a href="#user-libraries">As I mentioned above</a>, you might need to install R packages in a special way to make sure the <code class="language-plaintext highlighter-rouge">shiny</code> user can access them.</p>

<p class="box-note"><strong>Tip:</strong> During app development, I recommend adding the lines <code class="language-plaintext highlighter-rouge">preserve_logs true;</code> and <code class="language-plaintext highlighter-rouge">sanitize_errors false;</code> to the shiny server configuration file (and then restarting the server). This will make sure log files will always be saved and informative error messages are printed, which makes debugging easier (you may want to reverse these settings in production).</p>

<h2 id="shiny-user-perms">Step 8.1: Set up proper user permissions on Shiny Server</h2>

<p>As I just mentioned, dealing with which user is running an app and user permissions can be a bit annoying. It took me a very long time to figure our how to set up the users in a way that works well for me, and this is the setup I came up with. I’m not saying it’s necessarily the most correct way to work, but it works for me and has worked for hundreds of others who have followed this article. Feel free to do the same.</p>

<p>Currently, assuming you’re logged in as user <code class="language-plaintext highlighter-rouge">dean</code>, when you create a folder in the Shiny Server folder (<code class="language-plaintext highlighter-rouge">/srv/shiny-server/</code>), <code class="language-plaintext highlighter-rouge">dean</code> will be considered the only owner of that folder, and nobody else (except <code class="language-plaintext highlighter-rouge">root</code>) will be able to write files there. Why is this a problem? It means that if a Shiny app is trying to write a file to the filesystem, the app will crash because <code class="language-plaintext highlighter-rouge">shiny</code> user does not have those permissions! One option is to add <code class="language-plaintext highlighter-rouge">run_as dean;</code> to the shiny server config, but I don’t like that because then when I want to see which user is using up the server’s resources, I won’t be able to differentiate between a shiny app running under my name vs me running R code myself.</p>

<p>So my solution is to create a user group called <code class="language-plaintext highlighter-rouge">shiny-apps</code> and add both <code class="language-plaintext highlighter-rouge">dean</code> and <code class="language-plaintext highlighter-rouge">shiny</code> users to it. Then I’ll make sure that the whole <code class="language-plaintext highlighter-rouge">/srv/shiny-server</code> folder has read+write permissions for this group. (Again, disclaimer: I’m not a sysadmin so I’m learning all this as I go. Don’t treat this as a work of god).</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>sudo groupadd shiny-apps
sudo usermod -aG shiny-apps dean
sudo usermod -aG shiny-apps shiny
cd /srv/shiny-server
sudo chown -R dean:shiny-apps .
sudo chmod g+w .
sudo chmod g+s .
</code></pre></div></div>

<p>Now both <code class="language-plaintext highlighter-rouge">dean</code> and <code class="language-plaintext highlighter-rouge">shiny</code> will have access to any new or existing files under <code class="language-plaintext highlighter-rouge">/srv/shiny-server</code>. I like it because now I can develop an app from my RStuio Server (logged in as <code class="language-plaintext highlighter-rouge">dean</code>), be able to run it through RStudio (as <code class="language-plaintext highlighter-rouge">dean</code>), and also be able to run it via my Shiny Server (as <code class="language-plaintext highlighter-rouge">shiny</code>).</p>

<h2 id="shiny-git">Step 8.2: Populate Shiny Server with Shiny apps using a git repository</h2>

<p>As mentioned above, any Shiny app you place under <code class="language-plaintext highlighter-rouge">/srv/shiny-server/</code> will be automatically served as a Shiny app. But how do you get shiny apps into there in the first place? If you’re creating a new app, you can just log into your RStudio Server and develop your shiny app from there, and just save the app under <code class="language-plaintext highlighter-rouge">/srv/shiny-server/</code>.</p>

<p>But what if you want to bring into your server an app you already have on your own computer?  One option is to directly transfer files using something like <a href="https://filezilla-project.org/">FileZilla</a> or the <code class="language-plaintext highlighter-rouge">scp</code> command. The moment a shiny app directory is transferred to your droplet, the corresponding app will be available to use on the web right away. Another approach is to use git. If you don’t know what git is, that’s outside the scope of this article, so either look it up and come back here or just use FileZilla :)</p>

<p>The main idea is to have the <code class="language-plaintext highlighter-rouge">/srv/shiny-server/</code> folder be a git repository so that you can push to this repository from your personal computer. Whenever you do a <code class="language-plaintext highlighter-rouge">git pull</code> on your droplet, it will update and grab the new apps you added. That’s how I set up my own shiny server, you can take a look at <a href="https://github.com/daattali/shiny-server">my shiny server repository on GitHub</a> and fork it if you’d like a good starting point.</p>

<p>The first step is to install git and tell git who you are (use your email address and your name in the last 2 commands)</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>sudo apt-get -y install git
git config --global user.email "<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="2c5543596c49544d415c4049024f4341">[email&#160;protected]</a>"
git config --global user.name "Your Name"
</code></pre></div></div>

<p>Now let’s make the <code class="language-plaintext highlighter-rouge">/srv/shiny-server/</code> directory a git repository.</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>cd /srv/shiny-server
git init
</code></pre></div></div>

<p>Next we will create a GitHub repository, so go to <a href="https://github.com/">GitHub</a> and add a new repository named <code class="language-plaintext highlighter-rouge">shiny-server</code>.</p>

<p><a href="https://deanattali.com/img/blog/digital-ocean/git-repo-create.png"><img src="https://deanattali.com/img/blog/digital-ocean/git-repo-create.png" alt="Create new repository" /></a></p>

<p>Now we need to grab the URL of the repository from GitHub, so on the new page you were redirected to, click on “HTTPS” and then copy the URL to its right, as shown in the image below:</p>

<p><a href="https://deanattali.com/img/blog/digital-ocean/git-repo-url.png"><img src="https://deanattali.com/img/blog/digital-ocean/git-repo-url.png" alt="Get git repo URL" /></a></p>

<p>Now we need to make the connection between the git repository we made on our droplet and the one we just created, and then add all the files that are currently in <code class="language-plaintext highlighter-rouge">/srv/shiny-server/</code> to this repository. <strong>Be sure to replace the URL in the first command with the URL that you copied from your repository</strong>.</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>git remote add origin https://github.com/daattali/shiny-server.git
git add .
git commit -m "Initial commit"
git push -u origin master
</code></pre></div></div>

<p>If you now refresh the GitHub page, you should see the files that were added from the droplet.</p>

<p>Now that git is set up, you can add shiny apps to this repository (assuming you know basic git usage).  Whenever you add a new shiny app or edit the index page or an existing app, you’ll need to do a <code class="language-plaintext highlighter-rouge">git pull</code> on your droplet to grab those changes and display them in your server. That’s it, it’s pretty convenient in my opinion.</p>

<p>As mentioned previously, Shiny Server can also be used as a great tool to host interactive Rmarkdown documents (not just shiny apps), so you can use this method to publish your rmarkdown files.</p>

<h2 id="server-pro">Note 8.3: Shiny Server Open Source vs Shiny Server Pro</h2>

<p>In this tutorial we installed Shiny Server Open Source, which is a free offering of Shiny Server by RStudio. However, RStudio also provides <a href="https://www.rstudio.com/products/shiny-server-pro/">Shiny Server Pro</a>, which is not free but is a lot more powerful.</p>

<p>If you’re just an individual playing around with shiny and want to host some of your personal apps, then using the Open Source version is perfectly fine. But if you’re looking to use a shiny server in your company, or if you require some more features such as user authentication (login), scaling (supporting multiple users at the same time), and monitoring, then I highly suggest you take a look at at Shiny Server Pro.</p>

<p class="box-note">If you’re considering purchasing Shiny Server Pro, RStudio Connect, shinyapps.io, or any other RStudio product, or if you want to discuss their benefits, feel free to <a href="https://deanattali.com/contact">contact me</a>.</p>

<h2 id="host-rmd">Note 8.4: Hosting R Markdown (Rmd) documents on your Shiny Server</h2>

<p>Shiny Server is useful not only for hosting Shiny applications, but also for hosting R markdown (Rmd) documents. These R markdown documents can either be regular plain R markdown docs, or <a href="http://rmarkdown.rstudio.com/authoring_shiny.html">interactive Rmarkdown documents</a>.</p>

<p>If you place an Rmarkdown file with the exact name of <code class="language-plaintext highlighter-rouge">index.Rmd</code> in any folder under your shiny server, you can access it by going to that folder’s URL. For example, <code class="language-plaintext highlighter-rouge">/srv/shiny-server/hello/index.Rmd</code> would be accessible at <code class="language-plaintext highlighter-rouge">http://123.456.1.2:3838/hello/</code>. If your Rmd document has any other name then you will need to specify the exact path to it - for example, <code class="language-plaintext highlighter-rouge">/srv/shiny-server/hello/world.Rmd</code> would be shown at <code class="language-plaintext highlighter-rouge">http://123.456.1.2:3838/hello/world.Rmd</code>.</p>

<h1 id="reverse-proxy">Step 9: Make pretty URLs for RStudio Server and Shiny Server</h1>

<p>This is optional and a little more advanced. You might have noticed that to access both RStudio and Shiny Server, you have to remember weird port numbers (<code class="language-plaintext highlighter-rouge">:8787</code> and <code class="language-plaintext highlighter-rouge">:3838</code>). Not only is it hard and ugly to remember, but some workplace environments often block access to those ports, which means that many people/places won’t be able to access these pages. The solution is to use a reverse proxy, so that nginx will listen on port 80 (default HTTP port) at the URL <code class="language-plaintext highlighter-rouge">/shiny</code> and will <em>internally</em> redirect that to port 3838. Same for RStudio - we can have nginx listen at <code class="language-plaintext highlighter-rouge">/rstudio</code> and redirect it to port 8787. This is why my Shiny apps can be reached at <a href="https://daattali.com/shiny/">daattali.com/shiny/</a> which is an easy URL to type.</p>

<p>You need to edit the nginx config file <code class="language-plaintext highlighter-rouge">/etc/nginx/sites-enabled/default</code>:</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>sudo nano /etc/nginx/sites-enabled/default
</code></pre></div></div>

<p>(I’m assuming you know how to use <code class="language-plaintext highlighter-rouge">nano</code>. If not, then just Google for “how to edit a file with nano”. In short: use the arrow keys to move aroud, press <code class="language-plaintext highlighter-rouge">Ctrl</code>+<code class="language-plaintext highlighter-rouge">O</code> followed by Enter to save, and press <code class="language-plaintext highlighter-rouge">Ctrl</code>+<code class="language-plaintext highlighter-rouge">X</code> to exit.)</p>

<p>Add the following lines <strong>above</strong> the line that reads <code class="language-plaintext highlighter-rouge">server {</code></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>map $http_upgrade $connection_upgrade {
  default upgrade;
  ''      close;
}
</code></pre></div></div>

<p>And add the following lines <strong>right after</strong> the line that reads <code class="language-plaintext highlighter-rouge">server_name _;</code></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>location /shiny/ {
  proxy_pass http://127.0.0.1:3838/;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection $connection_upgrade;
  rewrite ^(/shiny/[^/]+)$ $1/ permanent;
}

location /rstudio/ {
  proxy_pass http://127.0.0.1:8787/;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection $connection_upgrade;
}
</code></pre></div></div>

<p>(Note that some of these configuration lines I had to figure out on my own, and I’d like to reiterate that I’m an nginx noob so it might not be a <em>correct</em> solution. But it seems to have worked for over 1,000 people for a few years already, so that does give me confidence in these settings!)</p>

<p>Since we changed the nginx config, we need to restart nginx for it to take effect.</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>sudo service nginx restart
</code></pre></div></div>

<p>Now you should be able to go to <code class="language-plaintext highlighter-rouge">http://123.456.1.2/shiny/</code> or <code class="language-plaintext highlighter-rouge">http://123.456.1.2/rstudio/</code>. Much better!</p>

<h1 id="custom-domain">Step 10: Custom domain name</h1>

<p>If you have a custom domain that you want to host your droplet on, that’s not too hard to set up.  For example, my main droplet’s IP is <a href="http://198.199.117.12">198.199.117.12</a>, but I also purchased the domain <a href="https://daattali.com/">daattali.com</a> so that it would be able to host my droplet with a much simpler URL. I used <a href="https://www.namecheap.com/?aff=95702">Namecheap</a> to buy my domain, but most companies are fairly similar.</p>

<p>After purchasing your own domain, there are two steps involved to link the domain to your droplet: you need to point from your registrar to DO, and to configure your domain on DO.</p>

<p>I used to give out specific instructions on how to do this, but unfortunately the steps required keep changing every few months (because the websites change their interface), so instead I will link to the two articles that will guide you through this process: <a href="https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars#registrar-namecheap">Step 1: How to point from your registrar to DO</a> and <a href="https://www.digitalocean.com/community/tutorials/how-to-set-up-a-host-name-with-digitalocean">Step 2: How to configure your domain on DO</a>.</p>

<p><strong>And that’s it! Now you have a nicely configured private web server with your very own RStudio and Shiny Server, and you can do anything else you’d like on it.</strong></p>

<p>If you’ve found this tutorial useful, please consider supporting me for the countless hours I’ve put into this tutorial :)</p>

<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" style="text-align: center;">
    <input type="hidden" name="cmd" value="_s-xclick" />
    <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
    " />
    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="Donate with PayPal" />
    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
  </form>

<h2 id="updates">Updates</h2>

<p><strong>[2015-05-11]</strong> I’ve gotten several people asking me if this can be a solution for hosting rmarkdown files as well. <strong>YES it can!</strong> Shiny Server works great as hosting .Rmd files, and you can even embed a Shiny app inside the Rmd file.  <a href="https://daattali.com/shiny/rbloggers-twitter/">Here’s an example on my server</a> in case you’re curious.</p>

<p><strong>[2015-05-11]</strong> There is some inquiry about whether or not this setup should be “Dockerized” (<a href="https://www.docker.com/">What is Docker?</a>). Docker is of course a great alternative to setting this up and can be even simpler by taking away all the pain of doing the setup yourself and providing you with a container that already has RStudio/Shiny Server installed. <a href="https://twitter.com/eddelbuettel">Dirk Eddelbuettel</a> and <a href="https://twitter.com/cboettig">Carl Boettiger</a> already did a fantastic job of making some R-related docker containers, including RStudio and Shiny Server, so <a href="https://registry.hub.docker.com/repos/rocker/">check out Rocker</a> if you want to go that route. I think it’s nice to do all this installation yourself because it can look scary and intimidating before you do it the first time, and it can be a nice feeling to see that it’s actually very doable and really doesn’t take very long (less than half an hour) if you have a guide that takes away the annoying Googling at every step.  But you can quickly surpass all these steps and use docker if you prefer :)</p>

<p><strong>[2015-05-12]</strong> Added missing dependencies to install devtools and <a href="#user-libraries">Important note re: installing R packages</a>.</p>

<p><strong>[2015-05-13]</strong> Added section about <a href="#shiny-git">populating Shiny Server with Shiny apps using a git repository</a>.</p>

<p><strong>[2015-05-13]</strong> Added a bit in <a href="#reverse-proxy">step 9</a> about proxying WebSockets to fix a few small potential issues with RStudio Server.</p>

<p><strong>[2015-05-14]</strong> Added section about <a href="#shiny-user-perms">setting up proper user permissions on Shiny Server</a>.</p>

<p><strong>[2015-05-18]</strong> As mentioned in the comments, students with an educational GitHub account can get $100 credits through the GitHub Student Developer Pack.</p>

<p><strong>[2015-09-01]</strong> Matthew Lincoln posted a script in the comments section that runs all the commands in this tutorial automatically when a DigitalOcean droplet is initialized. His exact comment: “I’ve tried my hand at getting most of this scripted into a cloud-config file that you can paste into the ‘User Data’ section when starting up a DO droplet… It doesn’t handle anything like custom user options (yet!), but I’ve found it a great way to automate a fair number of these steps.” I myself haven’t tried his script, but you can check it out <a href="https://gist.github.com/mdlincoln/1f40f4e88ce32c55b5f3">here</a>, and I also found a DigitalOcean tutorial about cloud-config and User Data <a href="https://www.digitalocean.com/community/tutorials/an-introduction-to-cloud-config-scripting">here</a>. Again, I haven’t tried it myself so if you have any questions, please direct it at Matthew :)</p>

<p><strong>[2015-12-05]</strong> Added a small paragraph to <a href="#reverse-proxy">step 9</a> for fixing Shiny app URLs that don’t have a trailing slash.</p>

<p><strong>[2016-03-10]</strong> There was an article today about how to <a href="https://www.r-bloggers.com/add-authentication-to-shiny-server-with-nginx/">add authentication to Shiny Server using nginx</a>.  I haven’t tried it, but it looks like a great resource if you want to add authentication to your apps.</p>

<p><strong>[2016-10-09]</strong> Added a <a href="#server-pro">small section</a> on Shiny Server Pro.</p>

<p><strong>[2017-04-04]</strong> Added a <a href="#host-rmd">section</a> on hosting Rmd files on a shiny server.</p>

<p><strong>[2017-10-17]</strong> Updated instructions to use Ubuntu 16.04 instead of 14.04 and changed using vim to using nano because it’s easier for beginners. Also updated the “custom domain name” section because the specific details kept changing all the time.</p>

<p><strong>[2018]</strong> I’m going to stop mentioning all the updates. I’ll just update the article whenever it needs to happen.</p>

<h1 id="resources">Resources</h1>

<p>This is a list of the main blog/StackOverflow/random posts I had to consult while getting all this to work.</p>

<ul>
  <li><a href="https://www.digitalocean.com/community/tutorials/how-to-use-ssh-keys-with-putty-on-digitalocean-droplets-windows-users">DigitalOcean: ssh keys</a></li>
  <li><a href="https://www.raspberrypi.org/documentation/remote-access/web-server/nginx.md">Nginx</a></li>
  <li><a href="https://sysads.co.uk/2014/06/02/install-r-base-3-1-0-ubuntu-14-04/">Installing R on Ubuntu</a></li>
  <li><a href="http://stackoverflow.com/questions/17173972/how-do-you-add-swap-to-an-ec2-instance">StackOverflow: adding swap space</a></li>
  <li><a href="http://stackoverflow.com/questions/20923209/problems-installing-the-devtools-package">StackOverflow: installing devtools</a></li>
  <li><a href="https://www.digitalocean.com/community/tutorials/how-to-set-up-rstudio-on-an-ubuntu-cloud-server">DigitalOcean: set up RStudio</a></li>
  <li><a href="http://www.rstudio.com/products/rstudio/download-server/">RStudio Server</a></li>
  <li><a href="http://withr.me/set-up-shiny-server-on-www-dot-digitalocean-dot-com/">Shiny Server on DigitalOcean</a></li>
  <li><a href="https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars">DigitalOcean: custom domains 1</a></li>
  <li><a href="https://www.digitalocean.com/community/tutorials/how-to-set-up-a-host-name-with-digitalocean">DigitalOcean: custom domains 2</a></li>
</ul>

<h2 id="disclaimer">Disclaimer</h2>

<p>I’m not a sysadmin and a lot of this stuff was learned very quickly from random Googling, so it’s very possible that some steps here are not the very best way of performing some tasks. If anyone has any comments on anything in this document, I’d love to <a href="https://deanattali.com/aboutme#contact">hear about it</a>!</p>

   
    
    
  </body>
</html>
