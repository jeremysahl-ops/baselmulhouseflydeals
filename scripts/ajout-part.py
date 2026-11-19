# Enregistre lib/itineraries/partN.ts (et de/, en/) dans les fichiers index. Usage : python scripts/ajout-part.py 6
import sys
n = int(sys.argv[1]); p = n - 1
def edit(path, pairs):
    s = open(path, encoding='utf-8').read(); crlf = '\r\n' in s; s = s.replace('\r\n', '\n')
    for a, b in pairs:
        assert s.count(a) == 1, (path, a); s = s.replace(a, b)
    if crlf: s = s.replace('\n', '\r\n')
    open(path, 'w', encoding='utf-8', newline='').write(s)
for d, pre in [('lib/itineraries/index.ts', ''), ('lib/itineraries/de/index.ts', 'DE_'), ('lib/itineraries/en/index.ts', 'EN_')]:
    edit(d, [(f"import {{ {pre}PART{p} }} from './part{p}';", f"import {{ {pre}PART{p} }} from './part{p}';\nimport {{ {pre}PART{n} }} from './part{n}';"),
             (f"...{pre}PART{p} }}", f"...{pre}PART{p}, ...{pre}PART{n} }}")])
print('part', n, 'enregistré')
