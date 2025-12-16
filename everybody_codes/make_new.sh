#!/bin/bash

### Usage:
### ./make_new <day> <year>
### day is formatted by 2 digits (e.g. 07 or 23)
### Example ./make_new 01 2025

cp template.js "$1.js";
echo "main('$1');" >> "$1.js";
echo "" >> "$1".js;

touch "$1"{a,b,c}_input;
mv "$1"* "$2"*
subl "$2"*/"$1"*;
