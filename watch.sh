#!/bin/bash

function newState {
    NEWSTATE=$(ls -R --full-time)
}

newState
STATE=$NEWSTATE

function start {
    go run src/*.go &
}

function stop {
    kill $(ps -u | grep exe/main | head -1 | awk '{ print $2}')
}

start

while true; do
    newState

    if [ "$STATE" != "$NEWSTATE" ]; then
        STATE=$NEWSTATE

        stop
        start
    fi

    sleep 1
done

stop