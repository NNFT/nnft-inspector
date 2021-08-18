/* -------------------------------------------------------- */
/* ---------- API for Natural Non Fungible Tokens --------- */
/* ---------- MIT License  -------------------------------- */
/* -------------------------------------------------------- */

  var MASTERID="";
  var BUYPATH={};
  var TDATA={};
  var MASTER={};
  var BALANCE=-1;
  var RXID="";
  var RXISS="";
  var TXP={};
  var IMAGE="";

  var appTXcreate = document.getElementById("appTXcreate");
  var appTXmake = document.getElementById("appTX");
  var servTX = document.getElementById("servTX");
  var txMSG =  document.getElementById("txMSG");
  var stakeMSG =  document.getElementById("stakeMSG");
  var offerMSG =  document.getElementById("offerMSG");
  var buyMSG =  document.getElementById("buyMSG");
  var offerTOOLS =  document.getElementById("offerTOOLS");
  var buyTOOLS =  document.getElementById("buyTOOLS");
  var cstMETA =  document.getElementById("costMETA");

  var modalStake = document.getElementById("modal-Stake");
  var btn_app_Stake = document.getElementById("btn-app-Stake");

  var modalTX = document.getElementById("modal-TX");
  var btn_app_TX = document.getElementById("btn-app-TX");

  var modalBuy = document.getElementById("modal-Buy");
  var btn_app_Buy = document.getElementById("btn-app-Buy");

  var modalSell = document.getElementById("modal-Sell");
  var btn_app_Sell = document.getElementById("btn-app-Sell");

  var modalView = document.getElementById("modal-View");
  var btn_app_View = document.getElementById("btn-app-View");

   const nftRefs = document.querySelector('#nftValView')
   const nftRefsSelf = document.querySelector('#nftValViewSelf')

   var NFTV="";

var CW={};
window.CNW=CNWT;

function getComboNW(selectObject) {
  var value = selectObject.value;
  TN=value;
  switch (value) {
   case "TEST Network":CW=CNWT;break;
   case "PUBLIC Network":CW=CNWP;break;
   default :CW=CNWT;break;
  };
 window.CNW=CW;
}

const RNL={"took":0.005,"hits":0,"results":[]};
    var micro = {
        ajax: {
            xhr: function() {
                var instance = new XMLHttpRequest();
                return instance;
            },
            getJSON: function(options, callback) {
                var xhttp = this.xhr();
                options.url = options.url || location.href;
                options.data = options.data || null;
                callback = callback || function() {};
                options.type = options.type || 'json';
                var url = options.url;
                if (options.type == 'jsonp') {
                    window.jsonCallback = callback;
                    var $url = url.replace('callback=?', 'callback=jsonCallback');
                    var script = document.createElement('script');
                    script.src = $url;
                    document.body.appendChild(script);
                }
                xhttp.open('GET', options.url, true);
                xhttp.timeout = 4200;
                xhttp.send(options.data);
                xhttp.onreadystatechange = function() {
                    if (xhttp.status == 200 && xhttp.readyState == 4) {
                        callback(xhttp.responseText);
                };
                if (xhttp.status != 200){
                      xhttp.abort();
                  }
                };
            }
        }
    };

function gethttp(URL,o) {
 return new Promise((rp) => {
  var isneedtoKillAjax = true; // set this true
  setTimeout(function() { checkajaxkill(); }, 4600); // 4.6 seconds
  var myAjaxCall =   micro.ajax.getJSON({ url: URL, data: JSON.stringify(o), type: 'json' }, function(json) {
  if (json.length >=20){
    var RR=JSON.parse(json);
    if ( (typeof RR !== 'undefined') && (typeof RR !== null) ){
     isneedtoKillAjax = false;
     rp(RR);
   };
  };
 });
 function checkajaxkill(){
    if(isneedtoKillAjax){
       isneedtoKillAjax = false;
        rp(RNL);
      };
    };
  })
};

function ViewNFT(NFT,MEM){
    modalView.style.display = "block";
     var DT=getTDATA(NFT)
     if(DT=="pub"){
       var RD=dataNFT("image", NFT);
       RD.then(function(R){
       $("#image-View").html("<li><img src='data:image/png;base64,"+R.DATA+"' />");
       });
    };
     if(DT=="nft" && NFTV!=NFT){
       const datN=NFT.split(/(-)/);
    if(datN.length==3 && datN[1]=="-"){
      var TDA={server:"https://horizon"+CNW.Horizon+".stellar.org",
     ASN:datN[0],AST:datN[2]};
     if( MEM.charAt(MEM.length-1)===">"){
       RCS=getMetaNFTSelf(TDA,0,false);
       RCS.then(function(RS){
     if(CNW.NET)
      nftRefsSelf.innerHTML = "<a href=\"javascript:window.open(\'#t#"+JSON.parse(RS.DEC).self+"\', \'_blank\').focus();\">SELF#["+JSON.parse(RS.DEC).self+"]</a>";
            else
      nftRefsSelf.innerHTML = "<a href=\"javascript:window.open(\'#"+JSON.parse(RS.DEC).self+"\', \'_blank\').focus();\">SELF#["+JSON.parse(RS.DEC).self+"]</a>";
    });
   } else {
   if(CNW.NET)
      nftRefsSelf.innerHTML = "<a href=\"javascript:window.open(\'#t#"+MEM+"\', \'_blank\').focus();\">SELF#["+MEM+"]</a>";
    else
      nftRefsSelf.innerHTML = "<a href=\"javascript:window.open(\'#"+MEM+"\', \'_blank\').focus();\">SELF#["+MEM+"]</a>";
   };
    RC=getMetaNFT(TDA,0,false);
    RC.then(function(R){
   try {
     var DEC=JSON.parse(R.DEC);
   } catch {
     $("#image-View").html("<li><img src='' />");
     nftRefs.innerHTML ="";
     NFTV=NFT;
  }
  $("#image-View").html("<li><img src='"+DEC['image-001']+"' style=\"max-width: 100%\" />");
  var PRT=[],TMP=[],META=[];
  for (var key in DEC){
    var value = DEC[key];
    TMP.push({"id":key,"DB":[key,value]});
 }
  var TMP2 = TMP.sort(function(a, b){
     var nameA=a.id.toLowerCase(), nameB=b.id.toLowerCase()
     if (nameA < nameB) // >
       return -1
     if (nameA > nameB)
       return 1
    return 0
    })
  for(i=0;i<TMP2.length;i++)META.push(TMP2[i].DB); //>
  var LIST=""
  for(i=0;i<META.length;i++){  //>
    LIST += "<a href=\"javascript:window.open(\'"+META[i][1]+"\', \'_blank\').focus();\">["+META[i][0]+"]</a>";
   }
    nftRefs.innerHTML = LIST;
    NFTV=NFT;
       });
    };
   };
};

 var appTXcreateSTAKE = document.getElementById("appTXcreateSTAKE");
 var appTXcreateBUY = document.getElementById("appTXcreateBUY");
 var appStakeOff =  document.getElementById("appStakeOff");

function ISStstFULLACC(ACCOUNT_ID){
 BALANCE=-1;
 var STAT=404;
  var DAT = gethttp('https://horizon-testnet.stellar.org/friendbot?addr='+ACCOUNT_ID, {})
    .then(function(R){
     setTimeout(function () {
            accountBalanceISS(ACCOUNT_ID);
        }, 5000);
   });
};

function SELLtstFULLACC(ACCOUNT_ID){
 BALANCE=-1;
 var STAT=404;
  var DAT = gethttp('https://horizon-testnet.stellar.org/friendbot?addr='+ACCOUNT_ID, {})
    .then(function(R){
     setTimeout(function () {
            accountBalanceSELL(ACCOUNT_ID);
        }, 5000);
   });
};

function BUYtstFULLACC(ACCOUNT_ID){
 BALANCE=-1;
 var STAT=404;
 var DAT = gethttp('https://horizon-testnet.stellar.org/friendbot?addr='+ACCOUNT_ID, {})
    .then(function(R){
     setTimeout(function () {
            accountBalanceBUY(ACCOUNT_ID);
        }, 5000);
   });
};

appTXcreateSTAKE.onclick = function () {
   appTXcreateSTAKE.style.display = "none";
   servSTAKE.style.display = "none";
   ISStstFULLACC(MASTER.masterPUBK);
 };

 appTXcreateBUY.onclick = function () {
   appTXcreateBUY.style.display = "none";
   servBUY.style.display = "none";
   BUYtstFULLACC(MASTER.masterPUBK);
 };

async function buildTextNNFT(DATA,TXTCID,TDATA){
  const TT=28;
  var prob=10;
  var ext_prob = Math.pow(2, prob);
  var SELF = getSelf(DATA);
  var NAME = getGCS(DATA, ext_prob);
  var text2= hexToBase64(NAME);
  var KEYS=await b64CID(text2,TXTCID.MIME);
  var PRT={};
  var NID=0;
  var IDS=("00000"+NID.toString(16)).slice(-6);
  var MET={self:SELF};
  var DAT=JSON.stringify(MET);
  var RR = my_lzmaC.compress(DAT, 1);  //mode 1-9
  RRH=BAtohex(RR);
  var PRTL0="M1"+IDS+":"+KEYS.issPUBK.slice(1);
  PRT=getPartsLL(RRH,IDS,PRTL0 );
  var MEM=getMEM(SELF,TT);
  var sl=byteLength8(MEM);
  var feef=getSurgePricingFee();
  var costNFT0=2;
  if( MEM.charAt(MEM.length-1)===">"){
     costNFT0=getCostNFTF(PRT,feef,true);
    SRTX=TokenStakeOff(MASTER.masterPRK, KEYS, PRT, MEM, 1, true, feef);
   } else {
   PRT={};
   costNFT=getCostNFTF(PRT,feef,false);
   SRTX=TokenStakeOff(MASTER.masterPRK, KEYS, PRT, MEM, 1, false, feef);
  };
  SRTX.then(function(RX) {
    if(RX.passed)stakeMSG.innerHTML = "Process Create NNFT Successful !"; else "Process Create NNFT Failed !";
         });
};

appStakeOff.onclick = function () {
  document.getElementById("appStakeOff").style.display = "none";
  TDATA.sourceSecretKey=MASTER.masterPRK;
  TDATA.memoData=NNAME.slice(0,24);
  TXTCID.MIME="NNFT"
    buildTextNNFT(input.value,TXTCID,TDATA);
};

var appTXcreateSELL = document.getElementById("appTXcreateSELL");
  appTXcreateSELL.onclick = function () {
   appTXcreateSELL.style.display = "none";
   servSELL.style.display = "none";
   SELLtstFULLACC(MASTER.masterPUBK);
};

async function accountBalanceISS(ACCOUNT_ID){
 if(CNW.NET) appTXcreateSTAKE.style.display = "block";
            else appTXcreateSTAKE.style.display = "none";
 var server=CNW.server;
 var AL=ACCOUNT_ID.length;
 servSTAKE.style.display = "none";
 var RP= await checkPAccount(ACCOUNT_ID,0);
 if(RP.passed != false && RP.errorMessage != 404){
 if(AL==56){
  try {
  const account = await server.loadAccount(ACCOUNT_ID);
  for(i=0;i<account.balances.length;i++)if(account.balances[i].asset_type === "native")break;
  BALANCE=account.balances[i].balance;
  appTXcreateSTAKE.style.display = "none";
  servSTAKE.style.display = "block";
 } catch (err) {
     BALANCE=-1;
     servSTAKE.style.display = "none";
  if(CNW.NET) appTXcreateSTAKE.style.display = "block";
            else appTXcreateSTAKE.style.display = "none";
 };
 } else {
     servTXmake.style.display = "none";
     BALANCE=-1;
 };
   var MSG=0;
   if(BALANCE>=0){MSG=BALANCE;
        servSTAKE.style.display = "block";
  };
  var fee=getSurgePricingFee();
  var INFO=document.getElementById("IDS-balance");
  var buffer = [];
  buffer.push("Balance: "+MSG+" XLM<br><br>");
  INFO.innerHTML=buffer.join(' ') ;
  delete buffer;
  var PRT={};
  var SELF = getSelf(input.value);
  var NID=0;
  var IDS=("00000"+NID.toString(16)).slice(-6);
  var MET={self:SELF};
  var DAT=JSON.stringify(MET);
  var RR = my_lzmaC.compress(DAT, 1);  //mode 1-9
  RRH=BAtohex(RR);
  var text2= hexToBase64(SELF);
  var KEYS=await b64CID(text2,TXTCID.MIME);
  var PRTL0="M1"+IDS+":"+KEYS.issPUBK.slice(1);
  PRT=getPartsLL(RRH,IDS,PRTL0 );
  TT=28;
  var MEM=getMEM(SELF,TT);
  var sl=byteLength8(MEM);
  var costNFT0=0;
  if( MEM.charAt(MEM.length-1)===">"){
     costNFT0=getCostNFTF(PRT,fee,true);
   } else {
   PRT={};
    costNFT0=getCostNFTF(PRT,fee,true,false);
  };
  document.getElementById("COC").innerHTML=strip7(parseFloat(costNFT0)+fee*0.0000002)+" XML";
  };
};

var INDF=0;
var indTcnt=0;
var TN="chapter"
var TCNT=[1,1,1,1,1,1,1,1,1];
var NNN="001";
const viewTN = document.querySelector('#viewTN');

function maxCNTF(KEY,OFS){
  var data = Fserialize('formMETA');
  var key=[0];
  for(i=0;i<data.length;i++){ //>
    if(data[i].name=="key[]" && data[i].value.split("-",2)[0]==KEY){
          key.push( parseInt( data[i].value.split("-",2)[1],10)  );
    };
  };

  var KK = key.sort(function(a, b) {return a - b;});
  var KM=0;
  for(var i = 0; i < KK.length; i++)
    if(KM<KK[i])KM=KK[i];  //>
   KM+=OFS;
  for(var i = 1; i < KK.length; i++) { //>
    if(KK[i] - KK[i-1] != 1) {
        KM=KK[(i-1)]+OFS;
        break;
     }
  }
  TCNT[indTcnt]=KM;
  NNN=("00"+TCNT[indTcnt]).slice(-3);
  viewTN.innerHTML = NNN;
};

function getComboA(selectObject) {
  var value = selectObject.value;
  TN=value;
  switch (value) {
   case "chapter":indTcnt=0;break;
   case "description":indTcnt=1;break;
   case "card":indTcnt=2;break;
   case "link":indTcnt=3;break;
   case "image":indTcnt=4;break;
   case "video":indTcnt=5;break;
   case "audio":indTcnt=6;break;
   case "text":indTcnt=7;break;
   case "XXmsg":indTcnt=8;break;
  };
  maxCNTF(TN,1);
}

function getComboV(value) {
  TN=value;
  switch (value) {
   case "chapter":indTcnt=0;break;
   case "description":indTcnt=1;break;
   case "card":indTcnt=2;break;
   case "link":indTcnt=3;break;
   case "image":indTcnt=4;break;
   case "video":indTcnt=5;break;
   case "audio":indTcnt=6;break;
   case "text":indTcnt=7;break;
   case "XXmsg":indTcnt=8;break;
  };
  var N=("00"+TCNT[indTcnt]).slice(-3);
  maxCNTF(TN,1);
  viewTN.innerHTML = N;
 return(N);
}

function changeCNT() {
  maxCNTF(TN,0);
  TCNT[indTcnt]++;
  NNN=("00"+TCNT[indTcnt]).slice(-3);
  viewTN.innerHTML = NNN;
}

function Fserialize(formIdName){
    var _formId = document.getElementById(formIdName);
    return Array.prototype.slice.call(_formId.elements).reduce(function(acc,cur,indx,arr){
        var i,o = {type : cur.type, name : cur.name, value : cur.value};
        if(['checkbox','radio'].indexOf(cur.type) !==-1){
            o.checked = cur.checked;
        } else if(cur.type === 'select-multiple'){
            o.value=[];
            for(i=0;i<cur.length;i++){ //>
                o.value.push({
                    value : cur.options[i].value,
                    selected : cur.options[i].selected
                });
            }
        }
        acc.push(o);
        return acc;
    },[]);
};

function add_field_val(TN,VAL){
    var NNNV=getComboV(TN)
    var NFID="NF-"+INDF;
     INDF++;
     var x = document.getElementById("NF");
     var NF = document.createElement("span");
     NF.setAttribute("id", NFID);
     var pos = x.childElementCount;
     x.insertBefore(NF, x.childNodes[pos]);
    x = document.getElementById(NFID);
    var new_field = document.createElement("br");
    pos = x.childElementCount;
    x.insertBefore(new_field, x.childNodes[pos]);
    new_field = document.createElement("input");
    new_field.setAttribute("type", "text");
    new_field.setAttribute("value", TN+"-"+NNNV);
    new_field.setAttribute("name", "key[]");
    new_field.setAttribute("disabled","");
    pos = x.childElementCount;
    x.insertBefore(new_field, x.childNodes[pos]);
    new_field = document.createElement("input");
    new_field.setAttribute("id", "text-"+INDF);
    new_field.setAttribute("name", "text_field[]");
    new_field.setAttribute("value", VAL);
    pos = x.childElementCount;
    x.insertBefore(new_field, x.childNodes[pos]);
    pos = x.childElementCount;
    new_field = document.createElement("button");
    new_field.setAttribute("type", "button");
    new_field.setAttribute("name", "df");
    new_field.setAttribute("onclick", "deleteF(\""+NFID+"\");");
    new_field.innerHTML = "[DELETE]";
    x.insertBefore(new_field, x.childNodes[pos]);
}

function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}

function createMETA() {
  var data = Fserialize('formMETA');
  var META={};
  var key=[];
  var val=[];
  for(i=0;i<data.length;i++){ //>
    if(data[i].name=="key[]")key.push(data[i].value);
    if(data[i].name=="text_field[]")val.push(data[i].value);
  };
  for(i=0;i<key.length;i++)META[key[i]]=val[i]; //>
  const x = new Date()
  var UTCseconds = Math.round((x.getTime())/1000);
  META["TS"]=UTCseconds;
  var DAT=JSON.stringify(META);
  var RR = my_lzmaC.compress(DAT, 1);  //mode 1-9
  RRH=BAtohex(RR);
  var PRT=getParts(RRH);
  var RC=getMetaNFT(TDATA,0,true);
  RC.then(function(R){
    var NID=parseInt(R.IDS, 16)+1;
    var IDS=("00000"+NID.toString(16)).slice(-6);
    var PRTL0="M1"+IDS+":"+TDATA.AST.slice(1);
     PRT=getPartsLL(RRH,IDS,PRTL0 );
     TDATA.sourceSecretKey=MASTER.masterPRK;
    var FEE=getSurgePricingFee();
    offerTOOLS.style.display = "none";
    setMetaNFT(TDATA,PRT,FEE).then(function(RR){
       offerMSG.innerHTML = toTXREZ({RES:"Success :",LNK: RR._links.operations.href.split(/({)/)[0] });
       offerTOOLS.style.display = "block";
     })
  })
}

function getCostMETANFT(PRT,FF){
 var F=parseFloat((parseFloat(FF)*0.0000001).toFixed(7));
 var  C=(0.0+2*F).toFixed(7);
 if (typeof PRT.length !== 'undefined'){
     var A=0.0+2*F+PRT.length*(0.0+F);
     if(A.toFixed(7)<A) A+=0.0000001
     C=A.toFixed(7);
  }
  return C;
}

function costMETA() {
  var data = Fserialize('formMETA');
  var META={};
  var key=[];
  var val=[];
  for(i=0;i<data.length;i++){ //>
    if(data[i].name=="key[]")key.push(data[i].value);
    if(data[i].name=="text_field[]")val.push(data[i].value);
  };
  for(i=0;i<key.length;i++)META[key[i]]=val[i]; //>
  const x = new Date()
  var UTCseconds = Math.round((x.getTime())/1000);
  META["TS"]=UTCseconds;
  var DAT=JSON.stringify(META);
  var RR = my_lzmaC.compress(DAT, 1);  //mode 1-9
  RRH=BAtohex(RR);
  var PRT=getParts(RRH);
  var FEE=getSurgePricingFee();
  var costM=getCostMETANFT(PRT,FEE);
  cstMETA.innerHTML=" [max] "+costM+" XLM"
}

function deleteF(id){
 var item = document.getElementById(id);
 item.parentNode.removeChild(item);
  var e = document.getElementById("comboA");
  TN = e.options[e.selectedIndex].value;
  maxCNTF(TN,1);
};

function add_field(){
     var NFID="NF-"+INDF;
     INDF++;
     var x = document.getElementById("NF");
     var NF = document.createElement("span");
     NF.setAttribute("id", NFID);
     var pos = x.childElementCount;
     x.insertBefore(NF, x.childNodes[pos]);
    x = document.getElementById(NFID);
    var new_field = document.createElement("br");
   pos = x.childElementCount;
    x.insertBefore(new_field, x.childNodes[pos]);
    new_field = document.createElement("input");
    new_field.setAttribute("type", "text");
    new_field.setAttribute("value", TN+"-"+NNN);
    new_field.setAttribute("name", "key[]");
    new_field.setAttribute("disabled","");
   pos = x.childElementCount;
    x.insertBefore(new_field, x.childNodes[pos]);
    new_field = document.createElement("input");
    new_field.setAttribute("id", "text-"+INDF);
    new_field.setAttribute("name", "text_field[]");
    pos = x.childElementCount;
    x.insertBefore(new_field, x.childNodes[pos]);
   pos = x.childElementCount;
    new_field = document.createElement("button");
    new_field.setAttribute("type", "button");
    new_field.setAttribute("name", "df");
    new_field.setAttribute("onclick", "deleteF(\""+NFID+"\");");
    new_field.innerHTML = "[DELETE]";
    x.insertBefore(new_field, x.childNodes[pos]);
     changeCNT();
}

 var servMETA = document.getElementById("servMETA");

 editMETA.addEventListener('change', () => {
  if(editMETA.checked) {
     cstMETA.innerHTML="";
     servMETA.style.display = "block";
    RCE=getMetaNFT(TDATA,0,false);
    RCE.then(function(R){
     try {
      var METAR=JSON.parse(R.DEC);
     } catch {
     console.log("Error META decode !");
  }
  var TMP=[]; var HREF="";
  for (var key in METAR){
    var keyH=key.split(/(-)/)[0];
    var value = METAR[key];
    if(keyH !== "href"){
      if(keyH !== "TS")TMP.push([keyH,value]);
    } else HREF=value;
 }
  document.getElementById("fhref").value=HREF;
  for(im=0;im<TMP.length;im++)add_field_val(TMP[im][0],TMP[im][1]);
   });
  } else {
  servMETA.style.display = "none";
  }
});

var appSellOn =  document.getElementById("appSellOn");
appSellOn.onclick = function () {
  var PRS=document.getElementById("masterOffer").value;
    TDATA.sourceSecretKey=MASTER.masterPRK;
    TDATA.PRICE=PRS;
   if(Math.round(parseFloat(PRS)*5000) >= 1){
    var feef=getSurgePricingFee();
    RC=offersNFT(TDATA);
    RC.then(function(R){
      if(R.FOUND){
         offerMSG.innerHTML = "Offer already made FOUND!";
         } else {
           offerTOOLS.style.display = "none";
           PofferNFT(TDATA, feef).then(function(RPO){
             offerMSG.innerHTML = toTXREZ({RES:"Success :",LNK: RPO._links.operations.href.split(/({)/)[0] });
             offerTOOLS.style.display = "block";
           });
         }
    })
   };
};

var appSellOff =  document.getElementById("appSellOff");
appSellOff.onclick = function () {
    TDATA.sourceSecretKey=MASTER.masterPRK;
    TDATA.PRICE=1;
    RC=offersNFT(TDATA);
    RC.then(function(R){
      if(R.FOUND){
           offerTOOLS.style.display = "none";
            var FEE=getSurgePricingFee();
           CofferNFT(TDATA,R,FEE).then(function(RPO){
             offerMSG.innerHTML = toTXREZ({RES:"Success :",LNK: RPO._links.operations.href.split(/({)/)[0] });
             offerTOOLS.style.display = "block";
           });
        } else{
           offerMSG.innerHTML = "OFFER NOT FOUND!";
       };
    })
 };

var appSellRTrust =  document.getElementById("appSellRTrust");
appSellRTrust.onclick = function () {
    TDATA.sourceSecretKey=MASTER.masterPRK;
    RC=clearNFT(TDATA);
    RC.then(function(R){
     if(R.length>=1){
           offerTOOLS.style.display = "none";
            var FEE=getSurgePricingFee();
           retrustNFT(R,TDATA,FEE).then(function(RPO){
             offerMSG.innerHTML = toTXREZ({RES:"Success :",LNK: RPO._links.operations.href.split(/({)/)[0] });
             offerTOOLS.style.display = "block";
           });
      }else{
         offerMSG.innerHTML = "NO Trust Line for Asset!";
       };
    })
};

var NOFFER=[];

async function accountBalanceSELL(ACCOUNT_ID){
 if(CNW.NET) appTXcreateSELL.style.display = "block";
            else appTXcreateSELL.style.display = "none";
  var server=CNW.server;
 NOFFER=[];
 var AL=ACCOUNT_ID.length;
 servSELL.style.display = "none";
 var RP=await checkPAccount(ACCOUNT_ID,0);  //RXID //  var RP= await checkPAccount(RXISS,0);  //RXID
  if(RP.passed != false && RP.errorMessage != 404){
   if(AL==56){
    try {
     const account = await server.loadAccount(ACCOUNT_ID);
     NOFFER=[];
     for(i=0;i<account.balances.length;i++)
      if(account.balances[i].asset_type === "credit_alphanum4" && account.balances[i].asset_code === "NNFT" &&
        account.balances[i].balance === "0.0000000")NOFFER.push(account.balances[i].asset_issuer);
  appSellRTrust.innerHTML = "CLEAR ALL "+NOFFER.length+" OTHER TRUST LINES";
  for(i=0;i<account.balances.length;i++)if(account.balances[i].asset_type === "native")break;
  BALANCE=account.balances[i].balance;
  appTXcreateSELL.style.display = "none";
  servSELL.style.display = "block";
 } catch (err) {
   BALANCE=-1;
   servSELL.style.display = "none";
   if(CNW.NET) appTXcreateSELL.style.display = "block";
            else appTXcreateSELL.style.display = "none";
  };
 } else {
     BALANCE=-1;
 };
   var MSG=0;
   if(BALANCE>=0){MSG=BALANCE;
        servSELL.style.display = "block";
  };
  var feef=getSurgePricingFee();
  document.getElementById("COT").innerHTML=strip7(feef*0.0000001)+" XML";
   var INFO=document.getElementById("balanceSell");
   var buffer = [];
   buffer.push("Balance: "+MSG+" XLM<br><br>");
   INFO.innerHTML=buffer.join(' ') ;
   delete buffer;
  } else {
  };
};

async function accountBalanceBUY(ACCOUNT_ID){
 if(CNW.NET) appTXcreateBUY.style.display = "block";
            else appTXcreateBUY.style.display = "none";
 var server=CNW.server;
 var AL=ACCOUNT_ID.length;
 servBUY.style.display = "none";
 var RP=await checkPAccount(ACCOUNT_ID,0);  //RXID //  var RP= await checkPAccount(RXISS,0);  //RXID
 if(RP.passed != false && RP.errorMessage != 404){
 if(AL==56){
  try {
   const account = await server.loadAccount(ACCOUNT_ID);
   for(i=0;i<account.balances.length;i++)if(account.balances[i].asset_type === "native")break;
    BALANCE=account.balances[i].balance;
    appTXcreateBUY.style.display = "none";
    servBUY.style.display = "block";
 } catch (err) {
     BALANCE=-1;
     servBUY.style.display = "none";
     if(CNW.NET) appTXcreateBUY.style.display = "block";
            else appTXcreateBUY.style.display = "none";
   };
 } else {
     BALANCE=-1;
 };
   var MSG=0;
   if(BALANCE>=0){MSG=BALANCE;
        servBUY.style.display = "block";
  };
   const fee = await server.fetchBaseFee();
   var INFO=document.getElementById("balanceBuy");
   var buffer = [];
   buffer.push("Balance: "+MSG+" XLM<br><br>");
   INFO.innerHTML=buffer.join(' ') ;
   delete buffer;
  };
};

var appBuyOn =  document.getElementById("appBuyOn");
appBuyOn.onclick = function () {
    TDATA.sourceSecretKey=MASTER.masterPRK;
    TDATA.PRICE=1;
    TDATA.ASN=BUYPATH.DAT.ASN;
    TDATA.AST=BUYPATH.DAT.AST;
    var RC=offersNFT(TDATA);
    RC.then(function(R){
      if(R.FOUND){
            var FEE=getSurgePricingFee();
           buyTOOLS.style.display = "none";
           pprNFT(R,TDATA,FEE).then(function(RPO){
             buyMSG.innerHTML = toTXREZ({RES:"Success :",LNK: RPO._links.operations.href.split(/({)/)[0] });
             buyTOOLS.style.display = "block";
           });
        } else {
           buyMSG.innerHTML = "OFFER NOT FOUND!";
        };
    })
};

function putMasterSell(){
   var NNA=document.getElementById("masterIDSsell");
   var buffer = [];
   buffer.push("<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>");
   buffer.push("APPLICANT SECRET ADDR: "+MASTER.masterPRK);
   buffer.push("</dd></div></dl>");
   buffer.push("<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>");
   buffer.push("APPLICANT ID ADDR: "+MASTER.masterPUBK);
   buffer.push("</dd></div></dl>");
   NNA.innerHTML=buffer.join(' ') ;
  if(MASTER.masterPUBK === MASTERID){
    accountBalanceSELL(MASTER.masterPUBK);
   } else  appTXcreateSELL.style.display = "none";
};

function setMasterSell(SC){
 if(SC.length==56 && SC.slice(0,1)=="S"){
    MASTER={masterPRK:SC,masterPUBK:getPubKey(SC)};
    putMasterSell();
 } else {
 var SK=MasterKey(SC);
  SK.then(function(result) {
    MASTER=result;
    putMasterSell();
  });
 };
};

function putMasterBuy(){
   var NNA=document.getElementById("masterIDSbuy");
   var buffer = [];
   buffer.push("<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>");
   buffer.push("APPLICANT SECRET ADDR: "+MASTER.masterPRK);
   buffer.push("</dd></div></dl>");
   buffer.push("<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>");
   buffer.push("APPLICANT ID ADDR: "+MASTER.masterPUBK);
   buffer.push("</dd></div></dl>");
   NNA.innerHTML=buffer.join(' ') ;
    accountBalanceBUY(MASTER.masterPUBK);
};

function setMasterBuy(SC){
 if(SC.length==56 && SC.slice(0,1)=="S"){
  MASTER={masterPRK:SC,masterPUBK:getPubKey(SC)};
    putMasterBuy();
 } else {
  var SK=MasterKey(SC);
  SK.then(function(result) {
    MASTER=result;
    putMasterBuy();
 });
 };
};

function putMasterStake(){
   var NNA=document.getElementById("masterIDS");
   var buffer = [];
   buffer.push("<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>");
   buffer.push("APPLICANT SECRET ADDR: "+MASTER.masterPRK);
   buffer.push("</dd></div></dl>");
   buffer.push("<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>");
   buffer.push("APPLICANT ID ADDR: "+MASTER.masterPUBK);
   buffer.push("</dd></div></dl>");
   NNA.innerHTML=buffer.join(' ') ;
   accountBalanceISS(MASTER.masterPUBK);
};

function setMasterStake(SC){
 if(SC.length==56 && SC.slice(0,1)=="S"){
  MASTER={masterPRK:SC,masterPUBK:getPubKey(SC)};
    putMasterStake();
 } else {
  var SK=MasterKey(SC);
  SK.then(function(result) {
    MASTER=result;
    putMasterStake();
 });
 }
};

function StakeOutNFT(NFT){
  modalStake.style.display = "block";
  var DT=getTDATA(NFT)
  var NNA=document.getElementById("NNA");
  var buffer = [];
   buffer.push("<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>");
   buffer.push("IMG-"+NFT);
   buffer.push("</dd></div></dl>");
   NNA.innerHTML=buffer.join(' ') ;
   RXISS=NFT;
   $("#imageListPost").html("<img style=\'display:block; width:128px;height:128px;\' src='"+MPNG+"' />");
   putMasterStake();
};

function tstFULLACC(ACCOUNT_ID){
 BALANCE=-1;
 var STAT=404;
 var DAT = gethttp('https://horizon-testnet.stellar.org/friendbot?addr='+ACCOUNT_ID, {})
    .then(function(R){
     setTimeout(function () {
            accountBalance(ACCOUNT_ID);
        }, 5000);
   });
};

appTXcreate.onclick = function () {
   servTX.style.display = "none";
   tstFULLACC(MASTER.masterPUBK);
 };

function setAmountTX(amount){
  TXP.AMT=parseFloat(amount);
  var AMT=TXP.AMT;
  var RTX;
  if(TXP.AMT>0.0000001){
   txMSG.innerHTML = "";
   AMT=strip7(TXP.AMT+TXP.extFee+TXP.Fee*0.0000001);
   if(AMT<parseFloat(TXP.BALANCE)){
      appTXmake.style.display = "block";
   } else appTXmake.style.display = "none";
  } else appTXmake.style.display = "none";
};

function toTXREZ(RX){
  var html="<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>";
  html += RX.RES;
  if(RX.LNK.length>5){
    html +="<br><a href=\"javascript:window.open(\'"+RX.LNK+"\', \'_blank\').focus();\">";
    html +="VIEW TX: "+RX.LNK+"&nbsp</a>";
  } else {
    html +=  RX.ERR;
  }
  return html+"</dd></div></dl>";
};

appTXmake.onclick = function () {
  var AMT=TXP.AMT;
  if(TXP.AMT>0.0000001){
   AMT=strip7(TXP.AMT+TXP.extFee+TXP.Fee*0.0000001);
   if(AMT<parseFloat(TXP.BALANCE)){
      servTX.style.display = "none";
      txMSG.innerHTML = "Wait for the transaction to complete"
    if(TXP.extFee>0){
      RTX=makeACCTX(TXP.SEC,TXP.RX, strip7(TXP.AMT+TXP.extFee), TXP.Fee);
      RTX.then(function(RX) {
      servTX.style.display = "block";
      txMSG.innerHTML = toTXREZ(RX);
        });
    } else {
      RTX=makeTX(TXP.SEC,TXP.RX, strip7(TXP.AMT+TXP.extFee), TXP.Fee);
      RTX.then(function(RX) {
        servTX.style.display = "block";
         txMSG.innerHTML = toTXREZ(RX);
        });
    };
   };
  };
};

function strip7(number) {
    return ""+number.toFixed(7);
}

async function accountBalance(ACCOUNT_ID){
 if(CNW.NET) appTXcreate.style.display = "block";
            else appTXcreate.style.display = "none";
 var AL=ACCOUNT_ID.length;
 var extFee=0;
 var server=CNW.server;
  var RP= await checkPAccount(RXID,0);
  if(RP.passed == false && RP.errorMessage == 404){
       extFee=1.0;
  };
  var amountTX = document.getElementById("amountTX");
  if(AL==56){
   servTX.style.display = "block";
   try {
    const account = await server.loadAccount(ACCOUNT_ID);
    for(i=0;i<account.balances.length;i++)if(account.balances[i].asset_type === "native")break;
    BALANCE=account.balances[i].balance;
    amountTX.style.display = "block";
    if(BALANCE>1)appTXmake.style.display = "block";
     else appTXmake.style.display = "none";
    appTXcreate.style.display = "none";
   } catch (err) {
     BALANCE=-1;
     appTXmake.style.display = "none";
     amountTX.style.display = "none";
     if(CNW.NET) appTXcreate.style.display = "block";
            else appTXcreate.style.display = "none";
  };
 } else {
     servTXmake.style.display = "none";
     amountTX.style.display = "none";
     BALANCE=-1;
 };
   var MSG=0;
   if(BALANCE>=0){MSG=BALANCE;};
   const fee = await server.fetchBaseFee();
   var INFO=document.getElementById("MTX-balance");
   var buffer = [];
   buffer.push("Balance: "+MSG+" XLM<br><br>FEE="+strip7(extFee+fee*0.0000001)+" XLM<br>");
   INFO.innerHTML=buffer.join(' ') ;
   delete buffer;
   TXP={AMT:parseFloat(document.getElementById("amountTX").value),RX:RXID,SEC:MASTER.masterPRK,Fee:fee,extFee:extFee,BALANCE:BALANCE};
};


function putMasterTX(){
   var TX=document.getElementById("MTX");
   var buffer = [];
   buffer.push("<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>");
   buffer.push("MASTER SECRET TX: "+MASTER.masterPRK);
   buffer.push("</dd></div></dl>");
   buffer.push("<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>");
   buffer.push("MASTER ID TX: "+MASTER.masterPUBK);
   buffer.push("</dd></div></dl>");
   TX.innerHTML=buffer.join(' ') ;
   accountBalance(MASTER.masterPUBK);
};

function setMasterTX(SC){
 if(SC.length==56 && SC.slice(0,1)=="S"){
  MASTER={masterPRK:SC,masterPUBK:getPubKey(SC)};
    putMasterTX();
 } else {
 var SK=MasterKey(SC);
  SK.then(function(result) {
    MASTER=result;
    putMasterTX();
 });
 };
};

function appTX(ID){
   TXP={};
   modalTX.style.display = "block";
   var DT=getTDATA(ID)
   var NNA=document.getElementById("RX");
   var buffer = [];
   buffer.push("<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'><span id=\"RXID\">");
   buffer.push(ID);
   buffer.push("</span></dd></div></dl>");
   NNA.innerHTML=buffer.join(' ') ;
   RXID=ID;
   putMasterTX();
};

function BuyNFT(NFT){
    BUYPATH=JSON.parse(NFT);
    modalBuy.style.display = "block";
    TDATA.memoData="FreeDomNFT";
    document.getElementById("payBuy").value=BUYPATH.OF.ASX+" XLM";
     var DT=getTDATA(NFT)
};

function OfferNFT(NFT,MID){
    modalSell.style.display = "block";
    MASTERID=MID;
    offerMSG.innerHTML = "";
    const dat=NFT.split(/(-)/);
      TDATA={"server":"https://horizon"+CNW.Horizon+".stellar.org",
   "sourceSecretKey":"","memoData": "FreeDomNFT",
   "limit":100,"ASN":dat[0],"AST":dat[2],"PRICE":0};
};

window.onclick = function (event) {
    if ( (typeof modalStake !== 'undefined') && event.target == modalStake) {
        modalStake.style.display = "none";
    }
    if ( (typeof modalTX !== 'undefined') && event.target == modalTX) {
        modalTX.style.display = "none";
    }
    if ( (typeof modalBuy !== 'undefined') && event.target == modalBuy) {
        modalBuy.style.display = "none";
    }
    if ( (typeof modalSell !== 'undefined') && event.target == modalSell) {
        modalSell.style.display = "none";
    }
    if ( (typeof modalView !== 'undefined') && event.target == modalView) {
        modalView.style.display = "none";
    }
};

function noSTAKE(){
        modalStake.style.display = "none";
};

function noTX(){
        modalTX.style.display = "none";
};

function noBUY(){
        modalBuy.style.display = "none";
};

function noSELL(){
        modalSell.style.display = "none";
};

function noView(){
        modalView.style.display = "none";
};

btn_app_Stake.onclick = function () {
 noSTAKE();
};
btn_app_TX.onclick = function () {
 noTX();
};
btn_app_Buy.onclick = function () {
 noBUY();
};
btn_app_Sell.onclick = function () {
 noSELL();
};
btn_app_View.onclick = function () {
 noView();
};
