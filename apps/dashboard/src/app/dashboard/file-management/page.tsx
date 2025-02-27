// apps/dashboard/src/app/dashboard/file-management/page.tsx
import * as React from 'react';
import type { Metadata } from 'next';
import { appConfig } from '@/config/app';
import FileManagementPage from '@/components/dashboard/file-management/page';

export const metadata: Metadata = { 
  title: `File Management | Dashboard | ${appConfig.name}` 
};

export default function Page(): React.JSX.Element {
  return <FileManagementPage />;
}
