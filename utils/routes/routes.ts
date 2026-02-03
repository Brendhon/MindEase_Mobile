/**
 * Application route constants
 *
 * Centralized route definitions to facilitate maintenance and avoid hardcoded routes.
 * Routes are organized by category (pages and API) for better organization and type safety.
 *
 * @module utils/routes/routes
 */

/**
 * Public page routes (accessible without authentication)
 */
export const PAGE_ROUTES = {
  /** Home page - landing page for unauthenticated users */
  HOME: '/',
  /** Login page - authentication page with Google sign-in */
  LOGIN: '/login',
} as const;

/**
 * Protected page routes (require authentication)
 */
export const PROTECTED_ROUTES = {
  /** Dashboard - cognitive panel with interface complexity adjustments */
  DASHBOARD: '/dashboard',
  /** Tasks - task organizer with simplified lists and focus timer */
  TASKS: '/tasks',
  /** Profile - user profile and preferences settings */
  PROFILE: '/profile',
} as const;

/**
 * All page routes combined (public + protected)
 */
export const ALL_PAGE_ROUTES = {
  ...PAGE_ROUTES,
  ...PROTECTED_ROUTES,
} as const;

/**
 * Type definitions for route values
 */
export type PageRoute = (typeof PAGE_ROUTES)[keyof typeof PAGE_ROUTES];
export type ProtectedRoute = (typeof PROTECTED_ROUTES)[keyof typeof PROTECTED_ROUTES];
export type AllPageRoute = (typeof ALL_PAGE_ROUTES)[keyof typeof ALL_PAGE_ROUTES];
