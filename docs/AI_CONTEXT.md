# site-template

Template base para novos sites cliente PixelBuild.

## Status: em construção

Este projeto **será reescrito** conforme o novo padrão de `lib-pixelbuild` e o **novo endpoint público** da API.

O código atual ainda usa:
- pacote npm legado **`website-lib`**
- `ConstructorService.fetchWebsiteFromApi` (chama endpoint `/structure` **removido**)
- exports antigos (`MainLayout`, `PageRenderer`, `Loading`)

Trate como referência temporária — **grandes alterações são esperadas**.

## Propósito (alvo)

Shell React mínimo que:
1. Obtém dados do site via **novo** endpoint da API (a definir)
2. Delega renderização à **lib-pixelbuild** refatorada
3. Configura rotas, env e deploy (Vercel)

## Stack atual

- Create React App (`react-scripts`)
- React 18, React Router 6, Bootstrap 5
- Dependência legada: `website-lib` → repo `lib-pixelbuild`
- Deploy: Vercel (`vercel.json`, sitemap, robots)

## Bootstrap atual (`src/App.js`) — legado

```javascript
constructorService.fetchWebsiteFromApi(
  process.env.REACT_APP_WEBSITE_ID,
  process.env.REACT_APP_API
)
```

Esse fluxo depende do endpoint removido — **não usar como base para produção** até a migração.

## Variáveis de ambiente

| Variável | Uso |
|----------|-----|
| `REACT_APP_WEBSITE_ID` | ID do website na API |
| `REACT_APP_API` | Base URL api-pixelbuild |
| `REACT_APP_ENVIRONMENT` | development / production |
| `REACT_APP_GA_TRACKING_ID` | Google Analytics 4 |

## Integrações (futuro)

| Serviço | Uso |
|---------|-----|
| api-pixelbuild | Novo endpoint público (a criar) |
| lib-pixelbuild | Renderização (após refatoração) |

Não chamar fileuploader/sendmail diretamente no template — via lib/API quando aplicável.

## O que fazer nesta fase

- Mudanças pequenas de deploy/env podem ser feitas
- Evitar investir em features sobre o `App.js` legado
- Alinhar com lib + API quando o contrato novo existir

## Docs relacionadas

- [AGENTS.md](AGENTS.md)
- [../lib-pixelbuild/docs/AI_CONTEXT.md](../lib-pixelbuild/docs/AI_CONTEXT.md)
- [../api-pixelbuild/docs/domains/rendering.md](../api-pixelbuild/docs/domains/rendering.md)
