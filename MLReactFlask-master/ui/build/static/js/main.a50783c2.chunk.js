(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{23:function(e,a,t){e.exports=t(48)},29:function(e,a,t){},30:function(e,a,t){},48:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(16),o=t.n(r),i=(t(29),t(17)),c=t(18),s=t(21),h=t(19),u=t(22),m=(t(30),t(3)),d=t.n(m),p=t(7),E=t.n(p),g=t(20),v=t.n(g),f=t(11),C=t.n(f),k=t(12),b=t.n(k),L=(t(31),function(e){function a(e){var t;return Object(i.a)(this,a),(t=Object(s.a)(this,Object(h.a)(a).call(this,e))).handleChange=function(e){var a=e.target.value,n=e.target.name,l=t.state.formData;l[n]=a,t.setState({formData:l})},t.handlePredictClick=function(e){var a=t.state.formData;t.setState({isLoading:!0}),fetch("http://127.0.0.1:5000/prediction/",{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify(a)}).then(function(e){return e.json()}).then(function(e){t.setState({result:e.result,isLoading:!1})})},t.handleCancelClick=function(e){t.setState({result:""})},t.state={isLoading:!1,formData:{sepalLength:4,sepalWidth:2,petalLength:1,petalWidth:0},result:""},t}return Object(u.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){for(var e=this.state.isLoading,a=this.state.formData,t=this.state.result,n=[],r=4;r<=7;r=+(r+.1).toFixed(1))n.push(l.a.createElement("option",{key:r,value:r},r));var o=[];for(r=2;r<=4;r=+(r+.1).toFixed(1))o.push(l.a.createElement("option",{key:r,value:r},r));var i=[];for(r=1;r<=6;r=+(r+.1).toFixed(1))i.push(l.a.createElement("option",{key:r,value:r},r));var c=[];for(r=.1;r<=3;r=+(r+.1).toFixed(1))c.push(l.a.createElement("option",{key:r,value:r},r));return l.a.createElement(v.a,null,l.a.createElement("div",null,l.a.createElement("h1",{className:"title"},"Iris Plant Classifier")),l.a.createElement("div",{className:"content"},l.a.createElement(d.a,null,l.a.createElement(d.a.Row,null,l.a.createElement(d.a.Group,{as:E.a},l.a.createElement(d.a.Label,null,"Sepal Length"),l.a.createElement(d.a.Control,{as:"select",value:a.sepalLength,name:"sepalLength",onChange:this.handleChange},n)),l.a.createElement(d.a.Group,{as:E.a},l.a.createElement(d.a.Label,null,"Sepal Width"),l.a.createElement(d.a.Control,{as:"select",value:a.sepalWidth,name:"sepalWidth",onChange:this.handleChange},o))),l.a.createElement(d.a.Row,null,l.a.createElement(d.a.Group,{as:E.a},l.a.createElement(d.a.Label,null,"Petal Length"),l.a.createElement(d.a.Control,{as:"select",value:a.petalLength,name:"petalLength",onChange:this.handleChange},i)),l.a.createElement(d.a.Group,{as:E.a},l.a.createElement(d.a.Label,null,"Petal Width"),l.a.createElement(d.a.Control,{as:"select",value:a.petalWidth,name:"petalWidth",onChange:this.handleChange},c))),l.a.createElement(C.a,null,l.a.createElement(E.a,null,l.a.createElement(b.a,{block:!0,variant:"success",disabled:e,onClick:e?null:this.handlePredictClick},e?"Making prediction":"Predict")),l.a.createElement(E.a,null,l.a.createElement(b.a,{block:!0,variant:"danger",disabled:e,onClick:this.handleCancelClick},"Reset prediction")))),""===t?null:l.a.createElement(C.a,null,l.a.createElement(E.a,{className:"result-container"},l.a.createElement("h5",{id:"result"},t)))))}}]),a}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[23,1,2]]]);
//# sourceMappingURL=main.a50783c2.chunk.js.map