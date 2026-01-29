// ===== CARREGAR DADOS SALVOS =====
let nomePlayer = localStorage.getItem("nomePlayer") || "";
let nivel = Number(localStorage.getItem("nivel")) || 1;
let xp = Number(localStorage.getItem("xp")) || 0;
let streak = Number(localStorage.getItem("streak")) || 0;
let rank = localStorage.getItem("rank") || "E";

// ===== STATUS DO PLAYER =====
let forca = Number(localStorage.getItem("forca")) || 1;
let velocidade = Number(localStorage.getItem("velocidade")) || 1;
let resistencia = Number(localStorage.getItem("resistencia")) || 1;
let inteligencia = Number(localStorage.getItem("inteligencia")) || 1;
let sabedoria = Number(localStorage.getItem("sabedoria")) || 1;
let qi = Number(localStorage.getItem("qi")) || 1;
let pontos = Number(localStorage.getItem("pontos")) || 0;

// ===== PEGAR ELEMENTOS DO HTML =====
const xpSpan = document.getElementById("xp");
const nivelSpan = document.getElementById("nivel");
const streakSpan = document.getElementById("streak");
const rankSpan = document.getElementById("rank");
const forcaSpan = document.getElementById("forca");
const velocidadeSpan = document.getElementById("velocidade");
const resistenciaSpan = document.getElementById("resistencia");
const inteligenciaSpan = document.getElementById("inteligencia");
const sabedoriaSpan = document.getElementById("sabedoria");
const qiSpan = document.getElementById("qi");
const pontosSpan = document.getElementById("pontos");
const xpFill = document.getElementById("xpFill");
const xpMaxSpan = document.getElementById("xpMax");

// ===== ATUALIZAR A TELA =====
function atualizarTela() {
  xpSpan.textContent = xp;
  nivelSpan.textContent = nivel;
  streakSpan.textContent = streak;
  rankSpan.textContent = rank;
  atualizarNome();

forcaSpan.textContent = forca;
velocidadeSpan.textContent = velocidade;
resistenciaSpan.textContent = resistencia;
inteligenciaSpan.textContent = inteligencia;
sabedoriaSpan.textContent = sabedoria;
qiSpan.textContent = qi;
pontosSpan.textContent = pontos;

const xpMax = nivel * 100;
const porcentagem = (xp / xpMax) * 100;

xpFill.style.width = porcentagem + "%";
xpMaxSpan.textContent = xpMax;

}

atualizarTela();

function concluir() {
  xp += 10;

  if (xp >= nivel * 100) {
    xp = 0;
    nivel++;
    pontos += 5;
    atualizarRank();
    animarLevelUp();
    tocarLevelUp();
  }

  salvar();
  atualizarTela();

  const box = document.getElementById("statusXP");
  if (box) {
    box.classList.add("pulse");
    setTimeout(() => box.classList.remove("pulse"), 400);
  }
}

function atualizarRank() {
  if (nivel >= 20) rank = "S";
  else if (nivel >= 15) rank = "A";
  else if (nivel >= 10) rank = "B";
  else if (nivel >= 5) rank = "C";
  else rank = "E";
}
function salvar() {
  localStorage.setItem("xp", xp);
  localStorage.setItem("nivel", nivel);
  localStorage.setItem("streak", streak);
  localStorage.setItem("rank", rank);
}
function missaoDiaria() {
  const hoje = new Date().toDateString();
  const ultima = localStorage.getItem("ultimaMissao");

  if (ultima !== hoje) {
    streak++;
    xp += 50;
    localStorage.setItem("ultimaMissao", hoje);
    document.getElementById("statusMissao").textContent =
      "Missão concluída 🔥";
  } else {
    document.getElementById("statusMissao").textContent =
      "Já concluída hoje 😎";
  }

  salvar();
  atualizarTela();
}
function atualizarNome() {
  const span = document.getElementById("nomePlayer");
  const input = document.getElementById("inputNome");
  const btnSalvar = document.getElementById("btnSalvarNome");
  const btnEditar = document.getElementById("btnEditarNome");

  span.textContent = nomePlayer || "---";

  if (nomePlayer) {
    input.style.display = "none";
    btnSalvar.style.display = "none";
    btnEditar.style.display = "inline-block";
  } else {
    input.style.display = "block";
    btnSalvar.style.display = "inline-block";
    btnEditar.style.display = "none";
  }
}

function salvarNome() {
  const input = document.getElementById("inputNome");
  const valor = input.value.trim();

  if (!valor) return;

  nomePlayer = valor;
  localStorage.setItem("nomePlayer", nomePlayer);
  atualizarNome();
}

function editarNome() {
  const input = document.getElementById("inputNome");
  input.value = nomePlayer;

  nomePlayer = "";
  localStorage.removeItem("nomePlayer");
  atualizarNome();
}


function uparForca() {
  if (pontos <= 0) return;

  forca++;
  pontos--;

  localStorage.setItem("forca", forca);
  localStorage.setItem("pontos", pontos);

  atualizarTela();
}

function uparVelocidade() {
  if (pontos <= 0) return;
  velocidade++;
  pontos--;
  salvarTudo();
}

function uparResistencia() {
  if (pontos <= 0) return;
  resistencia++;
  pontos--;
  salvarTudo();
}

function uparInteligencia() {
  if (pontos <= 0) return;
  inteligencia++;
  pontos--;
  salvarTudo();
}

function uparSabedoria() {
  if (pontos <= 0) return;
  sabedoria++;
  pontos--;
  salvarTudo();
}

function uparQi() {
  if (pontos <= 0) return;
  qi++;
  pontos--;
  salvarTudo();
}

function salvarTudo() {
  localStorage.setItem("forca", forca);
  localStorage.setItem("velocidade", velocidade);
  localStorage.setItem("resistencia", resistencia);
  localStorage.setItem("inteligencia", inteligencia);
  localStorage.setItem("sabedoria", sabedoria);
  localStorage.setItem("qi", qi);
  localStorage.setItem("pontos", pontos);

  atualizarTela();
}
function abrirPainel() {
  atualizarPerfil();
  document.getElementById("painel").classList.add("ativo");
  document.body.classList.add("painel-aberto");
}

function fecharPainel() {
  document.getElementById("painel").classList.remove("ativo");
  document.body.classList.remove("painel-aberto");
}

// ===== SISTEMA DE TAREFAS =====
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function adicionarTarefa() {
  const input = document.getElementById("novaTarefa");
  const texto = input.value.trim();

  if (texto === "") return;

  tarefas.push({
    texto: texto,
    feita: false
  });

  input.value = "";
  salvarTarefas();
  renderizarTarefas();
}

function renderizarTarefas() {
  const lista = document.getElementById("listaTarefas");
  lista.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span style="text-decoration:${tarefa.feita ? "line-through" : "none"}">
        ${tarefa.texto}
      </span>
      <button onclick="concluirTarefa(${index})">✔</button>
    `;

    lista.appendChild(li);
  });
}

function concluirTarefa(index) {
  if (tarefas[index].feita) return;

  tarefas[index].feita = true;
  xp += 10;

  salvar();
  salvarTarefas();
  atualizarTela();
  renderizarTarefas();
}

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

renderizarTarefas();

function animarLevelUp() {
  const el = document.getElementById("levelUp");
  el.classList.add("ativo");

  setTimeout(() => {
    el.classList.remove("ativo");
  }, 700);
}
document.getElementById("btnSalvarNome").addEventListener("click", salvarNome);
document.getElementById("btnEditarNome").addEventListener("click", editarNome);

atualizarNome();

function tocarLevelUp() {
  const som = document.getElementById("somLevelUp");
  if (som) {
    som.currentTime = 0;
    som.play();
  }

  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100]);
  }
}
function atualizarPerfil() {
  document.getElementById("perfilNome").textContent = nomePlayer || "---";
  document.getElementById("perfilRank").textContent = rank;
  document.getElementById("perfilNivel").textContent = nivel;
  document.getElementById("perfilPontos").textContent = pontos;

  document.getElementById("perfilForca").textContent = forca;
  document.getElementById("perfilVelocidade").textContent = velocidade;
  document.getElementById("perfilResistencia").textContent = resistencia;
  document.getElementById("perfilInteligencia").textContent = inteligencia;
  document.getElementById("perfilSabedoria").textContent = sabedoria;
  document.getElementById("perfilQi").textContent = qi;
}


