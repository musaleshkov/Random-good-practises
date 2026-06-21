function createUser(user) {
	return {
		...user,
		id: Date.now(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};
}

function updateUser(user) {
	return {
		...user,
		updatedAt: new Date(),
	};
}

module.exports = { createUser, updateUser };

// Note: Both functions return a NEW object (immutable pattern).
// Callers should use the returned value, not the original `user` reference.
// Example: const savedUser = createUser(user);
