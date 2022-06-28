export async  function postcommentController(review: any[], newReview: any) {
	const userIndex = review.findIndex((el) => el.review_id === newReview.id);
		review.push(newReview);
	    return review;
}