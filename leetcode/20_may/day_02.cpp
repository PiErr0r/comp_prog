class Solution {
public:
    int numJewelsInStones(string J, string S) {
        unordered_map<char, int> um;
        for (char i : J) {
            um[i] = 1;
        }
        int sum = 0;
        for (char i : S) {
            sum += um[i];
        }
        return sum;
    }
};