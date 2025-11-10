import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ServiceStream } from '../types';
import { colors, spacing, typography } from '../theme';
import { useOnboarding } from '../context/OnboardingContext';

interface ServiceHeroProps {
  service: ServiceStream;
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({ service }) => {
  const { getServiceProgress } = useOnboarding();
  const progress = getServiceProgress(service);

  return (
    <View style={styles.container}>
      <View style={[styles.badge, { backgroundColor: service.color }]}>
        <Text style={styles.badgeText}>{service.title}</Text>
      </View>
      <Text style={styles.mission}>{service.mission}</Text>
      <Text style={styles.overview}>{service.overview}</Text>

      <View style={styles.progressRow}>
        <View style={styles.progressItem}>
          <Text style={styles.progressValue}>{progress.percent}%</Text>
          <Text style={styles.progressLabel}>Overall Progress</Text>
        </View>
        <View style={styles.progressItem}>
          <Text style={styles.progressValue}>{progress.completed}</Text>
          <Text style={styles.progressLabel}>Tasks Done</Text>
        </View>
        <View style={styles.progressItem}>
          <Text style={styles.progressValue}>{progress.total}</Text>
          <Text style={styles.progressLabel}>Total Tasks</Text>
        </View>
      </View>

      <View style={styles.contactCard}>
        <Text style={styles.sectionTitle}>Station Mentors</Text>
        {service.stationContacts.map((contact) => (
          <View key={contact.name} style={styles.contactRow}>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactRole}>{contact.role}</Text>
            {contact.phone && <Text style={styles.contactPhone}>{contact.phone}</Text>}
          </View>
        ))}
      </View>

      <View style={styles.equipmentCard}>
        <Text style={styles.sectionTitle}>Key Equipment Focus</Text>
        {service.keyEquipment.map((item) => (
          <Text key={item} style={styles.equipmentItem}>
            • {item}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 24,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    marginBottom: spacing.md,
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: typography.caption,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  mission: {
    color: colors.textPrimary,
    fontSize: typography.heading2,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  overview: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  progressItem: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 16,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  progressValue: {
    color: colors.textPrimary,
    fontSize: typography.heading2,
    fontWeight: '700',
  },
  progressLabel: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    marginTop: spacing.xs,
  },
  contactCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  equipmentCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outline,
    marginTop: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.heading3,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  contactRow: {
    marginBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
    paddingBottom: spacing.sm,
  },
  contactName: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: '600',
  },
  contactRole: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    marginTop: 2,
  },
  contactPhone: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    marginTop: 2,
  },
  equipmentItem: {
    color: colors.textSecondary,
    fontSize: typography.body,
    marginBottom: spacing.xs,
  },
});
