#include <iostream>
#include <vector>
#include <utility>
#include <map>

using namespace std;


map<char, char> pairs = {
  {'A', 'T'},
  {'C', 'G'},
  {'G', 'C'},
  {'T', 'A'}
};

bool get_revp(string& s, int pos, int l) {
  for (int i = 0; i < l; ++i) {
    if (s[pos + i] != pairs[ s[pos + l - i - 1] ]) {
      return false;
    }
  }
  return true;
}

int main() {
  string fasta;
  string input;
  vector<pair<int, int>> result = {};
  int min_l = 4;
  int max_l = 12;
  cin >> fasta;
  string tmp;
  while (cin >> tmp) {
    input += tmp;
  }

  for (int i = 0; i < input.size(); ++i) {
    for (int j = min_l; j <= max_l && i + j <= input.size(); ++j) {
      if (get_revp(input, i, j)) {
        result.push_back(pair<int, int>(i + 1, j));
      }
    }
  }
  cout << '\n';
  for (auto p : result) {
    cout << p.first << " " << p.second << "\n";
  }
  return 0;
}
