import {
    enterTask,
    getmemberList,
    initEditTask,
    getTaskFiles,
    upStartTime,
    upEndTime,
    addChildTask,
    group
} from "../../axios/api.js";
import {
    resolve
} from "url";
import {
    reject
} from "q";
const store = {
    namespaced: true,
    state: {
        allTask: [],
        tasks: [],
        currentProjectId: null,
        sort: '1',
        curTaskGroupId: 1,
        taskGroup: [],
        tags: [],
        members: [],
        task: null,
        joinInfoIds: [],
        images_suffix: [".gif", ".GIF", ".jpg", ".JPG", ".jpeg", ".JPEG", ".png", ".PNG", ".bmp", ".BMP"],
        taskId: '',
        groups: []
    },
    getters: {
        curTaskGroup: (state, getters) => {
            let cur = state.taskGroup.filter(v => v.id === state.curTaskGroupId)
            cur = cur.length > 0 ? cur[0] : {}
            return cur
        },
        getTaskByName: (state) => (name) => {
            return state.taskGroup.filter(v => v.name.indexOf(name) >= 0)
        },
        getTaskById: (state) => (data) => {
            for (var i = 0; i < state.tasks.length; i++) {
                if (state.tasks[i].task.taskId === data) {
                    return state.tasks[i]
                }
            }
            // return state.tasks.filter(taskvo => {
            //     return taskvo.task.taskId === data
            // })
        },
        abc: (state) => (num) => {
            return state.sort + num
        }
    },
    mutations: {
        initGroup(state, data) {
            state.groups = data
        },
        setTaskId(state, data) {
            state.taskId = data
        },
        initTask(state, data) {
            state.allTask = data
        },
        setTask(state, data) {
            state.allTask.forEach((m, i) => {
                if (m.relationId == data.taskMenuId) {
                    m.taskList.push(data)
                }
            })
        },

        editTask(state, data) {
            state.task = data
            if (data.joinInfo) {
                state.joinInfoIds = data.joinInfo.map((v) => {
                    return v.userId
                })
            } else {
                state.joinInfoIds = []
            }
        },
        changeRemarks(state, data) {
            if (state.task) {
                state.task.remarks = data
            }
        },
        changeExecutor(state, data) {
            state.task.executor = data.executor.userId
            if (!data.executor.userId) {
                state.task.executorName = ''
                state.task.executorImg = ''

                state.simpleTasks.forEach((m, i) => {
                    m.taskList.forEach((t, n) => {
                        if (t.taskId === data.taskId) {
                            state.simpleTasks[i].taskList[n].executorImg = ''
                        }
                    })
                })
            } else {
                state.task.executorImg = data.executor.image
                state.task.executorName = data.executor.userName
                state.simpleTasks.forEach((m, i) => {
                    m.taskList.forEach((t, n) => {
                        if (t.taskId === data.taskId) {
                            state.simpleTasks[i].taskList[n].executorImg = data.executor.image
                        }
                    })
                })
            }
        },
        //这是更改打开任务详情时的数据修改
        changeProperty(state, data) {
            var pro = null
            for (var obj in data.task) {
                if (obj === data.property) {
                    pro = data.task[obj]
                }
            }

            if (state.task.taskId === data.task.taskId) {
                state.task[data.property] = pro
            }
            // for(var i = 0;i < state.tasks.length;i++){
            //     if(state.tasks[i].task.taskId === data.task.taskId){
            //         state.tasks[i].task[data.property] = pro
            //     }
            // }

            //这里是更改进入项目主页面后的菜单任务列表的数据
            for (var i = 0; i < state.simpleTasks.length; i++) {
                for (var j = 0; j < state.simpleTasks[i].taskList.length; j++) {
                    if (state.simpleTasks[i].taskList[j].taskId === data.task.taskId) {
                        console.log(pro)
                        console.log(data.property)
                        state.simpleTasks[i].taskList[j][data.property] = pro
                    }
                }
            }
        },
        updateChildTask(state, data) {
            if (state.task.taskId === data.parentId) {
                state.task.taskList.unshift(data)
            }

            //这里是更改进入项目主页面后的菜单任务列表的数据
            for (var i = 0; i < state.simpleTasks.length; i++) {
                for (var j = 0; j < state.simpleTasks[i].taskList.length; j++) {
                    if (state.simpleTasks[i].taskList[j].taskId === data.parentId) {
                        state.simpleTasks[i].taskList[j].childCount++
                    }
                }
            }
        },
        deleteTask(state, data) {
            state.simpleTasks.map(item => {
                const a = item.taskList.filter(task => {
                    return task.taskId !== data
                });
            })
        },
        copyTask(state, data) {
            state.simpleTasks.forEach((menu, index) => {
                if (menu.relationId === data.taskMenuId) {
                    if (data.taskStatus === '未完成') {
                        data.taskStatus = false
                    } else {
                        data.taskStatus = true
                    }
                    state.simpleTasks[index].taskList.unshift(data)
                }
            })
        },
        moveTask(state, data) {
            state.simpleTasks.forEach((menu, mIndex) => {
                menu.taskList.forEach((task, tIndex) => {
                    if (data.taskId === task.taskId) {
                        console.log("1111111");
                        state.simpleTasks[mIndex].taskList.splice(tIndex, 1)
                    }
                })
                if (data.taskMenuId === menu.relationId) {
                    state.simpleTasks[mIndex].taskList.unshift(data)
                }
            })
        },
        loadFile(state, data) {
            if (state.task) {
                state.task.fileList = data
            }
        },
        bind(state, data) {
            var sign = 0
            data.bind.forEach((d, index) => {
                if (data.publicType === '任务') {
                    if (state.task.bindTasks.length === 0) {
                        state.task.bindTasks.unshift(d)
                        return
                    } else {
                        state.task.bindTasks.forEach((t, i) => {
                            if (t.taskId === d.taskId) {
                                sign = 1
                            }
                        })
                        if (sign === 0) {
                            state.task.bindTasks.unshift(d)
                        }
                    }
                }
                if (data.publicType === '文件') {
                    if (state.task.bindFiles.length === 0) {
                        state.task.bindFiles.unshift(d)
                        return
                    } else {
                        state.task.bindFiles.forEach((t, i) => {
                            if (t.taskId === d.taskId) {
                                sign = 1
                            }
                        })
                        if (sign === 0) {
                            state.task.bindTasks.unshift(d)
                        }
                    }
                }

                if (data.publicType === '日程') {
                    if (state.task.bindSchedules.length === 0) {
                        state.task.bindSchedules.unshift(d)
                        return
                    } else {
                        state.task.bindSchedules.forEach((t, i) => {
                            if (t.taskId === d.taskId) {
                                sign = 1
                            }
                        })
                        if (sign === 0) {
                            state.task.bindTasks.unshift(d)
                        }
                    }
                }
                if (data.publicType === '分享') {
                    if (state.task.bindShares.length === 0) {
                        state.task.bindShares.unshift(d)
                        return
                    } else {
                        state.task.bindShares.forEach((t, i) => {
                            if (t.taskId === d.taskId) {
                                sign = 1
                            }
                        })
                        if (sign === 0) {
                            state.task.bindTasks.unshift(d)
                        }
                    }
                }
            })
        },
        cancleRelation(state, data) {
            if (data.publicType === '任务') {
                state.task.bindTasks.forEach((t, i) => {
                    if (t.taskId === data.bindId) {
                        state.task.bindTasks.splice(i, 1)
                    }
                })
            }
            if (data.publicType === '文件') {
                state.task.bindFiles.forEach((f, i) => {
                    if (f.fileId === data.bindId) {
                        state.task.bindFiles.splice(i, 1)
                    }
                })
            }
            if (data.publicType === '分享') {
                state.task.bindShares.forEach((s, i) => {
                    if (s.shareId === data.bindId) {
                        state.task.bindShares.splice(i, 1)
                    }
                })
            }
            if (data.publicType === '日程') {
                state.task.bindSchedules.forEach((t, i) => {
                    if (t.scheduleId === data.bindId) {
                        state.task.bindSchedules.splice(i, 1)
                    }
                })
            }
        },
        updateSort(state, data) {
            state.sort = data
        },
        updateCurTaskGroupId(state, id) {
            state.curTaskGroupId = id
        },
        updateTags(state, data) {
            // data.unshift({
            //   id: -1,
            //   name: '无标签',
            //   color: '#a6a6a6'
            // })
            state.tags = data
        },
        updateMemberList() {},
        updateJoinInfo(state, data) {
            state.task.joinInfo = data
            if (data) {
                state.joinInfoIds = data.map((v) => {
                    return v.userId
                })
            } else {
                state.joinInfoIds = []
            }
        },
        recycle(state, data) {
            state.simpleTasks.forEach((menu, menuIndex) => {
                menu.taskList.forEach((task, taskIndex) => {
                    if (task.taskId === data.taskId) {
                        state.simpleTasks[menuIndex].taskList.splice(taskIndex, 1)
                    }
                })
            })

            state.tasks.forEach((item, index) => {
                if (item.task.taskId === data.taskId) {
                    state.tasks[index].task.taskDel = 1
                }
            })
        },
        bindingTag(state, data) {
            state.simpleTasks.forEach((menu, menuIndex) => {
                menu.taskList.forEach((task, taskIndex) => {
                    if (task.taskId === data.taskId) {
                        state.simpleTasks[menuIndex].taskList[taskIndex].tagList.unshift(data.tag)
                        return
                    }
                })
            })
            state.task.tagList.unshift(data.tag)
        },
        removeTag(state, data) {
            state.simpleTasks.forEach((menu, menuIndex) => {
                menu.taskList.forEach((task, taskIndex) => {
                    if (task.taskId === data.taskId) {
                        task.tagList.forEach((tag, tIndex) => {
                            if (tag.tagId === data.tagId) {
                                state.simpleTasks[menuIndex].taskList[taskIndex].tagList.splice(tIndex, 1)
                            }
                        })
                    }
                })
            })
            state.task.tagList.forEach((tag, tIndex) => {
                if (tag.tagId === data.tagId) {
                    state.task.tagList.splice(tIndex, 1)
                }
            })
        },
        publish(state, data) {
            if (state.task && state.task.taskId === data.publicId) {
                state.task.logs.push(data)
            }
        }
    },
    actions: {
        init({
            dispatch,
            commit
        }, data) {
            return new Promise((resolve, reject) => {
                enterTask(data).then(res => {
                    if (res.result === 1) {
                        dispatch('initGroup', data)
                        commit('initTask', res.menus)
                        resolve()
                    }
                });
            })

        },
        initGroup({
            commit
        }, data) {
            group(data).then(res => {
                if (res.result === 1) {
                    commit('initGroup', res.data)
                }
            });
        },
        loadIndex({
            commit
        }, data) {
            enterTask(data).then(res => {
                if (res.result === 1) {
                    commit('initTask', res.menus)
                }
            });
        },
        loadFile({
            commit
        }, data) {
            getTaskFiles(data).then(res => {
                if (res.result === 1) {
                    commit('loadFile', res.data)
                }
            })
        },
        editTask({
            commit
        }, data) {
            initEditTask(data).then(res => {
                if (res.result === 1) {
                    commit('editTask', res.data)
                }
            })
        },
        // 更新任务开始时间
        updateStartTime({
            commit
        }, value) {
            upStartTime(value.taskId, value.date).then(res => {
                if (res.result == 1) {}
            })
        },
        // 更新任务结束时间
        updateEndTime({
            commit
        }, value) {
            upEndTime(value.taskId, value.date).then(res => {
                if (res.result == 1) {

                }
            })
        },
        // 添加子任务
        addChildrenTask({
            commit
        }, value) {
            addChildTask(value.taskId, value.taskName).then(res => {
                console.log(res)
            })
        },
        changeTask({
            dispatch,
            commit
        }, data) { //任务数据改变时调用
            initEditTask(data).then(res => {
                if (res.result === 1) {
                    commit('editTask', res.data)
                    dispatch('init', res.data.projectId)
                }
            })
        },
        updateStatus({
            dispatch,
            commit
        }, data) {
            initEditTask(data.taskId).then(res => {
                commit('editTask', res.data)
                dispatch('init', data.projectId)
                dispatch('initGroup', data.projectId)
            })
        },
        changeProperty({
            commit
        }, data) {
            commit('changeProperty', data)
        },
        //删除任务时候调用
        deleteTask({
            commit
        }, data) {
            commit('deleteTask', data)
        },
        recycle({
            commit
        }, data) {
            commit('recycle', data)
        },
        updateSort({
            commit
        }, data) {
            commit('updateSort', data)
        },
        copyTask({
            commit
        }, data) {
            commit('copyTask', data)
        },
        moveTask({
            commit
        }, data) {
            commit('moveTask', data)
        },
        bindingTag({
            commit
        }, data) {
            commit('bindingTag', data)
        },
        removeTag({
            commit
        }, data) {
            commit('removeTag', data)
        },
        initMemberList({
            commit,
            state
        }, callback) {
            getmemberList(state.currentProjectId).then(res => {
                // console.log(res)
                commit('updateMemberList', res.data)
                callback()
            })

        },
        updateJoinInfo({
            commit
        }, data) {
            commit('updateJoinInfo', data)
        },
        updateChildTask({
            commit
        }, data) {
            commit('updateChildTask', data)
        },
        publish({
            commit
        }, data) {
            commit('publish', data)
        }
    }
}

export default store