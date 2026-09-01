# Ficha de qualificação SDR

Formulário usado pelo SDR durante a call de qualificação da **Mentoria Fluxo**.

O SDR preenche enquanto conversa com o lead e, no fim, pode:

- clicar em **Copiar texto** para gerar um resumo formatado que é repassado ao closer;
- clicar em **⚡ Gerar Briefing com IA** para o agente transformar a ficha num
  briefing de pré-call (leitura do lead, red flags, blocos de objeção → entrega,
  esteira de produtos e o que faltou perguntar).

## Estrutura

- `index.html` — página única com HTML, CSS e JS embutidos. Sem build, sem framework.
- `api/briefing.js` — função serverless (Vercel) que recebe o texto da ficha,
  monta a chamada ao Gemini e devolve o briefing. **O prompt do agente
  (`BRIEFING_SYSTEM`) vive aqui**, no servidor — inclui o formato de saída, as
  16 entregas da mentoria, o catálogo condensado das 260 aulas do VTSD, a régua
  de diagnóstico de métricas (CTR, connect rate, checkouts, compras, CPA × ticket)
  e as regras de escopo. Para ajustar o comportamento do agente, edite esse arquivo.

O roteiro do formulário segue a ordem:
situação → motivação → impeditivo → objetivo → investimento → resultado.

Blocos condicionais:

- **Cenário** alterna entre *tem produto* e *não tem produto*
- **Tráfego** alterna entre *pago*, *orgânico* e *ambos*
- **Red flags** revela quem participa da decisão quando há mais de um decisor,
  e o que o lead está esperando quando ele não quer começar agora
- **Resultado da call** alterna entre *qualificado* e *desqualificado*

## Red flags

A seção 7 captura os três sinais que costumam derrubar a call do closer:
decisão compartilhada, falta de tempo e falta de urgência.

As respostas preocupantes acendem em vermelho na tela, e o texto copiado
ganha uma linha `RED FLAGS:` resumindo só o que foi sinalizado — para o closer
bater o olho e já entrar na call sabendo.

## Autosave

A ficha é salva automaticamente no `localStorage` do navegador a cada
digitação e restaurada ao reabrir a página — um refresh no meio da call não
perde o preenchimento. O botão **Limpar** zera os campos, o briefing gerado
e o estado salvo.

## Briefing com IA

O botão de briefing chama `POST /api/briefing` enviando só o texto da ficha.
A função serverless:

- usa o modelo `gemini-3.6-flash` com o prompt fixo do servidor
  (`temperature` 0.3, `maxOutputTokens` 4096);
- exige a variável de ambiente **`GEMINI_API_KEY`** configurada no projeto da
  Vercel (Settings → Environment Variables);
- só aceita chamadas cuja origem seja o próprio site (checagem de `Origin`
  contra o host) e fichas de até 20 mil caracteres.

## Tema

Modo escuro. As cores ficam todas em variáveis CSS no `:root` — para ajustar a
paleta, mexa só ali. O `color-scheme: dark` é o que faz os `<select>` e a barra
de rolagem nativos acompanharem o tema.

## Deploy

Publicado na Vercel em **ficha-qualificacao.vercel.app**.

Não há comando de build: a Vercel serve o `index.html` da raiz e compila a
função de `api/`. Todo push na branch principal dispara um deploy novo.

## Rodar local

Abrir o `index.html` direto no navegador mostra o formulário e o copiar/colar
funciona normalmente — mas o botão de briefing depende da rota `/api/briefing`,
que só existe servida pela Vercel. Para testar o briefing localmente, use
`vercel dev` com a `GEMINI_API_KEY` no ambiente.
