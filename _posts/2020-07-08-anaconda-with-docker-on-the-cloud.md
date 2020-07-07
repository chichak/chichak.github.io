1- Create your droplet
2- Mount/install your ubuntu server with docker
3- docker pull continuumio/anaconda3
4- $ docker run -p 8888:8888 -i -t continuumio/anaconda3 /bin/bash
-----> jupyter notebook --ip=0.0.0.0 --port=8888 --allow-root
5- Copy the token from your console (example : http://1c58dfd99a06:8888/?token=<strong>2f80b56511f990500fc9700eaaa83cad034233cd27d1a883</strong>
5- Now you can access jupyter notebook from your browser with : http://droplet-IP:8888 
7- Enter the token you already copied and bingo 
