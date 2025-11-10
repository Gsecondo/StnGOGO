import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnboarding } from '../context/OnboardingContext';
import { colors, spacing, typography } from '../theme';
import { ServiceHero } from '../components/ServiceHero';
import { ModuleCard } from '../components/ModuleCard';

interface ServiceScreenProps {
  serviceId: 'ems' | 'frs';
}

export const ServiceScreen: React.FC<ServiceScreenProps> = ({ serviceId }) => {
  const { services, setSelectedService } = useOnboarding();
  const service = services.find((item) => item.id === serviceId);

  useEffect(() => {
    setSelectedService(serviceId);
  }, [serviceId, setSelectedService]);

  if (!service) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Service configuration not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <ServiceHero service={service} />
        <Text style={styles.modulesTitle}>Onboarding Modules</Text>
        {service.modules.map((module) => (
          <ModuleCard key={module.id} module={module} accentColor={service.color} />
        ))}
        <View style={styles.footerSpace} />
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
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.textPrimary,
    fontSize: typography.heading3,
  },
  modulesTitle: {
    color: colors.textPrimary,
    fontSize: typography.heading2,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  footerSpace: {
    height: spacing.xl,
  },
});
