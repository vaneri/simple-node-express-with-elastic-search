# nodejs-simple-example
A very basic and simple example using nodejs, axios, jest 

npm install
npm start 

# Docker
## Installation of docker image Kibana & Elsastic search

docker pull kibana:8.7.1
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.8.0
docker network create esnet

## Starting docker & docker-compose 

docker-compose up --build


Elasticsearch utilizes memory-mapped files to improve performance and enable efficient access to data.
Elasticsearch requires a sufficient number of virtual memory areas (vm.max_map_count) 
-> sudo sysctl -w vm.max_map_count=262144

docker run -d --name kibana --net esnet -p 5601:5601 kibana:8.7.1
-> go to localhost:5601
-> past the enrolment token
-> docker exec kibana bin/kibana-verification-code
-> use the code

Those command should only be used in Development mode

Interesting commands to change the path of the data for docker:
docker run -d -v /path/on/host:/usr/share/elasticsearch/data elasticsearch:<version>


docker run -d --name es01 --net esnet -p 9200:9200 -it docker.elastic.co/elasticsearch/elasticsearch:8.8.0
-> copy the enrolment token
