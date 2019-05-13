$(document).ready(function () {

    $.ajax({
        url: "http://localhost:8080/job/queryAll",
        async: false,
        dataType: "json",
        type : "GET",
        success : function (d) {
            if (d.msg=="success"){
                jobData = d.data.jobList;
                console.table(jobData);
                for (i=0;i<jobData.length;i++){
                    if (jobData[i].specificity=="1"){
                        $("#ts").append("<option value='"+jobData[i].jobid+"'>"+jobData[i].jobname+"</option>")
                    }else {
                        $("#yb").append("<option value='"+jobData[i].jobid+"'>"+jobData[i].jobname+"</option>")
                    }
                }
            }
        }
    });

    $.ajax({
        url: "http://localhost:8080/staffState/queryAll",
        async: false,
        dataType: "json",
        type : "GET",
        success : function (d) {
            if (d.msg=="success"){
                ssData = d.data.staffStates;
                console.table(ssData);
                for (i=0;i<ssData.length;i++){
                    $("#ss").append("<option value='"+ssData[i].ssid+"'>"+ssData[i].ssname+"</option>")
                }
            }
        }
    });

    var table = $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [{
            extend : 'excel',
            exportOptions : {
                columns : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
            }
        }
        // ,{
        //     extend : 'pdf',
        //     exportOptions : {
        //         columns : [0,1,2,3,4,5,6,7]
        //     }
        // }
        ],
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
            "url" : "http://localhost:8080/pension/queryPensionStaffInfo",
            "type" : "GET",
            "dataSrc": "data.pensionStaffInfos"
        },
        // data : staffInfoList,
        "columns" : [
            { "data": "pensionid" },
            { "data": "staffInfo.staffid" },
            { "data": "staffInfo.staffname" },
            { "data": "staffInfo.staffgender",render : function ( data, type, row ) {
                    if (data=="1"){
                        return '男';
                    } else {
                        return '女';
                    }
                }},
            { "data": "staffInfo.jobname" },
            { "data": "staffInfo.cadre",render : function ( data, type, row ) {
                    if (data=="1"){
                        return '干部';
                    } else {
                        return '普通';
                    }
                }},
            { "data": "staffInfo.ssname" },
            { "data": "staffInfo.salary" },
            { "data": "staffInfo.birthday",render : function ( data, type, row ) {
                    return jsGetAge(data);
                } },
            { "data": "staffInfo.birthday" },
            { "data": "staffInfo.employmentdate" },
            { "data": "pensionbalance" },
            { "data": "pensionavg" },
            { "data": "pensionadd" },
            { "data": "pensionmonthly" },
            { "data": "pensionstate",render : function ( data, type, row ) {
                    if (data=="0"){
                        return '正常发放';
                    }else if (data=="1"){
                        return '增发养老金';
                    }else if (data=="2"){
                        return '自由调整';
                    }
                }},
        ],
        columnDefs : [{
            "targets" : 16,
            "data" : null,
            "render" : function ( data, type, row, meta ) {
                return '<button class="btn btn-default" onclick="editPension('+data.pensionid+')">编辑</button>'+'&nbsp;'
                    +'<button class="btn btn-warning" onclick="removePension('+data.pensionid+')">删除</button>';
            }
        }]

    });

    $("#pensionState").change(function () {
        if ($("#pensionState").val()==1){
            $("#fileDiv").removeClass("hidden");
            $("#freeDiv").addClass("hidden");
        } else if ($("#pensionState").val()==2) {
            $("#fileDiv").addClass("hidden");
            $("#freeDiv").removeClass("hidden");
        }else {
            $("#fileDiv").addClass("hidden");
            $("#freeDiv").addClass("hidden");
        }
    })

});

function removePension(pensionid) {
    if (window.confirm("确认删除该员工吗？")) {
        $.ajax({
            url: "http://localhost:8080/pension/remove?pensionid="+pensionid,
            async: false,
            dataType: "json",
            type : "DELETE",
            success : function (d) {
                if (d.msg=="success"){
                    alert("删除成功！");
                    window.location.reload();
                }else {
                    alert("删除失败！");
                    window.location.reload();
                }
            }
        });
    }
}

function editPension(pensionid) {
    $.ajax({
        url: "http://localhost:8080/pension/querySinglePensionStaffInfo?pensionid="+pensionid,
        async: false,
        dataType: "json",
        type : "GET",
        success : function (d) {
            if (d.msg=="success"){
                pensionStaffInfo = d.data.pensionStaffInfo;
                console.table(pensionStaffInfo);
                $("#balance").val(pensionStaffInfo.pensionbalance);
                $("#avg").val(pensionStaffInfo.pensionavg);
                $("#pensionState").selectpicker('val',pensionStaffInfo.pensionstate);
                $("#editPensionButton").attr("onclick","updatePension("+pensionid+")");
            }else {
                alert("获取信息失败！")
            }
        }
    });
    $("#myModal").modal('show');
}

function updatePension(pensionid) {
    $.ajax({
        url: "http://localhost:8080/pension/edit?pensionid="+pensionid
            +"&pensionavg="+$("#avg").val()
            +"&pensionbalance="+$("#balance").val()
            +"&pensionstate="+$("#pensionState").val()
            +"&pensionadd="+$("#file").val()
            +"&pensionmonthly="+$("#free").val(),
        async: false,
        dataType: "json",
        type : "PUT",
        success : function (d) {
            if (d.msg=="success"){
                alert("更新数据成功！");
                window.location.reload();
            }else {
                alert("更新数据失败！");
                window.location.reload();
            }
        }
    });

}