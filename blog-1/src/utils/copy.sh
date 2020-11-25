#!/bin/sh 

cd /Users/licop/documents/github/nodejs-myblog/blog-1/logs
cp access.log $(date +%Y-%m-%d-%H).access.log
echo "" > access.log
