# !/bin/bash

rm -rf build 
yarn build
firebase deploy
