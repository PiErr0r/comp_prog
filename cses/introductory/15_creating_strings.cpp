#include <bits/stdc++.h>

using namespace std;
typedef long long ll;


int fact(int n) {
  int res = 1;
  while (n) {
    res *= n--;
  }
  return res;
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);
  string s;
  cin >> s;
  sort(s.begin(), s.end());

  vector<int> l(26);
  for (char c : s) {
    ++l[c-'a'];
  }

  int n = fact(s.size());

  for (int i : l) {
    if (i) {
      n /= fact(i);
    }
  }

  cout << n << endl;
  do {
    cout << s << endl;
  } while (next_permutation(s.begin(), s.end()));


  return 0;
}
