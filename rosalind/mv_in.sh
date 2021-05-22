for i in $(ls 0**); do a=$(echo $i | sed -E 's/_.*//'); done;
for i in $(ls *rosa*); do mv $i $a$(echo $i | sed -E 's/rosalind//'); done;
