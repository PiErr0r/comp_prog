#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

int main() {
  vector<double> p = {1, 1, 1, 0.75, 0.5, 0};
  string input;
  vector<int> n = {};
  int num = 0;
  int tmp;
  while (cin >> tmp) {
    n.push_back(tmp);
    cout << tmp << " ";
  }

  double sum = 0.0;
  for (int i = 0; i < p.size(); ++i) {
    sum += (double)2 * (double)p[i] * (double)n[i];
  }
  cout << '\n';
  cout << setprecision(5) << fixed << sum << '\n';
  return 0;
}
