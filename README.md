# SpherePod

Player pessoal de áudio e vídeo, com interface inspirada em um music player clássico.

## O que está incluído

- Tela responsiva com moldura escura, capa e roda de controle dimensionadas para caber na viewport e respeitar as áreas seguras, sem notch fictício.
- Identidade visual monocromática: destaques e controles usam preto e branco nos temas claro e escuro.
- Ícone SpherePod configurado para a tela inicial do iPhone e no manifesto web; no Safari, use **Compartilhar → Adicionar à Tela de Início**.
- Tela de abertura exibida uma vez por navegador/dispositivo, com aceite dos termos e ações separadas para autorizar localização e escolher músicas.
- Tela de descanso dentro da tela do iPod, com relógio, data e foto escolhida em **Configurações**; a foto fica salva localmente no IndexedDB. O modo ativa automaticamente e sai com um toque/clique em qualquer ponto, sem botão de saída.
- O modo de descanso aparece alguns segundos após abrir o app ou mudar a orientação, mas não cobre áudio ou vídeo em reprodução. Para ativar ao carregar na horizontal sobre uma superfície plana, permita a detecção de superfície em **Configurações**; essa detecção também depende do sensor e da Battery API do navegador.
- O app só solicita acesso à localização depois do usuário tocar em **Autorizar localização e GPS**. Com autorização, consulta a previsão atual na Open-Meteo usando as coordenadas; não guarda a localização. A ação pode ser repetida em **Configurações**.
- Horário usa o relógio local do sistema, sem permissão específica. A Battery API também não oferece um prompt de permissão; o app consulta o estado no início quando o navegador dá suporte.
- Moldura sem notch; mostra somente o ícone de bateria quando o navegador oferece a Battery API. O ícone fica verde enquanto carrega e branco quando não está carregando.
- Capas de áudio preenchem a tela com recorte proporcional, sem deformação, sobre um fundo suavemente desfocado; controles da roda centralizados para toque.
- Movimento visual da capa limitado a zoom suave e lento ou flutuação em camadas, com opção para desativar; movimentos são reduzidos quando o sistema pede menos animações.
- Identidade SpherePod; wordmark e ações da capa desaparecem após inatividade.
- Biblioteca e configurações acessíveis diretamente pela capa.
- Fundo de vidro fosco atrás das informações da faixa.
- Importação local de áudio para biblioteca persistente no navegador (IndexedDB). Os arquivos escolhidos são copiados para o armazenamento local e reproduzidos de lá, sem depender de conexão depois de importados.
- Cache do app shell via service worker para reabrir o player sem rede após a primeira visita online. No iPhone, use **Adicionar à Tela de Início** e abra o SpherePod instalado para melhor suporte offline.
- Capas animadas GIF/WebP e vídeos MP4/WebM podem ser importados por faixa nas configurações; ficam salvos localmente e a capa original pode ser restaurada.
- Para capas animadas da Apple Music, use a ferramenta comunitária [applemusic.aritra.ovh](https://applemusic.aritra.ovh/) com URLs de músicas, álbuns, playlists ou artistas e selecione o arquivo baixado em **Configurações → Definir capa animada**. A interface informa que playlists podem ser baixadas como ZIP; extraia o arquivo e importe a animação desejada por faixa. O SpherePod não envia sua biblioteca para esse serviço.
- O SpherePod ainda não sincroniza automaticamente com a Apple Music ou com essa ferramenta, nem importa um catálogo/ZIP em lote. Não há uma lista incorporada de artistas, álbuns ou músicas populares; cada animação importada fica associada somente à faixa escolhida.
- Vídeos importados abrem dentro do visor do iPod (também no Cover Flow paisagem), com controles nativos e botão de tela cheia. O app pede orientação paisagem em navegadores compatíveis e usa uma apresentação girada como fallback quando o bloqueio não funciona.
- Transmissor por URL: aceita links diretos e tenta localizar referências de vídeo em páginas cujo servidor permita CORS.
- Normalização de títulos adaptada da função de catálogo usada em `valdo4-20/sphere-pages` (`assets/catalog-wMABDUUZ.js`).
- Notificação de conexão/desconexão de fones quando o navegador expõe mudanças de dispositivos de áudio e seus nomes.

## Limitações técnicas transparentes

- O navegador só reproduz codecs/formats que o dispositivo e o navegador suportam. A extensão do arquivo, sozinha, não garante compatibilidade.
- A tela cheia e o bloqueio de orientação variam por navegador: `screen.orientation.lock()` não é suportado por todos; alguns iPhones usam o reprodutor nativo do Safari, cuja rotação depende do iOS e do bloqueio de orientação do aparelho.
- As faixas e capas importadas ficam no IndexedDB deste navegador e deste dispositivo; a persistência pode depender da cota disponível e das políticas de armazenamento do navegador, e não há sincronização entre dispositivos.
- O uso offline exige abrir o app online pelo menos uma vez para instalar o cache do service worker e importar os arquivos desejados. A cota do navegador pode limitar ou remover dados locais; manter o armazenamento persistente também depende do navegador/sistema.
- A localização exige HTTPS ou localhost e autorização do usuário. O navegador não oferece uma permissão separada para clima: ao aceitar e tocar em **Autorizar localização e GPS**, as coordenadas aproximadas autorizadas são enviadas à Open-Meteo para obter a previsão. O app não salva as coordenadas.
- O SpherePod não usa cookies de publicidade; guarda preferências no armazenamento local e mídia escolhida no IndexedDB. A fonte pode ser carregada do Google Fonts quando há internet.
- Modo de descanso automático, estado de carregamento e detecção de fones variam por navegador. A Battery API e a lista/eventos de dispositivos de áudio têm suporte limitado; uma página web não consegue garantir a detecção de que o aparelho está apoiado numa superfície plana nem manter o modo ativo após o navegador ser suspenso.
- Para adicionar no iPhone, abra o site publicado no Safari e escolha **Compartilhar → Adicionar à Tela de Início**. O ícone configurado não instala o app sozinho; o iOS exige essa ação do usuário.
- A varredura de páginas externas é limitada por CORS, autenticação, DRM e players que constroem streams via JavaScript. Para cobrir sites arbitrários com confiabilidade, é necessário adicionar um backend de extração/proxy seguro; este repositório ainda não contém esse serviço.
- Links HLS/DASH podem depender de suporte nativo ou de uma camada de reprodução específica do navegador.

## Publicação

O site é estático e usa `index.html` na raiz. O workflow em `.github/workflows/pages.yml` publica a raiz no GitHub Pages quando o Pages estiver configurado para GitHub Actions.

## Desenvolvimento

Não há etapa de build nem dependências de JavaScript: abra `index.html` em um servidor estático. A fonte Inter do Sphere usa Google Fonts quando há conexão; o sistema usa sua fonte padrão como fallback. Para testar APIs de armazenamento e mídia, prefira localhost ou HTTPS em vez de abrir como `file://`.
