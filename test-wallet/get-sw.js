

//-----------TEST STELLAR WALLET SUBROUTINE-----------------------------------------
//    MIT LICENSE
//----------------------------------------------------------------------------------


var HH="0000000000000000000000000000000000000000000000000000000000000000";
var OUTP="P"

HH  =  process.argv[2];
OUTP = process.argv[3];

var nacl = require("tweetnacl");


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

//-----------------------------------

 var SEC=getSECFromStr(HH);
 var HS = new Uint8Array(HH.length / 2);
 for (var i = 0; i < HH.length; i += 2) {
          HS[i / 2] = parseInt(HH.slice(i, i + 2), 16);
    }
 const issKeypair2 = nacl.sign.keyPair.fromSeed(HS);
 var PB1=Buffer.from(issKeypair2.publicKey).toString('hex')
 var PUB=getPUBFromStr(PB1);

if(OUTP==="P")console.log(PUB);
 else  console.log(SEC);
