// The API isBadVersion is defined for you.
// bool isBadVersion(int version);

class Solution {
public:
    int firstBadVersion(int n) {
        unsigned long long int low {0}, high = n;
        unsigned long long int mid {0};
        while (high > low) {
            mid = (low + high) / 2;
            if (isBadVersion(mid)) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return isBadVersion(mid) ? mid : mid + 1;
    }
};