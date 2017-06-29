#!/bin/bash

# Stop all running containers
sudo docker stop $(sudo docker ps -q)

# Use --entrypoint /bin/bash to enter the interactive shell

# First one with all default ports
sudo docker run -d --net=host -p 21212:21212 -p 21211:21211 -p 8080:8080 -p 3021:3021 -p 5555:5555 -p 7181:7181 vdb-latest-built ./voltdb start --count=3 --host=10.10.183.171:3021

sudo docker run -d --net=host -p 21312:21312 -p 21311:21311 -p 8090:8090 -p 3031:3031 -p 5565:5565 -p 7281:7281 vdb-latest-built ./voltdb start --client=21312 --admin=21311 --http=8090 --internal=3031 --replication=5565 --zookeeper=7281 --count=3 --host=10.10.183.171:3021

sudo docker run -d --net=host -p 21412:21412 -p 21411:21411 -p 8100:8100 -p 3041:3041 -p 5575:5575 -p 7291:7291 vdb-latest-built ./voltdb start --client=21412 --admin=21411 --http=8100 --internal=3041 --replication=5575 --zookeeper=7291 --count=3 --host=10.10.183.171:3021
