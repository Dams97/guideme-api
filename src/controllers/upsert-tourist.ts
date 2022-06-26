export function upsertTouristController(tourist: any[], newUser: any) {
	const userIndex = tourist.findIndex((el) => el.id === newUser.id);
	if (userIndex === -1) {
		tourist.push(newUser);
	} else {
		tourist[userIndex] = {
			...tourist[userIndex],
			...newUser,
		};
	}
	return tourist;
}
