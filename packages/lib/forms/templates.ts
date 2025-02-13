import cuid from 'cuid';

import { FormConfigSchema } from '../types/dtos';

type FormTemplate = {
  name: string;
  description?: string;
  schema: FormConfigSchema;
};

export const FROM_SCRATCH: FormTemplate = {
  name: 'Start From Scratch',
  description:
    'Create a form tailored to your HR needs. Add fields that best represent your candidate evaluation and recruitment process.',
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
      title: 'Welcome to Your Custom HR Form',
      description: 'Begin building your recruitment process with personalized fields.',
    },
  },
};

export const LEAD_FORM: FormTemplate = {
  name: 'Candidate Lead Form',
  description: 'A form to capture essential candidate details including email, phone, and initial assessment.',
  schema: {
    overview: `This form helps you capture essential candidate information including email, phone number, and their initial assessment to start building a relationship.`,
    fields: [
      {
        id: cuid(),
        type: 'email',
        shouldCreateContact: true,
        name: 'email',
        required: true,
        placeholder: 'Enter your email',
      },
      {
        id: cuid(),
        type: 'phoneNumber',
        name: 'phone',
        required: true,
        placeholder: 'Enter your phone number',
      },
      {
        id: cuid(),
        type: 'textArea',
        name: 'comment',
        required: false,
        placeholder: 'Any additional comments?',
      },
    ],
    startScreen: {
      title: 'Connect with Candidates',
      description: 'We are eager to get to know you. Please fill out the form below to initiate the recruitment process.',
    },
  },
};

export const PRODUCT_FEEDBACK_FORM: FormTemplate = {
  name: 'Candidate Feedback Form',
  description: 'A form to gather feedback on candidates’ job performance and fit within your organization.',
  schema: {
    overview: `Collect insights on how candidates perform and fit within your company culture. This feedback helps improve future hiring decisions.`,
    fields: [
      {
        id: cuid(),
        type: 'email',
        shouldCreateContact: true,
        name: 'email',
        required: true,
        placeholder: 'Enter your email',
      },
      {
        id: cuid(),
        type: 'select',
        name: 'feedback_type',
        required: true,
        options: ['Positive', 'Neutral', 'Negative'],
        placeholder: 'Select feedback type',
      },
      {
        id: cuid(),
        type: 'textArea',
        name: 'comment',
        required: true,
        placeholder: 'Your feedback here',
      },
      {
        id: cuid(),
        type: 'file',
        name: 'attachments',
        required: false,
        placeholder: 'Attach documents (optional)',
      },
    ],
    startScreen: {
      title: 'Your Feedback Is Valuable',
      description: "We appreciate your input! Please share your feedback on this candidate's performance.",
    },
  },
};

export const ONBOARDING_FORM: FormTemplate = {
  name: 'Employee Onboarding Form',
  description: 'A form to gather initial details about new hires to better integrate them into your organization.',
  schema: {
    overview: `This form collects key information to help onboard new employees, ensuring a smooth transition into their roles.`,
    fields: [
      {
        id: cuid(),
        type: 'email',
        shouldCreateContact: true,
        name: 'email',
        required: true,
        placeholder: 'Enter your email',
      },
      {
        id: cuid(),
        type: 'select',
        name: 'department',
        required: true,
        options: [
          'Human Resources',
          'Sales',
          'Engineering',
          'Marketing',
          'Customer Support',
        ],
        placeholder: 'Select your department',
      },
      {
        id: cuid(),
        type: 'select',
        name: 'team_size',
        required: true,
        options: ['Small (1-10)', 'Medium (10-50)', 'Large (50+)'],
        placeholder: 'Select your team size',
      },
      {
        id: cuid(),
        type: 'select',
        name: 'source_of_referral',
        required: true,
        options: [
          'Referral',
          'Job Board',
          'Recruitment Agency',
          'LinkedIn',
          'Other',
        ],
        placeholder: 'How did you hear about us?',
      },
    ],
    startScreen: {
      title: 'Welcome to the Team',
      description: 'We are thrilled to have you on board! Let’s start your journey with us.',
    },
  },
};

export const INBOUND_LEAD: FormTemplate = {
  name: 'Inbound Candidate Lead',
  description:
    'Attract potential candidates at the start of your recruitment funnel, prompting them to share their contact details.',
  schema: {
    overview: `This form is designed to attract potential candidates by offering them the opportunity to submit their contact information and express interest in job openings.`,
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
          'Software Developer',
          'Marketing Specialist',
          'Customer Support',
          'HR Coordinator',
        ],
        required: true,
      },
    ],
    startScreen: {
      title: 'Explore Opportunities',
      description: 'Welcome! Let’s start the process by collecting some basic information.',
    },
  },
};

export const CONTACT_SALES: FormTemplate = {
  name: 'Contact HR',
  description:
    'Prepare and assess potential candidates before scheduling a meeting with your HR representatives.',
  schema: {
    overview: `This form collects candidate details and helps HR assess their fit for available roles.`,
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
          'Human Resources',
          'Sales',
          'Technology',
          'Marketing',
        ],
        required: true,
      },
    ],
    startScreen: {
      title: 'Contact HR',
      description: 'Let’s get in touch to discuss the next steps in your recruitment process.',
    },
  },
};