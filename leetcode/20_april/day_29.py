# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def __init__(self):
        self.maxSum = -999999999999
    def maxPathSum(self, root: TreeNode) -> int:
        self.calc_max(root)
        return self.maxSum
    
    def calc_max(self, root: TreeNode) -> int:
        if root is None:
            return -987123
        curr_sum = root_val = root.val
        tmp_left = self.calc_max(root.left)
        tmp_rght = self.calc_max(root.right)
        curr_sum += tmp_left if tmp_left != -987123 else 0
        curr_sum += tmp_rght if tmp_rght != -987123 else 0

        lft_root = root_val + tmp_left if tmp_left != -987123 else root_val
        rht_root = root_val + tmp_rght if tmp_rght != -987123 else root_val

        if tmp_left != -987123: 
            if tmp_left > self.maxSum:
                self.maxSum = tmp_left
            if lft_root > self.maxSum:
                self.maxSum = lft_root

        if tmp_rght != -987123:
            if tmp_rght > self.maxSum:
                self.maxSum = tmp_rght
            if rht_root > self.maxSum:
                self.maxSum = rht_root

        if root_val > self.maxSum:
            self.maxSum = root_val

        if curr_sum > self.maxSum:
            self.maxSum = curr_sum
        
        return max(rht_root, lft_root, root_val) 