#include <iostream>
#include <vector>
#include <bits/stdc++.h>

using namespace std;

int find_min(vector<int> &diffs, int k, int p) {
  int tmp, m1, m2, i, min = 1000000000;
  if (k < 0 || diffs.size() == p) {
    return -1;
  }
  if (k == 0) {
    return diffs[p];
  }
  for (i = k; i > 0; --i) {
    if (i > diffs[p]) { continue; }
    int a = 1.0 * diffs[p] / (i+1);
    int b = diffs[p] - i * a;
    if (b>a) { ++a; }
    if (a == 0) {
      continue;
    }
    m1 = a;
    tmp = find_min(diffs, k - i, p + 1);
    m2 = tmp <= 0 ? m1 : tmp;
    m1 = m1 > m2 ? m1 : m2;
    min = m1 < min ? m1 : min;
  }
  return min;
}

int solve(void) {
  int n, k, i, res, curr, prev;
  vector<int> diffs = {};
  cin >> n >> k;
  for (i = 0; i < n; ++i) {
    cin >> curr;
    if (i == 0 || curr - prev <= 1) {
      prev = curr;
      continue;
    }
    diffs.push_back(curr - prev);
    prev = curr;
  }
  sort(diffs.begin(), diffs.end(), greater<int>());

  return find_min(diffs, k, 0);

}

int main(void) {

  int T, i;
  cin >> T;

  for (i = 0; i < T; ++i) {
    cout << "Case #" << (i + 1) << ": " << solve() << endl;
  }

  return 0;
}
