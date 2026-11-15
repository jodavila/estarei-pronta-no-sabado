// Pronta para o Sábado — checklist baseado na versão indicada pelo livro.
// As marcações são salvas no navegador e separadas por data local.

const STORAGE_KEY = "pronta-para-o-sabado-livro-v2";
const dayNames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const dayShort = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const dailyTasks = [
  { id: "devotional", group: "Deus em primeiro lugar", title: "Separar tempo para o momento devocional", note: "Bíblia, Lição da Escola Sabatina, oração e louvor." },
  { id: "breakfast", group: "Rotina da manhã", title: "Preparar o desjejum e arrumar as camas", note: "Comece o dia com calma, aproveitando a organização da noite anterior." },
  { id: "meals", group: "Alimentação", title: "Seguir o planejamento das refeições", note: "Organize almoço e jantar; procure antecipar o que facilitar o dia." },
  { id: "dishes", group: "Manutenção da casa", title: "Cuidar da louça e da cozinha", note: "Guarde os alimentos, lave, seque e guarde os utensílios." },
  { id: "laundry-check", group: "Manutenção da casa", title: "Verificar roupas e necessidades da lavanderia", note: "Lave conforme o volume e não deixe roupas limpas acumularem." },
  { id: "evening-reset", group: "Preparação da noite", title: "Fazer a Operação Arrastão — 15 minutos", note: "Passe pelos cômodos e devolva cada coisa ao seu lugar." },
  { id: "bathroom-reset", group: "Preparação da noite", title: "Cuidar do banheiro após o último banho", note: "Pendure toalhas, coloque roupas no cesto e seque o ambiente." },
  { id: "next-day", group: "Preparação da noite", title: "Adiantar o que facilitará o dia seguinte", note: "Separe roupas, deixe grãos de molho ou prepare a mesa do desjejum." },
  { id: "family-worship", group: "Preparação da noite", title: "Realizar o culto familiar", note: "Encerre o dia em comunhão e gratidão." }
];

const weeklyTasks = {
  0: [
    { id: "week-plan", group: "Planejamento", title: "Revisar a semana e distribuir as tarefas", note: "Use este momento para visualizar compromissos e necessidades do lar." },
    { id: "home-needs", group: "Planejamento", title: "Verificar roupas e necessidades da casa", note: "Identifique o que precisa ser lavado, reposto ou organizado." }
  ],
  1: [
    { id: "monday-sweep", group: "Limpeza de manutenção", title: "Varrer a casa e passar pano no chão", note: "Comece pelos quartos e finalize na cozinha." },
    { id: "monday-dust", group: "Limpeza de manutenção", title: "Tirar o pó dos móveis", note: "Faça a manutenção das superfícies e dos ambientes." },
    { id: "monday-bins", group: "Limpeza de manutenção", title: "Retirar os lixos dos banheiros", note: "Verifique também os demais cestos, se necessário." },
    { id: "monday-fridge", group: "Opcional após o jantar", title: "Limpar a geladeira e montar a lista de compras", note: "Atividade sugerida como antecipação para a terça-feira." }
  ],
  2: [
    { id: "tuesday-fridge", group: "Compras e alimentos", title: "Revisar a geladeira e retirar alimentos não aproveitados", note: "Separe os potes para lavar junto com a louça." },
    { id: "tuesday-list", group: "Compras e alimentos", title: "Conferir o que falta e fazer as compras", note: "Ao voltar, guarde cada produto em seu lugar e deixe à vista o que vencerá primeiro." },
    { id: "tuesday-laundry", group: "Lavanderia", title: "Colocar roupas para lavar ou deixar de molho", note: "Organize conforme o volume de roupas e o tempo disponível." }
  ],
  3: [
    { id: "wednesday-self", group: "Um dia mais leve", title: "Reservar tempo para atividades pessoais", note: "A proposta é não acrescentar grandes tarefas domésticas." },
    { id: "wednesday-kitchen", group: "Manutenção", title: "Limpar o chão da cozinha", note: "Faça a manutenção indicada para o meio da semana." }
  ],
  4: [
    { id: "thursday-stove", group: "Cozinha", title: "Limpar fogão, geladeira por fora, mesas e eletrodomésticos", note: "Cuide também dos armários e das superfícies externas." },
    { id: "thursday-linens", group: "Cozinha", title: "Trocar guardanapos e passadeiras", note: "Deixe a cozinha preparada para o sábado." },
    { id: "thursday-floor", group: "Cozinha", title: "Limpar o chão da cozinha", note: "Finalize a limpeza do ambiente." },
    { id: "thursday-bath", group: "Banheiros", title: "Limpar espelhos e tapetes e separar toalhas para lavar", note: "Deixe a limpeza do vaso e do box para depois dos últimos banhos." },
    { id: "thursday-rooms", group: "Demais ambientes", title: "Guardar objetos e passar pano nos móveis", note: "Deixe os ambientes organizados." }
  ],
  5: [
    { id: "friday-bedding", group: "Preparação para o sábado", title: "Trocar as roupas de cama", note: "Faça isso antes de arrumar a cama." },
    { id: "friday-dust", group: "Preparação para o sábado", title: "Retirar o pó antes do pôr do sol", note: "A casa já deve estar limpa; faça apenas a revisão necessária." },
    { id: "friday-clothes", group: "Preparação para o sábado", title: "Separar a roupa de sábado", note: "Deixe roupas e itens necessários preparados." },
    { id: "friday-food", group: "Preparação para o sábado", title: "Antecipar o preparo das refeições", note: "Planeje um jantar leve e especial." },
    { id: "friday-bath", group: "Preparação pessoal", title: "Tomar banho e preparar-se para receber o sábado", note: "Reserve tempo para descansar, ler e cuidar de si." },
    { id: "friday-sunset", group: "Preparação espiritual", title: "Encerrar as atividades e receber o sábado", note: "A Operação Arrastão não deve ser necessária hoje." }
  ]
};

const sabbathTasks = [
  { id: "sabbath-worship", group: "Adoração e comunhão", title: "Separar tempo para adoração e comunhão", note: "Desfrute o sábado como um dia especial com Deus." },
  { id: "sabbath-nature", group: "Descanso e deleite", title: "Desfrutar uma atividade especial", note: "Natureza, literatura cristã, família, comunhão ou hospitalidade." },
  { id: "sabbath-gentle", group: "Cuidado com o lar", title: "Manter os objetos e alimentos organizados", note: "Cuide do que utilizar sem transformar o dia em rotina de faxina." }
];

const $ = (id) => document.getElementById(id);
let selectedDate = new Date();
let state = loadState();

function localDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function loadState() {
  try { const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); return value && typeof value === "object" ? value : {}; }
  catch { return {}; }
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch (error) { console.warn("Não foi possível salvar as marcações neste navegador.", error); }
}
function getTasks(date) {
  const day = date.getDay();
  if (day === 6) return sabbathTasks;
  return [...dailyTasks, ...(weeklyTasks[day] || [])];
}
function getChecks(date) { return state[localDateKey(date)] || {}; }

function renderWeek() {
  const todayKey = localDateKey(new Date());
  const start = new Date(selectedDate);
  start.setDate(start.getDate() - start.getDay());
  $("week-nav").innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "day-button";
    if (localDateKey(date) === localDateKey(selectedDate)) button.classList.add("active");
    if (localDateKey(date) === todayKey) button.classList.add("today");
    button.innerHTML = `<span>${dayShort[i]}</span><strong>${date.getDate()}</strong>`;
    button.setAttribute("aria-label", `${dayNames[i]}, ${date.getDate()}`);
    button.addEventListener("click", () => { selectedDate = date; render(); });
    $("week-nav").appendChild(button);
  }
}

function renderTasks() {
  const date = selectedDate;
  const day = date.getDay();
  const tasks = getTasks(date);
  const checks = getChecks(date);
  const groups = [...new Set(tasks.map(task => task.group))];
  $("task-groups").innerHTML = "";

  if (day === 6) {
    const rest = document.createElement("div");
    rest.className = "rest-card";
    rest.textContent = "A preparação foi distribuída durante a semana para que hoje você possa descansar, adorar, conviver e desfrutar o sábado. Este checklist é apenas um lembrete de intenções, não uma lista de obrigações.";
    $("task-groups").appendChild(rest);
  }

  groups.forEach(groupName => {
    const section = document.createElement("section");
    section.className = "task-group";
    const heading = document.createElement("h3");
    heading.textContent = groupName;
    const list = document.createElement("div");
    list.className = "task-list";
    tasks.filter(task => task.group === groupName).forEach(task => {
      const label = document.createElement("label");
      label.className = `task-item${checks[task.id] ? " completed" : ""}`;
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = Boolean(checks[task.id]);
      checkbox.addEventListener("change", () => {
        const key = localDateKey(date);
        state[key] = state[key] || {};
        state[key][task.id] = checkbox.checked;
        saveState();
        render();
      });
      const copy = document.createElement("span");
      copy.className = "task-copy";
      const title = document.createElement("strong");
      title.textContent = task.title;
      const note = document.createElement("small");
      note.textContent = task.note;
      copy.append(title, note);
      label.append(checkbox, copy);
      list.appendChild(label);
    });
    section.append(heading, list);
    $("task-groups").appendChild(section);
  });

  const done = tasks.filter(task => checks[task.id]).length;
  const total = tasks.length;
  const percent = total ? Math.round(done / total * 100) : 0;
  $("progress-number").textContent = `${percent}%`;
  $("progress-bar").style.width = `${percent}%`;
  $("task-count").textContent = `${done} de ${total} tarefas`;
  $("tasks-title").textContent = day === 6 ? "Desfrute o sábado" : `Plano de ${dayNames[day]}`;
}

function render() {
  renderWeek();
  const day = selectedDate.getDay();
  const isToday = localDateKey(selectedDate) === localDateKey(new Date());
  $("today-label").textContent = isToday ? "HOJE" : "DIA SELECIONADO";
  $("date-title").textContent = `${dayNames[day]}, ${selectedDate.toLocaleDateString("pt-BR", { day: "numeric", month: "long" })}`;
  $("daily-message").textContent = day === 6
    ? "O sábado chegou: receba este dia como uma bênção e desfrute-o sem pressa."
    : day === 5
      ? "Finalize o essencial antes do pôr do sol e prepare-se para descansar."
      : "Pequenos passos durante a semana deixam a sexta-feira mais tranquila.";
  $("reset-day").style.visibility = "visible";
  renderTasks();
}

$("reset-day").addEventListener("click", () => {
  if (!confirm("Desmarcar todas as tarefas deste dia?")) return;
  delete state[localDateKey(selectedDate)];
  saveState();
  render();
});

function scheduleMidnightRefresh() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 1, 0);
  setTimeout(() => { selectedDate = new Date(); render(); scheduleMidnightRefresh(); }, next.getTime() - now.getTime());
}
render();
scheduleMidnightRefresh();
