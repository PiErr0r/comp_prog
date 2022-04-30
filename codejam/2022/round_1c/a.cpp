/**
 * Shamelessly stolen from Errichto 
 *  https://github.com/Errichto/youtube/blob/master/atcoder-dp/g.cpp
 *  https://www.youtube.com/c/Errichto/featured
  */


#include "bits/stdc++.h"
using namespace std;
#define TTT template <typename T>
#define sim template < class c
#define ris return * this
#define dor > debug & operator <<
#define eni(x) sim > typename \
  enable_if<sizeof dud<c>(0) x 1, debug&>::type operator<<(c i) {
sim > struct rge { c b, e; };
sim > rge<c> range(c i, c j) { return rge<c>{i, j}; }
sim > auto dud(c* x) -> decltype(cerr << *x, 0);
sim > char dud(...);
struct debug {
#ifdef LOCAL
~debug() { cerr << endl; }
eni(!=) cerr << boolalpha << i; ris; }
eni(==) ris << range(begin(i), end(i)); }
sim, class b dor(pair < b, c > d) {
  ris << "(" << d.first << ", " << d.second << ")";
}
sim dor(rge<c> d) {
  *this << "[";
  for (auto it = d.b; it != d.e; ++it)
    *this << ", " + 2 * (it == d.b) << *it;
  ris << "]";
}
#else
sim dor(const c&) { ris; }
#endif
};
#define imie(...) " [" << #__VA_ARGS__ ": " << (__VA_ARGS__) << "] "

using ll = long long;
const ll mod = 1'000'000'007;
TTT T m_add(T a, T b){ return (a%mod+b%mod)%mod; }
TTT T m_sub(T a, T b){ return ((a-b)%mod+mod)%mod; }
TTT T m_mul(T a, T b){ return ((a%mod)*(b%mod))%mod; }


bool all_equal(string s) {
  char first = s[0];
  bool eq = true;
  for (int i = 1; i < s.length(); ++i) {
    eq = eq && first == s[i];
  }
  return eq;
}

bool is_valid(string T) {
  vector<int> done(26, 0);
  done[T[0] - 'A'] = 1;
  for (int i = 1; i < T.length(); ++i) {
    if (done[T[i] - 'A'] && T[i] != T[i - 1]) {
      return false;
    }
    done[T[i] - 'A'] = 1;
  }
  return true;
}

void solve(void) {
  int N;
  cin >> N;
  vector<string> s(N);
  vector<int> inds(N);

  for (auto &a : s) {
    cin >> a;
  }

  for (int i = 0; i < N; ++i) {
    inds[i] = i;
  }

  do {
    string T = "";
    for (int i = 0; i < N; ++i) {
      T += s[inds[i]];
    }
    if (is_valid(T)) {
      cout << T;
      return;
    }
  } while(next_permutation(inds.begin(), inds.end()));
  cout << "IMPOSSIBLE";
}

void xxsolve(void) {

  int N;
  cin >> N;
  vector<string> s(N);

  for (auto &a : s) {
    cin >> a;
  }

  vector<string> tower;
  tower.push_back(s[0]);
  s.erase(s.begin());
  int ti = 0;
  while (s.size()) {
    bool found = false;
    vector<int> front, back;
    for (int i = 0; i < s.size(); ++i) {
      if (tower[ti][0] == s[i].back()) {
        front.push_back(i);
        //tower[ti] = s[i] + tower[ti];
        //s.erase(s.begin() + i);
        found = true;
        //break;
      }
      if (!found && tower[ti].back() == s[i][0]) {
        back.push_back(i);
        //tower[ti] += s[i];
        //s.erase(s.begin() + i);
        found = true;
        //break;
      }
    }
    int j = 0;
    vector<int> to_del;
    while(front.size() > 1 && j < 2) {
      if (all_equal(s[front[j]])) {
        tower[ti] = s[front[j]] + tower[ti];
        to_del.push_back(front[j]);
        front.erase(front.begin() + j);
      } else {
        ++j;
      }
    }
    if (j >= 2) {
      cout << "IMPOSSIBLE";
      return;
    }
    if (front.size())
      tower[ti] = s[front[0]] + tower[ti];
    j = 0;
    if (j >= 2) {
      cout << "IMPOSSIBLE";
      return;
    }
    if (back.size())
      tower[ti] += s[back[0]];
    while(back.size() > 1 && j < 2) {
      if (all_equal(s[back[j]])) {
        tower[ti] += s[back[j]];
        to_del.push_back(back[j]);
        back.erase(back.begin() + j);
      } else {
        ++j;
      }
    }
    sort(to_del.begin(), to_del.end());
    int di = to_del.size() - 1;
    while (front.size() || back.size() || di >= 0) {
      int fi = front.size() ? front.back() : -1;
      int bi = back.size() ? back.back() : -1;
      int mx = max(fi, bi);
      if (di >= 0)
        mx = max(mx, to_del[di]);
      if (mx != -1 && mx < s.size()) {
        s.erase(s.begin() + mx);
      }
      if (front.size() && mx == fi) {
        front.erase(front.begin() + front.size() - 1);
      }
      if (back.size() && mx == bi) {
        back.erase(back.begin() + back.size() - 1);
      }
      if (di >= 0 && mx == to_del[di]) {
        --di;
      }
    }
    if (!found) {
      tower.push_back(s[0]);
      s.erase(s.begin());
    }
  }
  string T = "";
  for (int i = 0; i < tower.size(); ++i) {
    T += tower[i];
  }
  vector<int> done(26, 0);
  done[T[0] - 'A'] = 1;
  for (int i = 1; i < T.length(); ++i) {
    if (done[T[i] - 'A'] && T[i] != T[i - 1]) {
      cout << "IMPOSSIBLE";
      return;
    }
    done[T[i] - 'A'] = 1;
  }
  cout << T;
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  int T;
  cin >> T;

  for (int i = 1; i <= T; ++i) {
    cout << "Case #" << i << ": ";
    solve();
    cout << endl;
  }

  return 0;
}
