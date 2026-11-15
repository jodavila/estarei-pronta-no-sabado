# Estarei Pronta no Sábado

Aplicação estática para acompanhar tarefas domésticas e a preparação semanal para o sábado.

## Como o salvamento funciona

- As marcações são salvas automaticamente no `localStorage` do navegador.
- Fechar a aba ou o navegador não apaga as marcações.
- Cada dia tem uma chave de data local (`AAAA-MM-DD`).
- Ao abrir em outro dia, o checklist daquele dia começa desmarcado.
- Se a página permanecer aberta durante a meia-noite, ela atualiza para o novo dia.
- Os dados ficam neste navegador e neste dispositivo; não há sincronização entre dispositivos nesta versão.

## Personalização

As tarefas estão no início de `app.js`, nos objetos `dailyTasks`, `weeklyTasks` e `sabbathTasks`. Edite os títulos e descrições ali.

## Observação

Esta é uma primeira versão funcional, sem servidor, conta ou banco de dados. O `localStorage` não é cache temporário: é armazenamento local persistente do navegador.
