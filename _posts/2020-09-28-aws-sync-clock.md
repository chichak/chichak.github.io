<p>If you are dealing with AWS s3 buckets, there is a common error which araises and tell you </p>
>"botocore.exceptions.ClientError: An error occurred (RequestTimeTooSkewed) when calling the ListBuckets operation: The difference between the request time and the current time is too large."

<p>As a solution to this, you have to tell your server to pick the time directly from Amazon servers. Here is how to do this:</p>

1. To install NTP, simply choose one of the following, depending on your distribution

''' 
apt-get install ntp
'''

2. Configure NTP to use amazon servers, like so:

'''
vim /etc/ntp.conf
'''

3. And in it, comment out the default servers and add these:

'''
server 0.amazon.pool.ntp.org iburst
server 1.amazon.pool.ntp.org iburst
server 2.amazon.pool.ntp.org iburst
server 3.amazon.pool.ntp.org iburst

'''
 
4. And then restart ntp service:

'''
sudo service ntp restart
'''

[Source](https://www.allcloud.io/how-to/how-to-fix-amazon-s3-requesttimetooskewed/)
[Source](https://www.digitalocean.com/community/tutorials/how-to-set-up-time-synchronization-on-ubuntu-12-04)

