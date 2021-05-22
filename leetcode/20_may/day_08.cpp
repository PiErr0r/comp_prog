class Solution {
public:
    bool checkStraightLine(vector<vector<int>>& coordinates) {
        if (coordinates.size() == 2) 
            return true;
        vector<int> first {coordinates[0]};
        vector<int> last {coordinates[ coordinates.size() - 1 ]};
        // y = kx + l
        double k = 1.0 * (last[1] - first[1]) / (last[0] - first[0]);
        double l = -1.0 * k * first[0] + first[1];
        
        for (int i = 1; i < coordinates.size() - 1; ++i) {
            if (coordinates[i][1] != k * coordinates[i][0] + l) 
                return false;
        }
        
        return true;
    }
};