/* -------------------------------------------------------- */
/* ---------- Natural Non Fungible Tokens ----------------- */
/* ---------- MIT License  -------------------------------- */
/* -------------------------------------------------------- */

 var MPNG="";
 var TXTCID={};
 var NNAME="";
 window.CNW=CNWT;

var btnIMGtune = document.getElementById("btn-tune");
var btnLoad = document.getElementById("btn-load");

function isHex32(string) {
  for (const c of string) {
    if ("0123456789ABCDEFabcdef".indexOf(c) === -1) {
      return false;
    }
  }
  return string.length == 64;
}

function getTDATA(dat) {
     var DT="txt";
       const dat1=dat.split(/(:)/);
       const dat2=dat.split(/(-)/);
       if(dat1[0]=="http" || dat1[0]=="https")
           DT="http"; else 
       if( dat2[1]=="-" && dat2.length==3 && dat2[0].length<=12  && dat2[0].length>0  && dat2[2].length==56 && dat2[2].slice(0,1)=="G")
         DT="nft"; else 
       if(dat.length==56 && dat.slice(0,1)=="G")
           DT="pub"; else
       if(dat.length==56 && dat.slice(0,1)=="S")
           DT="sec"; else 
       if(isHex32(dat))DT="hex";
   return DT;
};

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) { //>
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) { //>
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

function hexToBase64(hexstring) {
    return btoa(hexstring.match(/\w{2}/g).map(function(a) {
        return String.fromCharCode(parseInt(a, 16));
    }).join(""));
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function isEncoded(str) {
    return typeof str == "string" && decodeURIComponent(str) !== str;
}

function uniqArr(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getSelf(str){
   str = str.replace(/\s{2,}/g, ' ');
   str = str.replace(/\t/g, ' ');
   str = str.toString().trim().replace(/(\r\n|\n|\r)/g,"");
   str = str.toLowerCase();
   var words = str.split(" ");
   var SLFA=uniqArr(words);
   var SLF=SLFA[0];
   for(var i=1;i<SLFA.length;i++)SLF+=" "+SLFA[i];
  return SLF;
};

const byteToHex = [];
for (let n = 0; n <= 0xff; ++n) //>
{
    const hexOctet = n.toString(16).padStart(2, "0");
    byteToHex.push(hexOctet);
}

function BAtohex(arrayBuffer)
{
    const buff = new Uint8Array(arrayBuffer);
    const hexOctets = [];
    for (let i = 0; i < buff.length; ++i) //>
        hexOctets.push(byteToHex[buff[i]]);
    return hexOctets.join("");
}


function getGCS(str,ext_prob){
   str = str.replace(/\s{2,}/g, ' ');
   str = str.replace(/\t/g, ' ');
   str = str.toString().trim().replace(/(\r\n|\n|\r)/g,"");
   str = str.toLowerCase();
   var words = str.split(" ");
   words=uniqArr(words);
   shuffleArray(words);
   gcs = new GCSBuilder(words.length, ext_prob);
   for (var i = 0; i < words.length; i += 1) { //>
      gcs.add(words[i]);
   }
   return BAtohex(gcs.finalize());
};

function byteLength8(str) {
  var s = str.length;
  for (var i=str.length-1; i>=0; i--) {
    var code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s+=2;
    if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
  }
  return s;
}

function getSymbols(string) {
    var index = 0;
    var length = string.length;
    var l=0; ss="";
    var output = [];
    for (; index < length; ++index) { //>
	var charCode = string.charCodeAt(index);
	if (charCode >= 0xD800 && charCode <= 0xDBFF) { //>
	    charCode = string.charCodeAt(index + 1);
	    if (charCode >= 0xDC00 && charCode <= 0xDFFF) { //>
		ss=string.slice(index, index + 2);
		l+=byteLength8(ss);
		output.push({s:ss,i:index,l:l});
		++index;
		continue;
	    }
	}
	ss=string.charAt(index);
	l+=byteLength8(ss);
	output.push({s:ss,i:index,l:l});
    }
    return output;
}


function getMEM(str,t){
   str = str.replace(/\s{2,}/g, ' ');
   str = str.replace(/\t/g, ' ');
   str = str.toString().trim().replace(/(\r\n|\n|\r)/g,"");
   str = str.toLowerCase();
    var sl= byteLength8(str);
    var dt="";
   var sym = getSymbols(str);
  for(i=0;i<sym.length-1;i++)if(sym[i].l<t)dt+=sym[i].s;else break;
  if(sym[sym.length-1].l<=t)dt+=sym[sym.length-1].s;else dt+=">";
 return dt;
};

document.addEventListener('DOMContentLoaded', () => {
 prcOutput();
})

  const errorOutput = document.querySelector('#input-error')
  const output = document.querySelector('#cid')
  const details = document.querySelector('#outputs')
  const input = document.querySelector('#input-cid')
  const typeOutput = document.querySelector('#idType')
  const assetsOutput = document.querySelector('#assets')


async function dataOutput(data,TDA){
  TDATA.server="https://horizon"+CNW.Horizon+".stellar.org";
  var LIST="";
  var LISTB="";
  var REF="";
  var REFB="";
  if(TDA==="sec"){
    var data=getPubKey(data);
    if(CNW.NET)window.location.hash = "t#"+data;
            else window.location.hash = data;
    if( document.getElementById("stellarID").value === data)return;
          document.getElementById("stellarID").value=data;
     };
    if(TDA=="pub"){
     document.getElementById("stellarID").value=data;
     var CPA=checkPAccount(data,0);
     CPA.then(function(RP){
      if(RP.passed == false && ( RP.errorMessage == 404 || RP.errorMessage == 400  ) ){
      var errN="";
        errorOutput.innerText = errN
        errorOutput.style.opacity = 1
          REF="#"+data;
      if(IMAGE.length>12){
        LISTB=toDefinitionList2("NFT Ready for StakeOut !");
        LISTB+=toStakeOutAsset(data);
          document.getElementById("NFT_ASSETS").style.display = "block";
        } else {
           LISTB=toDefinitionList2("Account not found !");
           LISTB+=toTXID(data);
            document.getElementById("NFT_ASSETS").style.display = "none";
        };
        LIST=toDefinitionList2(data);
         typeOutput.innerHTML = LISTB;
         assetsOutput.innerHTML = LIST;
       };
     });
    };
  if(TDA=="txt"){
   NNAME=data;
   var prob=10;
   var ext_prob = Math.pow(2, prob);
   var VH= getGCS(data, ext_prob);
   var text64=hexToBase64(VH);
   var TXTCID=await b64CID(text64,"NNFT");
       data="NNFT-"+TXTCID.issPUBK;
     };
   const dat=data.split(/(-)/);
   if(dat.length==3 && dat[1]=="-" /*&& dat[0]!="FILE"*/){
     document.getElementById("stellarID").value=dat[2];
     document.getElementById("NFT_ASSETS").style.display = "block";
     var RR=reqNFT(dat[0], dat[2]);
     RR.then(function(R){
      var MasterNFT="";
      if(R.length>0 && R[0].ID.length==56){
         var RM=memoNFT(dat[0], dat[2]);
         RM.then(function(M){
         LISTB+=toDefinitionList2("NFT Asset Stellar ID");
         LISTB+= toViewNFT(data,M);
         TDATA.ASN=dat[0]; TDATA.AST=dat[2]; 
         RO={};
         var RC0=offersNFT(TDATA);
         RC0.then(function(RO){
         LISTB+=toBuyNFT(TDATA,RO);
         for(i=0;i<R.length;i++){
          if(R[i].BALANCE>0){
            MasterNFT = R[i].ID;
           LIST+=toMasterNFT(R[i].ID);
        }
      }
     LIST+=toSellNFT3(data,MasterNFT);
     typeOutput.innerHTML = LISTB;
     assetsOutput.innerHTML = LIST;
          })
       })
     } else {
         typeOutput.innerHTML = "";
         assetsOutput.innerHTML = "";
         var CPA=checkPAccount(dat[2],0);
         CPA.then(function(RP){
          if(RP.passed == false && ( RP.errorMessage == 404 || RP.errorMessage == 400  ) ){
           var errN="";
           errorOutput.innerText = errN
           errorOutput.style.opacity = 1
           LISTB=toDefinitionList2("NFT Ready for StakeOut !");
           LISTB+=toStakeOutAsset(data);
           document.getElementById("NFT_ASSETS").style.display = "block";
           LIST=toDefinitionList2(data);
           typeOutput.innerHTML = LISTB;
           assetsOutput.innerHTML = LIST;
       } else {
         LISTB=toDefinitionList2("Sorry NTF Issuer is already busy !");
         LIST=toExpertIssuer(dat[2]);
         typeOutput.innerHTML = LISTB;
         assetsOutput.innerHTML = LIST;
       };
     });
    };
   });
  } else {
     document.getElementById("NFT_ASSETS").style.display = "block";
    var RC=checkNFT(data);
    RC.then(function(RA){
       typeOutput.innerHTML = LISTB;
       assetsOutput.innerHTML = LIST;
       var RL=listNFT(data,TDATA);
       RL.then(function(R){
       if(R.ASSETS.length==0){
         LISTB+=toDefinitionList2("Ordinar stellar ID");
         LIST+=toDefinitionList2("NFT Asset no present!");
     } else {
         LISTB+=toDefinitionList2("Master NFT stellar ID")
          assetsOutput.innerHTML="";
          for(j=0;j<R.ASSETS.length;j++){
           if(R.ASSETS[j].balance==="0.0000001"){
              RM=memoNFTR(R.ASSETS[j].asset_code, R.ASSETS[j].asset_issuer,R.ASSETS[j].OF);
               RM.then(function(M){
               LIST=toEXpertListAsset(M.ASN,M.AST,
                {server:"https://horizon"+CNW.Horizon+".stellar.org",memoData:"FreeDomNFT",sourceSecretKey:"",PRICE:1, ASN:M.ASN,AST:M.AST},
                M.OF, M.MEM);
               assetsOutput.innerHTML += LIST;
               });
             };
           };
          };
         LISTB+=toDefinitionList4("Account balance: "+R.XLM.balance+" XLM [EXPERT]",data);
         LISTB+=toTXID(data);
         typeOutput.innerHTML = LISTB;
         assetsOutput.innerHTML = LIST;
       });
    });
  };
};

function prcOutput(){
  function clearErrorOutput () {
    errorOutput.innerText = ''
    errorOutput.style.opacity = 0
  }
  function setOutput (output, value) {
   if(CNW.NET)window.location.hash = "t#"+value;
    else window.location.hash = value;
    try {
     const data = value.trim();
     var TDA=getTDATA(data);
     switch (TDA) {
     case 'nft':
        dataOutput(data,TDA)
        break;
     case 'txt':
        dataOutput(data,TDA)
        break;
     case 'http':
      getBase64Image(data, testD2);
        break;
     case 'pub':
       document.getElementById("stellarID").value=data;
        dataOutput(data,TDA);
        break;
     case 'sec':
          dataOutput(data,TDA)
        break;
     case 'hex':
         dataOutput(data,TDA)
        break;
    default:
    console.log('UNCNOUN TYPE!');
}
      clearErrorOutput()
      details.style.opacity = 1
    } catch (err) {
      details.style.opacity = 0
      if (!value) {
        clearErrorOutput()
      } else {
        errorOutput.innerText = err.message || err
        errorOutput.style.opacity = 1
      }
    }
  }
  if (window.location.hash !== '') {
  var LHD="";
  var UR=false;
    try {
     UR=isEncoded(window.location.hash.substr(1));
    } catch (e) {
      UR=false;
    }
   if(UR){
      LHD=decodeURIComponent(window.location.hash.substr(1));
  } else  LHD=window.location.hash.substr(1);
   if(LHD.substring(0,2) === "t#"){
     console.log("TEST NET !!!") ;
     window.CNW=CNWT;
     LHD=LHD.substring(2);
     document.getElementById('comboNW').value="TEST Network";
    } else {
         window.CNW=CNWP;
         document.getElementById('comboNW').value="PUBLIC Network";
    };
    setOutput(output, LHD);
    input.value = LHD;
  }
  input.addEventListener('keyup', (ev) => {
  if( document.getElementById("stellarID").value !== ev.target.value.trim()){
       setOutput(output, ev.target.value.trim());
  };
  })
  const masterSell = document.querySelector('#masterSell')
  const masterStake = document.querySelector('#masterStake')
  const masterTx = document.querySelector('#masterTx')
  const masterBuy = document.querySelector('#masterBuy')
  masterStake.addEventListener('keyup', (ev) => {
    setMasterStake(ev.target.value.trim())
  })

  masterSell.addEventListener('keyup', (ev) => {
    setMasterSell(ev.target.value.trim())
  })

  masterBuy.addEventListener('keyup', (ev) => {
    setMasterBuy(ev.target.value.trim())
  })

  masterTX.addEventListener('keyup', (ev) => {
    setMasterTX(ev.target.value.trim())
  })

  amountTX.addEventListener('keyup', (ev) => {
    setAmountTX(ev.target.value.trim())
  })
};

function toDefinitionList (obj) {
  const keys = Object.keys(obj)
  const html = `
    <dl class='tl ma0 pa0'>
      ${ keys.map(k => `
        <div class='pb1'>
          <dt class='dib pr2 sans-serif charcoal-muted ttu f7 tracked'>${k}:</dt>
          <dd class='dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100'>${obj[k]}</dd>
        </div>`).join('') }
    </dl>
 `
  return html
}

function toDefinitionList2 (LINE) {
  const html = "<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>"+LINE+"</dd></div></dl>";
  return html
}

function toDefinitionList3 (LINE,REF) {
  var html="";
  html +="<a href=\""+REF+"\">";
  html += "<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>"+LINE+"</dd></div></dl></a>";
  return html
}

function toDefinitionList4 (LINE,REF) {
  var html="";
  html +="<a href=\"javascript:window.open(\'https://stellar.expert/explorer/"+CNW.Stellarexpert+"/account/"+REF+"\', \'_blank\').focus();\">";
  html += "<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>"+LINE+"</dd></div></dl></a>";
  return html
}

function goREF(REF){
 document.getElementById("input-cid").value=REF;
  var TDA=getTDATA(REF);
  dataOutput(REF,TDA);
  if(CNW.NET)window.location.hash = "t#"+REF;
            else window.location.hash = REF;
  document.getElementById("stellarID").value=REF;
};

function toStakeOutAsset(REF){
  var html="<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>";
  html +="<a href=\"javascript:StakeOutNFT(\'"+REF+"\')\">";
  html += "[STAKEOUT NFT]&nbsp</a>";
  return html+"</dd></div></dl>";
}

function toExpertIssuer(REF){
  var html="<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>";
  html +="<a href=\"javascript:window.open(\'https://stellar.expert/explorer/"+CNW.Stellarexpert+"/account/"+REF+"\', \'_blank\').focus();\">";
  html +="["+REF+"-EXPERT]</a>";
  return html+"</dd></div></dl>";
};

function toSellNFT2(REF){
  var html="<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>";
  html +="<a href=\"javascript:SellNFT(\'"+REF+"\')\">";
  html += "[Sell NFT for ID]:&nbsp</a>";
  html +="<a href=\"javascript:goREF(\'"+REF+"\')\">";
  html += REF+"&nbsp</a>";
  html +="<a href=\"javascript:window.open(\'https://stellar.expert/explorer/"+CNW.Stellarexpert+"/account/"+REF+"\', \'_blank\').focus();\">";
  html +="[EXPERT]</a>";
  return html+"</dd></div></dl>";
}

function toSellNFT3(NFT,MASTERID){
  var html="<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>";
  html +="<a href=\"javascript:OfferNFT(\'"+NFT+"\',\'"+MASTERID+"\')\">";
  html += "[NFT TOOLS for ID:"+MASTERID+"]</a><br>";
  return html+"</dd></div></dl>";
}

function toMasterNFT(REF){
  var html="<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>";
  html +="<a href=\"javascript:goREF(\'"+REF+"\')\">Mastter ID NFT:&nbsp";
  html += REF+"</a>";
  html +="<a href=\"javascript:window.open(\'https://stellar.expert/explorer/"+CNW.Stellarexpert+"/account/"+REF+"\', \'_blank\').focus();\">";
  html +="[EXPERT]</a>";
  return html+"</dd></div></dl>";
}

function toSellNFT(REF){
  var html ="<a href=\"javascript:SellNFT(\'"+REF+"\')\">";
  html += "<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>[Sell NFT]&nbsp</dd></div></dl></a>";
  return html;
}

function toTXID(REF){
  var html ="<a href=\"javascript:appTX(\'"+REF+"\')\">";
  html += "<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>[Pay to ID: "+REF+"]&nbsp</dd></div></dl></a>";
  return html;
}

function toBuyNFT(DAT,OF){
 var html ="";
 if(OF.FOUND){
  var REF= encodeURIComponent(JSON.stringify({DAT:DAT,OF:OF}));
  html ="<a href=\"javascript:BuyNFT(\'"+REF+"\')\">";
  html += "<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>[Buy NFT for "+OF.ASX+" XML]&nbsp</dd></div></dl></a>";
 }
 return html;
}

function toViewNFT(REF,MEM){
  var html ="<a href=\"javascript:ViewNFT(\'"+REF+"\',\'"+MEM+"\')\">";
  html += "<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>[View NFT:"+MEM+"]&nbsp</dd></div></dl></a>";
   return html;
}

function toEXpertListAsset(CODE,REF,DAT,OF,MEM){
  var html="<dl class=\'tl ma0 pa0\'><div class=\'pb1\'><dd class=\'dib ma0 pa0 fw5 overflow-x-auto overflow-y-hidden w-100\'>";
  html +="<a href=\"javascript:ViewNFT(\'"+CODE+"-"+REF+"\',\'"+MEM+"\')\">";
  html += "[VIEW NFT:"+MEM+"]&nbsp</a><br>";
 if(OF.FOUND){
  var RBUY= encodeURIComponent(JSON.stringify({DAT:DAT,OF:OF}));
  html +="<a href=\"javascript:BuyNFT(\'"+RBUY+"\')\">";
  html += "[Buy NFT for "+OF.ASX+" XML]&nbsp</a><br>";
  }
  html +="<a href=\"javascript:goREF(\'"+CODE+"-"+REF+"\')\">";
  html += CODE+"-"+REF+"&nbsp</a>";
  html +="<a href=\"javascript:window.open(\'https://stellar.expert/explorer/"+CNW.Stellarexpert+"/asset/"+CODE+"-"+REF+"\', \'_blank\').focus();\">";
  html +="[EXPERT]</a>";
  return html+"</dd></div></dl>";
}
