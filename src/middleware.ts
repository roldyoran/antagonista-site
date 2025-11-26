// Clerk middleware removed. No global middleware configured here.
export const onRequest = async (context: any) => {
	// noop: previously used Clerk for auth; removed per request.
	return;
};