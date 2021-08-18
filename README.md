  Natural Non-Fungible Tokens (NNFT).

These tokens inherit the properties of ordinary Non-fungible Tokens, but additionally have the following two properties:

1. The address of the token is uniquely determined by the object of origin of the token (for example, a text phrase).
2. The token has the property of self-determination.

The rest, standard for NFT requirements, are given, for example, in
 https://blog.litemint.com/tradable-breedable-non-fungible-tokens-now-available-on-stellar-with-litemint/ ,
below are also cited properties of common NFTs offered by Litemint https://litemint.com/ (denoted by *):

* Litemint NFT requirements:
  - Decentralized verification of NFT contract terms (i.e. on the blockchain).
  - Tradable tokens, compatible with Decentralized Exchange (DEX) and Stellar wallets.
  - Optional traits mechanism (for implementing inheritance, breeding, generation…).
  - Optional immutable meta data.

* De Facto NFT on Stellar
The Litemint implementation of non-fungible tokens is de facto—that is, regardless of whether someone knows the implementation or creation process of the NFT tokens, the non-fungibility of such tokens remains intrinsic and non repudiable.

* The Contract
A combination of atomicity constraints applied to 4 mandatory operations seals the NFT creation process to a unique transaction preventing future tampering and ensuring the asset is unique and undivided from inception.

* An NFT contract is valid IFF:
1. The issuer has ONNE signer, zero-weighted.
2. The issuer has ONNE transaction.
3. The transaction created ONNE account.
4. The transaction created the issuer account.
5. The transaction has ONNE set_options operation.
6. The transaction has ONNE payment operation from issuer.
7. The issuer payment operation amount is equal to 0.0000001 XLM (one stroop).
IFF = If and only if.
ONNE = One and only one.


  Differences between NNFT properties and simple NFTs:

1. Access to all NNFT metadata recorded in the blockchain is possible directly by the object of origin of the token.
  This property allows you to use NNFT as the basis for services like DNS or distributed databases.

2. The ability of the token owner to modify/add metadata and at the same time any user has access to the entire history of metadata changes.
  This property allows NNFT to be used as a feed base for similar forums/RSS.


 Description of the proposed NNFT implementation:

 NNFT is created as a result of unambiguous mapping of an NFT object on the Stellar blockchain according to the following algorithm:

Step 1: From the text phrase M we get an array of words (AW), while duplicate words should be removed.
Step 2: From the AW array, we get the GCS (Golomb Code Set) vector from which we get the SHA256 (MD) digest, which we, in turn, interpret as  NFT issuer address (Stellar asset issuer) and basis for obtaining IPFS CID v1 or CID v2.
Step 3: An NFT creation transaction (TC) is formed in which MD is used as the issuer address, and the address of the applicant for NNFT rights is indicated as the address of the owner of the asset.
Step 4: The TC transaction is published on the Stellar network and in case of successful registration, the applicant becomes the owner of the NNFT asset.

 NNFT operating tools.

  Inspector NNFT.

 Allows you to create NNFT, view NNFT meta information, make offers to sell NNFT on the built-in decentralized exchange of the Stellar network (SDEX), buy NNFT, use the application as a decentralized Stellar wallet.

 You can verify the correctness of the Stellar wallet in the "./test-wallet" directory (run #./get-sw.sh "pass-phrase"

 Demo online:


  https://ipfs.io/ipfs/QmRk8YoFNAPym41CH7GUaBSM9SdNrYJbwtw48iF1GqGZfS/#nnft#link-002###nnft


 Dependencies:

1. Interface design inspired by https://cid.ipfs.io/

2. The API is based on:
 2.1. js-stellar-sdk https://github.com/stellar/js-stellar-sdk
 2.2. https://github.com/stellarguard/stellar-uri (https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0007.md SEP-0007)
 2.3. https://github.com/alanshaw/ipfs-only-hash
 2.4. https://github.com/cryptocoinjs/bs58#readme
 2.5. https://github.com/speakeasyjs/base32.js

3. To preprocess the NNFT registration object, use GCS implementations:
  https://github.com/rasky/gcs

4. For packing the meta data is used:
  https://github.com/nmrugg/LZMA-JS
  https://ru.wikipedia.org/wiki/LZMA

  Building the API for the NNFT inspector:

1. #git clone https://github.com/NNFT/nnft-inspector
2. #cd ./nnft-inspector/api
3. #npm install
4. #npx webpack-cli


 License MIT.
