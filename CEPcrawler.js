
(function IIFE(args){
    'use strict';

    var fs = require('fs');
    var mysql = require('mysql');

    
    args = args.slice(2);

    var cepMode = args[0] || '-sql-off';

    console.log(cepMode);

    'https://vip-pmeuinssprxr.inss.gov.br/apis/localizadorApsServices/buscaCep/08465312';

    var request = require('request');
    var cheerio = require('cheerio');
    var URL = require('url-parse');

    //var output = fs.openSync('ceps/cepOutput.json', 'w+');


    var pageToVisit = 'https://vip-pmeuinssprxr.inss.gov.br/apis/localizadorApsServices/buscaCep/';
    //console.log("Visiting page " + pageToVisit);
    var cepList = JSON.parse(fs.readFileSync('ceps/bloco_1.json'));
    var currCep;
    var inIterator = -1;
    var outIterator = 2;

    function iterateCEP(iterate){
        if (iterate){
            if ( cepList[inIterator + 1] ) {
                currCep = cepList[++inIterator].cep;
            }else if(outIterator < 12){
                cepList = JSON.parse(fs.readFileSync('ceps/bloco_' + (outIterator++) + '.json'));
                inIterator = 0;
                currCep = cepList[inIterator].cep;
            }    
        }
    }

    try{
        var listaCeps =  JSON.parse(fs.readFileSync('ceps/cepINSS.json'));
     }
     catch(err){
        console.log(err);
        var listaCeps = new Array;
     }  

    function search(url, callback){
        request(url, function(error, response, body) {
            console.log('visitando pagina ' + (url) + '\n');
            if(error) {
                console.log("Error: " + error);
            }
            // Check status code (200 is HTTP OK)
            //console.log("Status code: " + response.statusCode);
            if (response){
                if(response.statusCode === 200) {
                    // Parse the document body
                    var $ = cheerio.load(body);
                    var result = JSON.parse($.text()).apsTO;
                    console.log(result);
                    if(result.msgErro === undefined){
                        var ceps = result;
                        //console.log(ceps);
                        if((listaCeps.length === 0) || (listaCeps[listaCeps.length - 1].codigo !== ceps.codigo)){
                            listaCeps.push(ceps);
                            //console.log(listaCeps);
                            fs.writeFileSync('ceps/cepINSS.json', JSON.stringify(listaCeps));
                        }      

                    }
                    /*
                    else{
                        var ceps = result;
                        listaCeps.push(ceps);
                        //console.log(listaCeps);                    
                    }
                    //*/
                }
                if(currCep != '99999999')
                    callback(true); 
                else{
                    console.log(listaCeps);
                    fs.writeFileSync('ceps/cepINSS.json', JSON.stringify(listaCeps));
                    console.log('finished');
                }
            }else{
                callback(false);
            }
        });  
    }

    function crawl(iterate){
        iterateCEP(iterate);
        //currCep = '58052250'
        search(pageToVisit + currCep, crawl);
    }

    crawl();


}(process.argv))