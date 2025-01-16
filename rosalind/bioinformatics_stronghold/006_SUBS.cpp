#include <iostream>
#include <vector>

using namespace std;

int main() {
  string s;
  string sub;
  cin >> s;
  cin >> sub;
  vector<int> pos;
  for (int i = 0; i < s.size(); ++i) {
    if (s[i] == sub[0]) {
      bool isSub = true;
      for (int j = 1; j < sub.size(); ++j) {
        if (s[i + j] != sub[j]) {
          isSub = false;
          break;
        }
      }
      if (isSub) {
        pos.push_back(i + 1);
      }
    }
  }

  for (int i = 0; i < pos.size(); ++i) {
    cout << pos[i] << " ";
  }
  cout << '\n';

  return 0;
}
