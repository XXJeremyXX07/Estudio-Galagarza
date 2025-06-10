
// Loader fade out
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loader = document.querySelector('.loader');
    if (loader) loader.classList.add('hide');
  }, 900);
});

// Menú móvil responsive
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });
}

// Smooth scroll para todos los anclajes internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const hash = link.getAttribute('href');
    if (hash.length > 1 && document.querySelector(hash)) {
      e.preventDefault();
      document.querySelector(hash).scrollIntoView({ behavior: 'smooth' });
      if (mainNav.classList.contains('open')) mainNav.classList.remove('open');
      if (menuToggle.classList.contains('active')) menuToggle.classList.remove('active');
    }
  });
});

// Equipo dinámico por categorías
const equipo = {
  principales: [
    {
      nombre: "Miguel Arturo Galagarza Terán",
      rol: "Director General",
      img: "https://randomuser.me/api/portraits/men/21.jpg",
      bio: "Fundador y líder del estudio, especialista en derecho penal y corporativo con más de 25 años de experiencia."
    },
    {
      nombre: "Arturo Galagarza Ordinola",
      rol: "Socio Principal",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Abogado destacado en derecho corporativo y defensor en litigios empresariales de alto perfil."
    }
  ],
  junior: [
    {
      nombre: "Zayda Tello",
      rol: "Abogada Junior",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Abogada junior con énfasis en derecho penal y responsabilidad social."
    },
    {
      nombre: "Bruno Leerzundi",
      rol: "Abogado Junior",
      img: "https://randomuser.me/api/portraits/men/46.jpg",
      bio: "Especialista en derecho laboral, soporte activo en negociaciones colectivas."
    }
  ],
  asistentes: [
    {
      nombre: "Antony Peralta",
      rol: "Asistente Legal",
      img: "https://randomuser.me/api/portraits/men/78.jpg",
      bio: "Apoyo al equipo jurídico, encargado de la gestión documental y logística legal."
    },
    {
      nombre: "Antony Pumaray",
      rol: "Asistente Legal",
      img: "https://randomuser.me/api/portraits/men/65.jpg",
      bio: "Gestión de expedientes, atención al cliente y soporte a abogados en sala."
    }
  ]
};

function renderEquipo(category = "principales") {
  const cont = document.getElementById('team-container');
  if (!cont) return;
  cont.innerHTML = "";
  equipo[category].forEach(miembro => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
      <img src="${miembro.img}" alt="${miembro.nombre}">
      <h4>${miembro.nombre}</h4>
      <div class="role">${miembro.rol}</div>
      <p>${miembro.bio}</p>
    `;
    cont.appendChild(card);
  });
}
renderEquipo();

document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    renderEquipo(this.dataset.category);
  });
});

// Testimonios
const testimonios = [
  {
    nombre: "Carlos Méndez",
    rol: "Empresario",
    texto: "El apoyo legal que recibí fue fundamental para salvar mi negocio. Atención personalizada y resultados inmediatos.",
    img: "https://randomuser.me/api/portraits/men/81.jpg",
    estrellas: 5
  },
  {
    nombre: "Luz Elena Ramírez",
    rol: "Directora de RRHH",
    texto: "Un equipo honesto y comprometido. Nos ayudaron en una negociación colectiva complicada con gran profesionalismo.",
    img: "https://randomuser.me/api/portraits/women/50.jpg",
    estrellas: 5
  },
  {
    nombre: "Jorge Castillo",
    rol: "Cliente particular",
    texto: "Me defendieron en un caso penal complejo y ganamos. Siempre disponibles y claros con la información.",
    img: "https://randomuser.me/api/portraits/men/55.jpg",
    estrellas: 5
  }
];

function renderTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;
  grid.innerHTML = "";
  testimonios.forEach(t => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <img class="testimonial-avatar" src="${t.img}" alt="${t.nombre}">
      <div class="testimonial-stars">${'★'.repeat(t.estrellas)}</div>
      <div class="testimonial-text">"${t.texto}"</div>
      <div class="testimonial-name">${t.nombre}</div>
      <div class="testimonial-role">${t.rol}</div>
    `;
    grid.appendChild(card);
  });
}
renderTestimonials();

// Casos de éxito slider
const casos = [
  {
    title: "Absolución en caso penal internacional",
    desc: "Defensa exitosa de una empresa mexicana acusada injustamente en el extranjero."
  },
  {
    title: "Fusión corporativa histórica",
    desc: "Asesoría legal integral para la fusión de dos grandes compañías del sector energético."
  },
  {
    title: "Reinstalación colectiva",
    desc: "Logramos la reincorporación de más de 100 trabajadores despedidos injustificadamente."
  }
];

const slider = document.getElementById('cases-slider');
if (slider) {
  casos.forEach(cs => {
    const el = document.createElement('div');
    el.className = 'case-card';
    el.innerHTML = `<h4>${cs.title}</h4><p>${cs.desc}</p>`;
    slider.appendChild(el);
  });
}

// Animated Counters para los stats
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = +el.getAttribute('data-count');
    let count = 0, step = Math.max(1, Math.floor(target / 55));
    const inc = () => {
      count += step;
      if (count >= target) {
        el.textContent = target;
      } else {
        el.textContent = count;
        requestAnimationFrame(inc);
      }
    };
    inc();
  });
}
let statsVisible = false;
window.addEventListener('scroll', () => {
  if (!statsVisible) {
    const stats = document.querySelector('.case-stats');
    if (stats && stats.getBoundingClientRect().top < window.innerHeight - 50) {
      animateCounters();
      statsVisible = true;
    }
  }
});

// Contacto y formularios (prevent default + simple feedback)
document.getElementById('legal-form')?.addEventListener('submit', e => {
  e.preventDefault();
  alert("Gracias por su consulta. Pronto nos contactaremos con usted.");
  e.target.reset();
});
document.getElementById('complaint-form')?.addEventListener('submit', e => {
  e.preventDefault();
  alert("Su reclamación ha sido registrada. Le responderemos a la brevedad.");
  e.target.reset();
});

// FAQ interactivo
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function() {
    this.classList.toggle('active');
    const answer = this.nextElementSibling;
    if (answer.style.display === 'block') {
      answer.style.display = '';
    } else {
      answer.style.display = 'block';
    }
  });
});

// Accesibilidad: cerrar menú móvil con Escape
document.addEventListener('keydown', e => {
  if (e.key === "Escape") {
    if (mainNav && mainNav.classList.contains('open')) mainNav.classList.remove('open');
    if (menuToggle && menuToggle.classList.contains('active')) menuToggle.classList.remove('active');
  }
});