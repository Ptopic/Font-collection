import client from '../api/client';

const catchError = (error) => {
	if (error?.response?.data) {
		return error.response.data;
	} else {
		return { success: false, error: error.message };
	}
};

export const deleteFontById = async (fontId) => {
	try {
		const { data } = await client.post('/fonts/delete-font', {
			id: fontId,
		});
		return data;
	} catch (error) {
		return catchError(error);
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

export const updateFont = async (values, id, wide) => {
	try {
		console.log(values);
		const { data } = await client.post('/fonts/update-font', {
			id,
			...values,
			wide,
		});
		console.log(data);
		return data;
	} catch (error) {
		return catchError(error);
	}
};

export const insertFont = async (values) => {
	try {
		const { data } = await client.post('/fonts/insert-font', {
			...values,
		});
		console.log(data);
		return data;
	} catch (error) {
		return catchError(error);
	}
};
