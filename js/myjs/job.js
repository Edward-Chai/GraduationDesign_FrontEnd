$(document).ready(function () {
    var jobData;

    $.ajax({
        url: "http://localhost:8080/job/queryAll",
        async: false,
        dataType: "json",
        type : "GET",
        success : function (d) {
            if (d.msg=="success"){
                jobData = d.data.jobList;
                console.table(jobData);
            }
        }
    });

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
        data : jobData,
        "columns": [
            { "data": "jobid" },
            { "data": "jobname" }
        ],
        columnDefs : [{
            "targets" : 2,
            "data" : null,
            "render" : function ( data, type, row, meta ) {
                if (data.specificity=="1"){
                    return '是';
                }else {
                    return '否';
                }
            }
        },{
            "targets" : 3,
            "data" : null,
            "render" : function ( data, type, row, meta ) {
                return '<button class="btn btn-default" onclick="editJob('+data.jobid+')">编辑</button>'
                    +'&nbsp;'+'<button class="btn btn-warning" onclick="removeJob('+data.jobid+')">删除</button>';
            }
        }]

    });



    $("#addJobButton").click(function () {
        $.ajax({
            url : "http://localhost:8080/job/addJob?jobname="+$("input[name='jobName']").val()
                +"&specificity="+$("input[name='specificity']:checked").val(),
            async: false,
            dataType : "json",
            type : "POST",
            success: function (d) {
                console.table(d);
                if (d.msg=="success") {
                    alert("操作成功！");
                    window.location.reload();
                }else {
                    alert("操作失败！");
                    window.location.reload();
                }
            }
        })
    })
});

function editJob(id) {
    $.ajax({
        url: "http://localhost:8080/job/queryOne?jobid="+id,
        async: false,
        dataType: "json",
        type : "GET",
        success : function (d) {
            if (d.msg=="success"){
                job = d.data.job;
                $("#jobIdE").val(job.jobid);
                $("#jobNameE").val(job.jobname);
                $("input[name='specificityE'][value='"+job.specificity+"']").attr("checked","checked")
                $("#myModal").modal('show');
            }else {
                alert("删除失败！");
            }
        }
    });
}

function updateJob() {
    $.ajax({
        url : "http://localhost:8080/job/edit?jobid="+$("#jobIdE").val()
            +"&jobname="+$("#jobNameE").val()
            +"&specificity="+$("input[name='specificityE']:checked").val(),
        async: false,
        dataType : "json",
        type : "PUT",
        success: function (d) {
            console.table(d);
            if (d.msg=="success") {
                alert("操作成功！");
                window.location.reload();
            }else {
                alert("操作失败！");
                window.location.reload();
            }
        }
    })
}

function removeJob(id){
    if(window.confirm("确认删除此职业吗？")){
        $.ajax({
            url: "http://localhost:8080/job/remove?jobid="+id,
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