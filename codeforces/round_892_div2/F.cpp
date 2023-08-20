#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;
#define FOR(n) for (int i = 0; i < n; ++i)

using namespace std;
using ll = long long;

bool dfs(vector<vector<pair<int,int>>> &cities, int parent, int a, int b, map<int, int> &path) {
  if (a == b) {
    return true;
  }
  for (auto c : cities[a]) {
    if (c.first == parent) continue;
    if (dfs(cities, a, c.first, b, path)) {
      path[a] = c.first;
      return true;
    }
  }
  return false;
}

ll bfs(vector<vector<pair<int,int>>> &cities, int a, int b, string s, int T) {
  map<int, int> path;
  dfs(cities, -1, a, b, path);
  queue<pair<int, pair<ll,ll>>> Q;
  Q.push(MP(a, MP(1, 0)));
  ll mn = 1000000000001;
  while (!Q.empty()) {
    auto top = Q.front();
    Q.pop();
    if (top.F == b) {
      mn = min(mn, top.S.S);
      continue;
    }
    if (top.S.S >= mn) continue;
    int nxt = path[top.F];
    if (s[top.F] == '1')
      Q.push(MP(top.F, MP(top.S.F * (ll)2, top.S.S + (ll)T)));
    int w = 0;
    for (auto c : cities[top.F]) {
      if (c.F == nxt) {
        w = c.S;
        break;
      }
    }
    assert(w != 0);
    Q.push(MP(path[top.F], MP(top.S.F, top.S.S + (ll)(w - 1) / (ll)top.S.F + (ll)1)));
  }
  return mn;
}



void solve(void) {
  int n, T; cin >> n >> T;
  vector<vector<pair<int,int>>> cities(n, vector<pair<int,int>>());
  FOR(n - 1) {
    int u, v, w;
    cin >> u >> v >> w;
    --u, --v;
    cities[u].PB(MP(v, w));
    cities[v].PB(MP(u, w));
  }
  string s;
  cin >> s;
  int q; cin >> q;
  FOR(q) {
    int a, b;
    cin >> a >> b;
    --a; --b;
    cout << bfs(cities, a, b, s, T) << endl;
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
  }

  return 0;
}
