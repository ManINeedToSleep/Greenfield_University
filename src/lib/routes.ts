export const DASHBOARD_ROUTES = {
  ADMIN: '/portal/admin/dashboard',
  FACULTY: '/portal/faculty/dashboard',
  STUDENT: '/portal/student/dashboard',
} as const;

export const getRedirectPath = (role: 'ADMIN' | 'FACULTY' | 'STUDENT') => {
  return DASHBOARD_ROUTES[role];
}; 