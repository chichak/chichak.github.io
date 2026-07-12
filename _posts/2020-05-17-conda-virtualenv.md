When you install conda, if you activate "base" env by default you will have (base) beside your username in your console.

This can also be because auto_activate_base is set to True. You can check this using the following command

conda config --show | grep auto_activate_base
To set it false

conda config --set auto_activate_base False
source ~/.bashrc
To reactivate set it to True

conda config --set auto_activate_base True
source ~/.bashrc
