const fs=require("fs");const h=fs.readFileSync(require("path").join(__dirname,"../index.html"),"utf8");
const js=h.split("<script>")[1].split("</script>")[0];
global.document={getElementById:()=>({value:"c"})};global.matchMedia=()=>({matches:false});
eval(js.split("function mtxt")[0]+";global.E={legal,ap,inChk,rate,danger,pick,gen,pseudo,facing,kp,init,nega,ev};");
let pass=0,fail=0;const ok=(c,n)=>{c?pass++:(fail++,console.log("FAIL:",n));};
const mk=l=>{const b=Array.from({length:10},()=>Array(9).fill(null));l.forEach(([p,r,c])=>b[r][c]=p);return b;};
const mv=(b,r,c)=>E.gen(b,r,c).map(m=>m.x+","+m.y).sort().join(" ");
const set=(b,r,c)=>new Set(E.gen(b,r,c).map(m=>m.x+","+m.y));
// chariot
let b=mk([["cR",0,3]]);let s=set(b,0,3);ok(s.size===19&&s.has("1,4")&&s.has("2,5"),"R corner top-left palace 19 moves, size="+s.size);
b=mk([["hR",9,5]]);s=set(b,9,5);ok(s.size===19&&s.has("8,4")&&s.has("7,3"),"R back-row corner bottom");
b=mk([["cR",1,4]]);s=set(b,1,4);ok(s.size===21,"R center 21, got "+s.size);
b=mk([["cR",4,4]]);s=set(b,4,4);ok(s.size===17,"R outside palace orth only");
b=mk([["cR",0,3],["cS",1,4]]);s=set(b,0,3);ok(!s.has("1,4")&&!s.has("2,5"),"R diag blocked by own piece");
b=mk([["cR",0,3],["hS",1,4]]);s=set(b,0,3);ok(s.has("1,4")&&!s.has("2,5"),"R captures on diag, no pass-through");
// cannon
b=mk([["cC",0,3],["hS",1,4]]);s=set(b,0,3);ok(s.has("2,5")&&!s.has("1,4"),"C diag jump over center screen");
b=mk([["cC",0,3],["hC",1,4]]);s=set(b,0,3);ok(!s.has("2,5"),"C can't jump cannon (diag)");
b=mk([["cC",0,3]]);s=set(b,0,3);ok(s.size===0,"C no screen => no moves");
b=mk([["cC",5,0],["hS",5,3],["hR",5,6]]);s=set(b,5,0);ok(s.has("5,4")&&s.has("5,5")&&s.has("5,6")&&!s.has("5,3")&&!s.has("5,1"),"C orth jump & capture");
b=mk([["cC",5,0],["hS",5,3],["hC",5,6]]);s=set(b,5,0);ok(s.has("5,4")&&s.has("5,5")&&!s.has("5,6"),"C cannot capture cannon");
b=mk([["cC",5,0],["hC",5,3],["hS",5,6]]);s=set(b,5,0);ok(s.size===0,"C cannot jump over cannon");
b=mk([["cC",9,4],["cS",8,4]]);s=set(b,9,4);ok(s.has("7,4"),"C jump own piece allowed");
// horse
b=mk([["cH",5,4]]);s=set(b,5,4);ok(s.size===8,"H open 8");
b=mk([["cH",5,4],["hS",4,4]]);s=set(b,5,4);ok(!s.has("3,3")&&!s.has("3,5")&&s.size===6,"H blocked by adjacent");
b=mk([["cH",0,0]]);s=set(b,0,0);ok(s.size===2&&s.has("2,1")&&s.has("1,2"),"H corner");
// elephant
b=mk([["cE",5,4]]);s=set(b,5,4);ok(s.size===8,"E open 8 got "+s.size);
b=mk([["cE",5,4],["hS",3,5]]);s=set(b,5,4);ok(!s.has("2,6")&&s.size===7,"E blocked at 2nd step");
b=mk([["cE",5,4],["hS",4,4]]);s=set(b,5,4);ok(s.size===6,"E blocked at 1st step");
// soldier
b=mk([["cS",3,4]]);s=set(b,3,4);ok(s.size===3&&s.has("2,4")&&s.has("3,3")&&s.has("3,5"),"S cho normal");
b=mk([["hS",6,4]]);s=set(b,6,4);ok(s.size===3&&s.has("7,4"),"S han normal");
b=mk([["cS",2,3]]);s=set(b,2,3);ok(s.has("1,4")&&s.has("1,3")&&s.has("2,2")&&s.has("2,4")&&s.size===4,"S cho palace diag fwd got "+[...s]);
b=mk([["cS",1,4]]);s=set(b,1,4);ok(s.has("0,3")&&s.has("0,5")&&s.has("0,4")&&!s.has("2,3"),"S cho center diag fwd only");
b=mk([["hS",7,3]]);s=set(b,7,3);ok(s.has("8,4")&&!s.has("6,4"),"S han diag in cho palace");
b=mk([["cS",0,4]]);s=set(b,0,4);ok(s.size===2&&s.has("0,3")&&s.has("0,5"),"S at last row sideways only, got "+[...s]);
// general / guard
b=mk([["cK",8,4]]);s=set(b,8,4);ok(s.size===8,"K center 8");
b=mk([["cK",9,4]]);s=set(b,9,4);ok(s.size===3&&s.has("8,4")&&s.has("9,3")&&s.has("9,5"),"K edge-mid 3 got "+[...s]);
b=mk([["cA",9,3]]);s=set(b,9,3);ok(s.size===3&&s.has("8,4")&&s.has("8,3")&&s.has("9,4"),"A corner 3 got "+[...s]);
b=mk([["hK",0,5]]);s=set(b,0,5);ok(s.size===3&&s.has("1,4")&&s.has("1,5")&&s.has("0,4"),"K top corner");
// facing / check
b=mk([["cK",8,4],["hK",1,4],["cR",5,4]]);let st={b,t:"c"};let L=E.legal(st);
ok(!L.some(m=>m.r===5&&m.c===4&&m.y!==4),"facing: blocker can't leave file");ok(L.some(m=>m.r===5&&m.c===4&&m.y===4),"blocker can move along file");
b=mk([["cK",8,4],["hK",1,4]]);st={b,t:"c"};ok(!E.legal(st).some(m=>m.r===8&&m.c===4&&m.x===7&&m.y===4),"general can't step into facing");
b=mk([["cK",8,3],["hK",1,4],["hR",5,3]]);st={b,t:"c"};ok(E.inChk(st),"chariot check");
L=E.legal(st);ok(L.every(m=>!(m.r===8&&m.c===3&&m.y===3)),"must leave check file");
b=mk([["cK",9,4],["hK",0,3],["hC",5,4],["hS",8,4]]);st={b,t:"c"};ok(E.inChk(st),"cannon may use any non-cannon piece as screen");
b=mk([["cK",9,4],["hK",0,3],["hC",5,4],["cS",8,4]]);st={b,t:"c"};ok(E.inChk(st),"cannon check through screen");
// mate position from screenshot
b=mk([["hR",0,0],["hH",0,2],["hK",0,4],["hA",0,5],["hE",0,6],["hR",0,7],["hA",1,3],["hS",3,0],["hS",3,4],["hS",4,6],["hC",8,7],["cR",2,5],["cH",5,2],["cS",6,1],["cE",6,4],["cS",6,5],["cS",6,6],["cS",6,7],["cC",7,4],["cC",7,5],["cH",7,6],["cK",8,4],["cR",9,0],["cE",9,1],["cA",9,3],["cA",9,5]]);
st={b,t:"c"};const cap=E.legal(st).find(m=>m.r===2&&m.c===5&&m.x===0&&m.y===5);ok(!!cap,"capture legal");
const n=E.ap(st,cap);ok(E.legal(n).length===0&&E.inChk(n),"mate detected");ok(E.rate(st,cap)!=="??"&&E.rate(st,cap)!=="?","mate not rated bad: "+E.rate(st,cap));
// fuzz all piece/square
let ex=0,bad=0;for(const col of["c","h"])for(const t of["K","A","E","H","R","C","S"])for(let r=0;r<10;r++)for(let c=0;c<9;c++){
 for(let k=0;k<6;k++){const l=[[col+t,r,c]];for(let i=0;i<8;i++){const rr=Math.random()*10|0,cc=Math.random()*9|0;if(!(rr===r&&cc===c)&&!l.some(x=>x[1]===rr&&x[2]===cc))l.push([(Math.random()<.5?"c":"h")+"KAEHRCS"[Math.random()*7|0],rr,cc]);}
 const bb=mk(l);try{for(const m of E.gen(bb,r,c)){if(m.x<0||m.x>9||m.y<0||m.y>8||(bb[m.x][m.y]&&bb[m.x][m.y][0]===col)||(m.x===r&&m.y===c))bad++;}}catch(e){ex++;}}}
ok(ex===0,"fuzz exceptions: "+ex);ok(bad===0,"fuzz invalid destinations: "+bad);
// playouts
let pe=0,illegal=0,mates=0,draws=0,plies=0;for(let g=0;g<200;g++){let s2=E.init();try{for(let i=0;i<250;i++){const ms=E.legal(s2);if(!ms.length){E.inChk(s2)?mates++:draws++;break;}const m=ms[Math.random()*ms.length|0];s2=E.ap(s2,m);plies++;
 const o=s2.t==="c"?"h":"c";const k=E.kp(s2.b,o);if(!k||E.facing(s2.b))illegal++;else{const t2={b:s2.b,t:o};}}}catch(e){pe++;console.log(e.message);}}
ok(pe===0,"playout exceptions");ok(illegal===0,"playout illegal states "+illegal);console.log("playouts: plies",plies,"mates",mates,"nomove draws",draws);
// AI time & legality
let slow=0,badm=0;for(let d=1;d<=4;d++){let s3=E.init();for(let i=0;i<14;i++){const ms=E.legal(s3);if(!ms.length)break;s3=E.ap(s3,ms[Math.random()*ms.length|0]);}
 const t0=Date.now(),m=E.pick(s3,d,[0,800,1500,2500,5000][d]),dt=Date.now()-t0;const lg=E.legal(s3);if(!m||!lg.some(x=>x.r===m.r&&x.c===m.c&&x.x===m.x&&x.y===m.y))badm++;console.log("depth",d,"ms",dt);if(dt>[0,900,1700,2800,5400][d])slow++;}
ok(badm===0,"AI returns legal move");ok(slow===0,"AI respects time limit");
// rate sanity
const rs=new Set();let s4=E.init();for(let i=0;i<30;i++){const ms=E.legal(s4);if(!ms.length)break;const m=ms[Math.random()*ms.length|0];rs.add(E.rate(s4,m));s4=E.ap(s4,m);}
ok([...rs].every(x=>["","!!","!","?!","?","??"].includes(x)),"rate outputs valid");console.log("ratings seen:",[...rs].join("|"));
console.log("PASS",pass,"FAIL",fail);process.exit(fail?1:0);
