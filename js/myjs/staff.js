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

    $("#addStaffButton").click(function () {
        $.ajax({
            url: "http://localhost:8080/staff/add?staffname="+$("#staffName").val()
                +"&staffgender="+$("input[name='gender']:checked").val()
                +"&salary="+$("#salary").val()+"&employmentdate="+$("#employmentDate").val()
                +"&birthday="+$("#birthday").val()+"&jobid="+$("#job").val()
                +"&ssid="+$("#ss").val(),
            async: false,
            dataType: "json",
            type : "POST",
            success : function (d) {
                if (d.msg=="success"){
                    alert("添加成功！")
                    window.location.reload();
                }else{
                    alert("添加失败！")
                    window.location.reload();
                }
            }
        });
    });



});