function postform(option){
	$.ajax({
		url:option.form.attr("action"),
		type:"post",
		data:new FormData(option.form[0]),
        processData: false,
        contentType: false,
		this:option,
		xhr:function(){
			XHR=$.ajaxSettings.xhr()
			if(XHR.upload){
				XHR.upload.this=this.this
				XHR.upload.addEventListener('progress',function(e){
					if(this.this.progress){
						this.this.progress(e.loaded/e.total*100)
					}
				},false)
			}
			return XHR
		},
		success: function(data){
			console.log(this.url+":success")
			if(option.success){option.success(data)}
		},
        error: function(jqXHR, textStatus, errorThrown){
			console.log(this.url+":error "+jqXHR.status+" "+textStatus)
			if(option.error){option.error()}
		}
	})
}
function bindfilesrc(file,src){
	src.attr("disabled","disabled")
	file.change(function(){
		src.removeAttr("disabled")
		src.attr("src",URL.createObjectURL(this.files[0]))
	})
}
function addsnapshot(form,show,w,h){
	//画像未選択で何も送信しない為disabledチェック
	if(!show.attr("disabled")){
		canvas=$('<canvas hidden width="'+w+'" height="'+h+'"/>')
		canvas.appendTo(form);
		canvas[0].getContext("2d").drawImage(show[0],0,0,w,h);
		form.append('<input hidden name="snapshot" value="'+canvas[0].toDataURL("image/jpeg")+'">')
	}
}
function addplaydata(form,play){
	//NaNを送信したら返信でparsererrorが起こるので0に置換
	form.append('<input hidden name="playpos" value="'+(play[0].currentTime || 0)+'">')
	form.append('<input hidden name="playlen" value="'+(play[0].duration || 0)+'">')
}
//拡張
$("[currenttime]").on("loadeddata",function(){
	this.currentTime=parseFloat($(this).attr("currenttime"))
})
