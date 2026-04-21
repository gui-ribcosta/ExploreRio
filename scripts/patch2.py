import re
import json

file_path = 'scripts/data.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. rating missing: we'll add rating: 4.5 before imagem: if missing
def add_rating(match):
    block = match.group(1)
    if 'rating:' not in block:
        return block + 'rating: 4.5,\n    ' + match.group(2)
    return match.group(0)

# We use a pattern to match the whole object content and find where to insert
content = re.sub(r'({(?:(?!imagem:).)*?)(imagem:\s*".*?")', add_rating, content, flags=re.DOTALL)

# 2. duracao: "Xh" -> duracao: X
content = re.sub(r'duracao:\s*"(\d+)h"', r'duracao: \1', content)

# 3. Pedra do Telegrafo regiao: ""
content = re.sub(r'(nome:\s*"Pedra do Telégrafo".*?regiao:\s*)""', r'\1"zona-sul"', content, flags=re.DOTALL)

# 4. Fix categorias
content = content.replace('"regiao-lagos"', '')
content = content.replace('"costa-verde"', '')

# cleanup empty commas in categories
content = re.sub(r'categorias:\s*\[\s*,\s*', r'categorias: [', content)
content = re.sub(r',\s*,\s*', r', ', content)
content = re.sub(r',\s*\]', r']', content)

# Specific replacements for regiao-serrana
content = re.sub(r'nome:\s*"Petrópolis".*?categorias:\s*\[\s*"regiao-serrana"\s*\]', lambda m: m.group(0).replace('"regiao-serrana"', '"cultura", "famosos"'), content, flags=re.DOTALL)
content = re.sub(r'nome:\s*"Teresópolis".*?categorias:\s*\[\s*"regiao-serrana"\s*\]', lambda m: m.group(0).replace('"regiao-serrana"', '"natural"'), content, flags=re.DOTALL)
content = re.sub(r'nome:\s*"Nova Friburgo".*?categorias:\s*\[\s*"regiao-serrana"\s*\]', lambda m: m.group(0).replace('"regiao-serrana"', '"natural"'), content, flags=re.DOTALL)
content = re.sub(r'nome:\s*"Visconde de Mauá".*?categorias:\s*\[\s*"regiao-serrana"\s*\]', lambda m: m.group(0).replace('"regiao-serrana"', '"natural"'), content, flags=re.DOTALL)

# If any other regiao-serrana is there, remove it
content = content.replace('"regiao-serrana"', '')
content = re.sub(r'categorias:\s*\[\s*,\s*', r'categorias: [', content)
content = re.sub(r',\s*\]', r']', content)

# Also fix the empty categories issue if any
# Let's ensure Paraty and Ilha Grande have valid categories
content = re.sub(r'(nome:\s*"Ilha Grande".*?categorias:\s*\[\s*"famosos"\s*)\]', r'\1, "praias"]', content, flags=re.DOTALL)
content = re.sub(r'(nome:\s*"Centro Histórico de Paraty".*?categorias:\s*\[\s*"famosos"\s*)\]', r'\1, "cultura"]', content, flags=re.DOTALL)

# 5. Ilha de Paquetá periodo
content = re.sub(r'(nome:\s*"Ilha de Paquetá".*?periodo:\s*)"dia"', r'\1"dia-inteiro"', content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
