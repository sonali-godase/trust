// utils/validation.js
// Simple validation utilities for the Trust Management System backend.
// Currently provides email format validation used during registration.

/**
 * Validate an email address using a basic regex.
 * This is not a full RFC‑5322 validation but sufficient for typical user input.
 * @param {string} email - Email address to validate.
 * @returns {boolean} true if the email appears valid, false otherwise.
 */
function isValidEmail(email) {
  if (typeof email !== "string") return false;
  // Simple regex: one or more chars before @, domain with at least one dot.
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim().toLowerCase());
}

module.exports = { isValidEmail };
