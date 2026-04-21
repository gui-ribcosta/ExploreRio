import re

with open('scripts/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

def add_tipo_passeio(match):
    block = match.group(1)
    if 'tipoPasseio:' not in block:
        # Defaults based on name
        if 'Praia' in block or 'Cabo' in block or 'Búzios' in block or 'Saquarema' in block or 'Angra' in block:
            tp = 'tipoPasseio: ["instagramavel", "gratuito"],\n    '
        elif 'Estádio' in block:
            tp = 'tipoPasseio: ["historico", "instagramavel"],\n    '
        else: # Serra or others
            tp = 'tipoPasseio: ["instagramavel", "romantico"],\n    '
        return block + tp + match.group(2)
    return match.group(0)

content = re.sub(r'({(?:(?!imagem:).)*?)(imagem:\s*".*?")', add_tipo_passeio, content, flags=re.DOTALL)

with open('scripts/data.js', 'w', encoding='utf-8') as f:
    f.write(content)
