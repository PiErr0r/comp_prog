class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int major = nums.size() / 2;
        unordered_map<int, int> um;
        for (auto i: nums) {
            if (++um[i] > major) 
                return i;
        }
        return -1;
    }
};


/*
Fast solution

class Solution {
public:
    int majorityElement(vector<int>& nums) {
        ios_base::sync_with_stdio(false), cin.tie(NULL), cout.tie(NULL);
        int ans = 0, count = 0;
        for(auto& num : nums){
            if(count == 0){
                ans = num; count = 1;
            }else{
                count += (ans == num) ? 1 : -1;
            }
        }
        return ans;
    }
};
*/