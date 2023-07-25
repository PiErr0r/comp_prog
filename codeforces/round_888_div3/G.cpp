#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;

using namespace std;
using ll = long long;

ll dijkstra(vector<vector<int>> &tree, vector<ll> &H, int a, int b) {
  set<int> visited;
  priority_queue<pair<int, ll>> Q;
  Q.push(MP(a, 0));
  ll res = 0;
  bool has_come = false;
  while (!Q.empty()) {
    auto curr = Q.top();
    Q.pop();
    //cout << res << " " << visited.count(curr.F) << " " << curr.F << endl;
    if (visited.count(curr.F) == 1) continue;
    for (int c : tree[curr.F]) {
      if (visited.count(c) == 1) continue;
      Q.push(MP(c, H[curr.F] - H[c]));
    }
    res += curr.S;
    visited.insert(curr.F);
    if (curr.F == b) {
      has_come = true;
      break;
    }
  }
  if (!has_come) return 1000000007;
  return res;
}

void solve(void) {
  int n, m;
  cin >> n >> m;
  vector<ll> H(n);
  FILL(H);
  vector<vector<int>> tree(n, vector<int>());
  for (int i = 0; i < m; ++i) {
    int a, b;
    cin >> a >> b;
    --a, --b;
    tree[a].PB(b);
    tree[b].PB(a);
  }
    cout << "HERE" << endl;
  int q;
  cin >> q;
  for (int i = 0; i < q; ++i) {
    int a, b, e;
    cin >> a >> b >> e;
    ll res = dijkstra(tree, H, a, b);
    if (res < e) cout << "YES";
    else cout << "NO";
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
