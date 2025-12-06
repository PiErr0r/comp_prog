#!/bin/bash

cp template.js "$1.js";
echo "main('$1');" >> "$1.js";
echo "" >> "$1".js;

touch "$1"{a,b,c}_input;
subl "$1"*;