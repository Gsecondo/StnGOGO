import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { OnboardingModule } from '../types';
import { colors, shadow, spacing, typography } from '../theme';
import { useOnboarding } from '../context/OnboardingContext';
import { TaskRow } from './TaskRow';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ModuleCardProps {
  module: OnboardingModule;
  accentColor: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, accentColor }) => {
  const { getModuleProgress } = useOnboarding();
  const [expanded, setExpanded] = useState(false);
  const progress = getModuleProgress(module);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };

  return (
    <View style={styles.card}>
      <Pressable onPress={toggleExpand} style={styles.header}>
        <View style={[styles.indicator, { backgroundColor: accentColor }]} />
        <View style={styles.headerContent}>
          <Text style={styles.title}>{module.name}</Text>
          <Text style={styles.summary}>{module.summary}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaBadge}>Shift: {module.shiftFocus.toUpperCase()}</Text>
            <Text style={styles.metaBadge}>Duration: {module.estimatedDuration}</Text>
            <Text style={[styles.metaBadge, styles.progressBadge]}>
              {progress.completed}/{progress.total} • {progress.percent}%
            </Text>
          </View>
          <View style={styles.competencyRow}>
            {module.competencies.map((item) => (
              <View key={item} style={styles.competencyPill}>
                <Text style={styles.competencyText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.expandIcon}>{expanded ? '−' : '+'}</Text>
      </Pressable>
      {expanded && (
        <View style={styles.taskList}>
          {module.tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.outline,
    ...shadow.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.lg,
  },
  indicator: {
    width: 6,
    borderRadius: 999,
    alignSelf: 'stretch',
    marginRight: spacing.md,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.heading2,
    fontWeight: '700',
  },
  summary: {
    color: colors.textSecondary,
    fontSize: typography.body,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },
  metaBadge: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    borderWidth: 1,
    borderColor: colors.outline,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 10,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  progressBadge: {
    color: colors.textPrimary,
    borderColor: colors.success,
  },
  competencyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.md,
  },
  competencyPill: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outline,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  competencyText: {
    color: colors.textSecondary,
    fontSize: typography.caption,
  },
  expandIcon: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
    marginLeft: spacing.md,
  },
  taskList: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
});
