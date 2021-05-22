#include <iostream>
#include <string>
using namespace std;

int main(){
  string dna;
  cin >> dna;
  string rna = "";

  for (string::iterator c=dna.begin(); c != dna.end(); ++c) {
    if (*c == 'T') {
      rna += "U";
    } else {
      rna += *c;
    }
  }
  cout << rna;
  return 0;
}
