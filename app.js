// Estarei Pronta no Sábado — versão inicial
// As marcações ficam no localStorage e são separadas por data local (AAAA-MM-DD).

const STORAGE_KEY = "estarei-pronta-no-sabado-v1";

const dayNames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const dayShort = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const dailyTasks = [
  { id: "make-bed", group: "Manutenção diária", title: "Arrumar a cama", note: "Comece o dia deixando o quarto em ordem." },
  { id: "dishes", group: "Manutenção diária", title: "Manter a pia e a louça em dia", note: "Evite deixar louça acumulada." },
  { id: "clothes", group: "Manutenção diária", title: "Recolher roupas espalhadas", note: "Coloque cada peça no cesto ou no lugar correto." },
  { id: "reset", group: "Manutenção diária", title: "Fazer uma revisão de 15 minutos", note: "Guarde o que ficou fora do lugar." }
];

const weeklyTasks = {
  0: [
    { id: "weekly-plan", group: "Planejamento da semana", title: "Planejar as tarefas da semana", note: "Distribua as tarefas para não acumular tudo na sexta-feira." },
    { id: "laundry-sort", group: "Organização", title: "Verificar roupas e necessidades da casa", note: "Identifique o que precisa ser lavado ou reposto." }
  ],
  1: [
    { id: "kitchen-surfaces", group: "Cozinha", title: "Limpar bancadas, fogão e mesa", note: "Deixe a cozinha funcional para a semana." },
    { id: "food-check", group: "Cozinha", title: "Verificar alimentos e organizar a geladeira", note: "Confira o que precisa ser consumido ou reposto." }
  ],
  2: [
    { id: "wash-clothes", group: "Lavanderia", title: "Lavar e estender roupas", note: "Faça uma ou mais cargas conforme a necessidade." },
    { id: "fold-clothes", group: "Lavanderia", title: "Dobrar e guardar roupas limpas", note: "Evite deixar roupas acumuladas." }
  ],
  3: [
    { id: "bed-linen", group: "Quarto", title: "Trocar roupa de cama", note: "Separe a roupa usada para lavar." },
    { id: "bedroom-dust", group: "Quarto", title: "Organizar o quarto e tirar o pó", note: "Cuide das superfícies e dos objetos fora do lugar." }
  ],
  4: [
    { id: "bathroom", group: "Banheiro", title: "Limpar banheiro", note: "Pia, espelho, vaso e box." },
    { id: "common-areas", group: "Áreas comuns", title: "Limpar sala e áreas de circulação", note: "Tire o pó e organize os ambientes." }
  ],
  5: [
    { id: "floor", group: "Casa", title: "Varrer/aspirar e passar pano", note: "Faça a revisão final dos pisos." },
    { id: "meal-prep", group: "Preparação para o sábado", title: "Deixar refeições encaminhadas", note: "Organize o que será necessário para o sábado." },
    { id: "clothes-ready", group: "Preparação para o sábado", title: "Separar roupas e itens para o sábado", note: "Evite deixar decisões e tarefas para o último momento." },
    { id: "final-check", group: "Preparação para o sábado", title: "Fazer uma revisão tranquila da casa", note: "Finalize o essencial sem transformar a preparação em correria." }
  ]
};

const sabbathTasks = [
  { id: "sabbath-rest", group: "Sábado", title: "Desfrutar do sábado", note: "Reserve o dia para Deus, descanso, comunhão e família." },
  { id: "sabbath-worship", group: "Vida espiritual", title: "Separar tempo para adoração e estudo bíblico", note: "Viva o sábado como um dia de deleite." }
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
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Não foi possível salvar as marcações neste navegador.", error);
  }
}

function getTasks(date) {
  const day = date.getDay();
  if (day === 6) return sabbathTasks;
  return [...dailyTasks, ...(weeklyTasks[day] || [])];
}

function getChecks(date) {
  return state[localDateKey(date)] || {};
}

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
    button.addEventListener("click", () => {
      selectedDate = date;
      render();
    });
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
    rest.textContent = "Hoje não é dia de correr atrás das tarefas domésticas. A preparação feita durante a semana abre espaço para desfrutar do sábado.";
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
  $("tasks-title").textContent = day === 6 ? "Viva o sábado" : `Tarefas de ${dayNames[day]}`;
}

function render() {
  renderWeek();
  const day = selectedDate.getDay();
  const isToday = localDateKey(selectedDate) === localDateKey(new Date());
  $("today-label").textContent = isToday ? "HOJE" : "DIA SELECIONADO";
  $("date-title").textContent = `${dayNames[day]}, ${selectedDate.toLocaleDateString("pt-BR", { day: "numeric", month: "long" })}`;
  $("daily-message").textContent = day === 6
    ? "O sábado chegou. Desfrute deste presente de Deus."
    : "Pequenos passos durante a semana deixam a sexta-feira mais tranquila.";
  $("reset-day").style.visibility = day === 6 ? "hidden" : "visible";
  renderTasks();
}

$("reset-day").addEventListener("click", () => {
  if (!confirm("Desmarcar todas as tarefas deste dia?")) return;
  delete state[localDateKey(selectedDate)];
  saveState();
  render();
});

// Se a página ficar aberta durante a meia-noite, muda para o novo dia.
// Se estiver fechada, a data é recalculada ao abrir novamente.
function scheduleMidnightRefresh() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 1, 0);
  setTimeout(() => {
    selectedDate = new Date();
    render();
    scheduleMidnightRefresh();
  }, next.getTime() - now.getTime());
}

render();
scheduleMidnightRefresh();
