/* ==========================================================================
   LÓGICA JAVASCRIPT PRINCIPAL - CLÍNICA DE ESTÉTICA (ESTÉTICA BEAUTYCLINIC)
   ==========================================================================
   1. Base de dados dos procedimentos estéticos para exibição nos Modais Pop-up.
   2. Widget de Horário Sofisticado com Verificação de Atendimento em Tempo Real.
   3. Gerenciamento do Visualizador 2D de Bustos Interativos (Troca de Sexo & Rotação).
   4. Mapeamento de Hotspots de Tratamentos Faciais por Ângulo e Sexo.
   5. Sistema de Animação e Abertura/Fechamento do Modal Pop-up.
   6. Controle de Navegação e Menu Mobile Responsivo sem Bugs.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHoursWidget();
  initBustViewer();
  initNavbar();
});

/* --------------------------------------------------------------------------
   1. BASE DE DADOS DOS PROCEDIMENTOS ESTÉTICOS (MODAL INFO)
   -------------------------------------------------------------------------- */
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
  },
  morpheus: {
    badge: "Tecnologia Avançada",
    title: "Microagulhamento RF (Morpheus 3)",
    description: "Radiofrequência fracionada subdérmica para retração de tecidos flácidos, tratamento de poros dilatados e firmeza intensiva.",
    duration: "60 minutos",
    durability: "Resultados duradouros (Ciclo anual)",
    anesthesia: "Anestésico Potentizado",
    recovery: "Discreta hiperemia por 48h",
    msg: "Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20tratamento%20Morpheus"
  },
  papada: {
    badge: "Região Submentoniana",
    title: "Lipo Enzimática de Papada",
    description: "Aplicação direcionada de substâncias lipolíticas para dissolução da gordura submentoniana e definição do perfil inferior.",
    duration: "30 minutos",
    durability: "Resultado Definitivo",
    anesthesia: "Anestesia Local",
    recovery: "Sensibilidade leve por 3 dias",
    msg: "Ol%C3%A1%2C%20gostaria%20de%20agendar%20Lipo%20de%20Papada"
  }
};

/* --------------------------------------------------------------------------
   2. WIDGET DE HORÁRIO SOFISTICADO (COM STATUS EM TEMPO REAL)
   -------------------------------------------------------------------------- */
function initHoursWidget() {
  const now = new Date();
  const today = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  const hours = now.getHours();

  const listItems = document.querySelectorAll('.hours-widget__list li');
  const todayLabel = document.getElementById('hoursToday');
  const hoursBadge = document.getElementById('hoursBadge');
  const hoursStatusText = document.getElementById('hoursStatusText');

  const dayNames = [
    'Domingo', 'Segunda-feira', 'Terça-feira',
    'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
  ];

  listItems.forEach(item => {
    const day = parseInt(item.dataset.day, 10);
    if (day === today) {
      item.classList.add('today');
    } else {
      item.classList.remove('today');
    }
  });

  const isWeekday = today >= 1 && today <= 5;
  const isSaturday = today === 6;
  const isOpen = (isWeekday && hours >= 8 && hours < 20) || (isSaturday && hours >= 8 && hours < 13);

  if (hoursBadge && hoursStatusText) {
    if (isOpen) {
      hoursBadge.classList.remove('is-closed');
      hoursStatusText.textContent = 'Aberto Agora';
    } else {
      hoursBadge.classList.add('is-closed');
      hoursStatusText.textContent = 'Fechado';
    }
  }

  if (todayLabel) {
    todayLabel.textContent = isOpen
      ? `Hoje, ${dayNames[today]} — Atendimento presencial ativo até as ${isSaturday ? '13:00' : '20:00'}`
      : `Hoje, ${dayNames[today]} — Fora do horário de atendimento presencial`;
  }
}

/* --------------------------------------------------------------------------
   3. GERENCIADOR DO VISUALIZADOR DE BUSTOS 2D INTERATIVO
   -------------------------------------------------------------------------- */
function initBustViewer() {
  let currentGender = 'female'; // 'female' | 'male'
  let currentView = 'front';    // 'front' | 'side'

  // Elementos DOM
  const btnGenderFemale = document.getElementById('btnGenderFemale');
  const btnGenderMale = document.getElementById('btnGenderMale');
  const btnRotatePrev = document.getElementById('btnRotatePrev');
  const btnRotateNext = document.getElementById('btnRotateNext');
  const btnViewFront = document.getElementById('btnViewFront');
  const btnViewSide = document.getElementById('btnViewSide');

  const bustFemaleFront = document.getElementById('bustFemaleFront');
  const bustFemaleSide = document.getElementById('bustFemaleSide');
  const bustMaleFront = document.getElementById('bustMaleFront');
  const bustMaleSide = document.getElementById('bustMaleSide');

  const pins = document.querySelectorAll('.bust-pin');

  const imagesMap = {
    'female-front': bustFemaleFront,
    'female-side': bustFemaleSide,
    'male-front': bustMaleFront,
    'male-side': bustMaleSide
  };

  function updateDisplay() {
    const activeKey = `${currentGender}-${currentView}`;

    // 1. Atualizar visibilidade das imagens dos bustos (Garantir ocultação estrita das não-ativas)
    Object.keys(imagesMap).forEach(key => {
      const img = imagesMap[key];
      if (!img) return;
      if (key === activeKey) {
        img.classList.add('active');
        if (window.gsap) {
          gsap.killTweensOf(img);
          gsap.fromTo(img, 
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
          );
        }
      } else {
        img.classList.remove('active');
        if (window.gsap) {
          gsap.killTweensOf(img);
          gsap.set(img, { opacity: 0 });
        }
      }
    });

    // 2. Atualizar botões de seleção de sexo
    if (btnGenderFemale && btnGenderMale) {
      btnGenderFemale.classList.toggle('active', currentGender === 'female');
      btnGenderFemale.setAttribute('aria-selected', currentGender === 'female');
      btnGenderMale.classList.toggle('active', currentGender === 'male');
      btnGenderMale.setAttribute('aria-selected', currentGender === 'male');
    }

    // 3. Atualizar botões do indicador de visão (Frente / Perfil)
    if (btnViewFront && btnViewSide) {
      btnViewFront.classList.toggle('active', currentView === 'front');
      btnViewSide.classList.toggle('active', currentView === 'side');
    }

    // 4. Filtrar e exibir estritamente apenas os pontos de interação do busto e visão ativos
    pins.forEach(pin => {
      const pinGender = pin.getAttribute('data-gender');
      const pinView = pin.getAttribute('data-view');

      if (pinGender === currentGender && pinView === currentView) {
        pin.classList.add('active');
        if (window.gsap) {
          gsap.killTweensOf(pin);
          gsap.fromTo(pin, 
            { opacity: 0, scale: 0.5 }, 
            { opacity: 1, scale: 1, duration: 0.35, delay: 0.05, ease: "back.out(1.7)" }
          );
        }
      } else {
        pin.classList.remove('active');
        if (window.gsap) {
          gsap.killTweensOf(pin);
          gsap.set(pin, { opacity: 0 });
        }
      }
    });
  }

  // Eventos de Seleção de Sexo
  if (btnGenderFemale) {
    btnGenderFemale.addEventListener('click', () => {
      if (currentGender !== 'female') {
        currentGender = 'female';
        updateDisplay();
      }
    });
  }

  if (btnGenderMale) {
    btnGenderMale.addEventListener('click', () => {
      if (currentGender !== 'male') {
        currentGender = 'male';
        updateDisplay();
      }
    });
  }

  // Eventos de Rotação (Alternância entre Frente e Lado)
  function toggleAngle() {
    currentView = currentView === 'front' ? 'side' : 'front';
    updateDisplay();
  }

  if (btnRotatePrev) btnRotatePrev.addEventListener('click', toggleAngle);
  if (btnRotateNext) btnRotateNext.addEventListener('click', toggleAngle);

  if (btnViewFront) {
    btnViewFront.addEventListener('click', () => {
      if (currentView !== 'front') {
        currentView = 'front';
        updateDisplay();
      }
    });
  }

  if (btnViewSide) {
    btnViewSide.addEventListener('click', () => {
      if (currentView !== 'side') {
        currentView = 'side';
        updateDisplay();
      }
    });
  }

  // Evento de Clique nos Pontos de Interação (Pins) -> Abre Pop-up do Procedimento
  pins.forEach(pin => {
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      const procedureId = pin.getAttribute('data-id');
      if (procedureId) {
        openModal(procedureId);
      }
    });
  });

  // Inicializar estado dos bustos
  updateDisplay();
}

/* --------------------------------------------------------------------------
   4. MODAL POP-UP (EXIBIÇÃO E FECHAMENTO COM BOTÃO "VOLTAR")
   -------------------------------------------------------------------------- */
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

  if (modalBadge) modalBadge.textContent = data.badge;
  if (modalTitle) modalTitle.textContent = data.title;
  if (modalDesc) modalDesc.textContent = data.description;
  if (modalDuration) modalDuration.textContent = data.duration;
  if (modalDurability) modalDurability.textContent = data.durability;
  if (modalAnesthesia) modalAnesthesia.textContent = data.anesthesia;
  if (modalRecovery) modalRecovery.textContent = data.recovery;
  if (modalCtaBtn) modalCtaBtn.href = `https://wa.me/5524999999999?text=${data.msg}`;

  if (modal) {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Escutar Ações do Modal
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

/* --------------------------------------------------------------------------
   5. NAVEGAÇÃO E MENU MOBILE (CORREÇÃO COMPLETA DE RESPONSIVIDADE)
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 24) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  });

  if (navToggle && nav) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.contains('is-open');
      nav.classList.toggle('is-open', !isOpen);
      navToggle.classList.toggle('is-open', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }
}
