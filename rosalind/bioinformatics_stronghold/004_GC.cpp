#include <iomanip>
#include <iostream>
#include <map>

using namespace std;

string getRos(string fasta) {
    string curr = "";
    for (int c = fasta.size() - 4; c < fasta.size(); ++c){
      curr += fasta[c];
    }
    return curr;
}

int main() {
  string fasta;
  string data;
  string ros;
  double max {0};

  string tmp;
  int cnt;
  int size = 0;
  string curr = "";
  while(cin >> tmp) {
    if (tmp[0] == '>') {
      if (curr.size()) {
        double res = (double) 1.0 * cnt / size * 100;
        cout << cnt << " " << size << '\n';
        cout << curr << " " << res << '\n';
        if (res > max) {
          max = res;
          ros = curr;
        }
      }
      cnt = 0;
      size = 0;
      curr = getRos(tmp);
      continue; 
    }
    size += tmp.size();
    for (int i = 0; i < tmp.size(); ++i) {
      if (tmp[i] == 'C' || tmp[i] == 'G') ++cnt;
    }
  }
  cout << "Rosalind_" << ros << '\n'  << setprecision(6) << fixed << max << '\n';
  return 0;
}
