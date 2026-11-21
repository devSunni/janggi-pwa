const fs=require("fs"),vm=require("vm");
const html=fs.readFileSync(require("path").join(__dirname,"../index.html"),"utf8");
const js=html.split("<script>")[1].split("</script>")[0];
const L={},els={},timers=[];let ivl=null;
class El{constructor(id){this.id=id;this.style={setProperty(){}};this.dataset={};this._h="";this.textContent="";this.value=({mode:"c",lvl:"3",tcs:"0:0"})[id]||"";this.className="";this.scrollTop=0;this.clientWidth=452;const s=new Set();this.classList={add:x=>s.add(x),remove:x=>s.delete(x),toggle:(x,f)=>{f===undefined?(s.has(x)?s.delete(x):s.add(x)):(f?s.add(x):s.delete(x));},contains:x=>s.has(x)};}
set innerHTML(v){this._h=v}get innerHTML(){return this._h}
addEventListener(t,f){L[this.id+":"+t]=f}appendChild(){}remove(){}setAttribute(){}setPointerCapture(){}querySelector(){return new El("q")}querySelectorAll(){return[]}closest(){return null}}
const doc={getElementById:i=>els[i]||(els[i]=new El(i)),documentElement:new El("root"),body:new El("body"),createElement:()=>new El("x"),querySelectorAll:()=>[],addEventListener:(t,f)=>{L["doc:"+t]=f},elementFromPoint:()=>doc._pt};
const sb={document:doc,matchMedia:()=>({matches:false}),localStorage:{getItem:()=>null,setItem(){}},setInterval:f=>{ivl=f;return 1},clearTimeout:id=>{const i=timers.findIndex(t=>t.id===id);if(i>=0)timers.splice(i,1)},setTimeout:(f,ms)=>{const id=Math.random();timers.push({id,f,ms});return id},console,Math,Date,Promise,Array,Set,Object,JSON,Number,String,Infinity,window:{},requestAnimationFrame:f=>f()};
vm.createContext(sb);
const test=`
;(function(){let fails=0;const T_=(c,n)=>{if(!c){fails++;console.log("FAIL:",n);}else console.log("ok:",n);};
const flush=(max=200)=>{while(max--&&__t.length){const t=__t.shift();t.f();}};
const tryit=(n,f)=>{try{f();}catch(e){fails++;console.log("EXC in",n,":",e.stack.split("\\n").slice(0,3).join(" | "));}};
tryit("initial render",()=>{T_(H.length===1&&!over,"start state");T_(/차례/.test($("st").textContent),"status text "+$("st").textContent);});
tryit("human move + AI reply",()=>{const m=legal(cur()).find(m=>cur().b[m.r][m.c]==="cS");click(m.r,m.c);T_(sel&&dests.length>0,"select shows dests");click(m.x,m.y);T_(H.length===2,"human move recorded");T_(busy,"AI thinking flag");flush();T_(H.length===3&&!busy,"AI replied, len="+H.length);T_(/ /.test($("mv").innerHTML)||$("mv").innerHTML.length>0,"move list rendered");});
tryit("undo",()=>{$("un").onclick();T_(H.length===1,"undo to start len="+H.length);flush();});
tryit("hint",()=>{$("ht").onclick();T_(hint&&legal(cur()).some(m=>m.r===hint.r&&m.x===hint.x&&m.c===hint.c&&m.y===hint.y),"hint is legal");});
tryit("pass",()=>{const n=H.length;$("ps").onclick();T_(H.length===n+1&&H[H.length-1].m.pass,"pass recorded");flush();});
tryit("nav",()=>{go("f");T_(vi===0,"nav first");const n=H.length;click(0,0);T_(H.length===n,"no moves while viewing history");go("l");T_(vi===null,"nav last");});
tryit("learn+danger warn",()=>{start();$("ln").onclick({target:$("ln")});const ms=legal(cur());const dm=ms.find(m=>danger(cur(),m));if(dm){click(dm.r,dm.c);click(dm.x,dm.y);T_(warn&&H.length===1,"first tap warns");click(dm.x,dm.y);T_(H.length===2,"second tap plays");}else T_(true,"no danger move at start (skip)");flush();$("ln").onclick({target:$("ln")});});
tryit("drag & drop",()=>{start();const m=legal(cur()).find(m=>cur().b[m.r][m.c]==="cS");
 L["bd:pointerdown"]({target:{dataset:{r:m.r,c:m.c}},button:0,clientX:100,clientY:100,pointerId:1});
 L["bd:pointermove"]({clientX:140,clientY:140});
 __doc._pt={dataset:{r:m.x,c:m.y}};ns=false;L["bd:pointerup"]({type:"pointerup",clientX:140,clientY:140});
 T_(H.length===2,"drag move played");flush();});
tryit("2-player + resign",()=>{$("mode").value="2";start();const m=legal(cur())[0];click(m.r,m.c);click(m.x,m.y);T_(H.length===2&&!busy,"no AI in 2p");$("rs").onclick();T_(over&&/기권/.test(res),"resign: "+res);$("mode").value="c";});
tryit("clock timeout",()=>{$("tcs").value="60:0";start();const m=legal(cur()).find(m=>cur().b[m.r][m.c]==="cS");click(m.r,m.c);click(m.x,m.y);flush();
 T.h=50;T.c=50;lastT=Date.now()-400;getIvl()();getIvl()();getIvl()();T_(over&&/시간 초과/.test(res),"timeout result: "+res);
 $("un").onclick();T_(!over,"undo after timeout clears over");$("tcs").value="0:0";start();});
tryit("clock increment",()=>{$("tcs").value="180:2";start();const t0=T.c;const m=legal(cur())[0];click(m.r,m.c);click(m.x,m.y);T_(T.c===t0+2000,"increment added");flush();$("tcs").value="0:0";});
tryit("mate flow",()=>{start();const b=Array.from({length:10},()=>Array(9).fill(null));const P=(p,r,c)=>b[r][c]=p;
 P("hR",0,0);P("hH",0,2);P("hK",0,4);P("hA",0,5);P("hE",0,6);P("hR",0,7);P("hA",1,3);P("hS",3,0);P("hS",3,4);P("hS",4,6);P("hC",8,7);P("cR",2,5);P("cH",5,2);P("cS",6,1);P("cE",6,4);P("cS",6,5);P("cS",6,6);P("cS",6,7);P("cC",7,4);P("cC",7,5);P("cH",7,6);P("cK",8,4);P("cR",9,0);P("cE",9,1);P("cA",9,3);P("cA",9,5);
 H=[{s:{b,t:"c"},m:null,t:"",T:{...T}}];render();click(2,5);click(0,5);T_(over&&/외통/.test(res),"mate result: "+res);T_(/#/.test(H[H.length-1].t),"mate mark # in move text: "+H[H.length-1].t);T_(H[H.length-1].q!=="??","mate rating "+H[H.length-1].q);flush();T_($("ov").classList.contains("on"),"result dialog shown after fx");});
tryit("flipped board as han",()=>{$("mode").value="h";start();T_(flip===true,"flip on for han");flush();T_(H.length>=2,"AI (cho) moved first, len="+H.length);$("mode").value="c";start();});
tryit("keyboard nav",()=>{start();const m=legal(cur())[0];click(m.r,m.c);click(m.x,m.y);flush();L["doc:keydown"]({key:"ArrowLeft",target:{tagName:"DIV"}});T_(vi!==null,"arrow left enters history");L["doc:keydown"]({key:"ArrowDown",target:{tagName:"DIV"}});T_(vi===null,"arrow down returns live");});
console.log(fails?("SMOKE FAILS: "+fails):"SMOKE ALL OK");})();
`;
sb.__t=timers;sb.L=L;sb.doc=doc;sb.__doc=doc;sb.getIvl=()=>ivl;
let out="";const _l=console.log;sb.console={log:(...a)=>{out+=a.join(" ")+"\n";_l(...a);}};try{vm.runInContext(js+test,sb);}catch(e){out+="TOP-LEVEL EXC\n";_l("TOP-LEVEL EXC",e.stack.split("\n").slice(0,4).join(" | "));}process.exit(/SMOKE ALL OK/.test(out)?0:1);
