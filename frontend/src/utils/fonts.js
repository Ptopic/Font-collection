import client from '../api/client';

const catchError = (error) => {
	if (error?.response?.data) {
		return error.response.data;
	} else {
		return { success: false, error: error.message };
	}
};

export const getFontById = async (fontId) => {
	try {
		const { data } = await client.get('/fonts/get-font', {
			params: { id: fontId },
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

export const getFonts = async () => {
	try {
		const { data } = await client.get('/fonts/get-fonts');
		return data;
	} catch (error) {
		return catchError(error);
	}
};

export const updateFont = async (id, name, image, image2, link, wide) => {
	try {
		const { data } = await client.post('/fonts/update-font', {
			id,
			name,
			image,
			image2,
			link,
			wide,
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

export const insertFont = async (id, name, image, image2, link, wide) => {
	try {
		const { data } = await client.post('/fonts/insert-font', {
			id,
			name,
			image,
			image2,
			link,
			wide,
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};
