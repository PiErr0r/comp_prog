class Solution {
public:
    bool canConstruct(string ransomNote, string magazine) {
        unordered_map<char, int> um;
        for (char c : magazine) {
            um[c]++;
        }
        for (char c : ransomNote) {
            if (--um[c] < 0) 
                return false;
        }
        return true;
    }
};