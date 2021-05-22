  def countElements(self, arr: List[int]) -> int:
      # cnt_total = 0
      # cnt = 1
      # L = len(arr)
      # new_arr = sorted(arr)
      
      # for i in range(L - 1):
      #     if new_arr[i] == new_arr[i + 1]:
      #         cnt += 1
      #     else:
      #         if new_arr[i] == new_arr[i + 1] - 1:
      #             cnt_total += cnt
      #         cnt = 1
      cnt_total = 0    
      arrS = set(arr)
      for i in arr:
          if i + 1 in arrS:
              cnt_total += 1
      return cnt_total