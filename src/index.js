const express = require('express')
const app = express ();

app.use (express.json())

const usuarios = [
        {id:1, nome:'Nathalia'},
        {id:2, nome:'Maria'}
    ];

//CRIANDO UMA FUNÇÃO PRA SER USADA EM OUTRAS (verificar se um usuário existe antes de modifica-lo ou deleta-lo)
const usuarioExiste = function (req, res, next){
    const usuario = usuarios.find(u=>u.if == req.params.id);
    if (!usuario) {
        return res.status(404).json({erro: 'Usuário não encontrado'}); //status 404 - não encontrado
    }
    req.usuario = usuario;
    next(); //pra chamar outra função
}

    // GET /usuarios - todos os usuários
app.get('/', function (req, res){
    res.status(200).json(usuarios);
});

// POST /usuarios - criar um novo usuário
app.post('/usuarios', function(req, res){
    const usuario = {
        id: req.body.id,
        nome: req.body.nome
    }
    usuarios.push(usuario);
    res.status(201).json(req.body); //status 201 - requisição bem sucedida e novo recurso criado
});



// GET /usuarios/:identificador - devolve um usuário específico
app.get('/usuarios/:id', usuarioExiste, function(req,res) {
    return res.status(200).json(req.usuario);

    /*
    const usuario = usuarios.find(u=>u.if == req.params.id);
    if (!usuario) {
        return res.json({erro: 'Usuário não encontrado'});
    }
    */

    /*FAZ O MESMO QUE O CÓDIGO ABAIXO 
    for (let i=0; i<usuarios.length; i++){
        const usuario=usuarios[i];
        if (usuario.id==req.params.id){
            return res.json(usuario); //se for encontrado um usuário, retorná-lo e não ir pro código de baixo (return mata a função)
        }
    }
    res.json({erro: 'Usuário não encontrado'});
    */

});



// PUT /usuarios/:identificador - alterar os dados de um usuário
app.put('/usuarios/id', usuarioExiste, function (req, res){
    req.usuario.nome=req.body.nome;
    return res.status(200).json(req.usuario);
})


// DELETE /usuarios/:identificador - devolve um usuário

app.delete('/usuarios/id', usuarioExiste, function(req, res){
    const index = usuarios.indexOf(req.usuario);
    usuarios.splice(index,1); //splice(index, quantidade de elementos a remover)
    res.end();//o delete não tem conteúdo
})


app.listen(3000, function(){
    console.log('Rodando na porta 3000');
})