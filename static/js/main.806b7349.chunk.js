(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{26:function(e,t,a){},34:function(e,t){},35:function(e,t){},36:function(e,t){},51:function(e,t,a){"use strict";a.r(t);var n=a(3),i=a.n(n),r=a(16),c=a.n(r),o=(a(26),a(6)),s=a.n(o),l=a(17),d=a(18),h=a(4),u=a(21),p=a(20),g=a(10),f=a(5),m=a(8),v=a.n(m),b=a(19),j=a.n(b),C=(a(49),a(2));function O(e,t){return x.apply(this,arguments)}function x(){return(x=Object(g.a)(s.a.mark((function e(t,a){var n,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("production"),n="https://axiom777.github.io/face-detection/weights",a({detectionStatus:"Load SsdModel"}),e.next=5,f.e(n);case 5:return a({detectionStatus:"Load LandmarkModel"}),e.next=8,f.c(n);case 8:return a({detectionStatus:"Load RecognitionModel"}),e.next=11,f.d(n);case 11:return a({detectionStatus:"Detection"}),e.next=14,f.a(t).withFaceLandmarks().withFaceDescriptors();case 14:return i=e.sent,e.abrupt("return",i);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var w=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).imageAvatarRef=void 0,n.canvasAvatarRef=void 0,n.imageRef=null,n.fileUrl=void 0,n.handleOnSelectFile=function(e){if(e.target.files&&e.target.files.length>0){var t=new FileReader;t.onload=function(){var e=t.result;"string"===typeof e&&n.setState({src:e,modalVisible:!0})},t.readAsDataURL(e.target.files[0])}},n.onImageLoaded=function(e){n.imageRef=e},n.onCropComplete=function(e){n.makeClientCrop(e)},n.onCropChange=function(e,t){n.setState({crop:t})},n.state={fullFaceDescriptions:null,croppedImageUrl:"",src:null,crop:{unit:"%",width:270,aspect:1},modalVisible:!1,detectionStatus:""},n.imageAvatarRef=i.a.createRef(),n.canvasAvatarRef=i.a.createRef(),n.handleToggleCamera=n.handleToggleCamera.bind(Object(h.a)(n)),n.handleDetectFace=n.handleDetectFace.bind(Object(h.a)(n)),n.onImageLoaded=n.onImageLoaded.bind(Object(h.a)(n)),n.onCropComplete=n.onCropComplete.bind(Object(h.a)(n)),n.onCropChange=n.onCropChange.bind(Object(h.a)(n)),n.handleSave=n.handleSave.bind(Object(h.a)(n)),n}return Object(d.a)(a,[{key:"componentDidUpdate",value:function(e,t){var a=this.state.fullFaceDescriptions;if(t.fullFaceDescriptions!==a){console.log("1"),console.log(this.imageAvatarRef.current.width,this.imageAvatarRef.current.height);var n={width:this.imageAvatarRef.current.clientWidth,height:this.imageAvatarRef.current.clientHeight},i=f.f(a,n),r=this.canvasAvatarRef.current;console.log("2"),null!==r&&null!==i&&(f.b.drawDetections(r,i),f.b.drawFaceLandmarks(r,i),console.log("3"))}}},{key:"handleToggleCamera",value:function(){}},{key:"handleDetectFace",value:function(){var e=Object(g.a)(s.a.mark((function e(){var t,a,n,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null===(t=this.imageAvatarRef.current)){e.next=8;break}return a=this.setState.bind(this),e.next=5,O(t,a);case 5:n=e.sent,i=n.length?n.reduce((function(e,t,a){return e+=" Detection ".concat(a," score: ").concat(t.detection.score)}),""):"Face not found",this.setState({fullFaceDescriptions:n,detectionStatus:i});case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"handleSave",value:function(){var e=this.state.croppedImageUrl;this.setState({src:e,modalVisible:!1})}},{key:"getCroppedImg",value:function(e,t,a){var n=this,i=document.createElement("canvas"),r=window.devicePixelRatio,c=e.naturalWidth/e.width,o=e.naturalHeight/e.height,s=i.getContext("2d");return i.width=t.width*r*c,i.height=t.height*r*o,s.setTransform(r,0,0,r,0,0),s.imageSmoothingQuality="high",s.drawImage(e,t.x*c,t.y*o,t.width*c,t.height*o,0,0,t.width*c,t.height*o),new Promise((function(e){i.toBlob((function(t){if(t){var i=t;i.name=a,window.URL.revokeObjectURL(n.fileUrl),n.fileUrl=window.URL.createObjectURL(i),e(n.fileUrl)}else console.error("Canvas is empty")}),"image/jpeg",1)}))}},{key:"makeClientCrop",value:function(){var e=Object(g.a)(s.a.mark((function e(t){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(this.imageRef&&t.width&&t.height)){e.next=5;break}return e.next=3,this.getCroppedImg(this.imageRef,t,"newFile.jpeg");case 3:a=e.sent,this.setState({croppedImageUrl:a});case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.src,a=e.crop,n=e.croppedImageUrl,i=e.modalVisible,r=e.detectionStatus;return Object(C.jsxs)("div",{children:[Object(C.jsxs)("div",{className:v.a.App,children:[Object(C.jsxs)("div",{className:v.a.Avatar,children:[null!==t&&Object(C.jsx)("img",{src:t,alt:"Avatar",ref:this.imageAvatarRef}),Object(C.jsx)("canvas",{ref:this.canvasAvatarRef}),Object(C.jsx)("span",{children:r})]}),Object(C.jsxs)("div",{className:v.a.buttons,children:[Object(C.jsx)("input",{type:"file",accept:"image/jpeg,image/png",onChange:this.handleOnSelectFile}),Object(C.jsx)("button",{onClick:this.handleToggleCamera,children:"toggleCamera"}),Object(C.jsx)("button",{onClick:this.handleDetectFace,children:"DetectFace"})]})]}),t&&i&&Object(C.jsx)("div",{className:v.a.modal,children:Object(C.jsxs)("div",{className:v.a.modalContainer,children:[Object(C.jsx)(j.a,{src:t,crop:a,ruleOfThirds:!0,onImageLoaded:this.onImageLoaded,onComplete:this.onCropComplete,onChange:this.onCropChange}),Object(C.jsxs)("div",{children:[Object(C.jsx)("img",{alt:"Crop",src:n}),Object(C.jsx)("button",{onClick:this.handleSave,children:"Save"})]})]})})]})}}]),a}(i.a.Component),A=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,52)).then((function(t){var a=t.getCLS,n=t.getFID,i=t.getFCP,r=t.getLCP,c=t.getTTFB;a(e),n(e),i(e),r(e),c(e)}))};c.a.render(Object(C.jsx)(i.a.StrictMode,{children:Object(C.jsx)(w,{})}),document.getElementById("root")),A()},8:function(e,t,a){e.exports={App:"App_App__16ZpL",Avatar:"App_Avatar__ha_wO",buttons:"App_buttons__32eX7",modal:"App_modal__Ayqb5",modalContainer:"App_modalContainer__3QGBJ"}}},[[51,1,2]]]);
//# sourceMappingURL=main.806b7349.chunk.js.map