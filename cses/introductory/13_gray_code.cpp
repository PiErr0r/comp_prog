#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

void cout_bin(int n, int sz) {
  string s = "";
  while (n) {
    s = (n & 1 ? '1' : '0') + s;
    n >>= 1;
  }
  while ((int)s.length() < sz) {
    s = '0' + s;
  }
  cout << s << endl;
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);
  int n;
  cin >> n;
  for (int i = 0; i < (1 << n); ++i) {
    cout_bin(i ^ (i >> 1), n);
  }
  return 0;
}
