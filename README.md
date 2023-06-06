# simple-node-express-with-elastic-search 
A very basic and simple example using node express and elastic search


```console
npm install
# Pre-requisite: having ES running and having collected the certificate to connect using HTTPS
npm start 
```

# Testing
## Installation of docker image Kibana & Elsastic search

```console
docker pull kibana:8.7.1
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.8.0
docker network create esnet
```

## Testing with ES running in docker

Elasticsearch utilizes memory-mapped files to improve performance and enable efficient access to data.
Elasticsearch requires a sufficient number of virtual memory areas (vm.max_map_count)
```console
sudo sysctl -w vm.max_map_count=262144

docker run -d -v /path/on/host:/usr/share/elasticsearch/data elasticsearch:elasticsearch:8.8.0
docker run -d --name es01 --net esnet -p 9200:9200 -it docker.elastic.co/elasticsearch/elasticsearch:8.8.0

#Getting the certificate
docker cp es01:/usr/share/elasticsearch/config/certs/http_ca.crt .
```


## Starting kibana

Get an enrolment token for kibana
```console
docker exec -it es01 /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s node
docker run -d --name kibana --net esnet -p 5601:5601 kibana:8.7.1
```

- go to localhost:5601
- past the enrolment token
```console
docker exec kibana bin/kibana-verification-code
```
- use the code

if problem of connection use the following command and fallback: this will help you understand your network configuration
```console
docker network inspect esnet
```


## starting the docker-compose
Work in progress / NOT tested
```console
docker-compose up --build
```
Those command should only be used in Development mode

Interesting commands to change the path of the data for docker:
https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
