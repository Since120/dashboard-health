import * as React from 'react';
import type { Metadata } from 'next';
import { appConfig } from '@/config/app';
import AIChatPage from '@/components/dashboard/ai-chat/page';

export const metadata: Metadata = { 
  title: `AI Chat | Dashboard | ${appConfig.name}` 
};

export default function Page(): React.JSX.Element {
  return <AIChatPage />;
}