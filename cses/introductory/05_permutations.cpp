#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

void solve(void) {

}

int main(void) {
  int n;
  cin >> n;

  switch(n) {
    case 1: cout << 1; break;
    case 2: cout << "NO SOLUTION"; break;
    case 3: cout << "NO SOLUTION"; break;
    case 4: cout << "3 1 4 2"; break;
    default: {
      int i = 1, cnt = 0;
      while (cnt < n) {
        ++cnt;
        cout << i;
        if (cnt < n)
          cout << " ";
        i += 2;
        if (i > n) {
          i = 2;
        }
      }
    }
  }
  cout << endl;


  return 0;
}
