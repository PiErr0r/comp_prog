# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def __init__(self):
        self.arr = []
        self.found = False
    def isValidSequence(self, root: TreeNode, arr: List[int]) -> bool:
        self.arr = ''.join(map(str, arr))
        self.find_arr(root, '')
        return self.found
    
    def find_arr(self, root, curr):
        if self.found:
            return
        curr += str(root.val)
        left = right = ''
        if root.left is not None:
            self.find_arr(root.left, curr)
        if root.right is not None:
            self.find_arr(root.right, curr)
        if root.left is None and root.right is None:
            if curr == self.arr:
                self.found = True
                return 