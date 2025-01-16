#include <iostream>
#include <unordered_map>
#include <string>

using namespace std;

unordered_map<string, string> read_fasta() {
	string fasta = "", tmp, curr;
	unordered_map<string, string> res;
	while (cin >> tmp) {
		if (tmp[0] == '>') {
			if (fasta.size()) {
				res[curr] = fasta;
				fasta = "";
			}
			curr = tmp.substr(1);
			continue;
		}
		fasta += tmp;
	}
	res[curr] = fasta;
	return res;
}

unordered_map<string, string> codon_table = {
	{"UUU", "F"},      {"CUU", "L"}, {"AUU", "I"}, {"GUU", "V"},
	{"UUC", "F"},      {"CUC", "L"}, {"AUC", "I"}, {"GUC", "V"},
	{"UUA", "L"},      {"CUA", "L"}, {"AUA", "I"}, {"GUA", "V"},
	{"UUG", "L"},      {"CUG", "L"}, {"AUG", "M"}, {"GUG", "V"},
	{"UCU", "S"},      {"CCU", "P"}, {"ACU", "T"}, {"GCU", "A"},
	{"UCC", "S"},      {"CCC", "P"}, {"ACC", "T"}, {"GCC", "A"},
	{"UCA", "S"},      {"CCA", "P"}, {"ACA", "T"}, {"GCA", "A"},
	{"UCG", "S"},      {"CCG", "P"}, {"ACG", "T"}, {"GCG", "A"},
	{"UAU", "Y"},      {"CAU", "H"}, {"AAU", "N"}, {"GAU", "D"},
	{"UAC", "Y"},      {"CAC", "H"}, {"AAC", "N"}, {"GAC", "D"},
	{"UAA", "Stop"},   {"CAA", "Q"}, {"AAA", "K"}, {"GAA", "E"},
	{"UAG", "Stop"},   {"CAG", "Q"}, {"AAG", "K"}, {"GAG", "E"},
	{"UGU", "C"},      {"CGU", "R"}, {"AGU", "S"}, {"GGU", "G"},
	{"UGC", "C"},      {"CGC", "R"}, {"AGC", "S"}, {"GGC", "G"},
	{"UGA", "Stop"},   {"CGA", "R"}, {"AGA", "R"}, {"GGA", "G"},
	{"UGG", "W"},      {"CGG", "R"}, {"AGG", "R"}, {"GGG", "G"}
};

map<char, char> dna_map = {
  {'A', 'T'},
  {'T', 'A'},
  {'C', 'G'},
  {'G', 'C'}
};