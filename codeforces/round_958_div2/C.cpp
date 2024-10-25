#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;
#define FOR(n) for (int i = 0; i < n; ++i)

using namespace std;
using ll = long long;

set<ll> SEEN{};

void backtrack(ll n, ll curr, vector<ll> &arr, vector<ll> &longest) {
  if (SEEN.count(curr) != 0) return;
  SEEN.insert(curr);
  ll i = 1;
  while (i <= curr) {
    if ((curr ^ i) && curr > (curr ^ i) && (curr | (curr ^ i)) == n) {
      arr.PB(curr ^ i);
      backtrack(n, curr ^ i, arr, longest);
      if (arr.size() > longest.size()) {
        longest = arr;
      }
      arr.pop_back();
    }
    if ((n ^ i) && curr > (n ^ i) && (curr | (n ^ i)) == n) {
      arr.PB(n ^ i);
      backtrack(n, n ^ i, arr, longest);
      if (arr.size() > longest.size()) {
        longest = arr;
      }
      arr.pop_back();
    }
    i <<= 1;
  }
}

void solve(void) {
  SEEN.clear();
  ll n;
  cin >> n;
  vector<ll> arr{n};
  vector<ll> longest{n};
  backtrack(n, n, arr, longest);

  cout << longest.size() << endl;
  for (int i = longest.size() - 1; i >= 0; --i) {
    cout << longest[i] << " ";
  }
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
