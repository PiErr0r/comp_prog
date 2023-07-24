#include <bits/stdc++.h>
#define MP make_pair
#define F first
#define S second

using namespace std;
using ll = long long;

void solve(void) {
  int n, m;
  cin >> n >> m;
  vector<int> nums(n, 0);
  set<pair<int, int>> segs_in;
  vector<pair<pair<int, int>, int>> segs;
  for (int i = 0; i < m; ++i) {
    int l, r;
    cin >> l >> r;
    --l; --r;
    //segs[i] = MP(MP(l, r), 0);
    segs_in.insert(MP(r, l));
  }
  for (auto i : segs_in) {
    segs.push_back(MP(i, 0));
  }
  sort(segs.begin(), segs.end());
  int q;
  cin >> q;
  bool done = false;
  for (int i = 0; i < q; ++i) {
    int c;
    cin >> c;
    --c;
    if (done) continue;
    auto si = lower_bound(segs.begin(), segs.end(), MP(MP(c, 0), 0));
//    while (si != segs.end() && c < si->F.F) ++si;
    while (si != segs.end() && c >= si->F.S && c <= si->F.F) {
      int r = si->F.F, l = si->F.S;
      if (nums[c] == 0) ++si->S;
      //cout << "C " << c << " L " << l << " R " << r << " sz: " << si->S << endl;
      int L = r - l + 1;
      if (si->S > (L/2)) {
        cout << (i + 1);
        done = true;
        break;
      }
      ++si;
    }
    nums[c] = 1;
  }
  if (!done) cout << -1;
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
