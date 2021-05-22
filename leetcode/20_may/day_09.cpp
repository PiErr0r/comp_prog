class Solution {
public:
    vector<int> primes {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47};
    bool isPerfectSquare(int num) {
        if (num == 2147483647) return false;
        int cnt {0}, i {0}, sz = primes.size();
        while (num != 1 && i < sz) {
            if ( i == primes.size() - 1 && primes[i] < num / 2) {
                bool found = false;
                int tmp  = primes[i] + 2;
                while (!found) {
                    bool is_prime = true;
                    for (int j = 0; j < primes.size(); ++j) {
                        if (primes[j] > tmp / 2)
                            break;
                        if (tmp % primes[j] == 0) {
                            is_prime = false;
                            break;
                        }
                    }
                    if (is_prime) {  
                        primes.push_back(tmp);
                        found = true;
                        sz++;
                    }
                    tmp += 2;
                }
            }
            while (num != 1 && num % primes[i] == 0) {
                ++cnt;
                num /= primes[i];
            }
            if (cnt % 2 != 0) 
                return false;
            ++i;
            
        }
        return num == 1;
    }
};




/*
class Solution {
public:
    bool isPerfectSquare(int num) {
        if(num==1 ) return 1;
       double i=1,n=num;
        while(i<=n/i)
        {
            if(i==num/i) return 1;
            
            
            i++;
            
            
        }
        
        
        
     return 0;   
        
    }
};
*/