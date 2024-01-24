function checkRole(user, requiredRole) {
  return user.roles.includes(requiredRole);
}
