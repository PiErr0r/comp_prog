# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution(object):
    
    def __init__(self):
        self.maxi = 0
    
    
    def diameterOfBinaryTree(self, root):
        if root is None:
            return 0
        left_len = right_len = 0
        if root.left is not None:
            left_len = self.calc_len(root.left)
        if root.right is not None:
            right_len = self.calc_len(root.right)
        
        if left_len + right_len > self.maxi:
            return left_len + right_len
        else: return self.maxi
            
    
    def calc_len(self, node):
        # subDiam = self.diameterOfBinaryTree(node)
        # if subDiam > self.maxi:
        #     self.maxi = subDiam
        left_len = 0 if node.left is None else self.calc_len(node.left)
        right_len = 0 if node.right is None else self.calc_len(node.right)
        if left_len + right_len > self.maxi:
            self.maxi = left_len + right_len
        return 1 + max( left_len, right_len )
            
        
        """
        :type root: TreeNode
        :rtype: int
        """
        