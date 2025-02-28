"use client";

import * as React from 'react';
// Entferne die metadata-Zeile komplett
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FloppyDisk as FloppyDiskIcon } from '@phosphor-icons/react/dist/ssr/FloppyDisk';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Info as InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';

import { appConfig } from '@/config/app';

// Entferne diese Zeile komplett!
// export const metadata = { title: `AI Settings | Dashboard | ${appConfig.name}` } satisfies Metadata;

// Interface for API settings
interface APISettings {
  provider: 'openai' | 'anthropic' | 'google' | 'custom';
  apiKey: string;
  baseUrl: string;
  timeout: number;
  enableCache: boolean;
  enableRateLimiting: boolean;
}

// Default settings
const defaultSettings: APISettings = {
  provider: 'openai',
  apiKey: '',
  baseUrl: '',
  timeout: 30000,
  enableCache: true,
  enableRateLimiting: true,
};

export default function AISettingsPage(): React.JSX.Element {
  // State for settings
  const [settings, setSettings] = React.useState<APISettings>(defaultSettings);
  const [showApiKey, setShowApiKey] = React.useState<boolean>(false);
  const [saveStatus, setSaveStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  
  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Reset save status when form is modified
    if (saveStatus !== 'idle') {
      setSaveStatus('idle');
    }
  };
  
  // Handle provider change
  const handleProviderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const provider = event.target.value as APISettings['provider'];
    
    // Set default base URL based on provider
    let baseUrl = '';
    switch (provider) {
      case 'openai':
        baseUrl = 'https://api.openai.com/v1';
        break;
      case 'anthropic':
        baseUrl = 'https://api.anthropic.com/v1';
        break;
      case 'google':
        baseUrl = 'https://generativelanguage.googleapis.com/v1';
        break;
      case 'custom':
        baseUrl = '';
        break;
    }
    
    setSettings(prev => ({
      ...prev,
      provider,
      baseUrl,
    }));
    
    // Reset save status when form is modified
    if (saveStatus !== 'idle') {
      setSaveStatus('idle');
    }
  };
  
  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate form
    if (!settings.apiKey) {
      setSaveStatus('error');
      return;
    }
    
    // In a real app, you would save the settings to the server
    console.log('Saving settings:', settings);
    
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('success');
      
      // Reset status after a while
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    }, 500);
  };
  
  // Get provider name
  const getProviderName = (provider: APISettings['provider']): string => {
    switch (provider) {
      case 'openai':
        return 'OpenAI';
      case 'anthropic':
        return 'Anthropic';
      case 'google':
        return 'Google AI';
      case 'custom':
        return 'Custom Provider';
      default:
        return provider;
    }
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
        <Grid item xs={12} md={8} lg={6}>
          <form onSubmit={handleSubmit}>
            <Card>
              <Box sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Typography variant="h5">AI Provider Settings</Typography>
                  
                  {saveStatus === 'success' && (
                    <Alert 
                      icon={<CheckIcon fontSize="inherit" />}
                      severity="success"
                      sx={{ mb: 2 }}
                    >
                      <AlertTitle>Settings saved successfully</AlertTitle>
                      Your AI provider settings have been updated.
                    </Alert>
                  )}
                  
                  {saveStatus === 'error' && (
                    <Alert 
                      severity="error"
                      sx={{ mb: 2 }}
                    >
                      <AlertTitle>Error saving settings</AlertTitle>
                      Please check your API key and try again.
                    </Alert>
                  )}
                  
                  <FormControl component="fieldset">
                    <Typography variant="subtitle1" gutterBottom>
                      Select AI Provider
                    </Typography>
                    <RadioGroup
                      name="provider"
                      value={settings.provider}
                      onChange={handleProviderChange}
                    >
                      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ flexWrap: 'wrap' }}>
                        {(['openai', 'anthropic', 'google', 'custom'] as const).map((provider) => (
                          <Paper
                            key={provider}
                            elevation={1}
                            sx={{
                              p: 2,
                              minWidth: '170px',
                              borderRadius: 2,
                              border: '1px solid',
                              borderColor: settings.provider === provider 
                                ? 'primary.main' 
                                : 'divider',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              '&:hover': {
                                borderColor: 'primary.main',
                                boxShadow: '0 0 0 1px var(--mui-palette-primary-main)',
                              },
                            }}
                            onClick={() => {
                              setSettings(prev => ({
                                ...prev,
                                provider,
                                baseUrl: 
                                  provider === 'openai' ? 'https://api.openai.com/v1' :
                                  provider === 'anthropic' ? 'https://api.anthropic.com/v1' :
                                  provider === 'google' ? 'https://generativelanguage.googleapis.com/v1' :
                                  '',
                              }));
                            }}
                          >
                            <FormControlLabel
                              value={provider}
                              control={<Radio />}
                              label={getProviderName(provider)}
                              sx={{
                                width: '100%',
                                margin: 0,
                                '& .MuiFormControlLabel-label': {
                                  width: '100%',
                                  fontSize: '0.9rem',
                                  fontWeight: 500,
                                },
                              }}
                            />
                          </Paper>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                  
                  <Divider />
                  
                  <TextField
                    label="API Key"
                    name="apiKey"
                    value={settings.apiKey}
                    onChange={handleChange}
                    fullWidth
                    required
                    type={showApiKey ? 'text' : 'password'}
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowApiKey(!showApiKey)} edge="end">
                            {showApiKey ? <EyeSlashIcon /> : <EyeIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <TextField
                    label="Base URL"
                    name="baseUrl"
                    value={settings.baseUrl}
                    onChange={handleChange}
                    fullWidth
                    placeholder={
                      settings.provider === 'openai' ? 'https://api.openai.com/v1' :
                      settings.provider === 'anthropic' ? 'https://api.anthropic.com/v1' :
                      settings.provider === 'google' ? 'https://generativelanguage.googleapis.com/v1' :
                      'Enter custom base URL'
                    }
                    InputProps={{
                      endAdornment: settings.provider !== 'custom' && (
                        <InputAdornment position="end">
                          <Tooltip title="Using default endpoint for selected provider">
                            <InfoIcon fontSize="small" color="action" />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    disabled={settings.provider !== 'custom'}
                    helperText={settings.provider !== 'custom' 
                      ? "Using default endpoint for selected provider" 
                      : "Enter your custom API endpoint URL"
                    }
                  />
                  
                  <TextField
                    label="Request Timeout (ms)"
                    name="timeout"
                    type="number"
                    value={settings.timeout}
                    onChange={handleChange}
                    fullWidth
                    inputProps={{ min: 1000, step: 1000 }}
                    helperText="Maximum time to wait for API response in milliseconds"
                  />
                  
                  <Divider />
                  
                  <Typography variant="subtitle1" gutterBottom>
                    Advanced Settings
                  </Typography>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        name="enableCache"
                        checked={settings.enableCache}
                        onChange={handleChange}
                      />
                    }
                    label="Enable Response Caching"
                  />
                  <FormHelperText>
                    Cache identical requests to improve performance and reduce API costs
                  </FormHelperText>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        name="enableRateLimiting"
                        checked={settings.enableRateLimiting}
                        onChange={handleChange}
                      />
                    }
                    label="Enable Rate Limiting"
                  />
                  <FormHelperText>
                    Automatically manage request rates to avoid hitting API limits
                  </FormHelperText>
                </Stack>
              </Box>
              
              <Divider />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<FloppyDiskIcon />}
                  disabled={saveStatus === 'success'}
                >
                  Save Settings
                </Button>
              </Box>
            </Card>
          </form>
        </Grid>
        
        <Grid item xs={12} md={4} lg={6}>
          <Stack spacing={3}>
            <Card>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Getting Your API Key
                </Typography>
                
                <Stack spacing={2}>
                  <Typography variant="body2">
                    To use AI features, you need to obtain an API key from your chosen provider:
                  </Typography>
                  
                  <Box component="ul" sx={{ pl: 2 }}>
                    <li>
                      <Typography variant="body2" gutterBottom>
                        <strong>OpenAI:</strong> Sign up at{' '}
                        <Link href="https://platform.openai.com/api-keys" target="_blank">
                          platform.openai.com
                        </Link>
                        {' '}and create an API key.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" gutterBottom>
                        <strong>Anthropic:</strong> Get access at{' '}
                        <Link href="https://console.anthropic.com/" target="_blank">
                          console.anthropic.com
                        </Link>
                        .
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" gutterBottom>
                        <strong>Google AI:</strong> Get API key from{' '}
                        <Link href="https://ai.google.dev/" target="_blank">
                          ai.google.dev
                        </Link>
                        .
                      </Typography>
                    </li>
                  </Box>
                  
                  <Alert severity="info">
                    Your API key is stored securely and only used for communicating with the AI service.
                  </Alert>
                </Stack>
              </Box>
            </Card>
            
            <Card>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Usage & Billing
                </Typography>
                
                <Typography variant="body2" paragraph>
                  Each AI provider has different pricing models. You are billed directly by the provider
                  based on your API usage.
                </Typography>
                
                <Alert severity="warning">
                  <AlertTitle>Important</AlertTitle>
                  Set up usage limits with your AI provider to avoid unexpected charges.
                </Alert>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

// Link component for documentation links
function Link({ href, children, target }: { href: string; children: React.ReactNode; target?: string }) {
  return (
    <Typography
      component="a"
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      sx={{
        color: 'primary.main',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      }}
    >
      {children}
    </Typography>
  );
}