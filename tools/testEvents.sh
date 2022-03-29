#!/usr/bin/bash
if ! command -v curl -V &> /dev/null
    then
    echo "You don't have curl installed!"
    exit
fi
while IFS="," read -r text dateTime
do
    newText=${text:1:-1}
    newDateTime=${dateTime:1:-2}
    VAR="{\"text\":\"$newText\",\"dateTime\":\"$newDateTime\"}"
    #post request to test the api
    curl --location --request POST 'http://localhost:3000/scheduleEvent' \
    --header 'Content-Type: application/json' \
    --data-raw "$VAR"
    echo ""
done < <(tail -n +2 sampleData.csv)
