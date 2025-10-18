function abrirRelatorio(horario) {
  window.location.href = `relatorio.html?horario=${encodeURIComponent(horario)}`;
}

function salvarRelatorio() {
  const params = new URLSearchParams(window.location.search);
  const horario = params.get("horario");

  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const texto = document.getElementById("texto").value;
  const servico = document.getElementById("servico").value;
  const unidade = document.getElementById("unidade").value;

  const relatorio = { data, hora, texto, servico, unidade };
  localStorage.setItem(`relatorio_${horario}`, JSON.stringify(relatorio));

  alert("Relatório salvo com sucesso!");
  window.location.href = "relatorios.html";
}

window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const horario = params.get("horario");

  // --- Página relatorio.html ---
  if (horario && document.getElementById("texto")) {
    const salvo = localStorage.getItem(`relatorio_${horario}`);
    if (salvo) {
      const dados = JSON.parse(salvo);
      document.getElementById("data").value = dados.data || "";
      document.getElementById("hora").value = dados.hora || horario;
      document.getElementById("texto").value = dados.texto || "";
      document.getElementById("servico").value = dados.servico || "Quick Massage";
      document.getElementById("unidade").value = dados.unidade || "Grand Plaza / Santo André";
    } else {
      document.getElementById("hora").value = horario;
    }
    document.getElementById("hora").setAttribute("step", "60"); // formato 24h
  }

  // --- Página relatorios.html ---
  if (document.querySelector(".cards-grid")) {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
      const texto = card.innerText;
      const horarioMatch = texto.match(/Horário:\s*(\d{2}:\d{2})/);
      if (horarioMatch) {
        const horario = horarioMatch[1];
        const salvo = localStorage.getItem(`relatorio_${horario}`);
        if (salvo) {
          const dados = JSON.parse(salvo);
          card.innerHTML = `
            ${dados.servico || "Quick Massage"} – ${dados.unidade || "Grand Plaza / Santo André"}<br>
            Dia: ${dados.data || "–"} Horário: ${dados.hora || horario}
          `;
        }
      }
    });
  }
};
