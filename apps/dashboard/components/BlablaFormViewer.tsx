import {
  Button,
  CircularProgress,
  Input,
  Stack,
  styled,
  Typography,
} from '@mui/joy';
import { motion } from 'framer-motion';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import useConfetti from '@app/hooks/useConfetti';

import slugify from '@chaindesk/lib/slugify';
import { FormConfigSchema } from '@chaindesk/lib/types/dtos';
import { ConversationChannel } from '@chaindesk/prisma';
import TraditionalForm from '@chaindesk/ui/embeds/forms/traditional';
import useChat from '@chaindesk/ui/hooks/useChat';
import useStateReducer from '@chaindesk/ui/hooks/useStateReducer';
import Motion from '@chaindesk/ui/Motion';
import PoweredBy from '@chaindesk/ui/PoweredBy';

import { formType } from './BlablaFormEditor/FieldsInput';

type Props = {
  formId: string;
  conversationId?: string;
  messageId?: string;
  config?: FormConfigSchema;
  type: 'conversational' | 'traditional';
  isInEditor?: boolean;
};

const FormButton = styled(Button)({
  borderRadius: '100px',
  fontSize: '2rem',
  fontWeight: '400',
  transition: 'transform 0.1s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05) !important',
  },
});

const FormText = styled(Typography)({
  wordWrap: 'break-word',
  whiteSpace: 'normal',
  textAlign: 'left',
  transition: 'all 1s ease-in-out',
  fontWeight: '600',
});

export const LOCAL_STORAGE_CONVERSATION_KEY = 'formConversationId';

function BlablaFormViewer({
  formId,
  conversationId,
  messageId,
  config,
  type,
  isInEditor,
}: Props) {
  const triggerConfetti = useConfetti();

  const [state, setState] = useStateReducer({
    currentAnswer: '',
    isConversationStarted: false,
  });

  const chatData = useChat({
    endpoint: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/api/forms/${formId}/chat?draft=true`,
    localStorageConversationIdKey: `${LOCAL_STORAGE_CONVERSATION_KEY}-${formId}`,
    channel: ConversationChannel.form,
  });

  const answerQuestion = async (answer: string) => {
    await chatData.handleChatSubmit({ query: answer });
  };

  const currentFieldName = chatData?.history?.[chatData.history.length - 1]?.metadata?.currentField;

  const currentField = useMemo(() => {
    return config?.fields?.find(
      (field) => slugify(field?.name ?? '') === currentFieldName
    );
  }, [currentFieldName, config?.fields]);

  const initiateForm = () => {
    localStorage.setItem('conversationId', '');
    setState({ isConversationStarted: true });
    if (type === formType.conversational) {
      answerQuestion('👋');
    }
  };

  const lastMessage = chatData?.history[chatData.history.length - 1];
  const isFormValid = lastMessage?.metadata?.isValid;
  const lastMessageText = useMemo(() => {
    return lastMessage?.message?.replace?.(/__BLABLA.*/, '') || '';
  }, [lastMessage?.message]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_CONVERSATION_KEY, '');
    }
  }, []);

  useEffect(() => {
    if (isFormValid) {
      triggerConfetti();
    }
  }, [isFormValid]);

  return (
    <Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden', width: '100%', height: '100%', p: 4 }}>
      {!config ? (
        <CircularProgress size="sm" color="neutral" />
      ) : (
        <Stack sx={{ width: '100%', height: '100%', overflowY: 'auto' }} gap={5}>
          {type === formType.traditional && (
            <TraditionalForm formId={formId} conversationId={conversationId} messageId={messageId} config={config} isInEditor={isInEditor} />
          )}
          {type === formType.conversational && (
            <Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {({ ref }: { ref: React.Ref<HTMLSpanElement> }) => (
                <span ref={ref}>
                  {chatData.history.length > 0 && lastMessage.from === 'agent' && (
                    <FormText level="h1" sx={{ fontSize: '1.8rem', opacity: chatData.isStreaming ? 1 : 0.7 }}>
                      {lastMessageText}
                    </FormText>
                  )}
                </span>
              )}
            </Motion>
          )}
        </Stack>
      )}
      {type === formType.conversational && (
        <Stack sx={{ position: 'fixed', bottom: 15 }}>
          <PoweredBy />
        </Stack>
      )}
    </Stack>
  );
}

export default BlablaFormViewer;