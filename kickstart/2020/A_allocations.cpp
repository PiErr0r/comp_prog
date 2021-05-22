#include <iostream>
#include <vector>
#include <bits/stdc++.h>

using namespace std;

int solve(void) {
  int i, N, B, tmp, res = 0;
  vector<int> A;
  cin >> N >> B;
  for (i = 0; i < N; ++i) {
    cin >> tmp;
    A.push_back(tmp);
  }
  sort(A.begin(), A.end());
  for (i = 0; i < N; ++i) {
    if (A[i] <= B) {
      B -= A[i];
      ++res;
    } else {
      break;
    }
  }
  return res;
}

int main(void) {

  int T, i, res;
  cin >> T;
  for (i = 0; i < T; ++i) {
    res = solve();
    cout << "Case #" << (i + 1) << ": " << res << endl;
  }

  return 0;
}
