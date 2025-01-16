#include <iostream>
#include <map>

using namespace std;

int main(){
  string sample;
  cin >> sample;
  
  map<char, char> replace = {
    {'A', 'T'},
    {'T', 'A'},
    {'C', 'G'},
    {'G', 'C'}
  };

  string ret = "";
  for (int i = sample.size(); i >= 0; --i) {
    ret += replace[ sample[i] ];
  }

  cout << ret;
  return 0;
}
