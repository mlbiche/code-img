/**
 * UserService
 * 
 * Define all API fetch linked to the user
 */

import { API_URL } from './servicesEnvironment';

/**
 * Register a new user
 * @param username The new user username
 * @param email The new user email
 * @param password The new user password
 * @return The received status code, throw an error on fetch failure
 */
export async function registerUser(username, email, password) {
  // Post request to backend
  try {
    // Fetch the registration post request
    const res = await fetch(API_URL + 'registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    });

    return res.status;
  } catch (err) {
    throw err;
  }
}

/**
 * Login a user
 * @param email The user email
 * @param password The user password
 */
export async function loginUser(email, password) {
  // Post request to backend
  try {
    // Fetch the login post request
    const res = fetch(API_URL + 'login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      }),
      credentials: 'include' // Allow to receive a Cross-Origin cookie
    });

    return res.status;
  } catch (err) {
    throw err;
  }
}