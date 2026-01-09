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

}

atualizarTela();
function concluir() {
  xp += 10;

  if (xp >= nivel * 100) {
    xp = 0;
    nivel++;
    pontos += 5;
    atualizarRank();
  }

  salvar();
  atualizarTela();
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
function salvarNome() {
  nomePlayer = document.getElementById("inputNome").value;

  if (nomePlayer.trim() === "") return;

  localStorage.setItem("nomePlayer", nomePlayer);
  atualizarNome();
}

function atualizarNome() {
  document.getElementById("nomePlayer").textContent =
    nomePlayer || "---";
}
document.getElementById("btnSalvarNome").addEventListener("click", salvarNome);

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
