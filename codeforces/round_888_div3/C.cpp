#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;

using namespace std;
using ll = long long;

void solve(void) {
  int n, k;
  cin >> n >> k;
  vector<int> tiles(n);
  FILL(tiles);

  int fst = tiles[0], lst = tiles.back();
  int fc = 0, lc = 0, fi = -1;
  for (int i = 0; i < n && fc < k; ++i) {
    if (tiles[i] == fst) {
      ++fc;
      fi = i;
    }
  }
  if (fc != k && fst != lst) {
    cout << "NO"; return;
  }
  for (int i = n - 1; i > fi && lc < k; --i) {
    if (tiles[i] == lst) ++lc;
  }
  if (fst == lst && fc + lc >= k) {
    cout << "YES"; return;
  }
  if (lc != k) {
    cout << "NO"; return;
  }
  cout << "YES";
  /*
  for (int i = 0; i < li || (n - i - 1) > fi; ++i) {
    if (fc < k && tiles[i] == fst) {
      ++fc;
      fi = i;
    }
    if (lc < k && tiles[n - i - 1] == lst) {
      ++lc;
      li = n - i - 1;
    }
    if (fst == lst && fc + lc >= k) {
      cout << "YES"; return;
    }
  }
  if (fc >= k && lc >= k) {
    cout << "YES"; return;
  }
  cout << "NO";
  */
}

int main(void) {
  ios::sync_with_stdio(0);
  cin.tie(0);
  int T, i;
  cin >> T;
  // uncomment for precision when couting doubles
  // std::cout << std::fixed;
  // std::cout << std::setprecision(6);

  for (i = 1; i <= T; ++i) {
    solve();
    cout << endl;
  }

  return 0;
}
