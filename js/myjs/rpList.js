$(document).ready(function () {

    $('.js-basic-example').DataTable({
        responsive: true,
        language: {
            "lengthMenu": "每页显示 _MENU_ 条记录",
            "zeroRecords": "抱歉，未找到记录。",
            "info": "正显示第 _START_ 到第 _END_ 条记录，共 _TOTAL_ 条记录",
            "infoEmpty": "无可用记录。",
            "infoFiltered": "(正从 _MAX_ 条记录中进行过滤)",
            "search": "搜索:",
            "paginate": {
                "next":       "下一页",
                "previous":   "上一页"
            },
            "loadingRecords": "加载中...",
            "processing":     "处理中..."
        },
        ajax : {
            "url" : "http://localhost:8080/retirePolicy/queryAll",
            "type" : "GET",
            "dataSrc": "data.retirePolicyList"
        },
        // data : staffInfoList,
        "columns" : [
            { "data": "rpid" },
            { "data": "rpname" },
            { "data": "normalagem" },
            { "data": "normalagef" },
            { "data": "specialjobagem"},
            { "data": "specialjobagef" },
            { "data": "bankruptcyagem" },
            { "data": "bankruptcyagef" },
            { "data": "illnessagem"},
            { "data": "illnessagef" },
            { "data": "industrialaccidentagem" },
            { "data": "industrialaccidentagef" },
            { "data": "normalagemc" },
            { "data": "normalagefc" },
            { "data": "specialjobagemc"},
            { "data": "specialjobagefc" },
            { "data": "bankruptcyagemc" },
            { "data": "bankruptcyagefc" },
            { "data": "illnessagemc"},
            { "data": "illnessagefc" },
            { "data": "industrialaccidentagemc" },
            { "data": "industrialaccidentagefc" }
        ],
        columnDefs : [{
            "targets" : 22,
            "data" : null,
            "render" : function ( data, type, row, meta ) {
                return '<button class="btn btn-default" onclick="editRP('+data.rpid+')">编辑</button>'+'&nbsp;'
                    +'<button class="btn btn-warning" onclick="removeRP('+data.rpid+')">删除</button>';
            }
        }]

    });
});

function editRP() {

}

function removeRP() {

}