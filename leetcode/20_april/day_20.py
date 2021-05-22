# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def bstFromPreorder(self, preorder: List[int]) -> TreeNode:
        if len(preorder) == 0: return None
        elif len(preorder) == 1: return TreeNode(preorder[0])
        
        root = TreeNode(preorder[0])
        left = 1
        right = 0
        for i in range(1, len(preorder)):
            if preorder[i] > root.val:
                right = i
                break
        if right == 0:
            root.left = self.bstFromPreorder(preorder[1:])
        elif left == right:
            root.right = self.bstFromPreorder(preorder[1:])
        else:
            root.left = self.bstFromPreorder(preorder[left:right])
            root.right = self.bstFromPreorder(preorder[right:])
        return root
            
            