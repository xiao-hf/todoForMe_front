import { request } from '@/utils/request'

const queryList = (data) => {
	return request.post('/task/queryList', data)
}

const addTask = (data) => {
	return request.post('/task/add', data)
}

const updateTask = (data) => {
	return request.post('/task/upd', data)
}

const deleteTask = (id) => {
	return request.delete(`/task/del/${id}`)
}

const complete = (id) => {
	return request.get(`/task/complete/${id}`)
}

const updSorts = (ids) => {
	return request.post('/task/updSorts', ids)
}

const like = (id) => {
	return request.get(`/task/like/${id}`)
}

const queryLike = (data) => {
	return request.post('/task/queryLike', data)
}

const statistic = (data) => {
	return request.post('/task/statistic', data)
}

export const taskApi = {
	queryList,
	addTask,
	updateTask,
	deleteTask,
	complete,
	updSorts,
	like,
	queryLike,
	statistic
}