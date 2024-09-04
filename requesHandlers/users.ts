import type { UserSignUp } from '~/models/User.model';
import { supabase } from '~/superBaseClient';

export async function createUser(user: UserSignUp) {
  let { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    phone: user.phoneNumber,
    // options:{
    //     data:{
    //       displayName:user.fullName
    //     }
    // }
  });

  if (data) {
    return data;
  }

  return error;
}

export async function signInUser(user: { email: string; password: string }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    password: user.password,
    email: user.email,
    // options:{
    //     data:{
    //       displayName:user.fullName
    //     }
    // }
  });
  console.log('Here', error);
  if (!error) {
    console.log('Here', data);
    return data;
  }
}

export function getLoggedInUser() {
  return JSON.parse(localStorage.getItem('userDetails') as string);
}
