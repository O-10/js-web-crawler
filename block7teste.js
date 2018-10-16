(function iife(){
    'use strict';

    var fs = require('fs');
    var inIterator = 1;
    var cepList = JSON.parse(fs.readFileSync('ceps/bloco_7.json'));
    console.log(cepList[777].cep);

    while(inIterator < 2001){
        if ( cepList[inIterator] ) {

            console.log(cepList[inIterator], inIterator);

        }else{

            console.log('nao existe', inIterator);
            fs.appendFileSync('testeBloc7.txt', 'falha em ' + inIterator + '\n');
        }  
        inIterator++;
    }

})()