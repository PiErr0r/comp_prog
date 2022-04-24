#!/bin/bash

TEST=0

if [ $# -gt 0 ]; then
  TEST=$1
fi

fcomp 4.cpp;

echo $TEST;

python interactive_runner.py python3 local_testing_tool.py3 $TEST -- ./a.out

