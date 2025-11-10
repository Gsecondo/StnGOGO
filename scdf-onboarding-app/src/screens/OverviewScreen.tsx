import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnboarding } from '../context/OnboardingContext';
import { colors, spacing, typography } from '../theme';

export const OverviewScreen = () => {
  const { station, services, getServiceProgress } = useOnboarding();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Welcome to {station.stationName}</Text>
        <Text style={styles.subtitle}>{station.address}</Text>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Onboarding Expectations</Text>
          {station.onboardingExpectations.map((item) => (
            <Text key={item} style={styles.listItem}>
              • {item}
            </Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Upcoming Drills</Text>
          {station.upcomingDrills.map((drill) => (
            <View key={drill.id} style={styles.drillRow}>
              <Text style={styles.drillName}>{drill.name}</Text>
              <Text style={styles.drillMeta}>{drill.date}</Text>
              <Text style={styles.drillServices}>Services: {drill.services.join(', ')}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Service Progress</Text>
          {services.map((service) => {
            const progress = getServiceProgress(service);
            return (
              <View key={service.id} style={styles.progressRow}>
                <View style={[styles.progressAccent, { backgroundColor: service.color }]} />
                <View style={styles.progressContent}>
                  <Text style={styles.progressTitle}>{service.title}</Text>
                  <Text style={styles.progressText}>
                    {progress.completed}/{progress.total} tasks completed ({progress.percent}%)
                  </Text>
                  <View style={styles.progressBarBackground}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${progress.percent}%`, backgroundColor: service.color },
                      ]}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Shared Resources</Text>
          {station.sharedResources.map((resource) => (
            <View key={resource.id} style={styles.resourceRow}>
              <Text style={styles.resourceTitle}>{resource.title}</Text>
              <Text style={styles.resourceDescription}>{resource.description}</Text>
              <Text style={styles.resourceType}>{resource.type?.toUpperCase() ?? 'RESOURCE'}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  heading: {
    color: colors.textPrimary,
    fontSize: typography.heading1,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body,
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.heading2,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  listItem: {
    color: colors.textSecondary,
    fontSize: typography.body,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  drillRow: {
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
  },
  drillName: {
    color: colors.textPrimary,
    fontSize: typography.heading3,
    fontWeight: '600',
  },
  drillMeta: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    marginTop: spacing.xs,
  },
  drillServices: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    marginTop: spacing.xs,
  },
  progressRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  progressAccent: {
    width: 6,
    borderRadius: 999,
    marginRight: spacing.md,
  },
  progressContent: {
    flex: 1,
  },
  progressTitle: {
    color: colors.textPrimary,
    fontSize: typography.heading3,
    fontWeight: '600',
  },
  progressText: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    marginTop: spacing.xs,
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 8,
    backgroundColor: colors.outline,
    overflow: 'hidden',
    marginTop: spacing.sm,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 8,
  },
  resourceRow: {
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
  },
  resourceTitle: {
    color: colors.textPrimary,
    fontSize: typography.heading3,
    fontWeight: '600',
  },
  resourceDescription: {
    color: colors.textSecondary,
    fontSize: typography.body,
    marginTop: spacing.xs,
    lineHeight: 20,
  },
  resourceType: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    marginTop: spacing.xs,
    letterSpacing: 1,
  },
});
