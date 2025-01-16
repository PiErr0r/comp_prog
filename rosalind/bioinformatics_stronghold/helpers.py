def read_fasta(result = 'map'):
    fasta = ''
    curr = None
    res_map = {}
    res_list = []
    while True:
        tmp = input()
        if len(tmp) == 0:
            break
        if tmp[0] == '>':
            if len(fasta):
                res_map[curr] = fasta
                res_list.append(fasta)
                fasta = ''
            curr = tmp[1:]
            continue
        fasta += tmp
    res_map[curr] = fasta
    res_list.append(fasta)
    return res_map if result == 'map' else res_list

codon_table = {
'UUU': 'F',
'CUU': 'L',
'AUU': 'I',
'GUU': 'V',
'UUC': 'F',
'CUC': 'L',
'AUC': 'I',
'GUC': 'V',
'UUA': 'L',
'CUA': 'L',
'AUA': 'I',
'GUA': 'V',
'UUG': 'L',
'CUG': 'L',
'AUG': 'M',
'GUG': 'V',
'UCU': 'S',
'CCU': 'P',
'ACU': 'T',
'GCU': 'A',
'UCC': 'S',
'CCC': 'P',
'ACC': 'T',
'GCC': 'A',
'UCA': 'S',
'CCA': 'P',
'ACA': 'T',
'GCA': 'A',
'UCG': 'S',
'CCG': 'P',
'ACG': 'T',
'GCG': 'A',
'UAU': 'Y',
'CAU': 'H',
'AAU': 'N',
'GAU': 'D',
'UAC': 'Y',
'CAC': 'H',
'AAC': 'N',
'GAC': 'D',
'UAA': 'Stop',
'CAA': 'Q',
'AAA': 'K',
'GAA': 'E',
'UAG': 'Stop',
'CAG': 'Q',
'AAG': 'K',
'GAG': 'E',
'UGU': 'C',
'CGU': 'R',
'AGU': 'S',
'GGU': 'G',
'UGC': 'C',
'CGC': 'R',
'AGC': 'S',
'GGC': 'G',
'UGA': 'Stop',
'CGA': 'R',
'AGA': 'R',
'GGA': 'G',
'UGG': 'W',
'CGG': 'R',
'AGG': 'R',
'GGG': 'G',
}
