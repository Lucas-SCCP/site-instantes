# Regras para IA

## Status

**site-template está em construção** — alinhado à refatoração de lib-pixelbuild e ao novo endpoint da API.

Antes de implementar:
1. Leia [AI_CONTEXT.md](AI_CONTEXT.md) e [lib-pixelbuild/docs/AI_CONTEXT.md](../lib-pixelbuild/docs/AI_CONTEXT.md)
2. Não expandir o fluxo legado `fetchWebsiteFromApi` / `/structure`

Regras:
- Customizações mínimas até o novo padrão existir
- Não copiar `PageRenderer`/factories da lib para o template
- Usar `REACT_APP_*` (CRA)
- Novo desenvolvimento de site cliente: esperar contrato API + lib estáveis
