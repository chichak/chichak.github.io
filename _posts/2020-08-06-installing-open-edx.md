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

