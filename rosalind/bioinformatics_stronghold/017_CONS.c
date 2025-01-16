#include <stdio.h>
#define M 1100


int indexOf(char* a, char b) {
  int i = 0;
  while (i < 4) {
    if (*(a + i) == b) return i;
    ++i;
  }
  return -1;
}

int main() {
  char a[4] = "ACGT";
  char s[M], tmp[M], cosensus[M];
  int i, j = 0, index;
  int res[4][M] = {0};
  int max = 0;
  
  while( gets(tmp) != NULL ) {
    if (tmp[0] == '>') {
      j = 0;
      continue;
    }
    puts(s);
    printf("%d\n", j);
    for (i = 0; i < M; ++i) {
      s[i] = tmp[i];
    }
    for (i = 0; i < M && s[i] != '\0'; ++i, ++j) {
      index = indexOf(a, s[i]);
      res[index][j]++;
    }
    if (max < j) max = j;
  }
  
  for (i = 0; i < max; ++i) {
    index = 0;
    for (j = 0; j < 4; ++j) {
      if (res[j][i] > res[index][i]) index = j;
    }
    printf("%c", a[index]);
  }
  printf("\n");

  for (i = 0; i < 4; ++i) {
    printf("%c: ", a[i]);
    for (j = 0; j < max; ++j) {
      printf("%d ", res[i][j]);
    }
    printf("\n");
  }

  return 0;
}
