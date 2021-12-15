#!/bin/bash

set -e

IMAGE_NAME="cekeh"

# Build the new image
docker build --tag $IMAGE_NAME .

# Get a list of old image copies (labeled "<none>")
IMAGES=$(docker images | grep "<none>" | awk '{ print $3 }')

# Remove image copies
[[ ! -z "$IMAGES" ]] && docker rmi -f $IMAGES

# Startup docker container using our new image
docker run --rm -ti -p 8080:8080 $IMAGE_NAME