export function postcommentController(comment: any[], newComment: any) {
	const userIndex = comment.findIndex((el) => el.id === newComment.id);
		comment.push(newComment);
	    return comment;
}