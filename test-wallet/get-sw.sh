#!/bin/bash

mem="$1"

FSK=$(echo -n "$mem" | sha256sum | cut -f1 -d' ' )
for (( i=0;i<50;i++ )) ; do
 FSK=$(echo -n "$FSK" | xxd -r -p | sha256sum | cut -f1 -d' ')
done

echo "PASS: $mem"

SECK=$(node get-sw.js $FSK S)
echo "SEC=$SECK"

PUBK=$(node get-sw.js $FSK P)
echo "PUB=$PUBK"
