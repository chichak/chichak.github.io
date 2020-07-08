<ul>
  <li>1. Create your droplet</li>
<li>2. Mount/install your ubuntu server with docker</li>
  <li>3. docker pull continuumio/anaconda3</li>
  </ul>
 ```R
    # Run your docker image
    $ docker run -p 8888:8888 -i -t continuumio/anaconda3 /bin/bash
      jupyter notebook --ip=0.0.0.0 --port=8888 --allow-root
  ```
<ul>
  <li>4. Copy the token from your console (example : http://1c58dfd99a06:8888/?token=<strong>2f80b56511f990500fc9700eaaa83cad034233cd27d1a883</strong>)</li>
  <li>5. Now you can access jupyter notebook from your browser with : http://droplet-IP:8888</li>
  <li>6. Enter the token you already copied and bingo </li>
  </ul>

<ul>
  <h3> Docker Bonus</h3>
  <li> To list all docker downloaded images : sudo docker images</li>
  <li> To see running containers : sudo docker ps (-a) </li>
  <li> to stop running container : sudo docker stop ID</li>
</ul>



 

