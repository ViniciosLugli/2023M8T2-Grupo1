const devService = require("../services/dev.service")

var users = {
    "5511948701514@c.us":"jv",
    "5524999485566@c.us":"Betinho"
}


var cadastrado = {

}

const namefind = (numero) => {
    if (users[numero]){
        console.log("User cadastrado ----> ", users[numero])
        return true
    }
    return  false

}

const validacao = (numero) => {
    if (cadastrado[numero]){
        console.log("User cadastrado")
        return false
    }
    else{
        cadastrado[numero] = "Em cadastro"
        return true
    }

}

const manager = async (msg, client) =>{
    try {
        if (msg.hasMedia) {
            //client.sendMessage(msg.from,'Media Detectada');
            console.log("Midia verificada")
            return
        }

        if (namefind(msg.from)){
            devService.require_iten(msg,client,users, cadastrado);
            
        }else{
            if (validacao(msg.from)){
                console.log("Dev_MODE","Acabo de ver que você não está cadastrado na minha base, me envie seu nome completo:")
                //client.sendMessage(msg.from,"Me envie seu nome completo:");
            }
            else{
                cadastrado[msg.from] == "Em cadastro"
                devService.create(msg,users); // Tirar o users depois
                //client.sendMessage(msg.from,'Cadastro realizado com sucesso! Gostaria de realizar um pedido?');
                console.log('Cadastro realizado com sucesso! Gostaria de realizar um pedido?')
            }
        }

      } catch (error) {
        return console.log(error)  //client.sendMessage(msg.from,'Houve um erro ao processar sua requisição');
      }

}

module.exports = {
    manager

};