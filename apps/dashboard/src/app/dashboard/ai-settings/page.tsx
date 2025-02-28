import * as React from 'react';
import type { Metadata } from 'next';
import { appConfig } from '@/config/app';
import AISettingsPage from '@/components/dashboard/ai-settings/page';

export const metadata: Metadata = { 
  title: `AI Settings | Dashboard | ${appConfig.name}` 
};

export default function Page(): React.JSX.Element {
  return <AISettingsPage />;
}