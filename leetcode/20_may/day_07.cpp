/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    map<int, vector<int>> num;
    bool czn = false;
    bool isCousins(TreeNode* root, int x, int y) {
        parseTree(root, 1, x, y);
        return czn;
    }
    void parseTree(TreeNode* root, int k, int x, int y) {
        if (!root) {
            num[k].push_back(-1);
            return;
        }
        if (czn) return;
        int tmp = -1, mem_i = 0;
        if (root->val == y)
            for (int i = 0; i < num[k].size(); ++i) {
                if (num[k][i] == x) {
                    mem_i = i;
                    tmp = num[k][i];
                    break;
                }
            }
        else if (root->val == x)
            for (int i = 0; i < num[k].size(); ++i) {
                if (num[k][i] == y) {
                    mem_i = i;   
                    tmp = num[k][i];
                    break;
                }
            }
        if (tmp != -1 && num[k].size() - mem_i >= (mem_i % 2 == 0 ? 2 : 1)) {   
            czn = true;
            return;
        }
        num[k].push_back(root->val);
        parseTree(root->left, k + 1, x, y);
        parseTree(root->right, k + 1, x, y);
    }
};