import { request } from '@/utils/request'

const queryList = (data) => {
	return request.post('/milestone/list', data)
}

const addMilestone = (data) => {
	return request.post('/milestone/add', data)
}

const updateMilestone = (data) => {
	return request.post('/milestone/upd', data)
}

const deleteMilestone = (id) => {
	return request.delete(`/milestone/del/${id}`)
}

const completeMilestone = (id) => {
	return request.get(`/milestone/complete/${id}`)
}

const getMilestoneDetail = (id) => {
	return request.get(`/milestone/detail/${id}`)
}

export const milestoneApi = {
	queryList,
	addMilestone,
	updateMilestone,
	deleteMilestone,
	completeMilestone,
	getMilestoneDetail
} 