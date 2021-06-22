#include <iostream>
#include <vector>
using namespace std;

int main() {

  int T;
  string s, t;
  cin >> T;
  while (T--) {
    vector<int> ans;
    cin >> s >> t;
    int sl = s.length();
    int tl = t.length();

    for (int i = 0; i < sl; ++i) {
      bool found = true;
      for (int j = 0; j < tl; ++j) {
        if (s[i + j] != t[j]) {
          found = false;
          break;
        }
      }
      if (found) {
        ans.push_back(i);
      }
    }
    for (int i : ans) {
      cout << (i+1) << " ";
    }
    cout << endl;
  }


  return 0;
}
