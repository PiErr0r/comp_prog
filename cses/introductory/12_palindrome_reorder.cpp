#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  string s;
  vector<int> n(26);
  cin >> s;

  int mx = -1;
  for (char c : s) {
    int d = c - 'A';
    n[d]++;
    if (d > mx) {
      mx = d;
    }
  }
  int odd = 0;
  int oddc = -1;
  for (int i = 0; i < (int)n.size(); ++ i) {
    if (n[i]&1) {
      ++odd;
      oddc = i;
    }
  }

  if (odd > 1) {
    cout << "NO SOLUTION" << endl;
    return 0;
  }

  int i = 0;
  int dir = 1;
  while (i >= 0) {
    if (n[i] == 0) {
      i += dir;
      continue;
    }
    if (i >= mx + 1) {
      dir = -1;
      while (n[oddc] > 0) {
        cout << (char)('A' + oddc);
        --n[oddc];
      }
      i += dir;
      continue;
    }
    if (i == oddc) {
      i += dir;
      continue;
    }
    int tmp = n[i];
    int cond = tmp >> 1;
    while (tmp > cond) {
      cout << (char)('A' + i);
      --tmp;
    }
    i += dir;
  }
  cout << endl;

  return 0;
}
