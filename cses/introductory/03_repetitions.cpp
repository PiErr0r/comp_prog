#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

void solve(void) {

}

int main(void) {

  string s;
  cin >> s;

  int res = 0, curr = 0;
  char cc;
  for (char c : s) {
    if (c == cc) {
      ++curr;
    } else {
      curr = 0;
    }
    res = max(curr, res);
    cc = c;
  }
  ++res;
  cout << res << endl;

  return 0;
}
