#include <bits/stdc++.h>

using namespace std;

int gcd(int a, int b) {
  while (b) {
    int tmp = a;
    a = b;
    b = tmp % b;
  }
  return a;
}

void swap(vector<int> &v, int i, int j) {
  int tmp = v[i];
  v[i] = v[j];
  v[j] = tmp;
}

void solve(void) {
  int n;
  cin >> n;
  vector<int> v(n);
  for (int &i : v) cin >> i;
  sort(v.begin(), v.end());
  int g = v[0];
  bool is_good;
  for (int i = 1; i < n; ++i) {
    int ng = gcd(g, v[i]);
    int pt = i + 1;
    is_good = ng <= i + 1;
    while (!is_good && pt < n) {
      swap(v, i, pt);
      ng = gcd(g, v[i]);
      is_good = ng <= i + 1;
      ++pt;
    }
    if (!is_good) {
      cout << "No";
      return;
    }
    g = ng;
  }
  cout << "Yes";
}

int main(void) {

  int T, i;
  cin >> T;

  for (i = 1; i <= T; ++i) {
    // cout << "Case #" << (i) << ": ";
    solve();
    cout << endl;
  }

  return 0;
}
