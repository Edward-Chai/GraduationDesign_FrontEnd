$(function () {
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
        }
    });

    //Exportable table
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            'excel', 'pdf'
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
        }

    });
});