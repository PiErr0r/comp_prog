#include <map>
#include <vector>
#include <iostream>

using namespace std;

int main() {
  map<char, int> d = {
    {'A', 0},
    {'C', 0},
    {'G', 0},
    {'T', 0}
  };
  string sample;
  cin >> sample;
  for (int i = 0; i < sample.size(); ++i) {
    d[ sample[i] ]++;
  }
  vector<char> k = {'A', 'C', 'G', 'T'};
  for (int i = 0; i < k.size(); ++i) {
    cout << d[k[i]] << ' ';
  }
  cout << "\n";
  return 0;
}
