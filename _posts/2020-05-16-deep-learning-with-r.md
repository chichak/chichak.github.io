xFirst thing to do before we start coding, let's prepare our machine.

1) install R
2) install miniconda :

Windows users:
1) Run RStudio
2) library(tensorflow)
3) install_tensorflow() (If asked to install miniconda, say "No" because you already have it installed). Then it will lunch the tensorflow intall, it may take some time.  

# To activate this environment, use:
# > activate r-reticulate

# To deactivate an active environment, use:
# > deactivate

Linux users:
#### code
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
chmod +x Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh -p $HOME/miniconda3
####
then : conda install tensorflow (make sure to close/reopen the console in order to let changes to take effect)

sudo apt install python3-pip

Here is a link to follow to install "tensorflow" via pip3 : <a href="https://www.tensorflow.org/install/pip"> Tensorflow via pip </a>
you can also see how to set up a virtualenv.
virtualenv --version

sudo apt install python3-dev python3-pip
sudo pip3 install -U virtualenv  # system-wide install

