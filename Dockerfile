FROM ubuntu

# Install Node
RUN apt-get update
RUN apt-get install -y python-software-properties python g++ make software-properties-common
RUN add-apt-repository -y ppa:chris-lea/node.js && apt-get update
RUN apt-get install -y nodejs

# Install git
RUN apt-get install -y git

# Clone stress test code
RUN git clone git://github.com/rase-/engine.io-stresstest.git

MAINTAINER Tony Kovanen, tonykovanen@hotmail.com
