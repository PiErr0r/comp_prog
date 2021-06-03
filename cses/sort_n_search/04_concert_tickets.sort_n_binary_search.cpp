/**
 * Shamelessly stolen from Errichto 
 *  https://github.com/Errichto/youtube/blob/master/atcoder-dp/g.cpp
 *  https://www.youtube.com/c/Errichto/featured
  */
 
 
#include "bits/stdc++.h"
using namespace std;
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
 
int find_price(vector<pair<int,int>>& a, int p, int L) {
  int R = a.size() - 1;
  int i = -1, mid;
  while (L <= R) {
    mid = L + (R - L) / 2;
    if (a[mid].first > p) {
      R = mid - 1;
    } else {
      if (a[mid].second) {
        i = mid;
      } else {
        int j = mid;
        while (j >= L) {
          if (a[j].second) {
            i = j;
            break;
          }
          --j;
        }
      }
      L = mid + 1;
    }
  }
  return i;
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);
  int n, m;
  cin >> n >> m;
  vector<int> tickets(n);
  pair<int, int> mn {INT_MAX, 0};
  int mx = 0;
  for (int &i : tickets) {
    cin >> i;
    if (i == mn.first) {
      ++mn.second;
    }
    else if (i < mn.first) {
      mn = make_pair(i, 1);
    }
  }
  int left = 0;
  sort(tickets.begin(), tickets.end());
  vector<pair<int,int>> t;
  int prev = -1;
  for (int i = 0; i < n; ++ i) {
    if (prev == -1) {
      prev = tickets[i];
      t.push_back(make_pair(prev, 1));
      continue;
    }
    if (tickets[i] == prev) {
      t.back().second++;
    } else {
      prev = tickets[i];
      t.push_back(make_pair(prev, 1));
    }
  }
 
  int c, index;
  for (int i = 0; i < m; ++i) {
    cin >> c;
    if (c >= mx) {
      index = -1;
    } else {
      index = find_price(t, c, left);
    }
    if (index == -1) {
      cout << index << endl;
      if (c > mx) {
        mx = c;
      }
    } else {
      cout << t[index].first << endl;
      t[index].second--;
      if (t[index].second == 0) {
        swap(t[index], t[left]);
        ++left;
        sort(t.begin() + left, t.begin() + index);
      }
    }
  }
 
  return 0;
}
