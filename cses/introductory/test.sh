fcomp 18_digit_queries.cpp;
python tmp.py < in > out_py;
./a.out < in > out_cpp;
diff out_*
scomp 18_digit_queries.cpp;
