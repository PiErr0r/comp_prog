#include <bits/stdc++.h>

using namespace std;
typedef long long ll;


int main(void) {
  cin.tie(0)->sync_with_stdio(0);
  int n;
  cin >> n;
  ll sum = (ll) n * (n + 1);
  sum >>= 1;
  if (sum & 1) {
    puts("NO");
    return 0;
  }
  cout << "YES" << endl;
  sum >>= 1;
  vector<int> ans1, ans2;
  for (int i = n; i > 0; --i) {
    if (sum - i >= 0) {
      ans1.push_back(i);
      sum -= i;
    } else {
      ans2.push_back(i);
    }
  }
  cout << ans1.size() << endl;
  for (int i = 0; i < (int)ans1.size(); ++i) {
    cout << ans1[i];
    if (i != (int)ans1.size() - 1)
      cout << " ";
  }
  cout << endl;
  cout << ans2.size() << endl;
  for (int i = 0; i < (int)ans2.size(); ++i) {
    cout << ans2[i];
    if (i != (int)ans2.size() - 1)
      cout << " ";
  }
  cout << endl;

  return 0;
}
