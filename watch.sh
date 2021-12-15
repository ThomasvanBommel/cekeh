#!/bin/bash

FILE=$1
#STATE=$(ls --full-time $FILE | awk '{ print $7 }')
STATE=$(ls -R --full-time)

function stop {
    kill $(ps -u | grep exe/main | head -1 | awk '{ print $2}')
}

function start {
    go run src/*.go &
}

function checkState {
    #NEWSTATE=$(ls --full-time $FILE | awk '{ print $7 }')
    NEWSTATE=$(ls -R --full-time)

    if [ "$STATE" != "$NEWSTATE" ]; then
        STATE=$NEWSTATE

        stop
        start
    fi
}

start

while true; do
    checkState

    sleep 1
done

stop