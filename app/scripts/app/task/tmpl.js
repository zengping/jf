define(function() {
    function _page() {
        return `
            <table class="table table-striped table-animate animated">
                <thead>
                    <tr>
                        <th><input type="checkbox" class="selectAll"></th>
                        <th>名称</th>
                        <th>类别</th>
                        <th>类型</th>
                        <th>提交人</th>
                        <th>提交时间</th>
                        <th>执行状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="animated slideInRight" j-for="v in data">
                        <td><input type="checkbox" data-id="{{v.id}}"></td>
                        <td><a href="javascript:void(0)"><span class="maxL" data-toggle="tooltip" data-placement="bottom" title="{{v.taskName}}">{{v.taskName}}</span></a></td>
                        <td>
                        <span j-if="v.taskCategory == 1">
                        <i class="icon-db"></i>\u6570\u636E\u5E93
                        </span>
                        <span j-if="v.taskCategory == 2">
                        <i class="icon-bd-o"></i>\u6587\u4EF6
                        </span>
                        </td>
                        <td>{{v.taskType}}</td>
                        <td>{{v.submitUser}}</td>
                        <td>{{v.submitTime}}</td>
                        <td class="controlTaskType" data-id="{{v.id}}">
                        <span class="badge badge-default" j-if="v.type == 1">\u672A\u6267\u884C</span>
                        <span class="badge badge-primary" j-if="v.type == 2">\u6267\u884C\u4E2D</span>
                        <span class="badge badge-success" j-if="v.type == 3">\u5B8C\u6210</span>
                        <span class="badge badge-danger" j-if="v.type == 4">\u5931\u8D25</span>
                        <span class="badge badge-warning" j-if="v.type == 5">\u505C\u6B62</span>
                        </td>
                        <td>
                        <a href="javascript:void(0);" data-id="{{v.id}}" data-type="{{v.taskCategory}}" class="taskView"><i class="icon-track-changes" title="查看">查看</i></a>
                        <a href="javascript:void(0);" data-id="{{v.id}}" data-type="{{v.taskCategory}}" class="taskStart" j-if="v.type != 2"><i class="icon-settings-backup-restore" title="重新执行">重新执行</i></a>
                        <a href="javascript:void(0);" data-id="{{v.id}}" data-type="{{v.taskCategory}}" class="taskStop" j-if="v.type == 2 && v.taskTypeId == 2"><i class="icon-stop" title="停止执行">停止执行</i></a>
                        <a href="javascript:void(0);" data-id="{{v.id}}" data-type="{{v.taskCategory}}" class="taskEdit" j-if="v.type != 2"><i class="icon-pencil" title="\u7F16\u8F91">编辑</i></a>
                        <a href="javascript:void(0);" data-id="{{v.id}}" data-type="{{v.taskCategory}}" class="taskDel" j-if="v.type != 2"><i class="icon-trashcan" title="\u5220\u9664">删除</i></a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-striped table-animate animated">
                <thead>
                    <tr>
                        <th><input type="checkbox" class="selectAll"></th>
                        <th>名称</th>
                        <th>类别</th>
                        <th>类型</th>
                        <th>提交人</th>
                        <th>提交时间</th>
                        <th>执行状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="animated slideInRight" j-for="(k, v) in list">
                        <td><input type="checkbox" data-id="{{v.id}}"></td>
                        <td><a href="javascript:void(0)"><span class="maxL" data-toggle="tooltip" data-placement="bottom" title="{{v.taskName}}">{{v.taskName}}</span></a></td>
                        <td>
                        <span j-if="v.taskCategory == 1">
                        <i class="icon-db"></i>\u6570\u636E\u5E93
                        </span>
                        <span j-if="v.taskCategory == 2">
                        <i class="icon-bd-o"></i>\u6587\u4EF6
                        </span>
                        </td>
                        <td>{{v.taskType}}</td>
                        <td>{{v.submitUser}}</td>
                        <td>{{v.submitTime}}</td>
                        <td class="controlTaskType" data-id="{{v.id}}">
                        <span class="badge badge-default" j-if="v.type == 1">\u672A\u6267\u884C</span>
                        <span class="badge badge-primary" j-if="v.type == 2">\u6267\u884C\u4E2D</span>
                        <span class="badge badge-success" j-if="v.type == 3">\u5B8C\u6210</span>
                        <span class="badge badge-danger" j-if="v.type == 4">\u5931\u8D25</span>
                        <span class="badge badge-warning" j-if="v.type == 5">\u505C\u6B62</span>
                        </td>
                        <td>
                        <a href="javascript:void(0);" data-id="{{v.id}}" data-type="{{v.taskCategory}}" class="taskView"><i class="icon-track-changes" title="查看">查看</i></a>
                        <a href="javascript:void(0);" data-id="{{v.id}}" data-type="{{v.taskCategory}}" class="taskStart" j-if="v.type != 2"><i class="icon-settings-backup-restore" title="重新执行">重新执行</i></a>
                        <a href="javascript:void(0);" data-id="{{v.id}}" data-type="{{v.taskCategory}}" class="taskStop" j-if="v.type == 2 && v.taskTypeId == 2"><i class="icon-stop" title="停止执行">停止执行</i></a>
                        <a href="javascript:void(0);" data-id="{{v.id}}" data-type="{{v.taskCategory}}" class="taskEdit" j-if="v.type != 2"><i class="icon-pencil" title="\u7F16\u8F91">编辑</i></a>
                        <a href="javascript:void(0);" data-id="{{v.id}}" data-type="{{v.taskCategory}}" class="taskDel" j-if="v.type != 2"><i class="icon-trashcan" title="\u5220\u9664">删除</i></a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-striped table-animate animated">
                <thead>
                    <tr>
                        <th><input type="checkbox" class="selectAll"></th>
                        <th>名称</th>
                        <th>类别</th>
                        <th>类型</th>
                        <th>提交人</th>
                        <th>提交时间</th>
                        <th>执行状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="ControlTableBody">
                </tbody>
            </table>
            <div class="page table-animate animated">
            </div>
            <button>to index page</button>
        `;
    }

    function _table() {
        return `
            <tr class="animated slideInRight">
            <td><input type="checkbox" data-id="{{= value.id}}"></td>
            <td><a href="javascript:void(0)"><span class="maxL" data-toggle="tooltip" data-placement="bottom" title="{{= value.taskName}}">{{= value.taskName}}</span></a></td>
            <td>
            {{if value.taskCategory == 1}}
            <i class="icon-db"></i>\u6570\u636E\u5E93
            {{/if}}
            {{if value.taskCategory == 2}}
            <i class="icon-bd-o"></i>\u6587\u4EF6
            {{/if}}
            </td>
            <td>{{= value.taskType}}</td>
            <td>{{= value.submitUser}}</td>
            <td>{{= value.submitTime}}</td>
            <td class="controlTaskType" data-id="{{= value.id}}">
            {{if value.type == 1}}
            <span class="badge badge-default">\u672A\u6267\u884C</span>
            {{/if}}
            {{if value.type == 2}}
            <span class="badge badge-primary">\u6267\u884C\u4E2D</span>
            {{/if}}
            {{if value.type == 3}}
            <span class="badge badge-success">\u5B8C\u6210</span>
            {{/if}}
            {{if value.type == 4}}
            <span class="badge badge-danger">\u5931\u8D25</span>
            {{/if}}
            {{if value.type == 5}}
            <span class="badge badge-warning">\u505C\u6B62</span>
            {{/if}}
            </td>
            <td>
            <a href="javascript:void(0);" data-id="{{= value.id}}" data-type="{{= value.taskCategory}}" class="taskView"><i class="icon-track-changes" title="查看"></i></a>
            {{if value.type != 2}}
            <a href="javascript:void(0);" data-id="{{= value.id}}" data-type="{{= value.taskCategory}}" class="taskStart"><i class="icon-settings-backup-restore" title="重新执行"></i></a>
            {{/if}}
            {{if value.type == 2 && value.taskTypeId == 2}}
            <a href="javascript:void(0);" data-id="{{= value.id}}" data-type="{{= value.taskCategory}}" class="taskStop"><i class="icon-stop" title="停止执行"></i></a>
            {{/if}}
            {{if value.type != 2}}
            <a href="javascript:void(0);" data-id="{{= value.id}}" data-type="{{= value.taskCategory}}" class="taskEdit"><i class="icon-pencil" title="\u7F16\u8F91\"></i></a>
            <a href="javascript:void(0);" data-id="{{= value.id}}" data-type="{{= value.taskCategory}}" class="taskDel"><i class="icon-trashcan" title="\u5220\u9664"></i></a>
            {{/if}}
            </td>
            </tr>
        `;
    }

    return {
        "page": (function() {
            return _page();
        })(),
        "table": (function() {
            return _table();
        })()
    };
});