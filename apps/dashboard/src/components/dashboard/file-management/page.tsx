"use client";

import * as React from 'react';
// Die Metadata-Import und Export werden entfernt
// import type { Metadata } from 'next';
// export const metadata = { title: `File Management | Dashboard | ${appConfig.name}` } satisfies Metadata;

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import { FileArrowUp as FileArrowUpIcon } from '@phosphor-icons/react/dist/ssr/FileArrowUp';
import { FolderSimplePlus as FolderSimplePlusIcon } from '@phosphor-icons/react/dist/ssr/FolderSimplePlus';
import { TrashSimple as TrashSimpleIcon } from '@phosphor-icons/react/dist/ssr/TrashSimple';
import { FileTxt as FileTxtIcon } from '@phosphor-icons/react/dist/ssr/FileTxt';
import { FileDoc as FileDocIcon } from '@phosphor-icons/react/dist/ssr/FileDoc';
import { FilePdf as FilePdfIcon } from '@phosphor-icons/react/dist/ssr/FilePdf';
import { FileXls as FileXlsIcon } from '@phosphor-icons/react/dist/ssr/FileXls';
import { FileJpg as FileJpgIcon } from '@phosphor-icons/react/dist/ssr/FileJpg';
import { FilePng as FilePngIcon } from '@phosphor-icons/react/dist/ssr/FilePng';
import { FileZip as FileZipIcon } from '@phosphor-icons/react/dist/ssr/FileZip';
import { File as FileIcon } from '@phosphor-icons/react/dist/ssr/File';
import { Folder as FolderIcon } from '@phosphor-icons/react/dist/ssr/Folder';
import { FolderOpen as FolderOpenIcon } from '@phosphor-icons/react/dist/ssr/FolderOpen';
import { DotsThreeVertical as DotsThreeVerticalIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import { DownloadSimple as DownloadSimpleIcon } from '@phosphor-icons/react/dist/ssr/DownloadSimple';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import { CopySimple as CopySimpleIcon } from '@phosphor-icons/react/dist/ssr/CopySimple';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { appConfig } from '@/config/app';


// File types enum
enum FileType {
  FOLDER = 'folder',
  TXT = 'txt',
  DOC = 'doc',
  PDF = 'pdf',
  XLS = 'xls',
  JPG = 'jpg',
  PNG = 'png',
  ZIP = 'zip',
  OTHER = 'other',
}

// File interface
interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: number;
  lastModified: Date;
  parentId: string | null;
}

// Format bytes to human readable
const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Sample files and folders
const initialFiles: FileItem[] = [
  { id: 'folder1', name: 'Documents', type: FileType.FOLDER, size: 0, lastModified: new Date(2023, 6, 15), parentId: null },
  { id: 'folder2', name: 'Images', type: FileType.FOLDER, size: 0, lastModified: new Date(2023, 7, 20), parentId: null },
  { id: 'folder3', name: 'Reports', type: FileType.FOLDER, size: 0, lastModified: new Date(2023, 8, 5), parentId: null },
  { id: 'file1', name: 'Overview.txt', type: FileType.TXT, size: 24576, lastModified: new Date(2023, 5, 12), parentId: null },
  { id: 'file2', name: 'Specifications.doc', type: FileType.DOC, size: 131072, lastModified: new Date(2023, 6, 3), parentId: null },
  { id: 'file3', name: 'Report.pdf', type: FileType.PDF, size: 2412544, lastModified: new Date(2023, 7, 15), parentId: null },
  { id: 'file4', name: 'Analysis.xls', type: FileType.XLS, size: 352256, lastModified: new Date(2023, 9, 7), parentId: null },
  { id: 'file5', name: 'Screenshot.jpg', type: FileType.JPG, size: 1504256, lastModified: new Date(2023, 8, 22), parentId: null },
  { id: 'file6', name: 'Logo.png', type: FileType.PNG, size: 204800, lastModified: new Date(2023, 10, 19), parentId: null },
  { id: 'file7', name: 'Archive.zip', type: FileType.ZIP, size: 5242880, lastModified: new Date(2023, 11, 12), parentId: null },
  // Nested files in Documents folder
  { id: 'file8', name: 'ReadMe.txt', type: FileType.TXT, size: 16384, lastModified: new Date(2023, 6, 18), parentId: 'folder1' },
  { id: 'file9', name: 'Contract.doc', type: FileType.DOC, size: 245760, lastModified: new Date(2023, 6, 22), parentId: 'folder1' },
  { id: 'file10', name: 'Manual.pdf', type: FileType.PDF, size: 3145728, lastModified: new Date(2023, 7, 1), parentId: 'folder1' },
  // Nested files in Images folder
  { id: 'file11', name: 'Photo1.jpg', type: FileType.JPG, size: 2097152, lastModified: new Date(2023, 7, 25), parentId: 'folder2' },
  { id: 'file12', name: 'Photo2.jpg', type: FileType.JPG, size: 1835008, lastModified: new Date(2023, 7, 25), parentId: 'folder2' },
  { id: 'file13', name: 'Icon.png', type: FileType.PNG, size: 153600, lastModified: new Date(2023, 8, 3), parentId: 'folder2' },
  // Nested files in Reports folder
  { id: 'file14', name: 'Q1_Report.pdf', type: FileType.PDF, size: 4194304, lastModified: new Date(2023, 8, 8), parentId: 'folder3' },
  { id: 'file15', name: 'Q2_Report.pdf', type: FileType.PDF, size: 3670016, lastModified: new Date(2023, 8, 8), parentId: 'folder3' },
  { id: 'file16', name: 'Data.xls', type: FileType.XLS, size: 524288, lastModified: new Date(2023, 8, 15), parentId: 'folder3' },
];

export default function FileManagementPage(): React.JSX.Element {
  // State for file management
  const [files, setFiles] = React.useState<FileItem[]>(initialFiles);
  const [currentFolder, setCurrentFolder] = React.useState<string | null>(null);
  const [path, setPath] = React.useState<Array<{id: string | null, name: string}>>([{id: null, name: 'Home'}]);
  const [selectedFiles, setSelectedFiles] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  
  // State for pagination
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  
  // State for context menu
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
    fileId: string | null;
  } | null>(null);
  
  // State for dialogs
  const [newFolderDialog, setNewFolderDialog] = React.useState<boolean>(false);
  const [newFolderName, setNewFolderName] = React.useState<string>('');
  const [renameDialog, setRenameDialog] = React.useState<boolean>(false);
  const [renameFile, setRenameFile] = React.useState<FileItem | null>(null);
  const [newFileName, setNewFileName] = React.useState<string>('');
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  
  // Get current files based on the selected folder and search
  const getCurrentFiles = React.useMemo(() => {
    let filteredFiles = files.filter(file => file.parentId === currentFolder);
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredFiles = filteredFiles.filter(file => 
        file.name.toLowerCase().includes(query)
      );
    }
    
    // Sort: folders first, then by name
    return filteredFiles.sort((a, b) => {
      if (a.type === FileType.FOLDER && b.type !== FileType.FOLDER) return -1;
      if (a.type !== FileType.FOLDER && b.type === FileType.FOLDER) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [files, currentFolder, searchQuery]);
  
  // Get paginated files
  const paginatedFiles = React.useMemo(() => {
    return getCurrentFiles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [getCurrentFiles, page, rowsPerPage]);
  
  // Check if delete button should be visible
  const showDeleteButton = selectedFiles.length > 0;
  
  // Get file icon based on type
  const getFileIcon = (type: FileType): React.ReactElement => {
    switch (type) {
      case FileType.FOLDER:
        return <FolderIcon fontSize="var(--icon-fontSize-md)" />;
      case FileType.TXT:
        return <FileTxtIcon fontSize="var(--icon-fontSize-md)" />;
      case FileType.DOC:
        return <FileDocIcon fontSize="var(--icon-fontSize-md)" />;
      case FileType.PDF:
        return <FilePdfIcon fontSize="var(--icon-fontSize-md)" />;
      case FileType.XLS:
        return <FileXlsIcon fontSize="var(--icon-fontSize-md)" />;
      case FileType.JPG:
        return <FileJpgIcon fontSize="var(--icon-fontSize-md)" />;
      case FileType.PNG:
        return <FilePngIcon fontSize="var(--icon-fontSize-md)" />;
      case FileType.ZIP:
        return <FileZipIcon fontSize="var(--icon-fontSize-md)" />;
      default:
        return <FileIcon fontSize="var(--icon-fontSize-md)" />;
    }
  };
  
  // Get type label
  const getTypeLabel = (type: FileType): string => {
    switch (type) {
      case FileType.FOLDER:
        return 'Folder';
      case FileType.TXT:
        return 'Text Document';
      case FileType.DOC:
        return 'Word Document';
      case FileType.PDF:
        return 'PDF Document';
      case FileType.XLS:
        return 'Excel Spreadsheet';
      case FileType.JPG:
        return 'JPEG Image';
      case FileType.PNG:
        return 'PNG Image';
      case FileType.ZIP:
        return 'ZIP Archive';
      default:
        return 'File';
    }
  };
  
  // Handle folder navigation
  const navigateToFolder = (folderId: string | null, folderName: string) => {
    setCurrentFolder(folderId);
    
    if (folderId === null) {
      // Back to root
      setPath([{id: null, name: 'Home'}]);
    } else {
      // Find the index of the folder in the current path
      const folderIndex = path.findIndex(item => item.id === folderId);
      
      if (folderIndex !== -1) {
        // If the folder is already in the path, truncate the path to that folder
        setPath(path.slice(0, folderIndex + 1));
      } else {
        // Otherwise, add the folder to the path
        setPath([...path, {id: folderId, name: folderName}]);
      }
    }
    
    // Reset pagination and selection
    setPage(0);
    setSelectedFiles([]);
  };
  
  // Handle file selection
  const handleSelectFile = (fileId: string) => {
    setSelectedFiles(prev => {
      if (prev.includes(fileId)) {
        return prev.filter(id => id !== fileId);
      } else {
        return [...prev, fileId];
      }
    });
  };
  
  // Handle select all
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedFiles(paginatedFiles.map(file => file.id));
    } else {
      setSelectedFiles([]);
    }
  };
  
  // Handle file double click
  const handleFileDoubleClick = (file: FileItem) => {
    if (file.type === FileType.FOLDER) {
      navigateToFolder(file.id, file.name);
    }
    // For regular files, you could add a preview functionality here
  };
  
  // Context menu handlers
  const handleContextMenu = (event: React.MouseEvent, fileId: string | null) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX,
      mouseY: event.clientY,
      fileId,
    });
  };
  
  const handleContextMenuClose = () => {
    setContextMenu(null);
  };
  
  // Dialog handlers
  const openNewFolderDialog = () => {
    setNewFolderName('');
    setNewFolderDialog(true);
  };
  
  const closeNewFolderDialog = () => {
    setNewFolderDialog(false);
  };
  
  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: FileItem = {
        id: `folder-${Date.now()}`,
        name: newFolderName.trim(),
        type: FileType.FOLDER,
        size: 0,
        lastModified: new Date(),
        parentId: currentFolder,
      };
      
      setFiles([...files, newFolder]);
      closeNewFolderDialog();
    }
  };
  
  const openRenameDialog = (file: FileItem) => {
    setRenameFile(file);
    setNewFileName(file.name);
    setRenameDialog(true);
  };
  
  const closeRenameDialog = () => {
    setRenameDialog(false);
    setRenameFile(null);
  };
  
  const handleRenameFile = () => {
    if (renameFile && newFileName.trim()) {
      setFiles(files.map(file => 
        file.id === renameFile.id 
          ? { ...file, name: newFileName.trim() } 
          : file
      ));
      closeRenameDialog();
    }
  };
  
  const openDeleteDialog = () => {
    setDeleteDialog(true);
  };
  
  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  };
  
  const handleDeleteFiles = () => {
    // Get all descendant ids recursively (for folders)
    const getAllDescendantIds = (parentIds: string[]): string[] => {
      const childrenIds = files
        .filter(file => parentIds.includes(file.parentId || ''))
        .map(file => file.id);
      
      if (childrenIds.length === 0) return [];
      
      return [...childrenIds, ...getAllDescendantIds(childrenIds)];
    };
    
    const descendantIds = getAllDescendantIds(selectedFiles);
    const allIdsToDelete = [...selectedFiles, ...descendantIds];
    
    setFiles(files.filter(file => !allIdsToDelete.includes(file.id)));
    setSelectedFiles([]);
    closeDeleteDialog();
  };
  
  // File upload simulation
  const simulateFileUpload = () => {
    // In a real app, you would handle file upload through an input element
    const mockFile: FileItem = {
      id: `file-${Date.now()}`,
      name: `Uploaded-${Date.now()}.pdf`,
      type: FileType.PDF,
      size: Math.floor(Math.random() * 5000000) + 10000,
      lastModified: new Date(),
      parentId: currentFolder,
    };
    
    setFiles([...files, mockFile]);
  };
  
  // Pagination handlers
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      <Card>
        <Stack spacing={2} sx={{ p: 3 }}>
          {/* Header with breadcrumbs and actions */}
          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center" 
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              {currentFolder && (
                <IconButton 
                  onClick={() => {
                    const parentFolder = files.find(f => f.id === currentFolder)?.parentId;
                    if (path.length > 1) {
                      const parentPath = path[path.length - 2];
                      navigateToFolder(parentPath.id, parentPath.name);
                    }
                  }}
                >
                  <ArrowLeftIcon />
                </IconButton>
              )}
              
              <Breadcrumbs aria-label="breadcrumb">
                {path.map((item, index) => {
                  const isLast = index === path.length - 1;
                  return isLast ? (
                    <Typography key={item.id || 'home'} color="text.primary">
                      {item.name}
                    </Typography>
                  ) : (
                    <Link
                      key={item.id || 'home'}
                      component="button"
                      variant="body1"
                      onClick={() => navigateToFolder(item.id, item.name)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </Breadcrumbs>
            </Stack>
            
            <Stack direction="row" spacing={2}>
              {/* Search input */}
              <TextField
                placeholder="Search files..."
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 240 }}
              />
              
              {/* Action buttons */}
              <Button
                variant="outlined"
                startIcon={<FileArrowUpIcon />}
                onClick={simulateFileUpload}
              >
                Upload
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<FolderSimplePlusIcon />}
                onClick={openNewFolderDialog}
              >
                New Folder
              </Button>
              
              {showDeleteButton && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<TrashSimpleIcon />}
                  onClick={openDeleteDialog}
                >
                  Delete ({selectedFiles.length})
                </Button>
              )}
            </Stack>
          </Stack>
          
          <Divider />
          
          {/* File explorer table */}
          <Paper elevation={0}>
            {paginatedFiles.length === 0 ? (
              <Alert severity="info" sx={{ my: 2 }}>
                {searchQuery 
                  ? 'No files matching your search criteria.'
                  : 'This folder is empty.'
                }
              </Alert>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={selectedFiles.length > 0 && selectedFiles.length < paginatedFiles.length}
                          checked={paginatedFiles.length > 0 && selectedFiles.length === paginatedFiles.length}
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Modified</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedFiles.map((file) => {
                      const isSelected = selectedFiles.includes(file.id);
                      
                      return (
                        <TableRow
                          key={file.id}
                          hover
                          selected={isSelected}
                          onContextMenu={(e) => handleContextMenu(e, file.id)}
                          onDoubleClick={() => handleFileDoubleClick(file)}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isSelected}
                              onChange={() => handleSelectFile(file.id)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={2} alignItems="center">
                              <Avatar
                                variant="rounded"
                                sx={{
                                  bgcolor: file.type === FileType.FOLDER ? 'primary.light' : 'background.level1',
                                  color: file.type === FileType.FOLDER ? 'primary.contrastText' : 'text.primary',
                                }}
                              >
                                {getFileIcon(file.type)}
                              </Avatar>
                              <Typography variant="body2">{file.name}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={getTypeLabel(file.type)} 
                              size="small"
                              color={file.type === FileType.FOLDER ? "primary" : "default"}
                              variant="soft"
                            />
                          </TableCell>
                          <TableCell>
                            {file.type === FileType.FOLDER ? '—' : formatBytes(file.size)}
                          </TableCell>
                          <TableCell>
                            {file.lastModified.toLocaleDateString()}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              onClick={(e) => handleContextMenu(e, file.id)}
                            >
                              <DotsThreeVerticalIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            
            <TablePagination
              component="div"
              count={getCurrentFiles.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </Paper>
        </Stack>
      </Card>
      
      {/* Context Menu */}
      <Menu
        open={contextMenu !== null}
        onClose={handleContextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        {contextMenu?.fileId && (
          <>
            {(() => {
              const file = files.find(f => f.id === contextMenu.fileId);
              return file?.type === FileType.FOLDER ? (
                <MenuItem 
                  onClick={() => {
                    if (file) {
                      navigateToFolder(file.id, file.name);
                    }
                    handleContextMenuClose();
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FolderOpenIcon fontSize="var(--icon-fontSize-sm)" />
                    <Typography>Open</Typography>
                  </Stack>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleContextMenuClose}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <DownloadSimpleIcon fontSize="var(--icon-fontSize-sm)" />
                    <Typography>Download</Typography>
                  </Stack>
                </MenuItem>
              );
            })()}
            
            <MenuItem
              onClick={() => {
                const file = files.find(f => f.id === contextMenu.fileId);
                if (file) {
                  openRenameDialog(file);
                }
                handleContextMenuClose();
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <PenIcon fontSize="var(--icon-fontSize-sm)" />
                <Typography>Rename</Typography>
              </Stack>
            </MenuItem>
            
            <MenuItem onClick={handleContextMenuClose}>
              <Stack direction="row" spacing={1} alignItems="center">
                <CopySimpleIcon fontSize="var(--icon-fontSize-sm)" />
                <Typography>Duplicate</Typography>
              </Stack>
            </MenuItem>
            
            <Divider />
            
            <MenuItem
              onClick={() => {
                if (contextMenu.fileId) {
                  setSelectedFiles([contextMenu.fileId]);
                  openDeleteDialog();
                }
                handleContextMenuClose();
              }}
              sx={{ color: 'error.main' }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <TrashSimpleIcon fontSize="var(--icon-fontSize-sm)" />
                <Typography>Delete</Typography>
              </Stack>
            </MenuItem>
          </>
        )}
      </Menu>
      
      {/* New Folder Dialog */}
      <Dialog open={newFolderDialog} onClose={closeNewFolderDialog}>
        <DialogTitle>Create New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Folder Name"
            type="text"
            fullWidth
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNewFolderDialog}>Cancel</Button>
          <Button onClick={handleCreateFolder} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
      
      {/* Rename Dialog */}
      <Dialog open={renameDialog} onClose={closeRenameDialog}>
        <DialogTitle>Rename {renameFile?.type === FileType.FOLDER ? 'Folder' : 'File'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Name"
            type="text"
            fullWidth
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRenameDialog}>Cancel</Button>
          <Button onClick={handleRenameFile} variant="contained">Rename</Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Delete {selectedFiles.length > 1 ? 'Items' : 'Item'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedFiles.length > 1
              ? `Are you sure you want to delete these ${selectedFiles.length} items?`
              : 'Are you sure you want to delete this item?'
            } This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteFiles} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}