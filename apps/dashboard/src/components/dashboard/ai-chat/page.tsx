"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';import { Robot as RobotIcon } from '@phosphor-icons/react/dist/ssr/Robot';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';

import { appConfig } from '@/config/app';


// Define message type for chat
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// AI Model type
interface AIModel {
  id: string;
  name: string;
  description: string;
  provider: string;
}

// Sample AI models
const aiModels: AIModel[] = [
  { 
    id: 'model1', 
    name: 'GPT-4', 
    description: 'Most capable model for complex tasks',
    provider: 'OpenAI' 
  },
  { 
    id: 'model2', 
    name: 'Claude 3', 
    description: 'Balanced model with excellent reasoning',
    provider: 'Anthropic' 
  },
  { 
    id: 'model3', 
    name: 'Gemini Pro', 
    description: 'Versatile model with wide knowledge',
    provider: 'Google' 
  },
  { 
    id: 'model4', 
    name: 'Llama 3', 
    description: 'Open source model with good performance',
    provider: 'Meta' 
  },
];

// Initial sample messages
const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! How can I assist you today?',
    sender: 'ai',
    timestamp: new Date(),
  },
];

export default function AIChatPage(): React.JSX.Element {
  const theme = useTheme();
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = React.useState<string>('');
  const [selectedModel, setSelectedModel] = React.useState<string>('model1');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const textFieldRef = React.useRef<HTMLDivElement>(null);
  const [textFieldHeight, setTextFieldHeight] = React.useState<number>(56); // Initial height
  
  // Auto-scroll to bottom of messages
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setTextFieldHeight(56); // Reset height
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        content: `I'm a simulated AI response to: "${newMessage}"`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  // Handle text input, including Enter key
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  // Handle input change and auto-resize
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
    adjustTextFieldHeight();
  };

  // Adjust text field height based on content
  const adjustTextFieldHeight = () => {
    const textField = textFieldRef.current?.querySelector('textarea');
    if (textField) {
      // Reset height temporarily to get the correct scrollHeight
      textField.style.height = 'auto';
      
      // Calculate new height (clamped between 56px and 200px)
      const newHeight = Math.min(Math.max(56, textField.scrollHeight), 200);
      textField.style.height = `${newHeight}px`;
      setTextFieldHeight(newHeight);
    }
  };

  // Handle model selection
  const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedModel(event.target.value);
  };

  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Grid container spacing={3}>
        {/* Main Chat Area */}
        <Grid item xs={12} md={9}>
          <Card sx={{ height: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column' }}>
            {/* Chat Messages Area */}
            <Box 
              sx={{ 
                flex: 1, 
                overflow: 'auto', 
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {messages.map((message) => (
                <Stack
                  key={message.id}
                  direction="row"
                  spacing={2}
                  sx={{
                    alignItems: 'flex-start',
                    alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                  }}
                >
                  {message.sender === 'ai' && (
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <RobotIcon fontSize="var(--Icon-fontSize)" />
                    </Avatar>
                  )}
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: message.sender === 'user' 
                        ? 'primary.main' 
                        : theme.palette.mode === 'dark' 
                          ? 'background.level1' 
                          : 'background.paper',
                      color: message.sender === 'user' 
                        ? 'primary.contrastText' 
                        : 'text.primary',
                    }}
                  >
                    <Typography variant="body1">{message.content}</Typography>
                  </Paper>
                  {message.sender === 'user' && (
                    <Avatar>
                      <UserIcon fontSize="var(--Icon-fontSize)" />
                    </Avatar>
                  )}
                </Stack>
              ))}
              <div ref={messagesEndRef} />
            </Box>
            
            {/* Message Input Area */}
            <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Stack direction="row" spacing={1} alignItems="flex-end">
                <TextField
                  ref={textFieldRef}
                  fullWidth
                  multiline
                  maxRows={4}
                  placeholder="Type your message here..."
                  variant="outlined"
                  value={newMessage}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      '& textarea': {
                        transition: 'height 0.2s',
                        height: `${textFieldHeight}px`,
                        resize: 'none',
                      },
                    },
                  }}
                />
<IconButton
  size="large"
  color="primary"
  onClick={handleSendMessage}
  disabled={newMessage.trim() === ''}
  sx={{
    height: 56,
    width: 56,
    borderRadius: 2,
    bgcolor: 'primary.main',
    color: 'white',
    '&:hover': {
      bgcolor: 'primary.dark',
    },
    '&.Mui-disabled': {
      bgcolor: 'action.disabledBackground',
      color: 'action.disabled',
    },
  }}
>
  <SendIcon />
</IconButton>

              </Stack>
            </Box>
          </Card>
        </Grid>
        
        {/* Right Panel - Model Selection */}
        <Grid item xs={12} md={3}>
          <Card sx={{ height: 'calc(100vh - 180px)', p: 2, overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Select AI Model
            </Typography>
            <RadioGroup
              value={selectedModel}
              onChange={handleModelChange}
            >
              {aiModels.map((model) => (
                <Paper
                  key={model.id}
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: selectedModel === model.id 
                      ? 'primary.main' 
                      : 'divider',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: '0 0 0 1px var(--mui-palette-primary-main)',
                    },
                  }}
                >
                  <FormControlLabel
                    value={model.id}
                    control={<Radio />}
                    label={
                      <Stack spacing={1}>
                        <Typography variant="subtitle1">{model.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {model.provider}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {model.description}
                        </Typography>
                      </Stack>
                    }
                    sx={{
                      width: '100%',
                      margin: 0,
                      alignItems: 'flex-start',
                      '& .MuiFormControlLabel-label': {
                        width: '100%',
                      },
                    }}
                  />
                </Paper>
              ))}
            </RadioGroup>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}