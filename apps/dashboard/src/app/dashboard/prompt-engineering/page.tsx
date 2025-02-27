// apps/dashboard/src/app/dashboard/prompt-engineering/page.tsx
import * as React from 'react';
import type { Metadata } from 'next';
import { appConfig } from '@/config/app';
import PromptEngineeringPage from '@/components/dashboard/prompt-engineering/page';

export const metadata: Metadata = { 
  title: `Prompt Engineering | Dashboard | ${appConfig.name}` 
};

export default function Page(): React.JSX.Element {
  return <PromptEngineeringPage />;
}