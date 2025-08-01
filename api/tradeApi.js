import { request } from '@/utils/request'

/**
 * 添加交易品种
 * @param {Object} data 品种数据
 * @param {string} data.name 品种名称
 * @param {string} data.code 品种代码
 * @param {number} data.singleProfit 1手1点利润
 * @returns {Promise}
 */
const addGoods = (data) => {
    return request.post('/trade/addGoods', data)
}

const queryProfit = (data) => {
    return request.post('/trade/queryProfit', data)
}

/**
 * 更新交易品种
 * @param {Object} data 品种数据
 * @param {number} data.id 品种ID
 * @param {string} data.name 品种名称
 * @param {string} data.code 品种代码
 * @param {number} data.singleProfit 1手1点利润
 * @returns {Promise}
 */
const updGoods = (data) => {
    return request.post('/trade/updGoods', data)
}

/**
 * 删除交易品种
 * @param {number|string} id 品种ID
 * @returns {Promise}
 */
const delGoods = (id) => {
    return request.delete(`/trade/delGoods/${id}`)
}

/**
 * 查询交易品种
 * @param {Object} data 查询条件
 * @returns {Promise}
 */
const queryGoods = (data) => {
    return request.post('/trade/queryGoods', data)
}

/**
 * 查询交易日志
 * @param {Object} data 查询条件
 * @returns {Promise}
 */
const queryLog = (data) => {
    return request.post('/trade/queryLog', data)
}

/**
 * 新建日志
 * @param {Object} data 日志数据
 * @param {number} data.id 品种ID
 * @param {string} data.inDesc 入场描述
 * @param {FileList} data.addInImgs 新增入场图片
 * @param {number} data.inPrice 入场价格
 * @param {boolean} data.isRise 是否看涨
 * @param {number} data.count 手数
 * @returns {Promise}
 */
const addLog = async (data) => {
    console.log('新建日志API被调用，参数:', data)
    console.log('传入的id:', data.id)
    console.log('传入的inDesc:', data.inDesc)
    console.log('传入的inPrice:', data.inPrice)
    console.log('传入的isRise:', data.isRise)
    console.log('传入的count:', data.count)
    console.log('传入的addInImgs:', data.addInImgs ? '有入场图片文件' : '无入场图片文件')
    
    // 安全地创建FormData对象处理文件上传
    let formData
    let contentType = 'application/json'
    
    try {
        if (typeof FormData !== 'undefined') {
            formData = new FormData()
            
            // 添加基本参数
            formData.append('id', data.id)
            formData.append('inDesc', data.inDesc)
            formData.append('inPrice', data.inPrice)
            formData.append('isRise', data.isRise)
            formData.append('count', data.count)
            
            // 处理入场图片文件
            if (data.addInImgs && data.addInImgs.length > 0) {
                console.log('检测到入场图片文件:', data.addInImgs.length, '张')
                for (let i = 0; i < data.addInImgs.length; i++) {
                    const img = data.addInImgs[i]
                    console.log('处理入场图片', i, ':', typeof img, img instanceof File ? '是File对象' : img instanceof Blob ? '是Blob对象' : '其他类型')
                    
                    // 验证是否为File或Blob对象
                    if (img instanceof File || img instanceof Blob) {
                        console.log('添加入场图片文件到FormData, 文件名:', img.name || '未命名文件', '大小:', img.size, 'bytes')
                        formData.append('addInImgs', img, img.name || `inImg_${Date.now()}_${i}.jpg`)
                    } else {
                        console.error('入场图片不是文件对象:', typeof img)
                    }
                }
            }
            
            // 检查FormData是否包含文件
            console.log('FormData包含的字段:')
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1] instanceof File ? '是File对象' : typeof pair[1])
            }
            
            contentType = 'multipart/form-data'
        } else {
            // FormData不可用，使用JSON格式
            console.warn('FormData不可用，使用JSON格式发送请求')
            formData = JSON.stringify({
                id: data.id,
                inDesc: data.inDesc,
                inPrice: data.inPrice,
                isRise: data.isRise,
                count: data.count
                // 注意：JSON格式无法处理文件上传
            })
        }
    } catch (formDataError) {
        console.warn('FormData创建失败，使用JSON格式:', formDataError)
        formData = JSON.stringify({
            id: data.id,
            inDesc: data.inDesc,
            inPrice: data.inPrice,
            isRise: data.isRise,
            count: data.count
        })
    }
    
    // 获取token
    let token = ''
    try {
        const userInfo = uni.getStorageSync('userInfo')
        if (userInfo) {
            const userData = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo
            token = userData.authorization || ''
        }
    } catch (error) {
        console.error('获取token失败:', error)
        token = ''
    }
    
    console.log('准备发送请求, URL:', 'http://192.168.199.113:9999/trade/addLog')
    
    try {
        // 完全参考 aiRole.vue 成功模式，检测平台类型并使用相应的上传方式
        // #ifdef H5
        console.log('H5环境，使用fetch上传');
        
        const formDataObj = new FormData();
        if (contentType === 'application/json') {
            // 解析JSON数据并添加到FormData
            const jsonData = JSON.parse(formData);
            Object.keys(jsonData).forEach(key => {
                formDataObj.append(key, jsonData[key]);
            });
        }
        
        const response = await fetch('http://192.168.199.113:9999/trade/addLog', {
            method: 'POST',
            headers: {
                Authorization: token ? `Bearer ${token}` : ''
            },
            body: contentType === 'application/json' ? formDataObj : formData
        })
        
        if (!response.ok) {
            const errorText = await response.text()
            console.error('API请求失败:', response.status, errorText)
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        console.log('API请求成功，返回结果:', result)
        
        // 兼容字符串和数字格式的code
        if (result.code == 200 || result.code == '200') {
            return result;
        } else {
            throw new Error(result.msg || result.message || '创建失败');
        }
        // #endif
        
        // #ifdef MP || APP-PLUS
        console.log('小程序/APP环境，使用uni.request');
        
        const hasFiles = contentType !== 'application/json'
        
        if (hasFiles) {
            // 有文件，使用uploadFile (当前版本先抛出错误，后续可扩展)
            console.log('有文件，应该使用uploadFile，但当前版本暂不支持')
            throw new Error('当前版本不支持文件上传')
        } else {
            // 无文件，使用普通请求，完全参考 aiRole.vue 成功模式
            console.log('无文件，使用普通请求');
            
            // 解析JSON字符串为对象
            const requestData = JSON.parse(formData);
            
            return new Promise((resolve, reject) => {
                uni.request({
                    url: 'http://192.168.199.113:9999/trade/addLog',
                    method: 'POST',
                    data: requestData,
                    header: {
                        // 使用表单格式，完全参考 aiRole.vue 成功模式
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': token ? `Bearer ${token}` : ''
                    },
                    success: (res) => {
                        console.log('请求结果:', res);
                        // 兼容字符串和数字格式的code，完全参考 aiRole.vue
                        if (res.statusCode === 200 && (res.data.code === 200 || res.data.code === '200')) {
                            resolve(res.data);
                        } else {
                            console.error('请求失败:', res.data);
                            reject(new Error(res.data?.msg || res.data?.message || '请求失败'));
                        }
                    },
                    fail: (err) => {
                        console.error('请求失败:', err);
                        reject(err);
                    }
                });
            });
        }
        // #endif
        
    } catch (error) {
        console.error('API请求异常:', error)
        throw error
    }
}

/**
 * 更新交易日志
 * @param {Object} data 日志数据
 * @param {number} data.id 日志ID
 * @param {string} data.inDesc 入场描述
 * @param {string} data.inImgs 已有图片JSON格式字符串（仅编辑时使用）
 * @param {FileList} data.addInImgs 新增入场图片
 * @param {number} data.inPrice 入场价格
 * @param {boolean} data.isRise 是否看涨
 * @param {number} data.count 手数
 * @returns {Promise}
 */
const updLog = async (data) => {
    console.log('更新日志API被调用，参数:', data)
    console.log('传入的id:', data.id)
    console.log('传入的inDesc:', data.inDesc)
    console.log('传入的inPrice:', data.inPrice)
    console.log('传入的isRise:', data.isRise)
    console.log('传入的count:', data.count)
    console.log('传入的inImgs:', data.inImgs || '无已有图片')
    console.log('传入的addInImgs:', data.addInImgs ? '有入场图片文件' : '无入场图片文件')
    
    // 安全地创建FormData对象处理文件上传
    let formData
    let contentType = 'application/json'
    
    try {
        if (typeof FormData !== 'undefined') {
            formData = new FormData()
            
            // 添加基本参数
            formData.append('id', data.id)
            formData.append('inDesc', data.inDesc)
            formData.append('inPrice', data.inPrice)
            formData.append('isRise', data.isRise)
            formData.append('count', data.count)
            
            // 添加已有图片JSON字符串（如果有的话）
            if (data.inImgs) {
                formData.append('inImgs', data.inImgs)
                console.log('添加已有图片JSON字符串到FormData:', data.inImgs)
            }
            
            // 处理入场图片文件
            if (data.addInImgs && data.addInImgs.length > 0) {
                console.log('检测到入场图片文件:', data.addInImgs.length, '张')
                for (let i = 0; i < data.addInImgs.length; i++) {
                    const img = data.addInImgs[i]
                    console.log('处理入场图片', i, ':', typeof img, img instanceof File ? '是File对象' : img instanceof Blob ? '是Blob对象' : '其他类型')
                    
                    // 验证是否为File或Blob对象
                    if (img instanceof File || img instanceof Blob) {
                        console.log('添加入场图片文件到FormData, 文件名:', img.name || '未命名文件', '大小:', img.size, 'bytes')
                        formData.append('addInImgs', img, img.name || `inImg_${Date.now()}_${i}.jpg`)
                    } else {
                        console.error('入场图片不是文件对象:', typeof img)
                    }
                }
            }
            
            // 检查FormData是否包含文件
            console.log('FormData包含的字段:')
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1] instanceof File ? '是File对象' : typeof pair[1])
            }
            
            contentType = 'multipart/form-data'
        } else {
            // FormData不可用，使用JSON格式
            console.warn('FormData不可用，使用JSON格式发送请求')
            formData = JSON.stringify({
                id: data.id,
                inDesc: data.inDesc,
                inPrice: data.inPrice,
                isRise: data.isRise,
                count: data.count,
                inImgs: data.inImgs || ''
                // 注意：JSON格式无法处理文件上传
            })
        }
    } catch (formDataError) {
        console.warn('FormData创建失败，使用JSON格式:', formDataError)
        formData = JSON.stringify({
            id: data.id,
            inDesc: data.inDesc,
            inPrice: data.inPrice,
            isRise: data.isRise,
            count: data.count,
            inImgs: data.inImgs || ''
        })
    }
    
    // 获取token
    let token = ''
    try {
        const userInfo = uni.getStorageSync('userInfo')
        if (userInfo) {
            const userData = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo
            token = userData.authorization || ''
        }
    } catch (error) {
        console.error('获取token失败:', error)
        token = ''
    }
    
    console.log('准备发送请求, URL:', 'http://192.168.199.113:9999/trade/updLog')
    
    try {
        // 完全参考 aiRole.vue 成功模式，检测平台类型并使用相应的上传方式
        // #ifdef H5
        console.log('H5环境，使用fetch上传');
        
        const formDataObj = new FormData();
        if (contentType === 'application/json') {
            // 解析JSON数据并添加到FormData
            const jsonData = JSON.parse(formData);
            Object.keys(jsonData).forEach(key => {
                formDataObj.append(key, jsonData[key]);
            });
        }
        
        const response = await fetch('http://192.168.199.113:9999/trade/updLog', {
            method: 'POST',
            headers: {
                Authorization: token ? `Bearer ${token}` : ''
            },
            body: contentType === 'application/json' ? formDataObj : formData
        })
        
        if (!response.ok) {
            const errorText = await response.text()
            console.error('API请求失败:', response.status, errorText)
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        console.log('API请求成功，返回结果:', result)
        
        // 兼容字符串和数字格式的code
        if (result.code == 200 || result.code == '200') {
            return result;
        } else {
            throw new Error(result.msg || result.message || '更新失败');
        }
        // #endif
        
        // #ifdef MP || APP-PLUS
        console.log('小程序/APP环境，使用uni.request');
        
        const hasFiles = contentType !== 'application/json'
        
        if (hasFiles) {
            // 有文件，使用uploadFile (当前版本先抛出错误，后续可扩展)
            console.log('有文件，应该使用uploadFile，但当前版本暂不支持')
            throw new Error('当前版本不支持文件上传')
        } else {
            // 无文件，使用普通请求，完全参考 aiRole.vue 成功模式
            console.log('无文件，使用普通请求');
            
            // 解析JSON字符串为对象
            const requestData = JSON.parse(formData);
            
            return new Promise((resolve, reject) => {
                uni.request({
                    url: 'http://192.168.199.113:9999/trade/updLog',
                    method: 'POST',
                    data: requestData,
                    header: {
                        // 使用表单格式，完全参考 aiRole.vue 成功模式
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': token ? `Bearer ${token}` : ''
                    },
                    success: (res) => {
                        console.log('请求结果:', res);
                        // 兼容字符串和数字格式的code，完全参考 aiRole.vue
                        if (res.statusCode === 200 && (res.data.code === 200 || res.data.code === '200')) {
                            resolve(res.data);
                        } else {
                            console.error('请求失败:', res.data);
                            reject(new Error(res.data?.msg || res.data?.message || '请求失败'));
                        }
                    },
                    fail: (err) => {
                        console.error('请求失败:', err);
                        reject(err);
                    }
                });
            });
        }
        // #endif
        
    } catch (error) {
        console.error('API请求异常:', error)
        throw error
    }
}

/**
 * 删除交易日志
 * @param {number|string} id 日志ID
 * @returns {Promise}
 */
const delLog = (id) => {
    return request.delete(`/trade/delLog/${id}`)
}

/**
 * 查询修改日志
 * @param {number|string} id 日志ID
 * @returns {Promise}
 */
const queryOutLog = (id) => {
    return request.get(`/trade/queryOutLog/${id}`)
}

/**
 * 新建出场日志
 * @param {Object} data 出场日志数据
 * @param {number} data.tradeLogId 入场日志ID
 * @param {string} data.outImgs 已有图片JSON格式字符串（仅编辑时使用）
 * @param {FileList} data.addOutImgs 新增出场图片
 * @param {number} data.count 手数
 * @param {string} data.outDesc 出场描述
 * @param {number} data.outPrice 出场价格
 * @returns {Promise}
 */
const addOutLog = async (data) => {
    console.log('新建出场日志API被调用，参数:', data)
    console.log('传入的tradeLogId:', data.tradeLogId)
    console.log('传入的count:', data.count)
    console.log('传入的outDesc:', data.outDesc)
    console.log('传入的outPrice:', data.outPrice)
    console.log('传入的outImgs:', data.outImgs || '无已有图片')
    console.log('传入的addOutImgs:', data.addOutImgs ? '有出场图片文件' : '无出场图片文件')
    
    // 安全地创建FormData对象处理文件上传
    let formData
    let contentType = 'application/json'
    
    try {
        if (typeof FormData !== 'undefined') {
            formData = new FormData()
            
            // 添加基本参数
            formData.append('tradeLogId', data.tradeLogId)
            formData.append('count', data.count)
            formData.append('outDesc', data.outDesc || '')
            formData.append('outPrice', data.outPrice)
            
            // 添加已有图片JSON字符串（如果有的话）
            if (data.outImgs) {
                formData.append('outImgs', data.outImgs)
                console.log('添加已有出场图片JSON字符串到FormData:', data.outImgs)
            }
            
            // 处理出场图片文件
            if (data.addOutImgs && data.addOutImgs.length > 0) {
                console.log('检测到出场图片文件:', data.addOutImgs.length, '张')
                for (let i = 0; i < data.addOutImgs.length; i++) {
                    const img = data.addOutImgs[i]
                    console.log('处理出场图片', i, ':', typeof img, img instanceof File ? '是File对象' : img instanceof Blob ? '是Blob对象' : '其他类型')
                    
                    // 验证是否为File或Blob对象
                    if (img instanceof File || img instanceof Blob) {
                        console.log('添加出场图片文件到FormData, 文件名:', img.name || '未命名文件', '大小:', img.size, 'bytes')
                        formData.append('addOutImgs', img, img.name || `outImg_${Date.now()}_${i}.jpg`)
                    } else {
                        console.error('出场图片不是文件对象:', typeof img)
                    }
                }
            }
            
            // 检查FormData是否包含文件
            console.log('FormData包含的字段:')
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1] instanceof File ? '是File对象' : typeof pair[1])
            }
            
            contentType = 'multipart/form-data'
        } else {
            // FormData不可用，使用JSON格式
            console.warn('FormData不可用，使用JSON格式发送请求')
            formData = JSON.stringify({
                tradeLogId: data.tradeLogId,
                count: data.count,
                outDesc: data.outDesc || '',
                outPrice: data.outPrice,
                outImgs: data.outImgs || ''
                // 注意：JSON格式无法处理文件上传
            })
        }
    } catch (formDataError) {
        console.warn('FormData创建失败，使用JSON格式:', formDataError)
        formData = JSON.stringify({
            tradeLogId: data.tradeLogId,
            count: data.count,
            outDesc: data.outDesc || '',
            outPrice: data.outPrice,
            outImgs: data.outImgs || ''
        })
    }
    
    // 获取token
    let token = ''
    try {
        const userInfo = uni.getStorageSync('userInfo')
        if (userInfo) {
            const userData = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo
            token = userData.authorization || ''
        }
    } catch (error) {
        console.error('获取token失败:', error)
        token = ''
    }
    
    console.log('准备发送请求, URL:', 'http://192.168.199.113:9999/trade/addOutLog')
    
    try {
        // 完全参考 aiRole.vue 成功模式，检测平台类型并使用相应的上传方式
        // #ifdef H5
        console.log('H5环境，使用fetch上传');
        
        const formDataObj = new FormData();
        if (contentType === 'application/json') {
            // 解析JSON数据并添加到FormData
            const jsonData = JSON.parse(formData);
            Object.keys(jsonData).forEach(key => {
                formDataObj.append(key, jsonData[key]);
            });
        }
        
        const response = await fetch('http://192.168.199.113:9999/trade/addOutLog', {
            method: 'POST',
            headers: {
                Authorization: token ? `Bearer ${token}` : ''
            },
            body: contentType === 'application/json' ? formDataObj : formData
        })
        
        if (!response.ok) {
            const errorText = await response.text()
            console.error('API请求失败:', response.status, errorText)
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        console.log('API请求成功，返回结果:', result)
        
        // 兼容字符串和数字格式的code
        if (result.code == 200 || result.code == '200') {
            return result;
        } else {
            throw new Error(result.msg || result.message || '添加出场记录失败');
        }
        // #endif
        
        // #ifdef MP || APP-PLUS
        console.log('小程序/APP环境，使用uni.request');
        
        const hasFiles = contentType !== 'application/json'
        
        if (hasFiles) {
            // 有文件，使用uploadFile (当前版本先抛出错误，后续可扩展)
            console.log('有文件，应该使用uploadFile，但当前版本暂不支持')
            throw new Error('当前版本不支持文件上传')
        } else {
            // 无文件，使用普通请求，完全参考 aiRole.vue 成功模式
            console.log('无文件，使用普通请求');
            
            // 解析JSON字符串为对象
            const requestData = JSON.parse(formData);
            
            return new Promise((resolve, reject) => {
                uni.request({
                    url: 'http://192.168.199.113:9999/trade/addOutLog',
                    method: 'POST',
                    data: requestData,
                    header: {
                        // 使用表单格式，完全参考 aiRole.vue 成功模式
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': token ? `Bearer ${token}` : ''
                    },
                    success: (res) => {
                        console.log('请求结果:', res);
                        // 兼容字符串和数字格式的code，完全参考 aiRole.vue
                        if (res.statusCode === 200 && (res.data.code === 200 || res.data.code === '200')) {
                            resolve(res.data);
                        } else {
                            console.error('请求失败:', res.data);
                            reject(new Error(res.data?.msg || res.data?.message || '请求失败'));
                        }
                    },
                    fail: (err) => {
                        console.error('请求失败:', err);
                        reject(err);
                    }
                });
            });
        }
        // #endif
        
    } catch (error) {
        console.error('API请求异常:', error)
        throw error
    }
}

/**
 * 更新出场日志
 * @param {Object} data 出场日志数据
 * @param {number} data.tradeLogOutId 出场记录ID
 * @param {string} data.outImgs 已有图片JSON格式字符串（仅编辑时使用）
 * @param {FileList} data.addOutImgs 新增出场图片
 * @param {number} data.count 手数
 * @param {string} data.outDesc 出场描述
 * @param {number} data.outPrice 出场价格
 * @returns {Promise}
 */
const updOutLog = async (data) => {
    console.log('更新出场日志API被调用，参数:', data)
    
    // 构建请求数据，完全参考其他API的模式
    let formData
    let contentType = 'application/json'
    
    try {
        // 尝试使用FormData处理文件上传
        if (typeof FormData !== 'undefined' && data.addOutImgs && data.addOutImgs.length > 0) {
            console.log('检测到文件，使用FormData格式')
            formData = new FormData()
            
            // 添加基本参数
            formData.append('tradeLogOutId', data.tradeLogOutId)
            formData.append('count', data.count)
            formData.append('outDesc', data.outDesc || '')
            formData.append('outPrice', data.outPrice)
            
            // 添加已有图片JSON字符串
            if (data.outImgs) {
                formData.append('outImgs', data.outImgs)
            }
            
            // 处理新增图片文件
                for (let i = 0; i < data.addOutImgs.length; i++) {
                    const img = data.addOutImgs[i]
                    if (img instanceof File || img instanceof Blob) {
                        formData.append('addOutImgs', img)
                        console.log('添加出场图片到FormData:', img.name || `blob_${i}`)
                }
            }
            
            contentType = 'multipart/form-data'
        } else {
            // FormData不可用或无文件，使用JSON格式
            console.warn('FormData不可用或无文件，使用JSON格式发送请求')
            formData = JSON.stringify({
                tradeLogOutId: data.tradeLogOutId,
                count: data.count,
                outDesc: data.outDesc || '',
                outPrice: data.outPrice,
                outImgs: data.outImgs || ''
            })
            contentType = 'application/json'
        }
    } catch (formDataError) {
        console.warn('FormData创建失败，使用JSON格式:', formDataError)
        formData = JSON.stringify({
            tradeLogOutId: data.tradeLogOutId,
            count: data.count,
            outDesc: data.outDesc || '',
            outPrice: data.outPrice,
            outImgs: data.outImgs || ''
        })
        contentType = 'application/json'
    }
    
    // 获取token
            let token = ''
            try {
                const userInfo = uni.getStorageSync('userInfo')
                if (userInfo) {
                    const userData = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo
                    token = userData.authorization || ''
                }
            } catch (error) {
                console.error('获取token失败:', error)
                token = ''
    }
    
    console.log('准备发送请求, URL:', 'http://192.168.199.113:9999/trade/updOutLog')
    
    try {
        // 完全参考 aiRole.vue 成功模式，检测平台类型并使用相应的上传方式
        // #ifdef H5
        console.log('H5环境，使用fetch上传');
        
        const formDataObj = new FormData();
        if (contentType === 'application/json') {
            // 解析JSON数据并添加到FormData
            const jsonData = JSON.parse(formData);
            Object.keys(jsonData).forEach(key => {
                formDataObj.append(key, jsonData[key]);
            });
            }
            
            const response = await fetch('http://192.168.199.113:9999/trade/updOutLog', {
                method: 'POST',
                headers: {
                Authorization: token ? `Bearer ${token}` : ''
                },
            body: contentType === 'application/json' ? formDataObj : formData
            })
            
            if (!response.ok) {
            const errorText = await response.text()
            console.error('API请求失败:', response.status, errorText)
            throw new Error(`HTTP error! status: ${response.status}`)
            }
            
            const result = await response.json()
            console.log('API请求成功，返回结果:', result)
        
        // 兼容字符串和数字格式的code
        if (result.code == 200 || result.code == '200') {
            return result;
        } else {
            throw new Error(result.msg || result.message || '更新出场记录失败');
        }
        // #endif
        
        // #ifdef MP || APP-PLUS
        console.log('小程序/APP环境，使用uni.request');
        
        const hasFiles = contentType !== 'application/json'
        
        if (hasFiles) {
            // 有文件，使用uploadFile (当前版本先抛出错误，后续可扩展)
            console.log('有文件，应该使用uploadFile，但当前版本暂不支持')
            throw new Error('当前版本不支持文件上传')
        } else {
            // 无文件，使用普通请求，完全参考 aiRole.vue 成功模式
            console.log('无文件，使用普通请求');
            
            // 解析JSON字符串为对象
            const requestData = JSON.parse(formData);
            
            return new Promise((resolve, reject) => {
                uni.request({
                    url: 'http://192.168.199.113:9999/trade/updOutLog',
                    method: 'POST',
                    data: requestData,
                    header: {
                        // 使用表单格式，完全参考 aiRole.vue 成功模式
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': token ? `Bearer ${token}` : ''
                    },
                    success: (res) => {
                        console.log('请求结果:', res);
                        // 兼容字符串和数字格式的code，完全参考 aiRole.vue
                        if (res.statusCode === 200 && (res.data.code === 200 || res.data.code === '200')) {
                            resolve(res.data);
                        } else {
                            console.error('请求失败:', res.data);
                            reject(new Error(res.data?.msg || res.data?.message || '请求失败'));
                        }
                    },
                    fail: (err) => {
                        console.error('请求失败:', err);
                        reject(err);
                    }
                });
            });
        }
        // #endif
        
    } catch (error) {
        console.error('API请求异常:', error)
        throw error
    }
}

/**
 * 删除平仓记录
 * @param {number|string} id 平仓记录ID
 * @returns {Promise}
 */
const delOutLog = (id) => {
    return request.delete(`/trade/delOutLog/${id}`)
}

export const tradeApi = {
    addGoods,
    updGoods,
    delGoods,
    queryGoods,
    queryLog,
    queryProfit,
    addLog,
    updLog,
    delLog,
    queryOutLog,
    addOutLog,
    updOutLog,
    delOutLog
}
