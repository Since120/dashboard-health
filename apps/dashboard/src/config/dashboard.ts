import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

// NOTE: First level elements are groups.

export interface DashboardConfig {
  // Overriden by Settings Context.
  layout: 'horizontal' | 'vertical';
  // Overriden by Settings Context.
  navColor: 'blend_in' | 'discrete' | 'evident';
  navItems: NavItemConfig[];
}

// Update the paths object to include our new routes
export const extendedPaths = {
  ...paths,
  dashboard: {
    ...paths.dashboard,
    aiChat: '/dashboard/ai-chat',
    promptEngineering: '/dashboard/prompt-engineering',
    fileManagement: '/dashboard/file-management',
    aiSettings: '/dashboard/ai-settings',
  },
};

export const dashboardConfig = {
  layout: 'vertical',
  navColor: 'evident',
  navItems: [
    {
      key: 'dashboards',
      title: 'Dashboards',
      items: [
        { 
          key: 'overview', 
          title: 'Overview', 
          href: extendedPaths.dashboard.overview, 
          icon: 'house' 
        },
        { 
          key: 'ai-chat', 
          title: 'AI Chat', 
          href: extendedPaths.dashboard.aiChat, 
          icon: 'chats-circle' 
        },
        { 
          key: 'prompt-engineering', 
          title: 'Prompt Engineering', 
          href: extendedPaths.dashboard.promptEngineering, 
          icon: 'text-align-left' 
        },
        { 
          key: 'file-management', 
          title: 'File Management', 
          href: extendedPaths.dashboard.fileManagement, 
          icon: 'file' 
        },
      ],
    },
    {
      key: 'settings',
      title: 'Settings',
      items: [
        { 
          key: 'ai-settings', 
          title: 'AI Settings', 
          href: extendedPaths.dashboard.aiSettings, 
          icon: 'gear' 
        },
        { 
          key: 'blank', 
          title: 'Blank', 
          href: extendedPaths.dashboard.blank, 
          icon: 'file-dashed' 
        },
      ],
    },
  ],
} satisfies DashboardConfig;