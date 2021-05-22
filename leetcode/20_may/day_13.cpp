class Solution {
public:
    string removeKdigits(string num, int k) {
        if (num.length() == k) 
            return "0";
        if (k == 0)
            return num;
        string ret;
        buildNum(num, k, ret);
        int i {0};
        while (ret[i] == '0') ++i;
        ret = ret.substr(i, ret.length());
        return ret.length() == 0 ? "0" : ret;

    }
    void buildNum(string num, int n, string& res) {
        if (n <= 0) {
            res.append(num);
            return;
        }
        
        int len = num.length();
        if (n >= len)
            return;
        
        int minIndex = 0; 
        for (int i = 1; i<=n ; i++) 
            if (num[i] < num[minIndex]) 
                minIndex = i; 
        res.push_back(num[minIndex]); 

        // substring starting from minIndex+1 to str.length() - 1. 
        string new_str = num.substr(minIndex+1, len-1); 

        // Recur for the above substring and n equals to n-minIndex 
        buildNum(new_str, n-minIndex, res); 
    }
};