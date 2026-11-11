# SpherePod

Player pessoal de áudio e vídeo, com interface inspirada em um music player clássico.

## O que está incluído

- Interface fixa em tela cheia, sem notch nem carcaça de iPod; a tela e o painel de controles são separados por uma faixa escura, com cantos arredondados apenas no encontro entre ambos.
- Identidade visual monocromática: destaques e controles usam preto e branco nos temas claro e escuro.
- As Configurações permitem escolher entre seis cores para o painel e a roda do iPod: prata, azul-petróleo, rosa, dourado, verde e grafite; a preferência fica salva neste navegador.
- Temporizador para pausar a música após 15 minutos, 30 minutos ou 1 hora; também pode ser cancelado em Configurações.
- Novos ícones SpherePod glossy no iPhone e no manifesto web, com variante chapada para favicon. No Safari, use **Compartilhar → Adicionar à Tela de Início**; se já instalou antes, remova o atalho antigo e adicione novamente para atualizar o ícone.
- No iPhone/iPad, o app usa reprodução nativa de áudio em vez de Web Audio, permitindo que formatos compatíveis continuem tocando com a tela bloqueada ou fora do app. A tela Bloqueada e a Central de Controle recebem título, artista, capa e comandos de play/pause, faixa anterior/próxima e busca quando o iOS oferece Media Session. Para testar, instale pela opção **Adicionar à Tela de Início**, inicie uma faixa e bloqueie o aparelho; a continuidade depende do iOS, do formato e das políticas de energia.
- Tela de abertura exibida uma vez por navegador/dispositivo, com aceite dos termos e opção para escolher músicas.
- Tela de descanso limitada à área visual arredondada do player, com animações de óleo sonoro, ouro, prata ou espectro iridescente, relógio, data e clima atual. Ela aparece após 60 segundos sem interação, reage às frequências do áudio e não cobre os controles; toque/clique retorna ao player. O clima é ativado em Configurações e requer permissão de localização.
- Horário e bateria aparecem somente na orientação horizontal; a bateria depende do suporte à Battery API do navegador.
- A interface não simula notch nem carcaça externa: o site inteiro é o player. Capas de áudio são exibidas por inteiro, sem deformação ou corte, sobre um fundo da própria arte suavemente desfocado que preenche a tela; a roda fica no painel separado por uma faixa escura.
- Movimento visual da capa limitado a zoom suave e lento ou flutuação em camadas, com opção para desativar; movimentos são reduzidos quando o sistema pede menos animações.
- Fonte Botanic Grotesque carregada dos arquivos locais do projeto. Identidade SpherePod; wordmark e ações da capa desaparecem após inatividade.
- Biblioteca e configurações acessíveis diretamente pela capa.
- Fundo de vidro fosco atrás das informações da faixa.
- Importação local de áudio para biblioteca persistente no navegador (IndexedDB). Os arquivos escolhidos são copiados para o armazenamento local e reproduzidos de lá, sem depender de conexão depois de importados.
- Importação de pastas de músicas pela biblioteca, pelas configurações ou na tela de boas-vindas; o SpherePod procura arquivos de áudio compatíveis na pasta e em suas subpastas.
- Cache do app shell via service worker para reabrir o player sem rede após a primeira visita online. No iPhone, use **Adicionar à Tela de Início** e abra o SpherePod instalado para melhor suporte offline.
- Vídeos importados aparecem na tela principal do iPod, com controles de reprodução, saltos de −10/+10 segundos, logo branca no canto superior esquerdo e título que desaparecem junto com os controles após alguns segundos. Um toque em tela cheia alterna a visibilidade da interface; o botão permite entrar ou sair desse modo. A roda permanece na interface normal e some durante a tela cheia. O app pede orientação paisagem em navegadores compatíveis e usa uma apresentação girada como fallback quando o bloqueio não funciona.
- Transmissor por URL: aceita links diretos e tenta localizar referências de vídeo em páginas cujo servidor permita CORS; o diálogo mantém as ações acessíveis em telas estreitas.
- Normalização de títulos adaptada da função de catálogo usada em `valdo4-20/sphere-pages` (`assets/catalog-wMABDUUZ.js`).
- Notificação de conexão/desconexão de fones quando o navegador expõe mudanças de dispositivos de áudio e seus nomes.

## Limitações técnicas transparentes

- O navegador só reproduz codecs/formats que o dispositivo e o navegador suportam. A extensão do arquivo, sozinha, não garante compatibilidade.
- A tela cheia e o bloqueio de orientação variam por navegador: `screen.orientation.lock()` não é suportado por todos; alguns iPhones usam o reprodutor nativo do Safari, cuja rotação depende do iOS e do bloqueio de orientação do aparelho.
- As faixas e capas importadas ficam no IndexedDB deste navegador e deste dispositivo; a persistência pode depender da cota disponível e das políticas de armazenamento do navegador, e não há sincronização entre dispositivos.
- O uso offline exige abrir o app online pelo menos uma vez para instalar o cache do service worker e importar os arquivos desejados. A cota do navegador pode limitar ou remover dados locais; manter o armazenamento persistente também depende do navegador/sistema.
- Para exibir o clima, ative-o em Configurações e autorize a localização. As coordenadas são consultadas pela Open-Meteo e não são salvas pelo app; a preferência de atualização do clima fica no armazenamento local.
- O SpherePod não usa cookies de publicidade; guarda preferências no armazenamento local e mídia escolhida no IndexedDB. A tela de descanso e a Battery API podem variar conforme o navegador e o dispositivo.
- Para adicionar no iPhone, abra o site publicado no Safari e escolha **Compartilhar → Adicionar à Tela de Início**. O ícone configurado não instala o app sozinho; o iOS exige essa ação do usuário.
- A varredura de páginas externas é limitada por CORS, autenticação, DRM e players que constroem streams via JavaScript. Para cobrir sites arbitrários com confiabilidade, é necessário adicionar um backend de extração/proxy seguro; este repositório ainda não contém esse serviço.
- Links HLS/DASH podem depender de suporte nativo ou de uma camada de reprodução específica do navegador.

## Publicação

O site é estático e usa `index.html` na raiz. O workflow em `.github/workflows/pages.yml` publica a raiz no GitHub Pages quando o Pages estiver configurado para GitHub Actions.

## Desenvolvimento

Não há etapa de build nem dependências de JavaScript: abra `index.html` em um servidor estático. A fonte Botanic Grotesque está incluída localmente. Para testar APIs de armazenamento e mídia, prefira localhost ou HTTPS em vez de abrir como `file://`.
