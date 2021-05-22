class Solution {
public:
    int findComplement(int num) {
        int cnt {0}, tmp {num};
        while (tmp > 0) {
            tmp >>= 1;
            cnt++;
        }
        
        cnt = pow(2, cnt) - 1;
        return cnt ^ num;
        
    }
};