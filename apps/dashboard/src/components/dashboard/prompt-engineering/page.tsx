"use client";

import * as React from 'react';
// Die Metadata-Import und Export werden entfernt
// import type { Metadata } from 'next';
// export const metadata = { title: `Prompt Engineering | Dashboard | ${appConfig.name}` } satisfies Metadata;

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slider from '@mui/material/Slider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';
import { FloppyDisk as FloppyDiskIcon } from '@phosphor-icons/react/dist/ssr/FloppyDisk';
import { TrashSimple as TrashSimpleIcon } from '@phosphor-icons/react/dist/ssr/TrashSimple';
import { FileTxt as FileTxtIcon } from '@phosphor-icons/react/dist/ssr/FileTxt';
import { FileDoc as FileDocIcon } from '@phosphor-icons/react/dist/ssr/FileDoc';
import { FilePdf as FilePdfIcon } from '@phosphor-icons/react/dist/ssr/FilePdf';
import { ArrowsClockwise as ArrowsClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowsClockwise';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

import { appConfig } from '@/config/app';


// Define Prompt type
interface Prompt {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define File type for reference files
interface FileItem {
  id: string;
  name: string;
  type: 'txt' | 'doc' | 'pdf';
  size: string;
  createdAt: Date;
}

// Sample files
const sampleFiles: FileItem[] = [
  {
    id: 'file1',
    name: 'Overview.txt',
    type: 'txt',
    size: '24 KB',
    createdAt: new Date(2023, 5, 12),
  },
  {
    id: 'file2',
    name: 'Specifications.doc',
    type: 'doc',
    size: '128 KB',
    createdAt: new Date(2023, 6, 3),
  },
  {
    id: 'file3',
    name: 'Report.pdf',
    type: 'pdf',
    size: '2.3 MB',
    createdAt: new Date(2023, 7, 15),
  },
  {
    id: 'file4',
    name: 'Instructions.txt',
    type: 'txt',
    size: '16 KB',
    createdAt: new Date(2023, 8, 22),
  },
  {
    id: 'file5',
    name: 'Analysis.doc',
    type: 'doc',
    size: '345 KB',
    createdAt: new Date(2023, 9, 7),
  },
  {
    id: 'file6',
    name: 'Guidelines.pdf',
    type: 'pdf',
    size: '1.8 MB',
    createdAt: new Date(2023, 10, 19),
  },
];

export default function PromptEngineeringPage(): React.JSX.Element {
  // State for prompt editor
  const [promptTitle, setPromptTitle] = React.useState<string>('');
  const [promptContent, setPromptContent] = React.useState<string>('');
  const [savedPrompts, setSavedPrompts] = React.useState<Prompt[]>([]);
  
  // State for dialogs
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState<boolean>(false);
  const [deletePromptId, setDeletePromptId] = React.useState<string | null>(null);
  const [loadDialogOpen, setLoadDialogOpen] = React.useState<boolean>(false);
  const [loadPromptId, setLoadPromptId] = React.useState<string | null>(null);
  
  // State for right panel
  const [temperature, setTemperature] = React.useState<number>(1.0);
  const [maxTokens, setMaxTokens] = React.useState<number>(2048);

  // Textarea ref for calculating height
  const textareaRef = React.useRef<HTMLDivElement>(null);
  
  // Handle saving a prompt
  const handleSavePrompt = () => {
    if (!promptTitle.trim()) {
      alert('Please enter a title for your prompt');
      return;
    }
    
    if (!promptContent.trim()) {
      alert('Please enter content for your prompt');
      return;
    }
    
    const now = new Date();
    const newPrompt: Prompt = {
      id: `prompt-${Date.now()}`,
      title: promptTitle,
      content: promptContent,
      createdAt: now,
      updatedAt: now,
    };
    
    setSavedPrompts([...savedPrompts, newPrompt]);
    // Clear form after saving
    setPromptTitle('');
    setPromptContent('');
  };
  
  // Delete prompt dialog handlers
  const openDeleteDialog = (id: string) => {
    setDeletePromptId(id);
    setDeleteDialogOpen(true);
  };
  
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeletePromptId(null);
  };
  
  const confirmDelete = () => {
    if (deletePromptId) {
      setSavedPrompts(savedPrompts.filter(prompt => prompt.id !== deletePromptId));
    }
    closeDeleteDialog();
  };
  
  // Load prompt dialog handlers
  const openLoadDialog = (id: string) => {
    // Only open dialog if current prompt has content
    if (promptTitle.trim() || promptContent.trim()) {
      setLoadPromptId(id);
      setLoadDialogOpen(true);
    } else {
      // If no content, load directly
      loadPrompt(id);
    }
  };
  
  const closeLoadDialog = () => {
    setLoadDialogOpen(false);
    setLoadPromptId(null);
  };
  
  const confirmLoad = () => {
    if (loadPromptId) {
      loadPrompt(loadPromptId);
    }
    closeLoadDialog();
  };
  
  const loadPrompt = (id: string) => {
    const prompt = savedPrompts.find(p => p.id === id);
    if (prompt) {
      setPromptTitle(prompt.title);
      setPromptContent(prompt.content);
    }
  };
  
  // Handle file drag and drop
  const handleFileDrop = (file: FileItem) => {
    // Insert file reference at cursor position
    const textarea = textareaRef.current?.querySelector('textarea');
    if (textarea) {
      const cursorPos = textarea.selectionStart;
      const textBefore = promptContent.substring(0, cursorPos);
      const textAfter = promptContent.substring(cursorPos);
      setPromptContent(`${textBefore}{{file:${file.name}}}${textAfter}`);
      
      // Focus back on textarea and set cursor position after insertion
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = cursorPos + `{{file:${file.name}}}`.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  };

  // Get icon based on file type
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'txt':
        return <FileTxtIcon fontSize="var(--icon-fontSize-md)" />;
      case 'doc':
        return <FileDocIcon fontSize="var(--icon-fontSize-md)" />;
      case 'pdf':
        return <FilePdfIcon fontSize="var(--icon-fontSize-md)" />;
      default:
        return <FileTxtIcon fontSize="var(--icon-fontSize-md)" />;
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
        {/* Main Prompt Editor Area */}
        <Grid item xs={12} md={9}>
          <Stack spacing={3}>
            {/* Prompt Editor */}
            <Card>
              <Box sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    label="Prompt Title"
                    fullWidth
                    variant="outlined"
                    value={promptTitle}
                    onChange={(e) => setPromptTitle(e.target.value)}
                    placeholder="Enter a descriptive title for your prompt"
                  />
                  
                  <TextField
                    ref={textareaRef}
                    label="Prompt Content"
                    fullWidth
                    multiline
                    minRows={4}
                    maxRows={20}
                    variant="outlined"
                    value={promptContent}
                    onChange={(e) => setPromptContent(e.target.value)}
                    placeholder="Describe your prompt in detail. Drag files from the right panel to reference them."
                    sx={{
                      '& .MuiInputBase-root': {
                        height: 'auto',
                        maxHeight: '75vh',
                        overflow: 'auto',
                      },
                    }}
                  />
                  
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<TrashSimpleIcon />}
                      onClick={() => {
                        if (promptTitle.trim() || promptContent.trim()) {
                          openDeleteDialog('current');
                        } else {
                          setPromptTitle('');
                          setPromptContent('');
                        }
                      }}
                    >
                      Clear
                    </Button>
                    
                    <Button
                      variant="contained"
                      startIcon={<FloppyDiskIcon />}
                      onClick={handleSavePrompt}
                      disabled={!promptTitle.trim() || !promptContent.trim()}
                    >
                      Save Prompt
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Card>
            
            {/* Saved Prompts Table */}
            <Card>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Saved Prompts
                </Typography>
                
                {savedPrompts.length === 0 ? (
                  <Alert severity="info">
                    <AlertTitle>No saved prompts yet</AlertTitle>
                    Create and save a prompt to see it listed here.
                  </Alert>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Title</TableCell>
                          <TableCell>Created</TableCell>
                          <TableCell>Updated</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {savedPrompts.map((prompt) => (
                          <TableRow key={prompt.id}>
                            <TableCell>{prompt.title}</TableCell>
                            <TableCell>
                              {prompt.createdAt.toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {prompt.updatedAt.toLocaleDateString()}
                            </TableCell>
                            <TableCell align="right">
                              <Stack direction="row" spacing={1} justifyContent="flex-end">
                                <Tooltip title="Load prompt">
                                  <IconButton
                                    color="primary"
                                    onClick={() => openLoadDialog(prompt.id)}
                                  >
                                    <ArrowsClockwiseIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete prompt">
                                  <IconButton
                                    color="error"
                                    onClick={() => openDeleteDialog(prompt.id)}
                                  >
                                    <TrashSimpleIcon />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            </Card>
          </Stack>
        </Grid>
        
        {/* Right Panel - Settings and Files */}
        <Grid item xs={12} md={3}>
          <Stack spacing={3}>
            {/* Model Settings */}
            <Card>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Model Settings
                </Typography>
                
                <Stack spacing={3}>
                  <Box>
                    <Typography gutterBottom>
                      Temperature: {temperature.toFixed(1)}
                    </Typography>
                    <Slider
                      value={temperature}
                      onChange={(_, value) => setTemperature(value as number)}
                      min={0}
                      max={2}
                      step={0.1}
                      marks={[
                        { value: 0, label: '0' },
                        { value: 1, label: '1' },
                        { value: 2, label: '2' },
                      ]}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Lower values produce more predictable responses, higher values more creative.
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography gutterBottom>
                      Max Tokens: {maxTokens}
                    </Typography>
                    <Slider
                      value={maxTokens}
                      onChange={(_, value) => setMaxTokens(value as number)}
                      min={256}
                      max={4096}
                      step={256}
                      marks={[
                        { value: 256, label: '256' },
                        { value: 2048, label: '2K' },
                        { value: 4096, label: '4K' },
                      ]}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Maximum length of the generated response.
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Card>
            
            {/* Files Library */}
            <Card sx={{ maxHeight: 'calc(100vh - 450px)', overflowY: 'auto' }}>
              <Box sx={{ p: 3 }}>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" mb={2}>
                  <Typography variant="h6">
                    Files Library
                  </Typography>
                  <Tooltip title="Upload file">
                    <IconButton color="primary" size="small">
                      <UploadIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
                
                <List>
                  {sampleFiles.map((file) => (
                    <Paper
                      key={file.id}
                      sx={{
                        mb: 1,
                        cursor: 'grab',
                        transition: 'all 0.2s',
                        '&:hover': {
                          boxShadow: '0 0 0 1px var(--mui-palette-primary-main)',
                          transform: 'translateY(-2px)',
                        },
                        '&:active': {
                          cursor: 'grabbing',
                        },
                      }}
                      elevation={1}
                      onClick={() => handleFileDrop(file)}
                    >
                      <ListItem>
                        <ListItemIcon>{getFileIcon(file.type)}</ListItemIcon>
                        <ListItemText
                          primary={file.name}
                          secondary={`${file.size} • ${file.createdAt.toLocaleDateString()}`}
                        />
                      </ListItem>
                    </Paper>
                  ))}
                </List>
                
                <Typography variant="caption" color="text.secondary" mt={2} display="block">
                  Click on any file to insert it into your prompt at the cursor position.
                </Typography>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
      >
        <DialogTitle>
          {deletePromptId === 'current' ? 'Clear current prompt?' : 'Delete prompt?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {deletePromptId === 'current'
              ? 'Are you sure you want to clear the current prompt? This action cannot be undone.'
              : 'Are you sure you want to delete this prompt? This action cannot be undone.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            {deletePromptId === 'current' ? 'Clear' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Load Confirmation Dialog */}
      <Dialog
        open={loadDialogOpen}
        onClose={closeLoadDialog}
      >
        <DialogTitle>Load prompt?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Loading this prompt will replace your current work. Do you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeLoadDialog}>Cancel</Button>
          <Button onClick={confirmLoad} color="primary" autoFocus>
            Load
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}