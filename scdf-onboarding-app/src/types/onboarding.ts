export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface OnboardingResource {
  id: string;
  title: string;
  description: string;
  link?: string;
  type?: 'video' | 'document' | 'checklist' | 'contact';
}

export interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  duration: string;
  objective: string;
  prerequisites?: string[];
  resources?: OnboardingResource[];
  status?: TaskStatus;
  requiresMentor?: boolean;
}

export interface OnboardingModule {
  id: string;
  name: string;
  summary: string;
  shiftFocus: 'day' | 'night' | 'mixed';
  estimatedDuration: string;
  competencies: string[];
  tasks: OnboardingTask[];
}

export interface ServiceStream {
  id: 'ems' | 'frs';
  title: string;
  mission: string;
  color: string;
  overview: string;
  stationContacts: Array<{
    name: string;
    role: string;
    phone?: string;
  }>;
  keyEquipment: string[];
  modules: OnboardingModule[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface StationBrief {
  stationName: string;
  address: string;
  commandCenter: string;
  upcomingDrills: Array<{
    id: string;
    name: string;
    date: string;
    services: Array<'ems' | 'frs'>;
  }>;
  onboardingExpectations: string[];
  sharedResources: OnboardingResource[];
}
