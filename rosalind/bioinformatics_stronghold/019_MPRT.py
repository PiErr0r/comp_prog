import requests

TEMPLATE_URL = 'https://rest.uniprot.org/uniprotkb/{}.fasta'

def get_protstr(prot_id):
    url = TEMPLATE_URL.format(prot_id)
    r = requests.get(url)
    S = r.text.split('\n')
    with open('strs', 'a') as f:
        f.write(r.text + '\n')
    S = S[1:]
    return ''.join(S)

# N{P}[ST]{P}.
def check_str(s):
    res = []
    for i in range(len(s) - 3):
        if s[i] == 'N' and s[i+1] != 'P' and s[i+2] in 'ST' and s[i+3] != 'P':
            res.append(i + 1)
    return res

while True:
    prot_id = input()
    if len(prot_id) == 0:
        break
    prot = prot_id[:6]
    protstr = get_protstr(prot)
    motifs = check_str(protstr)
    if len(motifs):
        print(prot_id)
        print(' '.join(list(map(str, motifs))))

