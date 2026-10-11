import { GradeId, SubscriptionPlan } from '../types';
import { DEFAULT_SUBSCRIPTION_PLANS } from '../data/subscriptionPlans';

/**
 * Checks if a specific grade level is accessible under the current subscription plan.
 * - Annual / VIP: All grades (PAUD, TK, SD Kelas 1-6)
 * - Semi Annual (Paket Semester): PAUD, TK, SD Kelas 1, SD Kelas 2, SD Kelas 3
 * - Monthly (Paket Bulanan): PAUD, TK, SD Kelas 1, SD Kelas 2
 * - Free Trial / Not Subscribed / Expired: PAUD, TK, and SD Kelas 1 only
 */
export function isGradeAccessible(gradeId: GradeId, planId: string, status?: string): boolean {
  // All grade levels (PAUD, TK, SD 1, SD 2, SD 3, SD 4-6) are accessible to all users
  return true;
}

/**
 * Checks if a specific module is accessible under the current subscription plan.
 * All curriculum modules across all grade levels are fully accessible.
 */
export function isModuleAccessible(moduleId: string, gradeId: GradeId, planId: string, status?: string): boolean {
  return true;
}

/**
 * Get maximum child profiles allowed for a given plan ID.
 */
export function getMaxChildrenForPlan(planId: string, plans: SubscriptionPlan[] = DEFAULT_SUBSCRIPTION_PLANS): number {
  if (!planId || planId === 'free_trial' || planId === 'none' || planId === 'expired') {
    return 1;
  }

  const plan = plans.find(p => p.id === planId) || DEFAULT_SUBSCRIPTION_PLANS.find(p => p.id === planId);
  if (plan?.maxChildren) return plan.maxChildren;

  if (planId === 'annual' || planId === 'paket_juara' || planId === 'vip' || planId === 'paket_keluarga') return 4;
  if (planId === 'semi_annual' || planId === 'semester') return 3;
  if (planId === 'monthly' || planId === 'paket_ceria') return 2;
  return 1;
}

/**
 * Check if the printable worksheets / PDF export feature is available.
 * Locked for free trial / unsubscribed users. Requires an active paid subscription plan.
 */
export function isPrintableWorksheetAllowed(planId: string): boolean {
  if (!planId || planId === 'free_trial' || planId === 'none' || planId === 'expired') {
    return false;
  }
  return (
    planId === 'annual' ||
    planId === 'paket_juara' ||
    planId === 'vip' ||
    planId === 'paket_keluarga' ||
    planId === 'semi_annual' ||
    planId === 'monthly' ||
    planId === 'paket_ceria'
  );
}

