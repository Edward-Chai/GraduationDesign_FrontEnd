$(document).ready(function () {

    $("#addRPButton").click(function () {
        $.ajax({
            url: "http://localhost:8080/retirePolicy/add?rpname="+$("input[name='rpName']").val()
            +"&normalagem="+$("input[name='normalAgeM']").val()+"&normalagef="+$("input[name='normalAgeF']").val()
            +"&specialjobagem="+$("input[name='specialJobAgeM']").val()+"&specialjobagef="+$("input[name='specialJobAgeF']").val()
            +"&bankruptcyagem="+$("input[name='bankruptcyAgeM']").val()+"&bankruptcyagef="+$("input[name='bankruptcyAgeF']").val()
            +"&illnessagem="+$("input[name='illnessAgeM']").val()+"&illnessagef="+$("input[name='illnessAgeF']").val()
            +"&industrialaccidentagem="+$("input[name='industrialAccidentAgeM']").val()+"&industrialaccidentagef="+$("input[name='industrialAccidentAgeF']").val()
            +"&normalagemc="+$("input[name='normalAgeMc']").val()+"&normalagefc="+$("input[name='normalAgeFc']").val()
            +"&specialjobagemc="+$("input[name='specialJobAgeMc']").val()+"&specialjobagefc="+$("input[name='specialJobAgeFc']").val()
            +"&bankruptcyagemc="+$("input[name='bankruptcyAgeMc']").val()+"&bankruptcyagefc="+$("input[name='bankruptcyAgeFc']").val()
            +"&illnessagemc="+$("input[name='illnessAgeMc']").val()+"&illnessagefc="+$("input[name='illnessAgeFc']").val()
            +"&industrialaccidentagemc="+$("input[name='industrialAccidentAgeMc']").val()+"&industrialaccidentagefc="+$("input[name='industrialAccidentAgeFc']").val(),
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