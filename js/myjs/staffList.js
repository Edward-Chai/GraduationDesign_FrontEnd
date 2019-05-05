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
                columns : [0,1,2,3,4,5,6,7,8]
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
            "url" : "http://localhost:8080/staff/queryAllWithInfo",
            "type" : "GET",
            "dataSrc": "data.staffInfoList"
        },
        // data : staffInfoList,
        "columns" : [
            { "data": "staffid" },
            { "data": "staffname" },
            { "data": "staffgender",render : function ( data, type, row ) {
                    if (data=="1"){
                        return '男';
                    } else {
                        return '女';
                    }
                }},
            { "data": "jobname" },
            { "data": "ssname" },
            { "data": "salary" },
            { "data": "birthday",render : function ( data, type, row ) {
                    return jsGetAge(data);
                } },
            { "data": "birthday" },
            { "data": "employmentdate" },
        ],
        columnDefs : [{
            "targets" : 9,
            "data" : null,
            "render" : function ( data, type, row, meta ) {
                return '<button class="btn btn-default" onclick="editStaff('+data.staffid+')">编辑</button>'+'&nbsp;'
                    +'<button class="btn btn-warning" onclick="removeStaff('+data.staffid+')">删除</button>';
            }
        }]

    });

    var data = table.buttons.exportData( {
        columns: [0,1,2,3,4,5,6,7]
    } );

});

function removeStaff(staffid) {
    if (window.confirm("确认删除该员工吗？")) {
        $.ajax({
            url: "http://localhost:8080/staff/remove?staffid="+staffid,
            async: false,
            dataType: "json",
            type : "DELETE",
            success : function (d) {
                if (d.msg=="success"){
                    alert("删除成功！")
                    window.location.reload();
                }else {
                    alert("删除失败！")
                    window.location.reload();
                }
            }
        });
    }
}

function editStaff(staffid) {
    $.ajax({
        url: "http://localhost:8080/staff/querySingleStaffInfo?staffid="+staffid,
        async: false,
        dataType: "json",
        type : "GET",
        success : function (d) {
            if (d.msg=="success"){
                staffInfo = d.data.staffInfo;
                console.table(staffInfo);
                $("#staffId").val(staffInfo.staffid);
                $("#staffName").val(staffInfo.staffname);
                $("input[name='gender'][value='"+staffInfo.staffgender+"']").attr("checked","checked");
                $("#birthday").val(staffInfo.birthday);
                $("#employmentDate").val(staffInfo.employmentdate);
                $("#salary").val(staffInfo.salary);
                // $("#job option[value='"+staffInfo.jobid+"']").attr("selected","selected");
                $("#job").selectpicker('val',staffInfo.jobid);
                $("#ss").selectpicker('val',staffInfo.ssid);
            }else {
                alert("获取信息失败！")
            }
        }
    });
    $("#myModal").modal('show');
}

function updateStaff() {
    $.ajax({
        url: "http://localhost:8080/staff/edit?staffid="+$("#staffId").val()+"&staffname="+$("#staffName").val()
            +"&staffgender="+$("input[name='gender']:checked").val()
            +"&salary="+$("#salary").val()+"&employmentdate="+$("#employmentDate").val()
            +"&birthday="+$("#birthday").val()+"&jobid="+$("#job").val()
            +"&ssid="+$("#ss").val(),
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