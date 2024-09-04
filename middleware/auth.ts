import { supabase } from '~/superBaseClient';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const getUserfromLocalStorage = window?.localStorage?.getItem('userDetails')
    ? JSON.parse(window?.localStorage?.getItem('userDetails') as string)
    : null;

  if (to.path === '/sign-in' && to.query.action === 'logout') {
    let { error } = await supabase.auth.signOut();
    localStorage.removeItem('userDetails');
    return navigateTo('/sign-in');
  } else if (to.path != '/sign-in' && !getUserfromLocalStorage) {
    console.log('Coming here');
    return navigateTo('/sign-in');
  }
});
