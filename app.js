(function(){
var A=window.APP,root=document.getElementById('app'),T=A.theme||{};
for(var k in T)document.documentElement.style.setProperty('--'+(k==='accent'?'ink':k),T[k]);
document.title=A.title;
var sh=function(a){return a.slice().sort(function(){return Math.random()-.5})};
var norm=function(s){return s.trim().toLowerCase().replace(/[.,!?"“”]/g,'')};
function speak(t){try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=.85;speechSynthesis.speak(u)}catch(e){}}
function today(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
function fmt(d){var p=(d||'').split('-');return p.length===3?p[2]+'.'+p[1]+'.'+p[0]:''}
var P={};try{P=JSON.parse(localStorage.getItem('eng-p')||'{}')}catch(e){}
function store(){try{localStorage.setItem('eng-p',JSON.stringify(P))}catch(e){}}
function save(k,v){if((P[k]||0)<v){P[k]=v;store()}}
function K(i){var L=A.lessons[i];return L.id||L.title}
function seen(i){var s=P['seen:'+K(i)]||[];return A.lessons[i].words.filter(function(w){return s.indexOf(w.en)>=0}).length}
function markSeen(i,en){var s=P['seen:'+K(i)]||[];if(s.indexOf(en)<0){s.push(en);P['seen:'+K(i)]=s;store()}}
function pc(i,m){var v=P[K(i)+'-'+m];return v==null?'—':v+'%'}
(function(){var d=P.days||[];if(d.indexOf(today())<0){d.push(today());P.days=d;store()}})();
function rx(W,f){return new RegExp('\\b('+W.map(function(w){return w.en}).join('|')+')(s|es|ed|d|ing)?\\b',f)}
function on(sel,fn){root.querySelectorAll(sel).forEach(function(b){b.onclick=function(){fn(b)}})}
var MODES=[['learn','📖','Слова','Карточки: нажми — увидишь перевод'],['read','📚','Читаем','Текст с этими словами'],['quiz','🎯','Выбери перевод','Слово → правильный перевод'],['write','✍️','Напиши слово','Перевод → английское слово'],['gap','🧩','Вставь слово','Пропуски в тексте урока'],['listen','🎧','Слушай и пиши','Услышь слово и напиши его']];
var TESTS=['quiz','write','gap','listen'];
function order(){return A.lessons.map(function(_,i){return i}).sort(function(a,b){var x=A.lessons[a].date||'',y=A.lessons[b].date||'';return x<y?1:x>y?-1:b-a})}

function home(){
  root.innerHTML='<header><h1>'+A.title+'</h1><p>'+A.subtitle+'</p></header><div class="list">'+
  order().map(function(i){var l=A.lessons[i],n=l.words.length,s=seen(i),d=TESTS.filter(function(m){return (P[K(i)+'-'+m]||0)>=80}).length;
    return '<button class="card'+(s>=n&&d===4?' done':'')+'" data-i="'+i+'"><span><b>'+l.title+'</b><small>'+(l.date?fmt(l.date)+' · ':'')+n+' слов · карточки '+s+'/'+n+' · тесты '+d+'/4</small></span>'+(l.date===today()?'<em>Сегодня</em>':'')+'</button>'}).join('')+
  '</div><div class="row"><button class="ghost" id="rp">📤 Отчёт для учителя</button></div>';
  on('[data-i]',function(b){menu(+b.dataset.i)});
  document.getElementById('rp').onclick=report;
}
function report(){
  var t='Отчёт · '+A.title+' · '+fmt(today())+'\nДней занятий: '+(P.days||[]).length+'\n';
  order().forEach(function(i){var l=A.lessons[i],n=l.words.length,s=seen(i);
    t+='\n'+l.title+(l.date?' ('+fmt(l.date)+')':'')+': карточки '+s+'/'+n+(s>=n?' ✅':'')+' · выбор '+pc(i,'quiz')+' · письмо '+pc(i,'write')+' · пропуски '+pc(i,'gap')+' · слух '+pc(i,'listen')});
  root.innerHTML='<button class="back" id="bk">← Все уроки</button><h2>Отчёт</h2><pre class="rep" id="rt"></pre><div class="row"><button class="main" id="sd">Отправить</button><button id="cp">Скопировать</button></div><p id="fb"></p>';
  document.getElementById('rt').textContent=t;
  document.getElementById('bk').onclick=home;
  var fb=document.getElementById('fb');
  function cp(){try{navigator.clipboard.writeText(t).then(function(){fb.textContent='Скопировано — вставь в Telegram'},function(){fb.textContent='Выдели текст выше и скопируй вручную'})}catch(e){fb.textContent='Выдели текст выше и скопируй вручную'}}
  document.getElementById('cp').onclick=cp;
  document.getElementById('sd').onclick=function(){if(navigator.share){navigator.share({text:t}).catch(function(){})}else cp()};
}
function menu(i){
  var L=A.lessons[i];
  root.innerHTML='<button class="back" id="bk">← Все уроки</button><h2>'+L.title+'</h2><div class="modes">'+
  MODES.map(function(m){var e='';if(m[0]==='learn')e=seen(i)+'/'+L.words.length;else if(m[0]==='read')e=P[K(i)+'-read']?'✓':'';else if(P[K(i)+'-'+m[0]]!=null)e=P[K(i)+'-'+m[0]]+'%';
    return '<button class="mode" data-m="'+m[0]+'"><i>'+m[1]+'</i><span><b>'+m[2]+'</b><small>'+m[3]+'</small></span><em>'+e+'</em></button>'}).join('')+'</div>';
  document.getElementById('bk').onclick=home;
  on('[data-m]',function(b){var m=b.dataset.m;m==='learn'?learn(i):m==='read'?read(i):run(i,m)});
}
function back(i){return '<button class="back" id="bk">← '+A.lessons[i].title+'</button>'}
function learn(i){
  var W=A.lessons[i].words;
  root.innerHTML=back(i)+'<h2>Слова</h2><p class="sub" id="cnt"></p><div class="flash">'+W.map(function(w,j){return '<button data-j="'+j+'"><b>'+w.en+'</b><small></small></button>'}).join('')+'</div>';
  document.getElementById('bk').onclick=function(){menu(i)};
  var cnt=document.getElementById('cnt');
  function upd(){var s=seen(i);cnt.textContent=s>=W.length?'✅ Все карточки просмотрены':'Просмотрено '+s+' из '+W.length+'. Нажми на карточку — увидишь перевод.'}
  var P0=P['seen:'+K(i)]||[];
  root.querySelectorAll('[data-j]').forEach(function(b){if(P0.indexOf(W[+b.dataset.j].en)>=0)b.className='seen'});
  upd();
  on('[data-j]',function(b){var w=W[+b.dataset.j],s=b.querySelector('small');s.textContent=s.textContent?'':w.tr;speak(w.en);if(s.textContent){markSeen(i,w.en);b.className='seen';upd()}});
}
function read(i){
  var L=A.lessons[i],W=L.words;
  var html=L.text.replace(rx(W,'gi'),function(m,b){var w=W.filter(function(x){return x.en.toLowerCase()===b.toLowerCase()})[0];return '<mark data-t="'+b.toLowerCase()+' — '+w.tr+'">'+m+'</mark>'});
  root.innerHTML=back(i)+'<h2>Читаем</h2><p class="sub">Выделенные слова — из урока. Нажми на слово, чтобы увидеть перевод.</p><div class="read">'+html+'</div><div id="tip"></div><div class="row"><button id="rd">🔊 Прочитать вслух</button><button id="tr">Показать перевод текста</button></div><p id="trt" class="hint"></p>';
  document.getElementById('bk').onclick=function(){menu(i)};
  on('mark',function(m){document.getElementById('tip').textContent=m.dataset.t;speak(m.textContent)});
  document.getElementById('rd').onclick=function(){speak(L.text)};
  document.getElementById('tr').onclick=function(){var e=document.getElementById('trt');e.textContent=e.textContent?'':L.textTr};
  save(K(i)+'-read',100);
}
function qs(i,mode){
  var L=A.lessons[i],W=L.words,all=A.lessons.reduce(function(a,l){return a.concat(l.words)},[]);
  if(mode==='quiz')return sh(W).map(function(w){var o=sh(all.filter(function(x){return x.tr!==w.tr})).slice(0,3).map(function(x){return x.tr});return{p:w.en,say:w.en,t:'c',a:w.tr,o:sh(o.concat(w.tr))}});
  if(mode==='write')return sh(W).map(function(w){return{p:w.tr,t:'w',a:w.en,h:'Первая буква: '+w.en[0]}});
  if(mode==='listen')return sh(W).map(function(w){return{p:'Послушай и напиши',say:w.en,auto:1,t:'w',a:w.en}});
  var out=[];(L.text.match(/[^.!?]+[.!?]+["”]?\s*/g)||[]).forEach(function(s){
    var m=s.match(rx(W,'i'));if(!m)return;
    var w=W.filter(function(x){return x.en.toLowerCase()===m[1].toLowerCase()})[0];
    out.push({p:s.replace(m[0],'_____').trim(),t:'w',a:m[0],h:'Подсказка: '+w.tr})});
  return sh(out);
}
function run(i,mode){
  var Q=qs(i,mode),n=0,sc=0;
  if(!Q.length){root.innerHTML=back(i)+'<p>В тексте урока нет слов из списка — добавь их в text.</p>';document.getElementById('bk').onclick=function(){menu(i)};return}
  function show(){
    if(n>=Q.length){var p=Math.round(sc/Q.length*100);save(K(i)+'-'+mode,p);document.onkeydown=null;
      root.innerHTML='<h2>Готово!</h2><div class="score">'+sc+' / '+Q.length+'</div><p>'+(p>=80?'Отлично, урок идёт хорошо.':'Повтори слова и попробуй ещё раз.')+'</p><div class="row"><button id="again">Ещё раз</button><button id="mn">В меню урока</button></div>';
      document.getElementById('again').onclick=function(){run(i,mode)};document.getElementById('mn').onclick=function(){menu(i)};return}
    var q=Q[n],done=false;
    root.innerHTML=back(i)+'<div class="bar"><i style="width:'+n/Q.length*100+'%"></i></div><p class="big">'+q.p+'</p>'+(q.say?'<button class="ghost" id="sp">🔊 Послушать</button>':'')+(q.h?'<p class="hint">'+q.h+'</p>':'')+
      (q.t==='c'?'<div class="opts">'+q.o.map(function(o){return '<button data-o="'+o+'">'+o+'</button>'}).join('')+'</div>':'<input id="in" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Напиши по-английски"><button class="main" id="ok">Проверить</button>')+'<p id="fb"></p><button class="main" id="nx" hidden>Дальше</button>';
    document.getElementById('bk').onclick=function(){document.onkeydown=null;menu(i)};
    var fb=document.getElementById('fb'),nx=document.getElementById('nx');
    function fin(good){done=true;if(good)sc++;fb.textContent=good?'Верно!':'Правильно: '+q.a;fb.className=good?'ok':'no';fb.style.background='none';nx.hidden=false;nx.focus()}
    nx.onclick=function(){n++;show()};
    if(q.say){document.getElementById('sp').onclick=function(){speak(q.say)};if(q.auto)setTimeout(function(){speak(q.say)},300)}
    if(q.t==='c'){on('[data-o]',function(b){if(done)return;var good=b.dataset.o===q.a;b.className=good?'ok':'no';root.querySelectorAll('[data-o]').forEach(function(x){if(x.dataset.o===q.a)x.className='ok'});fin(good)})}
    else{var inp=document.getElementById('in');inp.focus();
      var chk=function(){if(done||!inp.value.trim())return;inp.disabled=true;fin(norm(inp.value)===norm(q.a))};
      document.getElementById('ok').onclick=chk;
      inp.onkeydown=function(e){if(e.key==='Enter')chk()};
      document.onkeydown=function(e){if(e.key==='Enter'&&done)nx.click()}}
  }
  show();
}
home();
})();
