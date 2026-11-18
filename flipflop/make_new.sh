#!/bin/bash

### Usage:
### ./make_new <day> <year>
### day is formatted by 2 digits (e.g. 07 or 23)
### Example ./make_new 01 2025

cp template.js "$1.js";
echo "main('$1');" >> "$1.js";
echo "" >> "$1".js;

touch "${1}_input" "${1}_ex";
mv "${1}.js" "${1}"_{ex,input} "$2"
