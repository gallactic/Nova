
'use strict'
class Action {

    compile(){
        try{
            
            let compile = require("./libs/compile");  
            compile();
            
        }
        catch(ex){
            console.log(ex);
        }
    }

    migrate(config, accountname){
        try{
            let deployAll = require("./libs/deploy");    
            let Link = require("./libs/link");  
            let linker = new Link();   
            linker.getDeployOrder().then(function(linkOrder){
                let bytecode;            
                try{
                    deployAll(config.burrow_url,linkOrder, accountname);               
                }
                catch(ex)
                {
                    console.log(ex);
                }    
            }).catch(err=>{
                console.log(err);

            });             
        }
        catch(ex){
            console.log(ex);
        }
    }
    
    transact(config,priv_key,data,address,fee,gas_limit){
        try{
            const Transact = require("./libs/transac").Transact;
            Transact(config.burrow_url,priv_key,data,address,fee,gas_limit);
        }
        catch(ex){
            console.log(ex);
        }
    }

    send(config,priv_key,address,fee){
        try{
            const Send = require("./libs/transac").Send;
            Send(config.burrow_url,priv_key,address,fee);
        }
        catch(ex){
            console.log(ex);
        }
    }
    randomTransact(config,count){
        try{
            const randomTransact = require("./libs/transac").randomTransact;
            randomTransact(config.burrow_url,count);
        }
        catch(ex){
            console.log(ex);
        }
    }

    loadAccounts(config){
        try{
            const loadAccounts = require("./libs/accounts").loadAccounts;
            loadAccounts(config.burrow_url);
        }
        catch(ex){
            console.log(ex);
        }
    }

    createAccount(config,pass_phrase){
        try{
            const createAccount = require("./libs/accounts").createAccount;
            createAccount(config.burrow_url , pass_phrase);
        }
        catch(ex){
            console.log(ex);
        }
    }

    getBalance(config,address){
        try{
            const getBalance = require("./libs/accounts").getBalance;
            getBalance(config.burrow_url , address);
        }
        catch(ex){
            console.log(ex);
        }
    }

    init(){
        try{
            const projectSchema = require("./libs/init.js").ProjectSchema;        
            projectSchema.createSchema();
        }
        catch(ex){
            console.log(ex);
        }
    }

    burrow(){
        try{
            let shell = require('shelljs');
            let cmd ='bash ' +  __dirname + '/burrow/burrow.sh';
            let child = shell.exec(cmd, {async:true});
            child.stdout.on('data', function(data) {
            /* ... do something with data ... */
            });
            
        }
        catch(ex){
            console.log(ex);       
        }
    }

    installBurrow(){
        try{
            let shell = require('shelljs');
            let burrow_files = __dirname + '/burrow/burrow-files';
            let burrow = __dirname + '/burrow/burrow';
            let cmd ='bash ' + __dirname + '/burrow/install.sh ' + burrow_files + ' '+ burrow;
            let child = shell.exec(cmd, {async:true});
            child.stdout.on('data', function(data) { 
            });
            
        }
        catch(ex){
            console.log(ex);       
        }
    }

    uninstallBurrow(){
        try{
            let shell = require('shelljs');
            let cmd ='bash ' + __dirname + '/burrow/uninstall.sh';
            let child = shell.exec(cmd, {async:true});
            child.stdout.on('data', function(data) {
            });
            
        }
        catch(ex){
            console.log(ex);       
        }
    }

    uninstallBurrow(){
        try{
            let shell = require('shelljs');
            let cmd ='bash ' + __dirname + '/burrow/uninstall.sh';
            let child = shell.exec(cmd, {async:true});
            child.stdout.on('data', function(data) {
            });
            
        }
        catch(ex){
            console.log(ex);       
        }
    }

    cleanBackup(){
        try{
            let shell = require('shelljs');
            let cmd ='bash ' + __dirname + '/burrow/clean-backup.sh';
            let child = shell.exec(cmd, {async:true});
            child.stdout.on('data', function(data) {
            });
            
        }
        catch(ex){
            console.log(ex);       
        }
    }

    callFunction(config,contract_name,function_name,parameters_list){
        let callFunc = require("./libs/functions").callFunction;
        try{
            callFunc(config.burrow_url,contract_name,function_name,parameters_list);
        }
        catch(ex){
            console.log(ex);   
        }
    }

    runMonaxKeys(){
        try{
            let shell = require('shelljs');
            let cmd = __dirname + '/burrow/monax-keys server &';
            let child = shell.exec(cmd, {async:true});
            child.stdout.on('data', function(data) {
            });            
        }
        catch(ex){
            console.log(ex);       
        }
    }

    importKeys(file_name){
        let fs = require('fs');
        if (fs.existsSync(file_name)) {
            let keys = JSON.parse(fs.readFileSync(file_name,'utf-8'));
            keys.forEach(element => {
                
                try{
                    let shell = require('shelljs');
                    let cmd = __dirname + '/burrow/monax-keys import ' + element.privKey + ' --no-pass';
                    let child = shell.exec(cmd, {async:true});
                    child.stdout.on('data', function(data) {
                    });            
                }
                catch(ex){
                    console.log(ex);       
                }
            });
        }
        else{
            console.log("Error : Couldn't find the file " + file_name);
        }
    }
};

module.exports = Action;
