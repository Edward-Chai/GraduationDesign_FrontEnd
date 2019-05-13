$(document).ready(function () {


    $.ajax({
        url: "http://localhost:8080/staff/queryAllRetiredWithInfo",
        async: false,
        dataType: "json",
        type : "GET",
        success : function (d) {
            if (d.msg=="success"){
                staffInfoList = d.data.staffInfoList;
                console.table(staffInfoList);
                for (i=0;i<staffInfoList.length;i++){
                    $("#staffId").append("<option value='"+staffInfoList[i].staffid+"'>"
                        +"Id："+staffInfoList[i].staffid+"，姓名："+staffInfoList[i].staffname
                        +"，状态："+staffInfoList[i].ssname+"</option>")
                }
            }
        }
    });

    $("#addPensionButton").click(function () {
        $.ajax({
            url: "http://localhost:8080/pension/add?pensionbalance="+$("#balance").val()
                +"&pensionavg="+$("#avg").val()+"&staffid="+$("#staffId").val(),
            async: false,
            dataType: "json",
            type : "POST",
            success : function (d) {
                if (d.msg=="success"){
                    alert("添加成功！");
                    window.location.reload();
                }else {
                    alert("添加失败！");
                    window.location.reload();
                }
            }
        });
    })

});