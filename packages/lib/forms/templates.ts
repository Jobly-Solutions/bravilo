export const ONBOARDING_FORM: FormTemplate = {
  name: 'Formulario de Incorporación',
  description: 'Un formulario para recoger información inicial sobre nuevos usuarios.',
  schema: {
    overview: `Este formulario está diseñado para recoger información inicial sobre nuevos usuarios y ayudarnos a personalizar nuestros servicios según sus necesidades.`,
    fields: [
      {
        id: cuid(),
        type: 'email',
        shouldCreateContact: true,
        name: 'email',
        required: true,
        placeholder: 'Ingresa tu email',
      },
      {
        id: cuid(),
        type: 'select',
        name: 'industry',
        required: true,
        options: [
          'Tecnología',
          'E-commerce',
          'Salud',
          'Finanzas',
          'Retail',
          'Manufactura',
          'Otro',
        ],
        placeholder: 'Selecciona tu industria',
      },
      {
        id: cuid(),
        type: 'select',
        name: 'company size',
        required: true,
        options: ['1-10', '10-100', '100+'],
        placeholder: 'Selecciona el tamaño de tu empresa',
      },
      {
        id: cuid(),
        type: 'select',
        name: '¿Dónde escuchaste sobre nosotros?',
        required: true,
        options: [
          'Google',
          'Redes Sociales',
          'Boletín Informativo',
          'Boca a boca',
          'Feria Comercial',
          'Otro',
        ],
        placeholder: '¿Dónde escuchaste sobre nosotros?',
      },
    ],
    startScreen: {
      title: 'Bienvenido a nuestra plataforma',
      description: "¡Estamos emocionados de tenerte aquí! Vamos a empezar.",
    },
  },
};

export const INBOUND_LEAD: FormTemplate = {
  name: 'Lead Entrante',
  description:
    'Atrae posibles clientes al inicio de cualquier embudo, solicitando su información de contacto.',
  schema: {
    overview: `Una conversación para convencer a los posibles prospectos sobre la solución de Acme Inc.

    Comienza dando una breve introducción sobre Acme.
    
    Pide el email solo si están interesados en recibir actualizaciones por correo electrónico.`,
    fields: [
      {
        id: cuid(),
        type: 'text',
        name: 'firstName',
        required: true,
      },
      {
        id: cuid(),
        type: 'email',
        shouldCreateContact: true,
        name: 'email',
        required: true,
      },
      {
        id: cuid(),
        type: 'select',
        name: 'Interesado en',
        options: [
          'Desarrollo de Sitios Web',
          'Marketing de Contenidos',
          'Redes Sociales',
          'Diseño UI/UX',
        ],
        required: true,
      },
    ],
    startScreen: {
      title: 'Empresa Asombrosa',
      description: "¡Bienvenido a bordo! Conozcámonos mejor.",
    },
  },
};

export const CONTACT_SALES: FormTemplate = {
  name: 'Contactar Ventas',
  description:
    'Prepara y evalúa posibles clientes antes de que agenden una reunión con tu equipo de ventas.',
  schema: {
    overview: `Una conversación para convencer a los posibles prospectos sobre la solución de Acme Inc.

    Comienza dando una breve introducción sobre Acme.
    
    Pide el email solo si están interesados en recibir actualizaciones por correo electrónico.

    En Acme Inc., estamos dedicados a ofrecer soluciones y servicios de primer nivel para satisfacer tus necesidades. 
    Con un equipo de expertos comprometidos con la excelencia, nos esforzamos por ofrecer productos innovadores que redefinen los estándares de la industria.`,
    fields: [
      {
        id: cuid(),
        type: 'text',
        name: 'firstName',
        required: true,
      },
      {
        id: cuid(),
        type: 'email',
        shouldCreateContact: true,
        name: 'email',
        required: true,
      },
      {
        id: cuid(),
        type: 'select',
        name: 'Interesado en',
        options: [
          'Desarrollo de Sitios Web',
          'Marketing de Contenidos',
          'Redes Sociales',
          'Diseño UI/UX',
        ],
        required: true,
      },
    ],
    startScreen: {
      title: 'Contactar Ventas',
      description: 'Conoce nuestro Plan Empresarial',
    },
  },
};
