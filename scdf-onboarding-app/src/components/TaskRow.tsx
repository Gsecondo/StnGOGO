import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { OnboardingTask } from '../types';
import { colors, spacing, typography } from '../theme';
import { useOnboarding } from '../context/OnboardingContext';

interface TaskRowProps {
  task: OnboardingTask;
}

export const TaskRow: React.FC<TaskRowProps> = ({ task }) => {
  const { toggleTaskCompletion, getTaskStatus } = useOnboarding();
  const status = getTaskStatus(task.id, task.status);
  const isCompleted = status === 'completed';

  return (
    <Pressable
      onPress={() => toggleTaskCompletion(task.id)}
      style={[styles.row, isCompleted && styles.rowCompleted]}
    >
      <View style={[styles.checkbox, isCompleted && styles.checkboxChecked]}>
        {isCompleted && <Text style={styles.checkboxMark}>✓</Text>}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.meta}>
          {task.duration} • {task.requiresMentor ? 'Mentor-led' : 'Self-guided'}
        </Text>
        <Text style={styles.description}>{task.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.objectiveLabel}>Objective</Text>
          <Text style={styles.objectiveText}>{task.objective}</Text>
        </View>
        {task.resources && task.resources.length > 0 ? (
          <View style={styles.resourceWrap}>
            {task.resources.map((resource) => (
              <View key={resource.id} style={styles.resourceChip}>
                <Text style={styles.resourceChipText}>{resource.title}</Text>
              </View>
            ))}
          </View>
        ) : null}
        {task.prerequisites && task.prerequisites.length > 0 ? (
          <Text style={styles.prereq}>
            Prerequisites: {task.prerequisites.map((id) => `#${id}`).join(', ')}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.md,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outline,
    marginBottom: spacing.sm,
  },
  rowCompleted: {
    borderColor: colors.success,
    backgroundColor: '#123427',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.outline,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    backgroundColor: '#0F172A',
  },
  checkboxChecked: {
    borderColor: colors.success,
    backgroundColor: colors.success,
  },
  checkboxMark: {
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.heading3,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  meta: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  footer: {
    backgroundColor: '#1E293B',
    padding: spacing.sm,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  resourceWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
  },
  resourceChip: {
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.outline,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  resourceChipText: {
    color: colors.textSecondary,
    fontSize: typography.caption,
  },
  objectiveLabel: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  objectiveText: {
    color: colors.textPrimary,
    fontSize: typography.body,
    marginTop: spacing.xs / 2,
  },
  prereq: {
    color: colors.warning,
    fontSize: typography.caption,
  },
});
