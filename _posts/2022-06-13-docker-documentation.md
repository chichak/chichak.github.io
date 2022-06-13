## Why using Docker : 

### Steps : 
- 1- Visit docker website and follow steps to install docker 
- 2- Go to docker hub and create an account 
- 3- Find a distribution you want in docker hub, copy the link and go to your terminal 


### Docker commands :
- **List all installed images :** sudo docker images 
- **List all running images :** sudo docker container ls
- **Start an image :** sudo docker start --id
  - **example :** docker run -d -p 4444:4444 -p 7900:7900 --shm-size="2g" selenium/standalone-firefox:4.2.2-20220609
- **Stop an image :** sudo docker stop --id
