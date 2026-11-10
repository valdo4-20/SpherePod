# SpherePod

Player pessoal de áudio e vídeo, com interface inspirada em um music player clássico.

## O que está incluído

- Tela responsiva com capa e roda de controle dimensionadas para caber na viewport, incluindo áreas seguras de iPhone.
- Identidade SpherePod; wordmark e ações da capa desaparecem após inatividade.
- Biblioteca e configurações acessíveis diretamente pela capa.
- Fundo de vidro fosco atrás das informações da faixa.
- Importação local de áudio para biblioteca persistente no navegador (IndexedDB).
- Reprodução de vídeo local em tela dedicada, com controles nativos e solicitação de tela cheia.
- Transmissor por URL: aceita links diretos e tenta localizar referências de vídeo em páginas cujo servidor permita CORS.
- Normalização de títulos adaptada da função de catálogo usada em `valdo4-20/sphere-pages` (`assets/catalog-wMABDUUZ.js`).

## Limitações técnicas transparentes

- O navegador só reproduz codecs/formats que o dispositivo e o navegador suportam. A extensão do arquivo, sozinha, não garante compatibilidade.
- A varredura de páginas externas é limitada por CORS, autenticação, DRM e players que constroem streams via JavaScript. Para cobrir sites arbitrários com confiabilidade, é necessário adicionar um backend de extração/proxy seguro; este repositório ainda não contém esse serviço.
- Links HLS/DASH podem depender de suporte nativo ou de uma camada de reprodução específica do navegador.

## Publicação

O site é estático e usa `index.html` na raiz. O workflow em `.github/workflows/pages.yml` publica a raiz no GitHub Pages quando o Pages estiver configurado para GitHub Actions.

## Desenvolvimento

Não há etapa de build nem dependências externas: abra `index.html` em um servidor estático. Para testar APIs de armazenamento e mídia, prefira localhost ou HTTPS em vez de abrir como `file://`.
