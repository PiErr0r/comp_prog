#include "./helpers.hpp"
#include "bits/stdc++.h"

using namespace std;

int main(void) {

  unordered_map<string, string> fasta = read_fasta();
  unordered_map<string, vector<string>> endswith;
  unordered_map<string, vector<string>> adj;

  for(auto it : fasta){
    string tmp = it.second.substr(it.second.length() - 3);
    if (endswith.find(tmp) == endswith.end()) {
      endswith[tmp] = vector<string>();
    }
    endswith[tmp].push_back(it.first);
  }

  for (auto it : fasta) {
    string tmp = it.second.substr(0, 3);
    if (endswith.find(tmp) == endswith.end()) {
      continue;
    }
    if (adj.find(it.first) == adj.end()) {
      adj[it.first] = vector<string>();
    }

    for (auto s : endswith[tmp]) {
      if (s != it.first) {
        adj[it.first].push_back(s);
      }
    }
  }

  for (auto it : adj) {
    for (auto s : it.second) {
      cout << s << " " << it.first << endl;
    }
  }

  return 0;
}
