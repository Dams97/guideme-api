export function upsertGuidesController(tourGuides: any[], newtourGuide: any) {
	const guideIndex = tourGuides.findIndex((el) => el.id === newtourGuide.id);
	if (guideIndex === -1) {
		tourGuides.push(newtourGuide);
	} else {
		tourGuides[guideIndex] = {
			...tourGuides[guideIndex],
			...newtourGuide,
		};
	}
	return tourGuides;
}