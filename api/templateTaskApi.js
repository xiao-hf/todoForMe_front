import { request } from '@/utils/request'

const queryList = () => {
	return request.get('/templateTask/queryList')
}

const addTemplateTask = (data) => {
	return request.post('/templateTask/add', data)
}

const updateSorts = (ids) => {
	return request.post('/templateTask/updSorts', ids)
}

const updateTemplateTask = (data) => {
	return request.post('/templateTask/upd', data)
}

const deleteTemplateTask = (id) => {
	return request.delete(`/templateTask/del/${id}`)
}

export const templateTaskApi = {
	queryList,
	addTemplateTask,
	updateSorts,
	updateTemplateTask,
	deleteTemplateTask
}