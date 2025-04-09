/*
     Este middleware intercepta todas as rotas e verifica
     se um token de autorização foi enviado junto com a requisição
 */
 
     import jwt from 'jsonwebtoken'
 
     /* 
         Algumas rotas, com POST /users/login, poderão ser 
         acessadas sem a necessidade de apresentação do token,
         cadastramos essas rotas no vetor bypassRoutes
     */
     
     const bypassRoutes = [
         { url: '/users/login', method:'POST'}
         // caso o cadastro de novos usuários seja publico
         //{ url: '/users, method:'POST'}
     ]
     
     //Função do middleware
     
     export default function(req, res, next){
         /*
             Verificamos se a rota interceptada corresponde a alguma
             daquelas cadastradas em bypassRoutes. Sendo
             o caso, permite continuar para o próximo middleware sem a verificação 
             do token de autorização
         */
        for(let route of bypassRoutes){
             if(route.url === req.url && route.method == req.method){
                 next() //Continua para o proximo middleware
                 return // encerra este middleware
             }
         }
         
         /* PROCESSO DE VERIFICAÇÃO DO TOKEN DE AUTORIZAÇÃO */
         let token
     
         //Procura pelo token no cabeçalho de autorização
         const authHeader = req.headers['authorization']
         console.log({authHeader})
     
         // Se o cabeçalho 'authorization' não existir, retorna
         //HTTP 403: Forbidden
         if(! authHeader){
             console.error('ERRO DE AUTORIZAÇÃO: falta de cabeçalho')
             return res.status(403).end()
         }
     
         /*
         O cabeçalho 'autorization' tem o formato "Bearer XXXXXXXXXXXXX",
         onde "XXXXXXXXXXXXX" é o token. Portanto, precisamos dividir esse 
         cabeçalho (string) em duas partes, cortando onde está o caractere de 
         espaço e aproveitando apenas a segunda parte (indice 1)
         */
        token = authHeader.split(' ')[1]
     
        // Verificação de integridade e validade do token
        jwt.verify(token, process.env.TOKEN_SECRET, (error,user) =>{
     
         //Token inválido ou expirado, retorna HTTP 403:Forbidden
             if(error){
                 console.error('ERRO DE AUTORIZAÇÃO: token inválido ou expirado')
                 return res.status(403).end()
             }
             /*
             Se chegamos até aqui, token está ok e temos informações do 
             usuário autenticado no parâmetro "user". Vamos guardá-lo dentro
              do objeto "req" para responder ao frnt-end sempre que ele perguntar 
              qual usuário está totalmente autenticado
              */
             req.authUser = user
     
             //Token verificado e validado, passamos ao proximo middleware
             next()
         })
     }