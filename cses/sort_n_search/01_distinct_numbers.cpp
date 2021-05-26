#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

const int nax = 1e9 + 5;

int main(void) {
  cin.tie(0)->sync_with_stdio(0);
  int n;
  cin >> n;
  /*
  unordered_set<int> s;
  int tmp;
  while (n--) {
    cin >> tmp;
    s.insert(tmp);
  }

  cout << (int)s.size() << endl;
*/
  bitset<nax> b;
  while (n--) {
    int tmp;
    cin >> tmp;
    b[tmp] = 1;
  }
  cout << b.count() << endl;

  return 0;
}
