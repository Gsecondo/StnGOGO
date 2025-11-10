import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  PropsWithChildren,
} from 'react';
import { OnboardingModule, ServiceStream, TaskStatus } from '../types';
import { serviceStreams, stationBrief } from '../data/onboarding';

type CompletionMap = Record<string, boolean>;

interface OnboardingState {
  completedTaskIds: CompletionMap;
  bookmarkedResourceIds: CompletionMap;
  selectedServiceId: ServiceStream['id'];
}

interface ModuleProgress {
  total: number;
  completed: number;
  percent: number;
}

interface OnboardingContextValue {
  services: ServiceStream[];
  station: typeof stationBrief;
  state: OnboardingState;
  setSelectedService: (serviceId: ServiceStream['id']) => void;
  toggleTaskCompletion: (taskId: string) => void;
  toggleBookmark: (resourceId: string) => void;
  getTaskStatus: (taskId: string, fallback?: TaskStatus) => TaskStatus;
  getModuleProgress: (module: OnboardingModule) => ModuleProgress;
  getServiceProgress: (service: ServiceStream) => ModuleProgress;
}

const defaultState: OnboardingState = {
  completedTaskIds: {},
  bookmarkedResourceIds: {},
  selectedServiceId: 'ems',
};

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<OnboardingState>(defaultState);

  const toggleTaskCompletion = useCallback((taskId: string) => {
    setState((prev) => {
      const nextCompleted = { ...prev.completedTaskIds };
      if (nextCompleted[taskId]) {
        delete nextCompleted[taskId];
      } else {
        nextCompleted[taskId] = true;
      }
      return { ...prev, completedTaskIds: nextCompleted };
    });
  }, []);

  const toggleBookmark = useCallback((resourceId: string) => {
    setState((prev) => {
      const nextBookmarks = { ...prev.bookmarkedResourceIds };
      if (nextBookmarks[resourceId]) {
        delete nextBookmarks[resourceId];
      } else {
        nextBookmarks[resourceId] = true;
      }
      return { ...prev, bookmarkedResourceIds: nextBookmarks };
    });
  }, []);

  const setSelectedService = useCallback((serviceId: ServiceStream['id']) => {
    setState((prev) => ({ ...prev, selectedServiceId: serviceId }));
  }, []);

  const getTaskStatus = useCallback(
    (taskId: string, fallback: TaskStatus = 'pending'): TaskStatus => {
      if (state.completedTaskIds[taskId]) {
        return 'completed';
      }
      return fallback;
    },
    [state.completedTaskIds],
  );

  const getModuleProgress = useCallback(
    (module: OnboardingModule): ModuleProgress => {
      const total = module.tasks.length;
      const completed = module.tasks.filter((task) => state.completedTaskIds[task.id]).length;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
      return { total, completed, percent };
    },
    [state.completedTaskIds],
  );

  const getServiceProgress = useCallback(
    (service: ServiceStream): ModuleProgress => {
      const totals = service.modules.reduce(
        (acc, module) => {
          const moduleProgress = getModuleProgress(module);
          return {
            total: acc.total + moduleProgress.total,
            completed: acc.completed + moduleProgress.completed,
          };
        },
        { total: 0, completed: 0 },
      );
      const percent = totals.total > 0 ? Math.round((totals.completed / totals.total) * 100) : 0;
      return { ...totals, percent };
    },
    [getModuleProgress],
  );

  const value = useMemo<OnboardingContextValue>(
    () => ({
      services: serviceStreams,
      station: stationBrief,
      state,
      setSelectedService,
      toggleTaskCompletion,
      toggleBookmark,
      getTaskStatus,
      getModuleProgress,
      getServiceProgress,
    }),
    [
      getModuleProgress,
      getServiceProgress,
      getTaskStatus,
      state,
      toggleBookmark,
      toggleTaskCompletion,
      setSelectedService,
    ],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
