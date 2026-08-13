# Ficha de qualificação SDR

Formulário usado pelo SDR durante a call de qualificação da **Mentoria Fluxo**.

O SDR preenche enquanto conversa com o lead e, no fim, clica em **Copiar como texto**
para gerar um resumo formatado que é repassado ao closer.

## Estrutura

Página estática de arquivo único — `index.html`, com HTML, CSS e JS embutidos.
Sem build, sem dependências, sem framework.

O roteiro segue a ordem:
situação → motivação → impeditivo → objetivo → investimento → resultado.

Blocos condicionais:

- **Cenário** alterna entre *tem produto* e *não tem produto*
- **Tráfego** alterna entre *pago*, *orgânico* e *ambos*
- **Resultado da call** alterna entre *qualificado* e *desqualificado*

Dois trechos de script se reescrevem sozinhos conforme os campos são preenchidos
(a pergunta de aprofundamento da motivação e a pergunta de investimento, que usa
o nome do lead e a meta informada).

## Tema

Modo escuro. As cores ficam todas em variáveis CSS no `:root` — para ajustar a
paleta, mexa só ali. O `color-scheme: dark` é o que faz os `<select>` e a barra
de rolagem nativos acompanharem o tema.

## Deploy

Publicado na Vercel em **ficha-qualificacao.vercel.app**.

Como é um arquivo estático, não há comando de build: a Vercel serve o `index.html`
direto da raiz. Todo push nesta branch dispara um deploy novo.

## Rodar local

Abra o `index.html` no navegador. É só isso.
