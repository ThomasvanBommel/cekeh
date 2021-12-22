#!/bin/bash -e

export PROJECT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
SRC=$PROJECT_DIR/github.com/ThomasvanBommel/cekeh/

# install dependencies 
go get $SRC

# build project
go build -o $PROJECT_DIR/bin/ $SRC/*.go