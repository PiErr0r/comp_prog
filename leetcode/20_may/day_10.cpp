struct Person {
    set<int> trusts;
    set<int> is_trusted_by;
};

class Solution {
public:
    map<int, Person> ppl;
    int findJudge(int N, vector<vector<int>>& trust) {
        if (trust.size() == 0)
            return 1;
        for(auto v : trust) {
            ppl[ v[0] ].trusts.insert(v[1]);
            ppl[ v[1] ].is_trusted_by.insert(v[0]);
        }
        for (auto v : ppl) {
            if (v.second.trusts.size() == 0 && v.second.is_trusted_by.size() == N - 1)
                return v.first;
        }
        return -1;
    }
};