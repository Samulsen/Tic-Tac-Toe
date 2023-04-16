#!/bin/bash

if [[ -d ".parcel-cache" && -d "dist" ]]; then
    rm -rf .parcel-cache dist
    clear
    echo "Both .parcel-cache and dist folders and their contents have been deleted"
    sleep 3
    clear
    echo "Continuing in --3--"
    sleep 1
    clear
    echo "Continuing in --2--"
    sleep 1
    clear
    echo "Continuing in --1--"
    sleep 1
    clear
    echo "Continuing in --0--"
    sleep 1
    clear
    echo "Continuing...!"
else
    clear
    echo "Either .parcel-cache or dist folder is missing in this directory"
    sleep 3
    clear
    echo "Continuing in --3--"
    sleep 1
    clear
    echo "Continuing in --2--"
    sleep 1
    clear
    echo "Continuing in --1--"
    sleep 1
    clear
    echo "Continuing in --0--"
    sleep 1
    clear
    echo "Continuing...!"
fi