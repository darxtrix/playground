FROM ubuntu:16.04

# Installing nvm
RUN apt-get update -y 
RUN apt-get install build-essential libssl-dev curl -y

# Setting the path for NVM and the node version
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 7.0.0

# Installing NVM to NVM directory
RUN curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

# Running the nvm.sh file which puts the location of the nvm command on the PATH
RUN . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm use $NODE_VERSION

# Now dynamically construct the node path, the path of the node modules
ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules

# Add the node binary to path 
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

WORKDIR /home/

CMD ["node","index.js"]