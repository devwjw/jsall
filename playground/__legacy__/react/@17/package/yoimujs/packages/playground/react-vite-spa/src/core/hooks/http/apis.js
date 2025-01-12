import { AxiosInstance } from 'axios'
import { NO_AUTH } from '@/core/hooks/http/lib'

/**
 * @param instance AxiosInstance
 */
export const injectApis = instance => {
	return {
		login: data => instance.post('/login', data, { NO_AUTH }),
		file: {
			upload: formData => instance.post('/file/upload', formData),
		},
		excel: {
			members: () => instance.get('/excel/member', { responseType: 'blob' }),
		},
		todo: {
			list: () => instance.post('/todo/list'),
		},
		fake: {
			login: ({ username }) =>
				new Promise(res =>
					setTimeout(() => {
						res({
							success: true,
							accessToken: 'nice.guy',
							account: username,
							name: 'frank',
						})
					}, 1000),
				),
			profile: () =>
				new Promise(res =>
					setTimeout(() => {
						res({
							success: true,
							data: {
								account: import.meta.env.VITE_USERNAME,
								name: 'frank',
							},
						})
					}, 1000),
				),
		},
	}
}
