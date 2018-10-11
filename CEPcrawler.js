
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
    var currCep = '01000000';
    var iterator = 998;
    var dezena = 10;
    var recuo = 1;

    function iterateCEP(){
        if(cepMode === '-sql-off'){
            if (iterator < dezena){
                currCep = currCep.slice(0, (currCep.length - recuo)) + iterator;
                iterator += 1;
            }else{
                dezena *= 10;
                recuo += 1;
            }
        }
        else{
            console.log('to be done');
            return;
        }
    }

    var listaCeps = JSON.parse(fs.readFileSync('ceps/cepINSS.json')) ||  new Array;

    function search(url, callback){
        request(url, function(error, response, body) {
            console.log('visitando pagina ' + (url) + '\n');
            if(error) {
                console.log("Error: " + error);
            }
            // Check status code (200 is HTTP OK)
            //console.log("Status code: " + response.statusCode);
            if(response.statusCode === 200) {
                // Parse the document body
                var $ = cheerio.load(body);
                var result = JSON.parse($.text()).apsTO;
                if(result.msgErro === undefined){
                    var ceps = result;
                    if((listaCeps.length === 0) || (listaCeps[listaCeps.length - 1].cepFiltro === ceps.cepFiltro))
                        listaCeps.push(ceps);
                    console.log(ceps);
                    fs.writeFileSync('ceps/cepINSS.json', JSON.stringify(listaCeps));

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
                callback(); 
            else{
                console.log(listaCeps);
                fs.writeFileSync('ceps/cepINSS.json', JSON.stringify(listaCeps));
                console.log('finished');
            }
        });  
    }

    function crawl(){
        iterateCEP();
        //currCep = '58052250'
        search(pageToVisit + currCep, crawl);
    }

    crawl();


}(process.argv))