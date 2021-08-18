/* -------------------------------------------------------- */
/* ---------- API for Natural Non Fungible Tokens --------- */
/* ---------- MIT License  -------------------------------- */
/* -------------------------------------------------------- */


var crypto = require("crypto");
const Hash = require('ipfs-only-hash');
const StellarSdk = require('stellar-sdk');
const TransactionStellarUri = require('@stellarguard/stellar-uri').TransactionStellarUri;
const bs58 = require('bs58');
var base32 = require("base32.js");



var serverTst = new StellarSdk.Server('https://horizon-testnet.stellar.org');
var serverPub = new StellarSdk.Server('https://horizon.stellar.org');
var server = serverTst;


var CNWT={
 Horizon:"-testnet",
 NetworkPassphrase:StellarSdk.Networks.TESTNET,
 RabetNetwork:"testnet",
 Stellarexpert:"testnet",
 Exp:"testnet.",
 Mode:"Test",
 NET:true,
 server:serverTst
};

var CNWP={
 Horizon:"",
 NetworkPassphrase:StellarSdk.Networks.PUBLIC,
 RabetNetwork:"mainnet",
 Stellarexpert:"public",
 Exp:"",
 Mode:"Public",
 NET:false,
 server:serverPub
};

window.CNW={};

import { Buffer } from 'buffer/'
window.Buffer = Buffer

var TDATA={"server":"https://horizon-testnet.stellar.org",
   "sourceSecretKey":"","memoData":"",
   "limit":0,"ASN":"","AST":"","PRICE":""};

    // Return the surge pricing fee multiplier.
const getSurgePricingFee = () => {
        return (Number(StellarSdk.BASE_FEE) * 1000).toString();
    };

async function PofferNFT(DAT,FEE){
 var server = CNW.server;
 var sourceKeypair = StellarSdk.Keypair.fromSecret(DAT.sourceSecretKey);
 var NFT = new StellarSdk.Asset(DAT.ASN, DAT.AST)
 var PUBKEY=sourceKeypair.publicKey();
 var HGTN=DAT.AST.slice(1,5)+DAT.AST.substr(PUBKEY.length-8);
 var HGT = new StellarSdk.Asset(HGTN, sourceKeypair.publicKey())
 var op1 ={     selling: HGT,
                buying:  new StellarSdk.Asset.native(),
                amount: '1.0',
                price: DAT.PRICE,
                offerId:0 // for creating new offer id must be 0
              }
 var op2 ={     selling: NFT,
                buying:  HGT,
                amount: '0.0000001',
                price: '10000000',
                offerId:0 // for creating new offer id must be 0
              }
 var sourcePublicKey = sourceKeypair.publicKey();
 return server
  .loadAccount(PUBKEY)
  .then(function (receiver) {
    var transaction = new StellarSdk.TransactionBuilder(receiver, {
      fee: FEE, //100,
      networkPassphrase:CNW.NetworkPassphrase,  //StellarSdk.Networks.TESTNET,
    })
      .addOperation(StellarSdk.Operation.manageSellOffer(op1))
      .addOperation(StellarSdk.Operation.manageSellOffer(op2))
      .setTimeout(100)
      .addMemo(StellarSdk.Memo.text(DAT.memoData))
      .build();
    transaction.sign(sourceKeypair);
//    console.log(transaction.toEnvelope().toXDR('base64'));
    return server.submitTransaction(transaction);
  })
  .then(function(RPO){
     return RPO;
  })
  .catch(function (error) {
    console.error("Error!", error);
    return error;
  });
};

async function CofferNFT(DAT, OFFER, FEE){
 var server = CNW.server;
 var sourceKeypair = StellarSdk.Keypair.fromSecret(DAT.sourceSecretKey);
 var NFT = new StellarSdk.Asset(DAT.ASN, DAT.AST)
 var PUBKEY=sourceKeypair.publicKey();
 var HGTN=PUBKEY.slice(1,5)+PUBKEY.substr(PUBKEY.length-8);
 var HGT = new StellarSdk.Asset(HGTN, sourceKeypair.publicKey())
 var op1 ={
                selling: HGT,
                buying:  new StellarSdk.Asset.native(),
                amount: '0.0',
                price: DAT.PRICE,
                offerId:OFFER.ID[0] // for creating new offer id must be 0
              }
  var op2 ={
                selling: NFT,
                buying:  HGT,
                amount: '0.0',
                price: '10000000',
                offerId:OFFER.ID[1] // for creating new offer id must be 0
              }
   var sourcePublicKey = sourceKeypair.publicKey();
   return server
  .loadAccount(PUBKEY)
  .then(function (receiver) {
    var transaction = new StellarSdk.TransactionBuilder(receiver, {
      fee: FEE,  //100,
      networkPassphrase:CNW.NetworkPassphrase,  //StellarSdk.Networks.TESTNET,
    })
      .addOperation(StellarSdk.Operation.manageSellOffer(op1))
      .addOperation(StellarSdk.Operation.manageSellOffer(op2))
      .setTimeout(100)
      .addMemo(StellarSdk.Memo.text(DAT.memoData))
      .build();
    transaction.sign(sourceKeypair);
//    console.log(transaction.toEnvelope().toXDR('base64'));
    return server.submitTransaction(transaction);
  })
  .then(function(RPO){
     return RPO;
  })
  .catch(function (error) {
    console.error("Error!", error);
    return error;
  });
};

async function ppNFT(holdID,ASN,AST,SRV){
  var res2={FOUND:false,PATH:[],ASX:0}
  var res=[];
  function stp7(number) {
    return ""+number.toFixed(7);
  }
  var RT=SRV.offers()
   .forAccount(holdID).call().then(function(LB){
    var PP=[];
    var HGT=""; var HGTA=""; var HGTP=""; var HGTASN=""; var HGTAST=""; var HAT="";
    var DST=""; var DSTA=""; var DSTP=""; var DSTASN=""; var DSTAST=""; var DAT="";
    var PP=""; var SMX="";
    var BUYT=""; var SELT=""; var BUYTH=""; var SELTH="";
    var ID=[];
    for(var j=0;j<LB.records.length;j++){
     if(LB.records[j].selling.asset_code == ASN && LB.records[j].selling.asset_issuer == AST){
       HGT=LB.records[j].buying; HGTA=LB.records[j].amount; HGTP=LB.records[j].price;
       HGTASN=LB.records[j].buying.asset_code;
       HGTAST=LB.records[j].buying.asset_issuer;
       HAT=LB.records[j].buying.asset_type;
           BUYTH=LB.records[j].buying;
           SELTH=LB.records[j].selling;
           ID.push(LB.records[j].id);
     }
    }
   if(HGT != ""){
   if(HAT=="native"){
       PP=[new StellarSdk.Asset.native(),
          new StellarSdk.Asset(SELTH.asset_code,SELTH.asset_issuer)];
            res2={FOUND:true,PATH:PP,ASX: stp7(HGTA * HGTP), DAM: stp7(HGTA * 1.0), ID:ID};
      } else
    for(var j=0;j<LB.records.length;j++){
     if(LB.records[j].selling.asset_code == HGTASN && LB.records[j].selling.asset_issuer == HGTAST){
       DST=LB.records[j].buying; DSTA=LB.records[j].amount; DSTP=LB.records[j].price;
       DSTASN=LB.records[j].buying.asset_code;
       DSTAST=LB.records[j].buying.asset_issuer;
       DAT=LB.records[j].buying.asset_type;
           BUYT=LB.records[j].buying;
           SELT=LB.records[j].selling;
           ID.push(LB.records[j].id);
     }
    }
    if(DST != ""){
        PP=[new StellarSdk.Asset.native(),
          new StellarSdk.Asset(HGT.asset_code,HGT.asset_issuer),
          new StellarSdk.Asset(SELTH.asset_code,SELTH.asset_issuer)];
        res2={FOUND:true,PATH:PP,ASX: stp7(HGTA * HGTP * DSTA * DSTP), DAM: stp7(HGTA * 1.0), ID:ID };
    };
    };
    return res2;
   });
 return RT;
};


async function offersNFT(DAT){
 var res = [];
 var res2={FOUND:false,PATH:[],ASX:0}
 var CA="";
 var asset = new StellarSdk.Asset(DAT.ASN, DAT.AST);
 var server = CNW.server;
 var RT=server.accounts().forAsset(asset)
 .limit(100)
 .order("desc")
 .call().then(function(LA){
    var DATF=false; var HID="";
    var IND=0;
    for(var i=0;i<LA.records.length;i++){  //>
     if(DATF)break;
     for(var j=0;j<LA.records[i].balances.length;j++){  //>
       if( LA.records[i].balances[j].balance == "0.0000001"   && LA.records[i].balances[j].asset_code == DAT.ASN && 
           LA.records[i].balances[j].asset_issuer == DAT.AST /*&& JSON.stringify(LA.records[i].data_attr).length>5*/){IND=i;DATF=true;break;};
      };
    };
  if(DATF) HID=LA.records[IND].account_id;
    else  return res2;
   console.log("HID:"+HID)
  if(HID.length==56){
      return  ppNFT(HID,DAT.ASN,DAT.AST,server);
  } else {
    return res2;
   }
 });
 return RT;
}

async function setMetaNFT(DAT,prt,FEE){
 var NFT = new StellarSdk.Asset(DAT.ASN, DAT.AST);
 var server = CNW.server;
 var issuingKeys = StellarSdk.Keypair.fromSecret(DAT.sourceSecretKey,);
 return server
  .loadAccount(issuingKeys.publicKey())
  .then(function (issuer) {
    var transaction = new StellarSdk.TransactionBuilder(issuer, {
      fee: FEE,
      networkPassphrase:CNW.NetworkPassphrase, //StellarSdk.Networks.TESTNET,
    })
  for(var i=0; i<prt.length; i++){
    transaction=transaction.addOperation(
        StellarSdk.Operation.changeTrust({
          asset: NFT,
           limit: "922337203685.4775807",
        }),
      )
    transaction=transaction.addOperation(
            StellarSdk.Operation.manageData({
                name: prt[i][0].substring(0, 64),
                value: Buffer.from(prt[i][1].substring(0, 128), 'hex')
            })
        );
//   console.log(i+":XXXXXXXXXXXX");
   if(i>=97)break;
  };
  transaction=transaction
      .addOperation(
        StellarSdk.Operation.payment({
          destination: issuingKeys.publicKey(),
          asset: NFT,
          amount: "0.0000001",
        }),
      )
      .setTimeout(100)
      .build();
    transaction.sign(issuingKeys);
    return server.submitTransaction(transaction);
  })
  .then(function(RPO){
     return RPO;
  })
  .catch(function (error) {
    console.error("Error!", error);
    return error;
  });
};

function getPRTS(PRT){
  var DH="";
  DH+=PRT[0][1];
  for(var i=1;i<PRT.length;i++)
      DH+=Buffer.from( (PRT[i][0]+"==").substring(8, 64), 'base64').toString('hex')+PRT[i][1];
  var RDAT=Buffer.from(DH, 'hex').toString('base64');
  var DEC0= Uint8Array.from(Buffer.from(RDAT, 'base64'))  ;
  var DEC= my_lzma.decompress(DEC0);
};


async function getMetaNFT(DAT,POS,GIS){
 var ISSO=DAT.AST;
 var res = [];
 var res2=[{FOUND:false,ID:"",LIMIT:0,BALANCE:0}];
 var CA="";
 var asset = new StellarSdk.Asset(DAT.ASN, DAT.AST);
 var server = CNW.server;
 var RT=server.accounts().forAsset(asset)
 .limit(100)
 .order("desc")
 .call().then(function(LA){
    var DATF=false; var HID="";
    var IND=0;
    var PDAT="";
    for(var i=0;i<LA.records.length;i++){  //>
     if(DATF)break;
     for(var j=0;j<LA.records[i].balances.length;j++){  //>
       if( LA.records[i].balances[j].balance == "0.0000001"   && LA.records[i].balances[j].asset_code == DAT.ASN && 
           LA.records[i].balances[j].asset_issuer == DAT.AST && JSON.stringify(LA.records[i].data_attr).length>5){IND=i;DATF=true;break;};
      };
    };
  if(DATF){PDAT=LA.records[IND].data_attr;HID=LA.records[IND].account_id;}
    else    return  {IDS:"000000",DEC:{}};
    var PRT=[],TMP=[];
    var DH="";
    var id="";
    for (var key in PDAT){
      var value = PDAT[key];
      if(key.substring(0,2)==="M1" && key.charAt(8)==":" && ( ISSO===("G"+key.substring(9,64)) || GIS )  ){
       id=key.substring(2,8)
       DH=Buffer.from(value, 'base64').toString('hex');
       TMP.push({"id":id,"DB":[key,DH]});
      };
    }
   var TMP2 = TMP.slice().sort((a, b) => a.id - b.id);
   if (typeof  TMP2[TMP2.length-1-POS] === 'undefined' ||  TMP2[TMP2.length-1-POS].id === null  )
       return  {IDS:"000000",DEC:{}};
   if((TMP2.length-1-POS)<=0)POS=TMP2.length-1;
   var IDS=TMP2[TMP2.length-1-POS].id;
   var DHK="";
    PRT=[],TMP=[];
    var id="";
    TMP.push({"id":"00","DB":["",DH]});
    for (var key in PDAT){
      var value = PDAT[key];
      var id0=key.substring(0,6)
      if(id0===IDS){
       id=key.substring(7,2)
       DH=Buffer.from(value, 'base64').toString('hex');
       TMP.push({"id":id,"DB":[key,DH]});
      };
    }
    TMP2 = TMP.slice().sort((a, b) => a.id - b.id);
    DH="";
    for(var i=0;i<TMP2.length;i++)PRT.push(TMP2[i].DB);
    for(var i=0;i<PRT.length;i++)
      DH+=Buffer.from( (PRT[i][0]+"==").substring(8, 64), 'base64').toString('hex')+PRT[i][1];
    var RDAT=Buffer.from(DH, 'hex').toString('base64');
    var DEC0= Uint8Array.from(Buffer.from(RDAT, 'base64'))  ;
    var DEC= my_lzma.decompress(DEC0);
    return  {IDS:IDS,DEC:DEC};
  });
  return RT;
}

async function getMetaNFTSelf(DAT,POS,GIS){
 var ISSO=DAT.AST;
 var res = [];
 var res2=[{FOUND:false,ID:"",LIMIT:0,BALANCE:0}];
 var CA="";
 var asset = new StellarSdk.Asset(DAT.ASN, DAT.AST);
 var server = CNW.server;
 var RT=server.operations().forAccount(DAT.AST)
 .order("asc")
 .call().then(function(LA){
    var PDT="{";
    var DATF=false; var HID="";
    var PDAT="";
    for(var i=0;i<LA.records.length;i++){  //>
      console.log("LAR["+i+"]:"+JSON.stringify(LA.records[i]));
       if( LA.records[i].type === "manage_data"   && LA.records[i].source_account == DAT.AST)
        { if(DATF)PDT+=",";
          DATF=true; PDT+="\""+LA.records[i].name+"\":\""+LA.records[i].value+"\""
        };
    };
    PDT+="}";
  if(DATF){HID=LA.records[0].funder; PDAT=JSON.parse(PDT);}
    else    return  {IDS:"000000",DEC:{}};
    var PRT=[],TMP=[];
    var DH="";
    var id="";
    for (var key in PDAT){
      var value = PDAT[key];
      if(key.substring(0,2)==="M1" && key.charAt(8)==":" && ( ISSO===("G"+key.substring(9,64)) || GIS )  ){
       id=key.substring(2,8)
       DH=Buffer.from(value, 'base64').toString('hex');
       TMP.push({"id":id,"DB":[key,DH]});
      };
    }
   var TMP2 = TMP.slice().sort((a, b) => a.id - b.id);
     if (typeof  TMP2[TMP2.length-1-POS] === 'undefined' ||  TMP2[TMP2.length-1-POS].id === null  )
       return  {IDS:"000000",DEC:{}};
    if((TMP2.length-1-POS)<=0)POS=TMP2.length-1;
    var IDS=TMP2[TMP2.length-1-POS].id;
    var DHK="";
    PRT=[],TMP=[];
    var id="";
    TMP.push({"id":"00","DB":["",DH]});
    for (var key in PDAT){
      var value = PDAT[key];
      var  id0=key.substring(0,6)
      if(id0===IDS){
       id=key.substring(7,2)
       DH=Buffer.from(value, 'base64').toString('hex');
       TMP.push({"id":id,"DB":[key,DH]});
      };
    }
    TMP2 = TMP.slice().sort((a, b) => a.id - b.id);
    DH="";
    for(var i=0;i<TMP2.length;i++)PRT.push(TMP2[i].DB);
    for(var i=0;i<PRT.length;i++)
      DH+=Buffer.from( (PRT[i][0]+"==").substring(8, 64), 'base64').toString('hex')+PRT[i][1];
    var RDAT=Buffer.from(DH, 'hex').toString('base64');
    var DEC0= Uint8Array.from(Buffer.from(RDAT, 'base64'))  ;
    var DEC= my_lzma.decompress(DEC0);
    return  {IDS:IDS,DEC:DEC};
  });
  return RT;
}



//----------------------------------

async function pprNFT(OFFER,DAT, FEE){
 var server = CNW.server;
 var sourceKeypair = StellarSdk.Keypair.fromSecret(DAT.sourceSecretKey);
 var PP=[];
 for(var i=0;i<OFFER.PATH.length; i++)
   if(OFFER.PATH[i].code == "XLM")PP.push(new StellarSdk.Asset.native())
   else PP.push(new StellarSdk.Asset(OFFER.PATH[i].code, OFFER.PATH[i].issuer));
 var NFT =PP[PP.length-1]
 var op ={
  sendAsset: PP[0],//Asset asset to pay with
  sendMax: ""+(parseFloat(OFFER.ASX)*1.015).toFixed(7),  //string maximum amount of sendAsset to send
  destination: sourceKeypair.publicKey(), //string destination account to send to
  destAsset: PP[PP.length-1],//Asset asset the destination will receive
  destAmount: OFFER.DAM,//string amount the destination receives
  path: PP, //Array.<Asset> array of Asset objects to use as the path
  }
 var sourcePublicKey = sourceKeypair.publicKey();
 return server
  .loadAccount(sourceKeypair.publicKey())
  .then(function (receiver) {
  var transaction = new StellarSdk.TransactionBuilder(receiver, {
      fee: FEE,
      networkPassphrase: CNW.NetworkPassphrase,
  })
   .addOperation(
        StellarSdk.Operation.changeTrust({
          asset: NFT,
           limit: "922337203685.4775807",
        }),
      )
      .addOperation(StellarSdk.Operation.pathPaymentStrictReceive(op))
      .setTimeout(100)
      .addMemo(StellarSdk.Memo.text(DAT.memoData))
      .build();
    transaction.sign(sourceKeypair);
//    console.log(transaction.toEnvelope().toXDR('base64'));
    return server.submitTransaction(transaction);
  })
  .then(function(RPO){
     return RPO;
  })
  .catch(function (error) {
    console.error("Error!", error);
    return error;
  });
};

async function retrustNFT(NFTS,DAT, FEE){
 var receivingKeys = StellarSdk.Keypair.fromSecret(DAT.sourceSecretKey);
 var server = CNW.server;
  return server
  .loadAccount(receivingKeys.publicKey())
  .then(function (receiver) {
    var transaction = new StellarSdk.TransactionBuilder(receiver, {
      fee: FEE,
      networkPassphrase: CNW.NetworkPassphrase,
    });
    for(var j=0;j<NFTS.length;j++){
    transaction=transaction
      .addOperation(
        StellarSdk.Operation.changeTrust({
          asset: NFTS[j],
          limit: "0"
        }),
      )
    };
  transaction=transaction
      .setTimeout(100)
      .addMemo(StellarSdk.Memo.text(DAT.memoData))
      .build();
    transaction.sign(receivingKeys);
    return server.submitTransaction(transaction);
  })
  .then(function(RPO){
     return RPO;
  })
  .catch(function (error) {
    console.error("Error!", error);
    return error;
  });
};

async function clearNFT(DAT){
 var res=[];
 var holdID = StellarSdk.Keypair.fromSecret(DAT.sourceSecretKey).publicKey();
 var server = CNW.server;
 var RT=server.accounts().accountId(holdID)
  .limit(100)
  .call().then(function(LB){
     for(var j=0;j<LB.balances.length;j++){
        if(LB.balances[j].balance == "0.0000000") res.push(new StellarSdk.Asset(LB.balances[j].asset_code,LB.balances[j].asset_issuer));
     };
    return res;
   });
 return RT;
};

function getLine(str,N)
{
    var res = [];
    res.push("M"+("00"+N).slice(-3)+Buffer.from(str.substring(0, 90), 'hex').toString('base64').substring(0,60));
    str = str.substring(90);
    res.push(str.substring(0, 128));
   return res;
};


function getParts(str)
{
    const len=218;
    var N=0;
    var res = [];
      while (str.length) {
        res.push(getLine(str.substring(0, len),N));
        str = str.substring(len);
        N++;
    }
    return res;
}


function getLineLL(str,M,N,LL)
{
    var res = [];
   if(N==0)res.push(LL)
    else {
       res.push( (("00000"+M).slice(-6)+("0"+N).slice(-2)+Buffer.from(str.substring(0, 84), 'hex').toString('base64')));
       str = str.substring(84);
       };
    res.push(str.substring(0, 128));
   return res;
};


function getPartsLL(str,M,LL)
{
    const len=212;
    var N=0;
    var res = [];
      res.push(getLineLL(str.substring(0, 128),M,N,LL));
      str = str.substring(128);
      N++;
      while (str.length) {
        res.push(getLineLL(str.substring(0, len),M,N,LL));
        str = str.substring(len);
        N++;
    }
    return res;
}


function getParts64(PRT)
{
  var DH="";
  for(var i=0;i<PRT.length;i++){
    DH+=Buffer.from( (PRT[i][0]+"==").substring(4, 64), 'base64').toString('hex')+PRT[i][1];
  };
 var DB64=Buffer.from(DH, 'hex').toString('base64');
 return DB64;
};


function getCostNFTF(PRT,FF,DATF)
{
 var F=parseFloat((parseFloat(FF)*0.0000001).toFixed(7));
 var  C=(1.0+2*F).toFixed(7);
 if (typeof PRT.length !== 'undefined'){
    if(DATF){
     var A=1.0+2*F+PRT.length*(0.5+F);
     if(A.toFixed(7)<A) A+=0.0000001
     C=A.toFixed(7);
   };
  }
 return C;
}



function testM(META){
 var DAT=JSON.stringify(META);
 var RR = my_lzma.compress(DAT, 1);  //mode 1-9
 RRH=Buffer.from(RR).toString('hex');;
 var PRT=getParts(RRH);
 putParts(PRT);
 var DEC0= Uint8Array.from(Buffer.from(getParts64(PRT), 'base64'))  ;
 var DEC= my_lzma.decompress(DEC0);
}

//-------------------------------------------------------
//------------- THE CREATE NFT  -------------------------
//-------------------------------------------------------


const getIpfsHashFromBytes32 = (bytes64) => {
  // Add our default ipfs values for first 2 bytes:
  // function:0x12=sha2, size:0x20=256 bits
  const  buff = Buffer.from(bytes64, 'base64');
  const hashHex = "1220" + buff.toString('hex');
  const hashBytes = Buffer.from(hashHex, 'hex');
  const hashStr = bs58.encode(hashBytes);
  return hashStr;
}

const getHexFromIpfsHash = (ipfsHash) => {
 const hex = bs58.decode(ipfsHash).toString('hex').slice(4);
 return hex;
}

const getBinFromIpfsHash = (ipfsHash) => {
 const hex = bs58.decode(ipfsHash).slice(2);
 return hex;
}

const SLS32=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','2','3','4','5','6','7'];
const  poly=0x1021;
function crc16s(addr, num, crc)
{
 var i,j=0;
 for (; num>0; num--)             /* Step through bytes in memory */
  {
  crc = crc ^ (addr[j++] << 8);      /* Fetch byte from memory, XOR into CRC top byte*/
  for (i=0; i<8; i++)              /* Prepare to rotate 8 bits */
    {
    crc = crc << 1;                /* rotate */
    if (crc & 0x10000)             /* bit 15 was set (now bit 16)... */
      crc = (crc ^ poly) & 0xFFFF; /* XOR with XMODEM polynomic */
                                   /* and ensure CRC remains 16-bit value */
    }                              /* Loop for 8 bits */
  }                                /* Loop until num=0 */
  return(crc);                     /* Return updated CRC */
}

function base32_encode(data) {
  if (data.length < 0 || data.length > (1 << 28)) {
    return 0;
  }
  var count = 0;
  var result="";
  if (data.length > 0) {
    var buffer = data[0];
    var next = 1;
    var bitsLeft = 8;
    while (bitsLeft > 0 || next < data.length) {
      if (bitsLeft < 5) {
        if (next < data.length) {
          buffer <<= 8;
          buffer |= data[next++] & 0xFF;
          bitsLeft += 8;
        } else {
          var pad = 5 - bitsLeft;
          buffer <<= pad;
          bitsLeft += pad;
        }
      }
      var index = 0x1F & (buffer >> (bitsLeft - 5));
      bitsLeft -= 5;
      result=result+SLS32[index];count++;
    }
  }
  return result;
}

function  base32_decode(encoded) {
       var decoder = new base32.Decoder({ type: "rfc4648", lc: true});
        return decoder.write(encoded).finalize();

}

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

function getPUBFromStr(bytes64){
  const  buff = Buffer.from(bytes64, 'hex');
  var hashHex = "30" + buff.toString('hex');  //+"0000";
  var hashBytes = Buffer.from(hashHex, 'hex');
  var crc = 0 ;
  crc = crc16s(hashBytes, 33, crc);
  crc = ((crc & 0xFF) << 8)|((crc >> 8) & 0xFF);
  var PCRC=zeroPad(crc.toString(16), 4);
  hashHex = "30" + buff.toString('hex')+ PCRC ;
  hashBytes = Buffer.from(hashHex, 'hex');
  const hashStr = base32_encode(hashBytes);
  return hashStr;
}


function getSECFromStr(bytes64){
  const  buff = Buffer.from(bytes64, 'hex');
  var hashHex = "90" + buff.toString('hex');  //+"0000";
  var hashBytes = Buffer.from(hashHex, 'hex');
  var crc = 0 ;
  crc = crc16s(hashBytes, 33, crc);
  crc = ((crc & 0xFF) << 8)|((crc >> 8) & 0xFF);
  var PCRC=zeroPad(crc.toString(16), 4);
  hashHex = "90" + buff.toString('hex')+ PCRC ;
  hashBytes = Buffer.from(hashHex, 'hex');
  const hashStr = base32_encode(hashBytes);
  return hashStr;
}


function getHashFromSEC(PRK){
  var decoder = new base32.Decoder({ type: "rfc4648", lc: true});
  var bsec = decoder.write(PRK).finalize();
  const hsec=bsec.toString('hex');
  var hashBytes = Buffer.from(hsec.substring(0,66), 'hex');
  var crc = 0 ;
  crc = crc16s(hashBytes, 33, crc);
  crc = ((crc & 0xFF) << 8)|((crc >> 8) & 0xFF);
  var PCRC=zeroPad(crc.toString(16), 4);
   if(PCRC == hsec.substring(2).substring(64))
     return hsec.substring(2).substring(0,64)
   else return "";
}

function format(data) {
  return new Buffer.from(data);
}

// (Uint8Array | Buffer | String) -> Promise HexString
function nanoSha256 (data, encoding) {
  return Promise.resolve("" +
    crypto.createHash("sha256")
      .update(format(data), encoding)
      .digest()
      .toString("hex"));
}

// (Uint8Array | String) -> String
function bytesToString(bytes) {
      if (typeof bytes === "string") {
        return bytes;
      } else {
        var str = "";
        for (var i = 0; i < bytes.length; ++i) {
          str += String.fromCharCode(bytes[i]);
        }
        return str;
      }
}

// String -> Uint8Array
function stringToBytes(string) {
      var bytes = new Uint8Array(string.length);
      for (var i = 0; i < string.length; ++i) {
        bytes[i] = string.charCodeAt(i);
      }
      return bytes;
}

// Uint8Array -> String
var toBase58 = (function() {
    var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    return function(buffer) {
        if (buffer.length === 0) {
          return "";
        }
        var digits = [0];
        var i = 0;
        while (i < buffer.length) {
          var j = 0;
          var carry = 0;
          while (j < digits.length) {
            digits[j] <<= 8;
            j++;
          }
          digits[0] += buffer[i];
          j = 0;
          while (j < digits.length) {
            digits[j] += carry;
            carry = (digits[j] / 58) | 0;
            digits[j] %= 58;
            ++j;
          }
          while (carry) {
            digits.push(carry % 58);
            carry = (carry / 58) | 0;
          }
          i++;
        }
        i = 0;
        while (buffer[i] === 0 && i < buffer.length - 1) {
          digits.push(0);
          i++;
        }
        return digits.reverse().map(function(digit) {
          return ALPHABET[digit];
        }).join("");
      };
})();

// HexString -> Promise CID
function cid1(bytes) {
      return nanoSha256(bytes).then(function(hash) { 
        var hex = "01551220" + hash;
        var bytes = new Uint8Array(hex.length / 2);
        for (var i = 0; i < hex.length; i += 2) {
          bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
        }
        return "z" + toBase58(bytes);
      });
}

function cid2(bytes) {
      return nanoSha256(bytes).then(function(hash) { 
        var hex = "01551220" + hash;

        var bytes = new Uint8Array(hex.length / 2);
        for (var i = 0; i < hex.length; i += 2) {
          bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
        }
       var encoder = new base32.Encoder({ type: "rfc4648", lc: true });
        return "b" + encoder.write(bytes).finalize();;
      });
}

const NFTIDSZ={"MIME":undefined,"issHASH":undefined,"issCID2":undefined,"issCID1":undefined,"issCID0":undefined,"issPRK":undefined,"issPUBK":undefined};
var NFTIDS={};

function PUB2CID(issPUBK,IDS){
  IDS.issPUBK=issPUBK;
  return IDS;
};

function HASH2CID(issHASH,IDS){
  var hex = "01551220" + issHASH;
  var bytes = new Uint8Array(hex.length / 2);
  for (var i = 0; i < hex.length; i += 2) {
          bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
    }
  const issCID1 = "z" + toBase58(bytes);
  var encoder = new base32.Encoder({ type: "rfc4648", lc: true });
  hex = "01551220" + issHASH;
  bytes = new Uint8Array(hex.length / 2);
        for (var i = 0; i < hex.length; i += 2) {
          bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
        }
 const issCID2 =  "b" + encoder.write(bytes).finalize();
 const issPRK=getSECFromStr(issHASH);
 const issKeypair = StellarSdk.Keypair.fromSecret(issPRK);
 const issPUBK = issKeypair.publicKey();
 IDS.issHASH=issHASH;
 IDS.issCID1=issCID1;
 IDS.issCID2=issCID2;
 IDS.issPRK=issPRK;
 return PUB2CID(issPUBK,IDS)
};


function SEC2CID(issPRK,IDS){
 IDS.issHASH=getHashFromSEC(issPRK);
 return HASH2CID(IDS.issHASH,IDS)
};


async function b64CID(msg,MIME){
 const data=Buffer.from(msg,"base64");
 const issCID0 = await Hash.of(data);
 const issHASH = await nanoSha256(data);
  var hex = "01551220" + issHASH;
  var bytes = new Uint8Array(hex.length / 2);
  for (var i = 0; i < hex.length; i += 2) {
          bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
    }
  const issCID1 = "z" + toBase58(bytes);
  var encoder = new base32.Encoder({ type: "rfc4648", lc: true });
  hex = "01551220" + issHASH;
  bytes = new Uint8Array(hex.length / 2);
  for (var i = 0; i < hex.length; i += 2) {
          bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
        }
  const issCID2 =  "b" + encoder.write(bytes).finalize();
  const issPRK=getSECFromStr(issHASH);
  const issKeypair = StellarSdk.Keypair.fromSecret(issPRK);
  const issPUBK = issKeypair.publicKey();
 return {"MIME":MIME,"issHASH":issHASH,"issCID2":issCID2,"issCID1":issCID1,"issCID0":issCID0,"issPRK":issPRK,"issPUBK":issPUBK};
};


async function b64CIDt(msg,MIME,t){
 const data1=Buffer.from(msg,"base64");
 const data2=Buffer.from(t,"hex");
 var arr = [data1, data2];
 var data = Buffer.concat(arr);
 const issCID0 = await Hash.of(data);
 const issHASH = await nanoSha256(data);
 var hex = "01551220" + issHASH;
 var bytes = new Uint8Array(hex.length / 2);
 for (var i = 0; i < hex.length; i += 2) {
          bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
    }
 const issCID1 = "z" + toBase58(bytes);
 var encoder = new base32.Encoder({ type: "rfc4648", lc: true });
 hex = "01551220" + issHASH;
 bytes = new Uint8Array(hex.length / 2);
 for (var i = 0; i < hex.length; i += 2) {
          bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
        }
 const issCID2 =  "b" + encoder.write(bytes).finalize();
 const issPRK=getSECFromStr(issHASH);
 const issKeypair = StellarSdk.Keypair.fromSecret(issPRK);
 const issPUBK = issKeypair.publicKey();
 return {"MIME":MIME,"issHASH":issHASH,"issCID2":issCID2,"issCID1":issCID1,"issCID0":issCID0,"issPRK":issPRK,"issPUBK":issPUBK};
};


async function textCID(msg,MIME){
 var msg2=Buffer.from(msg).toString('base64');
 return b64CID(msg2,MIME)
};

const checkSAccount = async (sourceSecretKey, COST) => {
    let passed = true;
    let errorMessage = '';
    const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    const publicKey = sourceKeypair.publicKey();
    try{
        var server = CNW.server;
        const account=await server.loadAccount(publicKey);
        const stellarBalance = account.balances.find(balance => balance.asset_type == 'native')
        if(stellarBalance.balance<(parseFloat(COST)+1)){
            passed=false;
            errorMessage="Insufficient account balance"
        }
    } catch (error){
        passed=false;
        console.log(error);
          errorMessage = error.response.status;
    }
    console.log({passed, errorMessage})
    return {passed, errorMessage}
}

const checkPAccount = async (publicKey,COST) => {
    let passed = true;
    let errorMessage = '';
    try{
        var server = CNW.server;
        const account=await server.loadAccount(publicKey);
        const stellarBalance = account.balances.find(balance => balance.asset_type == 'native')
        if(stellarBalance.balance<(COST+1)){
            passed=false;
            errorMessage="Insufficient account balance"
        }
    } catch (error){
        passed=false;
        console.log(error);
          errorMessage = error.response.status;
    }
//    console.log({passed, errorMessage})
    return {passed, errorMessage}
}

//---------------------------------------------------------

const createIssuerAccount = async (cost, creatorPublicId, ISEC, name, MEMO, quantity, fee) => {
    try {
     const issuerAccount = StellarSdk.Keypair.fromSecret(ISEC);
     var server = CNW.server;
     const payingAccount = await server.loadAccount(creatorPublicId);
     const SCOST=""+cost;
     const NFTAsset = new StellarSdk.Asset(name, issuerAccount.publicKey())
     const amount = quantity * 0.0000001
     const networkPassphrase = CNW.NetworkPassphrase;
     const transaction = new StellarSdk.TransactionBuilder(payingAccount, { fee, networkPassphrase })
        .addOperation(
                StellarSdk.Operation.createAccount({
                    destination: issuerAccount.publicKey(),
                    startingBalance: SCOST
                })
            )
            .addOperation(
                StellarSdk.Operation.changeTrust({
                    asset: NFTAsset,
                    limit: amount.toString(),
                })
            )
            .setTimeout(300)
            .addMemo(StellarSdk.Memo.text(MEMO))
            .build();
        const uri = TransactionStellarUri.forTransaction(transaction);
        return {
            uri: uri.toString(),
            transaction,
            NFTAsset,
            issuerPrivateKey: issuerAccount.secret(),
            issuerPublicKey: issuerAccount.publicKey()
        }
    } catch (err) {
        console.log(err)
        return err
    }
};

const createNFTFromPrivateKey = async (issuerPrivateKey, creatorPrivateKey, transaction, NFTAsset, keys,  prt, quantity, DATAS, fee) => {
    var server = CNW.server;
    const creatorKeypair = StellarSdk.Keypair.fromSecret(creatorPrivateKey);
    transaction.sign(creatorKeypair)
    const transactionOutput = await server.submitTransaction(transaction, {skipMemoRequiredCheck: true});
    const sendNFTOutput = await sendNFTipfs(issuerPrivateKey, creatorKeypair.publicKey(), server, NFTAsset, prt, quantity, DATAS, fee)
    return {
        ipfsHash: keys.issHASH,
        ...sendNFTOutput
    }
};

const sendNFTipfs = async (issuerPrivateKey, creatorPublicKey, server, NFTAsset, prt, quantity, DATAS, fee) => {
 const issuerKeypair = StellarSdk.Keypair.fromSecret(issuerPrivateKey);
 const payingAccount = await server.loadAccount(issuerKeypair.publicKey())
 const amount = quantity * 0.0000001
 const networkPassphrase = CNW.NetworkPassphrase; // StellarSdk.Networks.TESTNET
 var transaction = new StellarSdk.TransactionBuilder(payingAccount, { fee, networkPassphrase });
 if( DATAS){
  for(var i=0; i<prt.length; i++){

    transaction=transaction.addOperation(
            StellarSdk.Operation.manageData({
                name: prt[i][0].substring(0, 64),
                value: Buffer.from(prt[i][1].substring(0, 128), 'hex')
            })
        );
   if(i>=97)break;
    };
   };// END DATA STORE
   transaction=transaction.addOperation(
            StellarSdk.Operation.payment({
                destination: creatorPublicKey,
                asset: NFTAsset,
                amount: amount.toString(),
            })
        )
        .addOperation(
            StellarSdk.Operation.setOptions({
                masterWeight: 0
            })
        )
        .setTimeout(60)
        .build();
    transaction.sign(issuerKeypair);
    const transactionOutput = await server.submitTransaction(transaction, {skipMemoRequiredCheck: true});
    return transactionOutput
}

const TokenStakeOff = async (SEC, keys, prt, MEMO,  quantity, DATAS, FF) => {
 const NFTName=keys.MIME;
 var creatorPrivateKey=SEC;
 var HexIpfsHash=keys.issHASH;
 var issuerPrivateKey=getSECFromStr(HexIpfsHash);
 const costNFT=getCostNFTF(prt,FF,DATAS);
 var FEE=parseInt(FF);
 var RTS=checkSAccount(SEC,costNFT).then(function(result) {
    // you can access the result from the promise here
 if(result.passed){
     var ISK=checkSAccount(issuerPrivateKey,0).then(function(result2) {
     if(result2.passed) console.log("=== TOKEN BUSY");
        else if(result2.errorMessage == 404){
    const crKeypair = StellarSdk.Keypair.fromSecret(SEC);
    const creatorPublicId = crKeypair.publicKey();
    var IACC=createIssuerAccount(costNFT, creatorPublicId, issuerPrivateKey, NFTName, MEMO, 1, FEE).then(function(result3) {
         var  CFNT=createNFTFromPrivateKey(result3.issuerPrivateKey, creatorPrivateKey, result3.transaction, result3.NFTAsset, keys, prt, quantity, DATAS, FEE).then(function(result4) {
             return result;
           });
           return CFNT;
          });
         return IACC;
         } else { return {};};
      });
     return ISK;
   } else { return {};};
 });
 return RTS ;
};


async function makeTX(SEC,receiverPublicKey,AMOUNT, fee) {
  const sourceKeypair = StellarSdk.Keypair.fromSecret(SEC);
  const sourcePublicKey = sourceKeypair.publicKey();
  var server = CNW.server;
  const account = await server.loadAccount(sourcePublicKey);
  const transaction = new StellarSdk.TransactionBuilder(account, {
      fee,
      networkPassphrase: CNW.NetworkPassphrase
    })
    .addOperation(StellarSdk.Operation.payment({
      destination: receiverPublicKey,
      asset: StellarSdk.Asset.native(),
        amount: ""+AMOUNT,
    }))
    .setTimeout(30)
    .build();
  // Sign this transaction with the secret key
  // NOTE: signing is transaction is network specific. Test network transactions
  // won't work in the public network. To switch networks, use the Network object
  // as explained above (look for StellarSdk.Network).
   transaction.sign(sourceKeypair);
  // Let's see the XDR (encoded in base64) of the transaction we just built
  console.log(transaction.toEnvelope().toXDR('base64'));
  // Submit the transaction to the Horizon server. The Horizon server will then
  // submit the transaction into the network for us.
  try {
    const transactionResult = await server.submitTransaction(transaction);
    return {RES:'\nSuccess!',LNK:transactionResult._links.transaction.href,ERR:""};
  } catch (e) {
    console.log('An error has occured:');
    console.log(e);
    return {RES:'\nAn error',LNK:'',ERR:e};
  }
};


async function makeACCTX(SEC,receiverPublicKey,AMOUNT,fee) {
  const sourceKeypair = StellarSdk.Keypair.fromSecret(SEC);
  const sourcePublicKey = sourceKeypair.publicKey();
  var server = CNW.server;
  const account = await server.loadAccount(sourcePublicKey);
  // Right now, there's one function that fetches the base fee.
  // In the future, we'll have functions that are smarter about suggesting fees,
  // e.g.: `fetchCheapFee`, `fetchAverageFee`, `fetchPriorityFee`, etc.
//  const fee = await server.fetchBaseFee();
  const transaction = new StellarSdk.TransactionBuilder(account, {
      fee,
      // Uncomment the following line to build transactions for the live network. Be
      // sure to also change the horizon hostname.
      // networkPassphrase: StellarSdk.Networks.PUBLIC,
      networkPassphrase: CNW.NetworkPassphrase
    })
    // Add a payment operation to the transaction
    .addOperation(StellarSdk.Operation.createAccount({
      destination: receiverPublicKey,
      // The term native asset refers to lumens
      asset: StellarSdk.Asset.native(),
      // Specify 350.1234567 lumens. Lumens are divisible to seven digits past
      // the decimal. They are represented in JS Stellar SDK in string format
      // to avoid errors from the use of the JavaScript Number data structure.
       startingBalance: ""+AMOUNT,
    }))
    // Make this transaction valid for the next 30 seconds only
    .setTimeout(30)
    // Uncomment to add a memo (https://www.stellar.org/developers/learn/concepts/transactions.html)
    .build();
  // Sign this transaction with the secret key
  // NOTE: signing is transaction is network specific. Test network transactions
  // won't work in the public network. To switch networks, use the Network object
  // as explained above (look for StellarSdk.Network).
  transaction.sign(sourceKeypair);
  // Let's see the XDR (encoded in base64) of the transaction we just built
  console.log(transaction.toEnvelope().toXDR('base64'));
  // Submit the transaction to the Horizon server. The Horizon server will then
  // submit the transaction into the network for us.
  try {
    const transactionResult = await server.submitTransaction(transaction);
    return {RES:'\nSuccess!',LNK:transactionResult._links.transaction.href,ERR:""};
  } catch (e) {
    console.log('An error has occured:');
    console.log(e);
    return {RES:'\nAn error',LNK:'',ERR:e};
  }
};

async function MasterKey(sec){
 var masterPRK="";
  if(sec[0]=="S" && getHashFromSEC(sec).length==64){
  masterPRK=sec;
 } else {
  var dt;
  const data=Buffer.from(sec);
  var masterHASH = await nanoSha256(data);
  for(var i=1;i<=50;i++){
    dt=Buffer.from(masterHASH,"hex");
    masterHASH = await nanoSha256(dt);
  };
  masterPRK=getSECFromStr(masterHASH);
  };
 const masterKeypair = StellarSdk.Keypair.fromSecret(masterPRK);
 const masterPUBK = masterKeypair.publicKey();
 return {"masterPRK":masterPRK,"masterPUBK":masterPUBK};
};

function  getPubKey(PRK){
 return StellarSdk.Keypair.fromSecret(PRK).publicKey();
};

async function checkNFT(Nid){
 var res = [];
 var server = CNW.server;
 var RT = server
  .effects()
  .forAccount(Nid)
  .limit(100)
  .call().then(function(LB){ 
  for(var j=0;j<LB.records.length;j++){
    if(LB.records[j].type=="account_debited" && LB.records[j].asset_type=="credit_alphanum12"){
      res.push({"asset_code":LB.records[j].asset_code,"asset_issuer":LB.records[j].asset_issuer,"amount":LB.records[j].amount})
   };
  };
   return res
  });
 return RT;
};

async function reqNFT(ASN,AST){
 var res = [];
 var CA="";
 var asset = new StellarSdk.Asset(ASN, AST);
 var server = CNW.server;
 var RT=server.accounts().forAsset(asset)
 .limit(100)
 .call().then(function(LA){
   for(var i=0;i<LA.records.length;i++){
    CA=LA.records[i].id;
    for(var j=0;j<LA.records[i].balances.length;j++){
     if((LA.records[i].balances[j].asset_code==ASN)&&(LA.records[i].balances[j].asset_issuer==AST) ){
         res.push({ID:CA,LIMIT:LA.records[i].balances[j].limit,BALANCE:LA.records[i].balances[j].balance});
     };
    };
   };
   return res;
 });
 return RT;
}

async function ppNFTA(holdID,NFTA,SRV){
  var res2={FOUND:false,PATH:[],ASX:0}
  var res=[];
  var OF=[];
  var AST=""; var ASN="";
  function stp7(number) {
    return ""+number.toFixed(7);
  }
  var RT=SRV.offers()
   .forAccount(holdID).call().then(function(LB){
  for(var ii=0;ii<NFTA.ASSETS.length;ii++){
    res=[];
    res2={FOUND:false,PATH:[],ASX:0};
    ASN=NFTA.ASSETS[ii].asset_code;
    AST=NFTA.ASSETS[ii].asset_issuer;
    var PP=[];
    var HGT=""; var HGTA=""; var HGTP=""; var HGTASN=""; var HGTAST=""; var HAT="";
    var DST=""; var DSTA=""; var DSTP=""; var DSTASN=""; var DSTAST=""; var DAT="";
    var PP=""; var SMX="";
    var BUYT=""; var SELT=""; var BUYTH=""; var SELTH="";
    var ID=[];
    for(var j=0;j<LB.records.length;j++){
     if(LB.records[j].selling.asset_code == ASN && LB.records[j].selling.asset_issuer == AST){
       HGT=LB.records[j].buying; HGTA=LB.records[j].amount; HGTP=LB.records[j].price;
       HGTASN=LB.records[j].buying.asset_code;
       HGTAST=LB.records[j].buying.asset_issuer;
       HAT=LB.records[j].buying.asset_type;
           BUYTH=LB.records[j].buying;
           SELTH=LB.records[j].selling;
           ID.push(LB.records[j].id);
     }
    }
   if(HGT != ""){
   if(HAT=="native"){
       PP=[new StellarSdk.Asset.native(),
          new StellarSdk.Asset(SELTH.asset_code,SELTH.asset_issuer)];
            res2={FOUND:true,PATH:PP,ASX: stp7(HGTA * HGTP), DAM: stp7(HGTA * 1.0), ID:ID};
      } else
    for(var j=0;j<LB.records.length;j++){
     if(LB.records[j].selling.asset_code == HGTASN && LB.records[j].selling.asset_issuer == HGTAST){
       DST=LB.records[j].buying; DSTA=LB.records[j].amount; DSTP=LB.records[j].price;
       DSTASN=LB.records[j].buying.asset_code;
       DSTAST=LB.records[j].buying.asset_issuer;
       DAT=LB.records[j].buying.asset_type;
           BUYT=LB.records[j].buying;
           SELT=LB.records[j].selling;
           ID.push(LB.records[j].id);
     }
    }
    if(DST != ""){
        PP=[new StellarSdk.Asset.native(),
          new StellarSdk.Asset(HGT.asset_code,HGT.asset_issuer),
          new StellarSdk.Asset(SELTH.asset_code,SELTH.asset_issuer)];
        res2={FOUND:true,PATH:PP,ASX: stp7(HGTA * HGTP * DSTA * DSTP), DAM: stp7(HGTA * 1.0), ID:ID };
      };
    };
      NFTA.ASSETS[ii]["OF"]=res2;
     };
     return NFTA;
   });
 return RT;
};

async function listNFT(Nid,DAT){
 var res = [];
 var server = CNW.server;
 var XLM={};
 var RT=server.accounts().accountId(Nid)
  .limit(100)
  .call().then(function(LB){ 
  for(var j=0;j<LB.balances.length;j++){
   if(LB.balances[j].asset_type != "native"){
     res.push({"asset_code":LB.balances[j].asset_code,"asset_issuer":LB.balances[j].asset_issuer,"balance":LB.balances[j].balance})
    } else {
      XLM={"asset_code":"XLM","asset_issuer":"Stellar-lumens","balance":LB.balances[j].balance};
    };
   };
    return ppNFTA(Nid,{ASSETS:res,XLM,XLM},server);
  });
 return RT;
};

function memoNFT(ASN,AST){
 var server = CNW.server;
 var RT=server.transactions().forAccount(AST)
 .order("asc")
 .limit(1)
 .call().then(function(LA){
  return LA.records[0].memo
 });
 return RT;
}

function memoNFTR(ASN,AST,OF){
 var server = CNW.server;
 var RT=server.transactions().forAccount(AST)
 .order("asc")
 .limit(1)
 .call().then(function(LA){
  return {MEM:LA.records[0].memo,ASN:ASN,AST:AST,OF:OF};
 });
 return RT;
}



function DataConvert(ASN,DAT){
 var PRT=[],TMP=[];
 var DH="";
     var id="";
 for (var key in DAT){
    var value = DAT[key];
    id=key.substring(0,2)
    DH=Buffer.from(value, 'base64').toString('hex');
    TMP.push({"id":id,"DB":[key,DH]});
  }
 var TMP2 = TMP.slice().sort((a, b) => a.id - b.id);
 for(var i=0;i<TMP2.length;i++)PRT.push(TMP2[i].DB);
 for(var i=0;i<PRT.length;i++)
    DH+=Buffer.from( (PRT[i][0]+"==").substring(2, 64), 'base64').toString('hex')+PRT[i][1];
  return {ASN:ASN, DATA:Buffer.from(DH, 'hex').toString('base64')};
}

function dataNFT(ASN,AST){
 var server = CNW.server;
 var RT=server.accounts().accountId(AST)
 .limit(100)
 .call().then(function(LA){
  return DataConvert(ASN,LA.data_attr);
 });
 return RT;
}

//------------- THE END POINTS ----------------------------

window.CNWT=CNWT;
window.CNWP=CNWP;
window.serverTst=serverTst;
window.serverPub=serverPub;
window.server=server;

window.MasterKey=MasterKey;
window.server=server;
window.makeACCTX=makeACCTX;
window.makeTX=makeTX;
window.getPubKey=getPubKey;

window.textCID=textCID;
window.b64CID=b64CID;
window.PUB2CID=PUB2CID;
window.SEC2CID=SEC2CID;
window.HASH2CID=HASH2CID;
window.NFTIDSZ=NFTIDSZ;

window.checkPAccount=checkPAccount;
window.getCostNFTF=getCostNFTF;
window.TokenStakeOff=TokenStakeOff;

window.memoNFT=memoNFT;
window.memoNFTR=memoNFTR;
window.reqNFT=reqNFT;
window.listNFT=listNFT;
window.checkNFT=checkNFT;
window.dataNFT=dataNFT;

window.CofferNFT=CofferNFT;
window.PofferNFT=PofferNFT;
window.offersNFT=offersNFT;
window.clearNFT=clearNFT;
window.retrustNFT=retrustNFT;
window.pprNFT=pprNFT;
window.getMetaNFT=getMetaNFT;
window.getMetaNFTSelf=getMetaNFTSelf;
window.getParts=getParts;
window.getPartsLL=getPartsLL;
window.setMetaNFT=setMetaNFT;
window.getSurgePricingFee=getSurgePricingFee;
