# Pronta para o Sábado

Site estático para acompanhar a organização do lar durante a semana, com conteúdo baseado na versão indicada pelo livro. O checklist separa a manutenção diária das tarefas propostas para cada dia e inclui orientações sobre devoção, lavanderia, preparação de sexta-feira e descanso no sábado.

## Como o checklist funciona

- As marcações são salvas automaticamente no `localStorage` do navegador.
- Cada data tem seu próprio conjunto de marcações.
- Fechar a aba ou o navegador não apaga as marcações.
- Os dados ficam neste navegador e dispositivo; não há sincronização entre dispositivos.
- O checklist é um apoio de organização, não uma lista rígida de obrigações.

## Personalização

As tarefas ficam no início de `app.js`, nos arrays `dailyTasks`, `weeklyTasks` e `sabbathTasks`. O conteúdo explicativo fica em `index.html`, organizado em seções expansíveis.

## Sobre esta versão

Este site apresenta o modelo indicado pelo livro. A adaptação para uma pessoa que mora sozinha, não tem filhos ou trabalha fora deverá ser desenvolvida separadamente, preservando a distinção entre a proposta original e as adaptações pessoais.
