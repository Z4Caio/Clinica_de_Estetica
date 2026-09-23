/* ==========================================================================
   LÓGICA JAVASCRIPT ESTÁTICA - CLÍNICA DE ESTÉTICA (ESTÉTICA BEAUTYCLINIC)
   ==========================================================================
   Este arquivo controla a interatividade para a versão estática sem WebGL:
   1. Base de dados dos procedimentos estéticos para exibição nos Modais Pop-up.
   2. Manipulação de cliques nos cards estáticos e exibição do modal pop-up.
   3. Ações de fechar o modal e botão "Voltar".
   4. Efeito de scroll no cabeçalho e menu móvel.
   ========================================================================== */

const PROCEDURES_DATA = {
  botox: {
    badge: "Terço Superior Facial",
    title: "Toxina Botulínica (Botox)",
    description: "Tratamento de alta precisão para atenuar rugas dinâmicas da testa, glabela e perioculares. Mantém a expressão natural com elegância e suavidade.",
    duration: "30 a 45 minutos",
    durability: "4 a 6 meses",
    anesthesia: "Pomada Anestésica Tópica",
    recovery: "Imediata (Sem downtimes)",
    msg: "Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20Toxina%20Botul%C3%ADnica"
  },
  olheiras: {
    badge: "Região Periocular",
    title: "Preenchimento de Olheiras",
    description: "Suavização do sulco nasojugal profundo com ácido hialurônico específico de alta pureza. Reduz a sombra e devolve o aspecto descansado ao olhar.",
    duration: "40 minutos",
    durability: "12 a 18 meses",
    anesthesia: "Anestesia Local / Microcânula",
    recovery: "Edema discreto em 24h",
    msg: "Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20Preenchimento%20de%20Olheiras"
  },
  labios: {
    badge: "Escultura Labial",
    title: "Preenchimento Labial",
    description: "Arquitetura labial refinada focada na eversão do bordo, definição do arco do cupido e hidratação profunda em simetria anatômica.",
    duration: "45 a 60 minutos",
    durability: "9 a 12 meses",
    anesthesia: "Bloqueio Anestésico Confortável",
    recovery: "Leve inchaço por 48 horas",
    msg: "Ol%C3%A1%2C%20gostaria%20de%20agendar%20Preenchimento%20Labial"
  },
  harmonizacao: {
    badge: "Estruturação Global",
    title: "Harmonização Facial Integrada",
    description: "Planejamento tridimensional completo baseado em proporções áureas para valorizar malar, mento, pré-jowl e contorno global.",
    duration: "60 a 90 minutos",
    durability: "18 a 24 meses",
    anesthesia: "Anestesia Local Combinada",
    recovery: "Sem necessidade de repouso",
    msg: "Ol%C3%A1%2C%20gostaria%20de%20uma%20Avalia%C3%A7%C3%A3o%20de%20Harmoniza%C3%A7%C3%A3o%20Facial"
  },
  bioestimulador: {
    badge: "Bochechas & Médio Rosto",
    title: "Bioestimuladores de Colágeno",
    description: "Estímulo contínuo de colágeno através de bioestimuladores de última geração (Radiesse / Sculptra) para recuperar a densidade dérmica.",
    duration: "45 minutos",
    durability: "Até 25 meses",
    anesthesia: "Anestesia Tópica + Infiltrativa",
    recovery: "Atividades normais no mesmo dia",
    msg: "Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20Bioestimuladores"
  },
  mandibula: {
    badge: "Contorno Jawline",
    title: "Preenchimento de Mandíbula",
    description: "Projeção estratégica do ângulo mandibular e queixo, destacando a separação entre o rosto e o pescoço com contornos marcantes.",
    duration: "45 minutos",
    durability: "12 a 18 meses",
    anesthesia: "Anestesia com Lidocaína",
    recovery: "Imediata",
    msg: "Ol%C3%A1%2C%20tenho%20interesse%20em%20Preenchimento%20de%20Mand%C3%ADbula"
  }
};

const modal = document.getElementById('procedureModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalBackBtn = document.getElementById('modalBackBtn');
const modalBadge = document.getElementById('modalBadge');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalDuration = document.getElementById('modalDuration');
const modalDurability = document.getElementById('modalDurability');
const modalAnesthesia = document.getElementById('modalAnesthesia');
const modalRecovery = document.getElementById('modalRecovery');
const modalCtaBtn = document.getElementById('modalCtaBtn');

function openModal(id) {
  const data = PROCEDURES_DATA[id];
  if (!data) return;

  modalBadge.textContent = data.badge;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.description;
  modalDuration.textContent = data.duration;
  modalDurability.textContent = data.durability;
  modalAnesthesia.textContent = data.anesthesia;
  modalRecovery.textContent = data.recovery;
  modalCtaBtn.href = `https://wa.me/5524999999999?text=${data.msg}`;

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const staticCards = document.querySelectorAll('.static-card');
  staticCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      openModal(id);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackBtn) modalBackBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Header & Mobile Nav
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 24) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.contains('is-open');
      nav.classList.toggle('is-open', !isOpen);
      navToggle.classList.toggle('is-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
      });
    });
  }
});
