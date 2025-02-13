import cuid from 'cuid';

import { FormConfigSchema } from '../types/dtos';

type FormTemplate = {
  name: string;
  description?: string;
  schema: FormConfigSchema;
};

export const FROM_SCRATCH: FormTemplate = {
  name: 'Comenzar desde cero',
  description:
    'Crea un formulario desde cero. Puedes agregar cualquier campo que desees y personalizar el diseño.',
  schema: {
    fields: [
      {
        id: cuid(),
        type: 'email',
        shouldCreateContact: true,
        name: 'email',
        required: true,
      },
    ],
    startScreen: {
      title: 'Título',
      description: 'Descripción',
    },
  },
};

export const CANDIDATE_INTAKE_FORM: FormTemplate = {
  name: 'Formulario de ingreso de candidatos',
  description: 'Un formulario para capturar información básica de los candidatos.',
  schema: {
    overview: `Este formulario está diseñado para recopilar información esencial de los candidatos, como correo electrónico y número de teléfono, para facilitar el proceso de selección.`,
    fields: [
      {
        id: cuid(),
        type: 'email',
        shouldCreateContact: true,
        name: 'email',
        required: true,
        placeholder: 'Ingresa tu correo electrónico',
      },
      {
        id: cuid(),
        type: 'phoneNumber',
        name: 'phone',
        required: true,
        placeholder: 'Ingresa tu número de teléfono',
      },
      {
        id: cuid(),
        type: 'textArea',
        name: 'comment',
        required: false,
        placeholder: 'Ingresa comentarios adicionales',
      },
    ],
    startScreen: {
      title: 'Únete a nuestro equipo',
      description: '¡Estamos aquí para ayudarte! Por favor, completa el formulario a continuación.',
    },
  },
};

export const EMPLOYEE_FEEDBACK_FORM: FormTemplate = {
  name: 'Formulario de retroalimentación de empleados',
  description: 'Un formulario para recopilar comentarios sobre el ambiente laboral y procesos internos.',
  schema: {
    overview: `Este formulario está diseñado para recopilar retroalimentación de los empleados. Tu opinión es valiosa y nos ayuda a mejorar.`,
    fields: [
      {
        id: cuid(),
        type: 'email',
        shouldCreateContact: true,
        name: 'email',
        required: true,
        placeholder: 'Ingresa tu correo electrónico',
      },
      {
        id: cuid(),
        type: 'select',
        name: 'type',
        required: true,
        options: ['Sugerencia', 'Problema', 'Elogio', 'Otro'],
        placeholder: 'Selecciona el tipo de retroalimentación',
      },
      {
        id: cuid(),
        type: 'textArea',
        name: 'comment',
        required: true,
        placeholder: 'Ingresa tus comentarios aquí',
      },
    ],
    startScreen: {
      title: 'Tu opinión es importante',
      description: '¡Estamos aquí para escucharte! Por favor, comparte tus comentarios.',
    },
  },
};

export const ONBOARDING_FORM: FormTemplate = {
  name: 'Formulario de incorporación',
  description: 'Un formulario para recopilar información inicial de nuevos empleados.',
  schema: {
    overview: `Este formulario está diseñado para recopilar información inicial de nuevos empleados y ayudarnos a personalizar su experiencia.`,
    fields: [
      {
        id: cuid(),
        type: 'email',
        shouldCreateContact: true,
        name: 'email',
        required: true,
        placeholder: 'Ingresa tu correo electrónico',
      },
      {
        id: cuid(),
        type: 'select',
        name: 'department',
        required: true,
        options: [
          'Recursos Humanos',
          'Tecnología',
          'Ventas',
          'Marketing',
          'Finanzas',
          'Otro',
        ],
        placeholder: 'Selecciona tu departamento',
      },
      {
        id: cuid(),
        type: 'select',
        name: 'role',
        required: true,
        options: ['Gerente', 'Analista', 'Desarrollador', 'Diseñador', 'Otro'],
        placeholder: 'Selecciona tu puesto',
      },
      {
        id: cuid(),
        type: 'text',
        name: 'emergencyContact',
        required: true,
        placeholder: 'Nombre y teléfono de contacto de emergencia',
      },
    ],
    startScreen: {
      title: 'Bienvenido a Bravilo',
      description: '¡Estamos emocionados de tenerte aquí! Comencemos con el proceso de incorporación.',
    },
  },
};

// Ocultar plantillas no relevantes para HR
/*
export const INBOUND_LEAD: FormTemplate = {
  name: 'Inbound Lead',
  description:
    'Attract potential clients at the beginning of any funnel, prompting them to submit their contact information.',
  schema: {
    overview: `A conversation to convince potential prospect about Acme Inc. solution.
    Start by giving a brief intro about Acme.
    Ask for the email only if they are interested in receiving email updates.`,
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
        name: 'Intested in',
        options: [
          'Website Dev',
          'Content Marketing',
          'Social Media',
          'UI/UX Design',
        ],
        required: true,
      },
    ],
    startScreen: {
      title: 'Awesome Company',
      description: "Welcome on board! Let's get to know each other!",
    },
  },
};

export const CONTACT_SALES: FormTemplate = {
  name: 'Contact sales',
  description:
    'Prepare and assess potential clients before they arrange a discussion with your sales representatives.',
  schema: {
    overview: `A conversation to convince potential prospect about Acme Inc. solution.
    Start by giving a brief intro about Acme.
    Ask for the email only if they are interested in receiving email updates.
    At Acme Inc., we're dedicated to providing top-notch solutions and services to meet your needs. 
    With a team of experts committed to excellence, we strive to deliver innovative products that redefine industry standards.`,
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
        name: 'Interested in',
        options: [
          'Website Dev',
          'Content Marketing',
          'Social Media',
          'UI/UX Design',
        ],
        required: true,
      },
    ],
    startScreen: {
      title: 'Contact sales',
      description: 'Learn about our Enterprise Plan',
    },
  },
};

export const FEEDBACK: FormTemplate = {
  name: 'Product Feedback',
  description:
    'Obtain opinions on a product through an engaging dialogue-based approach.',
  schema: {
    overview: `Gather feedback from new customer of one of our model of sneaker
    Acme Clothes is a distinguished fashion brand renowned for its high-quality, stylish apparel. 
    Offering a wide range of clothing options for men, women, and kids, Acme Clothes combines comfort with contemporary trends to create unique and versatile pieces suitable for every occasion.`,
    fields: [
      {
        id: cuid(),
        type: 'text',
        name: 'model purchased',
        required: true,
      },
      {
        id: cuid(),
        type: 'text',
        name: 'Size fitting',
        required: true,
      },
      {
        id: cuid(),
        type: 'text',
        name: 'Price value assessment ',
        required: true,
      },
      {
        id: cuid(),
        type: 'number',
        name: 'Overall satisfaction (1-5)',
        required: true,
      },
    ],
    startScreen: {
      title: 'Sneaker.com',
      description: 'Let us know how we can improve our product',
    },
  },
};
*/