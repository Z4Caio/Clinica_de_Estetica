/* ==========================================================================
   LÓGICA JAVASCRIPT PRINCIPAL - CLÍNICA DE ESTÉTICA (ESTÉTICA BEAUTYCLINIC)
   ==========================================================================
   1. Base de Dados de Procedimentos Didáticos, Indicação, Benefícios e Múltiplos Cards.
   2. Widget de Horário Sofisticado com Verificação de Atendimento em Tempo Real.
   3. Gerenciamento do Visualizador 2D de Bustos Interativos (Troca de Sexo & Rotação).
   4. Mapeamento de Hotspots de Tratamentos Faciais por Ângulo e Sexo.
   5. Sistema de Animação e Navegação Multicard nos Modais Pop-up.
   6. Controle de Navegação e Menu Mobile Responsivo.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHoursWidget();
  initBustViewer();
  initNavbar();
});

/* --------------------------------------------------------------------------
   1. BASE DE DADOS DOS PROCEDIMENTOS ESTÉTICOS (MULTICARD + DIDÁTICO)
   -------------------------------------------------------------------------- */
const PROCEDURES_DATA = {
  botox: [
    {
      badge: "Terço Superior Facial",
      title: "Toxina Botulínica (Botox)",
      description: "Aplicação suave e precisa para relaxar os músculos da testa e ao redor dos olhos, suavizando rugas sem deixar o rosto rígido ou sem expressão.",
      indication: "Para quem deseja prevenir ou suavizar marcas de expressão na testa e pés de galinha, mantendo um visual leve e descansado.",
      benefit: "Devolve uma aparência radiante, jovial e revitalizada, elevando sua confiança e bem-estar no dia a dia.",
      duration: "30 a 45 minutos",
      durability: "4 a 6 meses",
      anesthesia: "Pomada Anestésica Tópica",
      recovery: "Imediata (Retorno normal no mesmo dia)",
      msg: "Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20Toxina%20Botul%C3%ADnica"
    },
    {
      badge: "Terço Superior Facial",
      title: "Fios de Sustentação de Colágeno",
      description: "Inserção de fios absorvíveis na região da testa e sobrancelhas para promover a elevação natural do olhar e estimular colágeno novo.",
      indication: "Indicado para quem nota o olhar levemente caído ou deseja arqueamento gracioso das sobrancelhas sem cirurgia.",
      benefit: "Abre e destaca a beleza do seu olhar, proporcionando um efeito lifting elegante e duradouro.",
      duration: "45 a 60 minutos",
      durability: "12 a 18 meses",
      anesthesia: "Anestesia Local Confortável",
      recovery: "Retorno em 24 a 48 horas",
      msg: "Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20Fios%20de%20Sustenta%C3%A7%C3%A3o"
    }
  ],
  olheiras: [
    {
      badge: "Região Periocular",
      title: "Preenchimento de Olheiras",
      description: "Preenchimento do fundo dos olhos com ácido hialurônico de alta tecnologia para nivelar a pele e reduzir sombras profundas sob o olhar.",
      indication: "Para quem sofre com aspecto constante de cansaço ou olheiras profundas e quer olhar mais descansado ao se olhar no espelho.",
      benefit: "Elimina a fisionomia cansada instantaneamente, renovando o seu olhar com viço e aparência saudável.",
      duration: "40 minutos",
      durability: "12 a 18 meses",
      anesthesia: "Anestesia Local com Microcânula",
      recovery: "Tranquilo (Edema discreto em 24h)",
      msg: "Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20Preenchimento%20de%20Olheiras"
    },
    {
      badge: "Região Periocular",
      title: "Skinbooster Periocular",
      description: "Microinjeções de ácido hialurônico fluido enriquecido para hidratar profundamente a pele fina ao redor dos olhos e suavizar linhas finas.",
      indication: "Perfeito para quem apresenta pele ressecada, craquelada ou com pequenas rugas finas sob as pálpebras.",
      benefit: "Melhora a firmeza e a textura da pele dos olhos, trazendo luminosidade e efeito de pele renovada.",
      duration: "30 minutos",
      durability: "6 a 9 meses",
      anesthesia: "Anestésico Tópico Potentizado",
      recovery: "Imediata",
      msg: "Ol%C3%A1%2C%20gostaria%20de%20informacoes%20sobre%20Skinbooster%20de%20Olheiras"
    }
  ],
  labios: [
    {
      badge: "Escultura Labial",
      title: "Preenchimento Labial",
      description: "Modelagem artística dos lábios para desenhar o contorno, definir o arco do cupido e adicionar volume proporcional à sua boca.",
      indication: "Indicado para quem deseja lábios mais desenhados, simétricos, volumosos ou corrigir assimetrias naturais.",
      benefit: "Realça o sorriso com sensualidade e elegância, valorizando a maquiagem e a simetria do seu rosto.",
      duration: "45 a 60 minutos",
      durability: "9 a 12 meses",
      anesthesia: "Bloqueio Anestésico Confortável",
      recovery: "Leve inchaço por 48 horas",
      msg: "Ol%C3%A1%2C%20gostaria%20de%20agendar%20Preenchimento%20Labial"
    },
    {
      badge: "Escultura Labial",
      title: "Hydra Gloss & Glossing Labial",
      description: "Protocolo de super-hidratação intensiva com vitaminas e ácido hialurônico para remover o ressecamento e renovar a cor natural dos lábios.",
      indication: "Ideal para quem busca lábios macios, bem cuidados e com efeito 'boca de saúde' sem alterar o volume.",
      benefit: "Proporciona lábios ultra-macios, jovens e com brilho natural irresistível.",
      duration: "30 minutos",
      durability: "Tratamento Contínuo",
      anesthesia: "Sem necessidade de anestesia",
      recovery: "Imediata",
      msg: "Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20Hydra%20Gloss"
    }
  ],
  harmonizacao: [
    {
      badge: "Estruturação Global",
      title: "Harmonização Facial Integrada",
      description: "Mapeamento das proporções do rosto para estruturar malar, queixo e pontos de luz, equilibrando todo o conjunto de forma sutil.",
      indication: "Para quem busca um rosto mais simétrico, com contornos bem definidos e harmonia estética completa.",
      benefit: "Valoriza sua beleza natural sob todos os ângulos, realçando os melhores traços com total elegância.",
      duration: "60 a 90 minutos",
      durability: "18 a 24 meses",
      anesthesia: "Anestesia Local Combinada",
      recovery: "Sem necessidade de repouso",
      msg: "Ol%C3%A1%2C%20gostaria%20de%20uma%20Avalia%C3%A7%C3%A3o%20de%20Harmoniza%C3%A7%C3%A3o%20Facial"
    },
    {
      badge: "Estruturação Global",
      title: "Preenchimento de Mento (Queixo)",
      description: "Projeção delicada do queixo para alinhar o perfil do rosto com o nariz e os lábios, trazendo simetria ao perfil.",
      indication: "Indicado para quem sente o queixo 'retraído' ou pequeno em relação ao perfil do rosto.",
      benefit: "Afina e alonga visualmente o rosto, criando um perfil marcante e harmonioso nas fotos e no espelho.",
      duration: "30 a 45 minutos",
      durability: "12 a 18 meses",
      anesthesia: "Anestesia Local Confortável",
      recovery: "Imediata",
      msg: "Ol%C3%A1%2C%20tenho%20interesse%20em%20Preenchimento%20de%20Queixo"
    }
  ],
  bioestimulador: [
    {
      badge: "Bochechas & Médio Rosto",
      title: "Bioestimuladores de Colágeno",
      description: "Substâncias biocompatíveis que estimulam o próprio corpo a produzir colágeno novo, firmeza e densidade na pele do rosto.",
      indication: "Excelente para quem sente a pele 'derretendo', com flacidez inicial nas bochechas ou perda de firmeza.",
      benefit: "Recupera a firmeza e a elasticidade da pele de dentro para fora com resultado gradativo e extremamente natural.",
      duration: "45 minutos",
      durability: "Até 25 meses",
      anesthesia: "Anestesia Tópica + Infiltrativa",
      recovery: "Atividades normais no mesmo dia",
      msg: "Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20Bioestimuladores"
    },
    {
      badge: "Bochechas & Médio Rosto",
      title: "Ultrassom Microfocado (Liftera)",
      description: "Tecnologia de ondas ultrassônicas que aquecem as camadas profundas da pele criando pontos de ancoragem e efeito lifting imediato.",
      indication: "Para quem deseja combater o 'bochecho caindo' (efeito jowl) e afinar o contorno facial sem agulhas.",
      benefit: "Efeito lifting sem cortes, compactando o tecido e definindo as maçãs do rosto com tecnologia de ponta.",
      duration: "40 a 60 minutos",
      durability: "12 meses (Ciclo anual)",
      anesthesia: "Sem necessidade (Tecnologia confortável)",
      recovery: "Imediata (Sem marcas)",
      msg: "Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20Ultrassom%20Microfocado"
    }
  ],
  mandibula: [
    {
      badge: "Contorno Jawline",
      title: "Preenchimento de Mandíbula",
      description: "Aplicação estratégica de ácido hialurônico para marcar o ângulo da mandíbula, destacando a divisão entre rosto e pescoço.",
      indication: "Ideal para quem deseja uma linha de mandíbula marcante, desenhada e com contorno bem evidente.",
      benefit: "Proporciona um visual estruturado e fotogênico, emoldurando o rosto com máxima sofisticação.",
      duration: "45 minutos",
      durability: "12 a 18 meses",
      anesthesia: "Anestesia Local com Lidocaína",
      recovery: "Imediata",
      msg: "Ol%C3%A1%2C%20tenho%20interesse%20em%20Preenchimento%20de%20Mand%C3%ADbula"
    },
    {
      badge: "Contorno Jawline",
      title: "Protocolo Jawline Slim",
      description: "Associação de bioestimulador de colágeno e esvaziador de gordura no ângulo mandibular para quem tem excesso de volume lateral.",
      indication: "Para quem busca afinar o terço inferior do rosto e obter um contorno facial mais reto e esculpido.",
      benefit: "Reduz o volume indesejado na lateral do rosto e firma a pele no contorno da mandíbula.",
      duration: "45 minutos",
      durability: "18 meses",
      anesthesia: "Anestesia Local",
      recovery: "Retorno imediato",
      msg: "Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20Jawline%20Slim"
    }
  ],
  morpheus: [
    {
      badge: "Tecnologia Avançada",
      title: "Microagulhamento RF (Morpheus 3)",
      description: "Agulhas folheadas a ouro com radiofrequência que penetram na pele para retrair a flacidez, fechar poros e renovar o tecido.",
      indication: "Para quem busca tratamento intensivo para poros dilatados, cicatrizes, rugas finas ou flacidez facial.",
      benefit: "Transformação profunda da textura da pele, tornando-a lisa, firme e com poros visivelmente fechados.",
      duration: "60 minutos",
      durability: "Resultados duradouros",
      anesthesia: "Anestésico Potentizado de Alta Eficácia",
      recovery: "Leve vermelhidão por 48h",
      msg: "Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20Morpheus"
    },
    {
      badge: "Tecnologia Avançada",
      title: "Peeling Renovador de Alta Performance",
      description: "Aplicação de ácidos nobres para esfoliar a camada superficial da pele, clarear manchas e uniformizar o tom do rosto.",
      indication: "Indicado para quem tem manchas de sol, melasma inicial ou textura irregular na pele.",
      benefit: "Devolve o brilho, a transparência e a uniformidade de cor à pele do rosto.",
      duration: "30 minutos",
      durability: "Sessões periódicas",
      anesthesia: "Sem necessidade",
      recovery: "Descamação leve em 3 a 5 dias",
      msg: "Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20Peeling%20Renovador"
    }
  ],
  papada: [
    {
      badge: "Região Submentoniana",
      title: "Lipo Enzimática de Papada",
      description: "Aplicação de enzimas purificadas que dissolvem as células de gordura acumuladas abaixo do queixo sem necessidade de cortes.",
      indication: "Para quem se incomoda com a gordurinha da papada que aparece nas fotos de perfil ou ao olhar para baixo.",
      benefit: "Elimina a papada indesejada, afinando o pescoço e rejuvenescendo o perfil da sua face.",
      duration: "30 minutos",
      durability: "Resultado Definitivo (Gordura eliminada)",
      anesthesia: "Anestesia Local Tópica",
      recovery: "Sensibilidade leve por 3 dias",
      msg: "Ol%C3%A1%2C%20gostaria%20de%20agendar%20Lipo%20de%20Papada"
    },
    {
      badge: "Região Submentoniana",
      title: "Firming Neck (Firmeza de Pescoço)",
      description: "Aplicação de bioestimuladores de colágeno específicos para esticar a pele fina do pescoço e abaixo do queixo.",
      indication: "Ideal para quem não tem tanta gordura na papada, mas sofre com a pele solta e 'murcha' no pescoço.",
      benefit: "Estica e alisa a pele da papada e pescoço, trazendo firmeza e contorno jovem.",
      duration: "35 minutos",
      durability: "18 a 24 meses",
      anesthesia: "Anestésico Tópico",
      recovery: "Imediata",
      msg: "Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20Firmeza%20de%20Pescoco"
    }
  ]
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

    // 1. Atualizar visibilidade das imagens dos bustos (Ocultação estrita das não-ativas)
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
        openModal(procedureId, 0);
      }
    });
  });

  // Inicializar estado dos bustos
  updateDisplay();
}

/* --------------------------------------------------------------------------
   4. MODAL POP-UP COM SUPORTE A NAVEGAÇÃO MULTICARD & INDICAÇÕES
   -------------------------------------------------------------------------- */
const modal = document.getElementById('procedureModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalBackBtn = document.getElementById('modalBackBtn');
const modalBadge = document.getElementById('modalBadge');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalIndication = document.getElementById('modalIndication');
const modalBenefit = document.getElementById('modalBenefit');
const modalDuration = document.getElementById('modalDuration');
const modalDurability = document.getElementById('modalDurability');
const modalAnesthesia = document.getElementById('modalAnesthesia');
const modalRecovery = document.getElementById('modalRecovery');
const modalCtaBtn = document.getElementById('modalCtaBtn');

const modalPagination = document.getElementById('modalPagination');
const modalProcNextBtn = document.getElementById('modalProcNextBtn');
const modalProcCounter = document.getElementById('modalProcCounter');

let currentActiveProcedureId = null;
let currentProcedureIndex = 0;

function openModal(id, index = 0) {
  const list = PROCEDURES_DATA[id];
  if (!list || list.length === 0) return;

  currentActiveProcedureId = id;
  currentProcedureIndex = index % list.length;
  const data = list[currentProcedureIndex];

  // Preencher dados do procedimento
  if (modalBadge) modalBadge.textContent = data.badge;
  if (modalTitle) modalTitle.textContent = data.title;
  if (modalDesc) modalDesc.textContent = data.description;
  if (modalIndication) modalIndication.textContent = data.indication;
  if (modalBenefit) modalBenefit.textContent = data.benefit;
  if (modalDuration) modalDuration.textContent = data.duration;
  if (modalDurability) modalDurability.textContent = data.durability;
  if (modalAnesthesia) modalAnesthesia.textContent = data.anesthesia;
  if (modalRecovery) modalRecovery.textContent = data.recovery;
  if (modalCtaBtn) modalCtaBtn.href = `https://wa.me/5524999999999?text=${data.msg}`;

  // Controle da barra de múltiplos procedimentos (Multicard)
  if (modalPagination) {
    if (list.length > 1) {
      modalPagination.style.display = 'flex';
      if (modalProcCounter) {
        modalProcCounter.textContent = `${currentProcedureIndex + 1} de ${list.length}`;
      }
    } else {
      modalPagination.style.display = 'none';
    }
  }

  if (modal) {
    const modalCard = modal.querySelector('.modal-card');
    if (modalCard) modalCard.scrollTop = 0;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

// Alternar para o próximo procedimento da mesma área
if (modalProcNextBtn) {
  modalProcNextBtn.addEventListener('click', () => {
    if (!currentActiveProcedureId) return;
    const list = PROCEDURES_DATA[currentActiveProcedureId];
    if (!list || list.length <= 1) return;

    currentProcedureIndex = (currentProcedureIndex + 1) % list.length;
    openModal(currentActiveProcedureId, currentProcedureIndex);

    if (window.gsap && modalTitle) {
      gsap.fromTo('.modal-card', 
        { opacity: 0.8, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  });
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
   5. NAVEGAÇÃO E MENU MOBILE
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
