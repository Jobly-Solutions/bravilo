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

export const INBOUND_LEAD: FormTemplate = {
  name: 'Candidato potencial',
  description:
    'Atrae a candidatos potenciales al inicio de tu proceso de reclutamiento, solicitándoles que compartan su información de contacto.',
  schema: {
    overview: `Este formulario está diseñado para atraer a candidatos potenciales, ofreciéndoles la oportunidad de enviar su información de contacto y expresar interés en las vacantes disponibles.`,
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
        name: 'interested_in',
        options: [
          'Desarrollador de Software',
          'Especialista en Marketing',
          'Soporte al Cliente',
          'Coordinador de Recursos Humanos',
        ],
        required: true,
      },
    ],
    startScreen: {
      title: 'Explora oportunidades',
      description: '¡Bienvenido! Comencemos el proceso recopilando algunos datos básicos.',
    },
  },
};

export const CONTACT_HR: FormTemplate = {
  name: 'Contactar a Recursos Humanos',
  description:
    'Prepara y evalúa a candidatos potenciales antes de programar una reunión con los representantes de Recursos Humanos.',
  schema: {
    overview: `Este formulario recopila detalles de los candidatos y ayuda a Recursos Humanos a evaluar su adecuación para los puestos disponibles.`,
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
        name: 'Interested_in',
        options: [
          'Recursos Humanos',
          'Ventas',
          'Tecnología',
          'Marketing',
        ],
        required: true,
      },
    ],
    startScreen: {
      title: 'Contactar a Recursos Humanos',
      description: 'Pongámonos en contacto para discutir los siguientes pasos en tu proceso de reclutamiento.',
    },
  },
};

export const FEEDBACK: FormTemplate = {
  name: 'Retroalimentación del candidato',
  description:
    'Obtén opiniones sobre el proceso de selección a través de un enfoque basado en diálogos interactivos.',
  schema: {
    overview: `Recopila retroalimentación de los candidatos sobre su experiencia durante el proceso de selección. Esta información nos ayuda a mejorar continuamente.`,
    fields: [
      {
        id: cuid(),
        type: 'text',
        name: 'position_applied',
        required: true,
        placeholder: 'Puesto al que aplicaste',
      },
      {
        id: cuid(),
        type: 'text',
        name: 'interview_experience',
        required: true,
        placeholder: 'Describe tu experiencia en la entrevista',
      },
      {
        id: cuid(),
        type: 'number',
        name: 'overall_satisfaction',
        required: true,
        placeholder: 'Satisfacción general (1-5)',
      },
    ],
    startScreen: {
      title: 'Tu opinión es importante',
      description: '¡Gracias por participar en nuestro proceso de selección! Por favor, comparte tus comentarios.',
    },
  },
};