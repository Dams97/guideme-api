export function upsertGuideController(tourGuides: any[], newGuide: any) {
	const GuideIndex = tourGuides.findIndex((el) => el.id === newGuide.id);
	if (GuideIndex === -1) {
		tourGuides.push(newGuide);
	} else {
		tourGuides[GuideIndex] = {
			...tourGuides[GuideIndex],
			...newGuide,
		};
	}
	return tourGuides;
}
