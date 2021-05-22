class LRUCache:

    def __init__(self, capacity: int):
        self.CAP = capacity 
        self.storage = dict()
        self.used = []
        
    def get(self, key: int) -> int:
        try:
            # print(key, self.storage)
            tmp = self.storage[key]
        except:
            return -1
        self.used.append( self.used.pop( self.used.index(key) ) )
        return tmp

    def put(self, key: int, value: int) -> None:
        if len(self.storage.keys()) == self.CAP and key not in self.storage.keys():
            key_to_replace = self.used[0]
            del self.storage[key_to_replace]
            self.used.pop(0)
        self.storage[key] = value
        try:
            self.used.append( self.used.pop( self.used.index(key) ) )
        except:
            self.used.append(key)
        # print(key, self.used, self.storage)
        


# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)