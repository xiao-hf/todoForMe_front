import { request } from '@/utils/request'
const now = () => {
	return request.get('/util/now')
}
export const utilApi = {
	now
}