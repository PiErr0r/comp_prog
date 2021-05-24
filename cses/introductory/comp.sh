g++ -std=c++17 -Wshadow -Wall -o a.out "$1" -fsanitize=address -fsanitize=undefined -D_GLIBCXX_DEBUG -g
