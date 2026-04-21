import re

file_path = 'scripts/data.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

updates = {
    'Praia da Joatinga': 'preco: 0',
    'Praia Vermelha': 'preco: 0',
    'Praia de Grumari': 'preco: 0',
    'Estádio Nilton Santos': 'preco: 80',
    'Rampa Pedra Bonita': 'preco: 0',
    'Cabo Frio': 'preco: 0',
    'Arraial do Cabo': 'preco: 0',
    'Búzios': 'preco: 0',
    'Saquarema': 'preco: 0',
    'Petrópolis': 'preco: 0',
    'Teresópolis': 'preco: 0',
    'Nova Friburgo': 'preco: 0',
    'Visconde de Mauá': 'preco: 0'
}

for name, price_str in updates.items():
    pattern = r'(nome:\s*"' + re.escape(name) + r'",\s*.*?)(imagem:\s*".*?")'
    def replacer(match):
        block = match.group(1)
        if 'preco:' not in block:
            return block + price_str + ',\n    ' + match.group(2)
        return match.group(0)

    content = re.sub(pattern, replacer, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
