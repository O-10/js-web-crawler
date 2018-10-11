var fs = require('fs');

(function IIFE(){
    'use strict';

    'https://vip-pmeuinssprxr.inss.gov.br/apis/localizadorApsServices/buscaCep/08465312';

    var request = require('request');
    var cheerio = require('cheerio');
    var URL = require('url-parse');

    //var output = fs.openSync('ceps/cepOutput.json', 'w+');


    var pageToVisit = 'https://vip-pmeuinssprxr.inss.gov.br/apis/localizadorApsServices/buscaCep/';
    //console.log("Visiting page " + pageToVisit);
    var currCep = '00000000';
    var iterator = 0;
    var dezena = 10;
    var recuo = 1;

    function iterateCEP(){
        if (iterator < dezena){
            currCep = currCep.slice(0, (currCep.length - recuo)) + iterator;
            iterator += 1;
        }else{
            dezena *= 10;
            recuo += 1;
        }
    }

    var listaCeps = new Array;

    /*
    request(pageToVisit + currCep, function(error, response, body) {
        console.log('visitando pagina ' + (pageToVisit + currCep));
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
                var ceps = result.apsTO;
            }else{
                console.log(result.msgErro);
            }
            console.log(ceps);
        }
        currCep += 1;
    });            
    //*/
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
                    var ceps = result.apsTO;
                    listaCeps.push(ceps);
                    //console.log(listaCeps);
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
            else
                console.log(listaCeps);
                fs.writeFileSync('ceps/cepINSS.json', JSON.stringify(listaCeps));
            
        });  
    }

    function crawl(){
        iterateCEP();
        search(pageToVisit + currCep, crawl);
    }

    crawl();


}())