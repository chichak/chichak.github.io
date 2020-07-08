<ol>
  <li>Create your droplet</li>
<li>Mount/install your ubuntu server with docker</li>
  <li>docker pull continuumio/anaconda3</li>
  <li> ```R
    # Run your docker image
    $ docker run -p 8888:8888 -i -t continuumio/anaconda3 /bin/bash ```</li>
      jupyter notebook --ip=0.0.0.0 --port=8888 --allow-root
  ```
  </p>
  <li>Copy the token from your console (example : http://1c58dfd99a06:8888/?token=<strong>2f80b56511f990500fc9700eaaa83cad034233cd27d1a883</strong>)</li>
  <li>Now you can access jupyter notebook from your browser with : http://droplet-IP:8888</li>
  <li>Enter the token you already copied and bingo </li>
  </ol>

<ul>
  <h4> Docker Bonus</h4>
  <li> To list all docker downloaded images : sudo docker images</li>
  <li> To see running containers : sudo docker ps (-a) </li>
  <li> to stop running container : sudo docker stop ID</li>
</ul>



 

