import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionSummary from '@mui/joy/AccordionSummary';
import Card from '@mui/joy/Card';
import React from 'react';

import Markdown from '@chaindesk/ui/Markdown';

type Props = {
  formId: string;
};

function FormInstallTab({ formId }: Props) {
  const installScript = `<script type="module">
  import Form from 'https://cdn.jsdelivr.net/npm/@chaindesk/embeds@latest/dist/form/index.js';

  Form.initStandard({
    formId: '${formId}',
  });
</script>

<chaindesk-form-standard style="width: 100%; height: 650px" />
`;
  const installScriptIframe = `<iframe
  src="${process.env.NEXT_PUBLIC_DASHBOARD_URL}/forms/${formId}"
  width="100%"
  height="100%"
  frameborder="0"
  allow="clipboard-write"
></iframe>
`;

return (
  <Card sx={{ mx: 'auto' }}>
    <AccordionGroup size="lg">
      {/* Componente Web - Integración directa */}
      <Accordion defaultExpanded>
        <AccordionSummary>Componente Web</AccordionSummary>
        <AccordionDetails>
          <Markdown>{`~~~html\n ${installScript} \n~~~`}</Markdown>
          <Typography level="body-sm" sx={{ mt: 2 }}>
            {/* Explicación */}
            Este código permite integrar el formulario directamente en tu sitio web como un componente nativo. 
            Ideal para una integración perfecta con tu diseño existente. Simplemente copia y pega en el HTML 
            donde quieres que aparezca el formulario.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* iFrame - Integración universal */}
      <Accordion>
        <AccordionSummary>iFrame</AccordionSummary>
        <AccordionDetails>
          <Markdown>{`~~~html\n ${installScriptIframe} \n~~~`}</Markdown>
          <Typography level="body-sm" sx={{ mt: 2 }}>
            {/* Explicación */}
            Usa esta opción para incrustar el formulario en cualquier plataforma que permita iframes. 
            Funciona en CMS como WordPress, Shopify o sistemas legacy. El formulario se cargará de forma 
            independiente manteniendo su funcionalidad completa.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Ejemplo de sección adicional (deshabilitada) */}
      {/* <Accordion>
        <AccordionSummary>Tercer método</AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetails>
      </Accordion> */}
    </AccordionGroup>
  </Card>
);
}

export default FormInstallTab;
