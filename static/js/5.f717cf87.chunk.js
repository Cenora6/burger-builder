(this["webpackJsonpburger-builder"]=this["webpackJsonpburger-builder"]||[]).push([[5],{101:function(e,r,n){e.exports={Order:"Order_Order__3kYZJ"}},105:function(e,r,n){"use strict";n.r(r);var t=n(5),a=n(6),i=n(8),o=n(7),u=n(0),s=n.n(u),c=n(101),d=n.n(c),p=function(e){var r=[];for(var n in e.ingredients)r.push({name:n,amount:e.ingredients[n]});var t=r.map((function(e){return s.a.createElement("span",{style:{textTransform:"capitalize",display:"inline-block",margin:"0 8px",border:"1px solid #ccc",padding:"5px"},key:e.name},e.name," (",e.amount,")")}));return s.a.createElement("div",{className:d.a.Order},s.a.createElement("p",null,"Ingredients: ",t),s.a.createElement("p",null,"Price: ",s.a.createElement("strong",null,"USD ",Number.parseFloat(e.price).toFixed(2))))},l=n(18),m=n(42),b=n(14),f=n(15),h=n(41),g=function(e){Object(i.a)(n,e);var r=Object(o.a)(n);function n(){return Object(t.a)(this,n),r.apply(this,arguments)}return Object(a.a)(n,[{key:"componentDidMount",value:function(){this.props.onFetchOrders(this.props.token,this.props.userId)}},{key:"render",value:function(){var e=s.a.createElement(h.a,null);return this.props.loading||(e=this.props.orders.map((function(e){return s.a.createElement(p,{key:e.id,ingredients:e.ingredients,price:e.price})}))),s.a.createElement("div",null,e)}}]),n}(u.Component);r.default=Object(b.b)((function(e){return{orders:e.order.orders,loading:e.order.loading,token:e.auth.token,userId:e.auth.userId}}),(function(e){return{onFetchOrders:function(r,n){return e(f.d(r,n))}}}))(Object(m.a)(g,l.a))}}]);
//# sourceMappingURL=5.f717cf87.chunk.js.map