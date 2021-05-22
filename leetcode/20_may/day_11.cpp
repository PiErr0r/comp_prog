class Solution {
public:
    int oldColor {-1};
    int maxRow {-1};
    int maxCol {-1};
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {
        oldColor = image[sr][sc];
        if (oldColor == newColor)
            return image;
        maxRow = image.size();
        maxCol = image[0].size();
        fill(image, sr, sc, newColor);
        return image;
    }
    void fill(vector<vector<int>>& image, int sr, int sc, int newColor) {
        if (image[sr][sc] != oldColor)
            return;
        image[sr][sc] = newColor;
        if (sr > 0)
            fill(image, sr - 1, sc, newColor);
        if (sr < maxRow - 1) 
            fill(image, sr + 1, sc, newColor);
        if (sc > 0)
            fill(image, sr, sc - 1, newColor);
        if (sc < maxCol - 1)
            fill(image, sr, sc + 1, newColor);
    }
};