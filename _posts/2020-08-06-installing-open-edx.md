The documentation is here : 
https://docs.tutor.overhang.io/

1- Follow documentation
--error : docker-compose ...
--fix : 
1. check docker is running : sudo systemctl enable docker # Auto-start on boot
sudo systemctl start docker # Start right now
2. use sudo tutor local quickstart 

2- It will work, but another error "about nginx" appeared 
--fix : 
1. look which service is using port 80 : sudo netstat -tlnp | grep 80
2. kill all process running on port 80 : sudo lsof -t -i tcp:80 -s tcp:listen | sudo xargs kill

DNS configuration:
1- In your domain hosting platform : set dns names to "ns1.digitalocean.com." for example if you have your project installed on a DO droplet
2- In your DO droplet :
1. Add domain name : @ point it to the droplet ip adress
2. add a cname *.yourdomain.com point it to your domain name 
