import re

with open('scripts/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

items = text.split('{')
for item in items[1:]:
    if 'nome:' in item and 'tipoPasseio:' not in item:
        match = re.search(r'nome:\s*"([^"]+)"', item)
        if match:
            print(match.group(1))
