function start() {
    $("#inicio").hide();

    $("#bg-game").append("<div id='jogador' class='anima1'></div>");
    $("#bg-game").append("<div id='inimigo1' class='anima-inimigo1'></div>");
    $("#bg-game").append("<div id='inimigo2'></div>");
    $("#bg-game").append("<div id='amigo' class='anima-amigo'></div>");
    $("#bg-game").append("<div id='placar'></div>");
    $("#bg-game").append("<div id='energia'<?div>");

    var somDisparo = document.getElementById("somDisparo");
    var somExplosao = document.getElementById("somExplosao");
    var musica = document.getElementById("musica");
    var somGameOver = document.getElementById("somGameOver");
    var somPerdido = document.getElementById("somPerdido");
    var somResgate = document.getElementById("somResgate");

    musica.addEventListener("ended", function(){musica.currentTime = 0; musica.play()}, false);
    musica.play();

    var jogo = {};

    var salvos = 0;
    var perdidos = 0;
    var pontos = 0;
    var energiaAtual = 3;

    var velocidade = 3;
    var posicaoY = parseInt(Math.random() * 334);
    var fimJogo = false;

    var podeAtirar = true;

    var TECLA = {
        W: 87,
        S: 83,
        J: 74,
    }
    jogo.pressionou =[];

    $(document).keydown(function(e){
        jogo.pressionou[e.which] =true;
    });

    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false;
    });

    //Game Loop

    jogo.timer = setInterval(loop, 30);

    function loop() {
        movejogador();
        movefundo();
        moveInimigo1();
        moveInimigo2();
        moveAmigo();
        colisao();
        placar();
        energia();

    } // Fim da função loop()



    //Função que movimenta o fundo do jogo

    function movefundo() {

        esquerda = parseInt($("#bg-game").css("background-position"));
        $("#bg-game").css("background-position", esquerda - 1);

    } // fim da função movefundo()

    function movejogador(){
        if(jogo.pressionou[TECLA.W]){
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo - 5);

            if(topo<=0){
                $("#jogador").css("top", topo + 5);
            }
        }
        if(jogo.pressionou[TECLA.S]){
            var fundo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", fundo + 10);

            if(fundo>=434){
                $("#jogador").css("top", fundo - 10);
            }
        }
        if(jogo.pressionou[TECLA.J]){
            disparo();
        }
    }

    function moveInimigo1(){
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX-velocidade);
        $("#inimigo1").css("top",posicaoY);

        if(posicaoX<=0){
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 700);
            $("#inimigo1").css("top", posicaoY);
        }
    }
    
    function moveInimigo2(){
        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left", posicaoX - velocidade/2);

        if(posicaoX <= 0){
            $("#inimigo2").css("left", 800);
        }
    }

    function moveAmigo(){
        movimentoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left", movimentoX + 1);

        if(movimentoX >=800){
            $("#amigo").css("left", 0);
        }
    }

    function disparo(){
        if(podeAtirar === true){
           podeAtirar = false;

            topo = parseInt($("#jogador").css("top"));
            posX = parseInt($("#jogador").css("left"));

            tiroY = topo + 40;
            tiroX = posX + 170;
            $("#bg-game").append("<div id='disparo'></div>")
            $("#disparo").css("top", tiroY);
            $("#disparo").css("left", tiroX);

            somDisparo.play();

            var tempoDisparo = window.setInterval(exeDisparo, 30);
        }
        function exeDisparo(){
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", posicaoX + 30);
            if(posicaoX>900){
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;
    
            }
        }
        
        
    }
    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));

        // jogador com o inimigo1

        if (colisao1.length > 0) {//colisão helicoptero
            energiaAtual--;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X, inimigo1Y);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 700);
            $("#inimigo1").css("top", posicaoY);
        }
        
        if(colisao2.length > 0) {//colisão com caminhao
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X, inimigo2Y);

            energiaAtual--;

            $("#inimigo2").remove();
            reposicionaInimigo2();
        }

        if(colisao3.length > 0){//disparo inimigo 1
            
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));

            
            velocidade = velocidade + 0.1;
            explosao1(inimigo1X, inimigo1Y);
            $("#disparo").css("left", 950);

            posicaoY = parseInt(Math.random()* 334);
            $("#inimigo1").css("left", 700);
            $("#inimigo1").css("top", posicaoY);

            pontos = pontos + 1;

        }

        if(colisao4.length > 0){//colisao tiro inimigo 2
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));

            pontos += 5;
            velocidade = velocidade + 0.1;
            explosao2(inimigo2X, inimigo2Y);
            $("#disparo").css("left", 950);
        
            $("#inimigo2").remove();
            reposicionaInimigo2();
        }

        if(colisao5.length > 0){
            reposicionaAmigo();
            $("#amigo").remove();
            salvos = salvos+ 1;
            somResgate.play();
        }

        if(colisao6.length > 0){
            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            

            explosao3(amigoX, amigoY);
            $("#amigo").remove();

            reposicionaAmigo();
            perdidos = perdidos + 1;
        }

    } //Fim da função colisao()

    function reposicionaInimigo2(){

        var tempoColisao4 = window.setInterval(reposicionaIn2, 5000);

        
        function reposicionaIn2(){
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;

            if(fimJogo === false){
                $("#bg-game").append("<div id='inimigo2'></div>");
                $("#inimigo2").css("left", 800);
            }
        }
    }


        //Explosão 1
        function explosao1(inimigo1X, inimigo1Y) {
            somExplosao.play();

            $("#bg-game").append("<div id='explosao1'></div");
            $("#explosao1").css("background-image", "url(img/explosao.png)");
            var div = $("#explosao1");
            div.css("top", inimigo1Y);
            div.css("left", inimigo1X);
            div.animate({ width: 200, opacity: 0 }, "slow");
            
            var tempoExplosao = window.setInterval(removeExplosao, 1000);

            function removeExplosao() {

                div.remove();
                window.clearInterval(tempoExplosao);
                tempoExplosao = null;

            }

        } // Fim da função explosao1()

        function explosao2(inimigo2X, inimigo2Y){
            somExplosao.play();
            $("#bg-game").append("<div id='explosao2'></div>");
            $("#explosao2").css("background-image", "url(img/explosao.png)");
            var div2 = $("#explosao2");
            div2.css("left", inimigo2X);
            div2.css("top", inimigo2Y);
            div2.animate({width: 200, opacity:0}, "slow");
            
            var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

            function removeExplosao2(){
                div2.remove();
                window.clearInterval(tempoExplosao2);
                tempoExplosao2 = null;
            }

        }

        function explosao3(amigoX, amigoY){
            somPerdido.play();

            $("#bg-game").append("<div id='explosao3' class='anima-amigo-morte'></div>");
            $("#explosao3").css("top",amigoY);
            $("#explosao3").css("left", amigoX);

            
            var tempoExplosao3 = setInterval(resetaExplosao, 1000);

            function resetaExplosao(){
                $("#explosao3").remove();
                clearInterval(tempoExplosao3);
                tempoExplosao3= null;

            }
        }

        function reposicionaAmigo(){
            var tempoAmigo = window.setInterval(reposicionaAmigo1, 6000);

            function reposicionaAmigo1(){
                window.clearInterval(tempoAmigo);
                tempoAmigo = null;

                if(fimJogo === false){
                    $("#bg-game").append("<div id='amigo' class='anima-amigo'></div>");
                }
            }
        }

        function placar(){

            $("#placar").html(`<h2>Pontos: ${pontos} Salvos: ${salvos} Perdidos: ${perdidos}</h2>`);

        }

        function energia(){
            if(energiaAtual == 3){
                $("#energia").css("background-image", "url(img/energia3.png)");
            }
            if(energiaAtual == 2){
                $("#energia").css("background-image", "url(img/energia2.png)");
            }
            if(energiaAtual == 1){
                $("#energia").css("background-image", "url(img/energia1.png)");
            }
            if(energiaAtual == 0){
                $("#energia").css("background-image", "url(img/energia0.png)");
                gameOver();
            }
        }

        function gameOver(){
            fimJogo =true;
            musica.pause();
            somGameOver.play();

            window.clearInterval(jogo.timer);
            jogo.timer = null;

            $("#jogador").remove();
            $("#inimigo1").remove();
            $("#inimigo2").remove();
            $("#amigo").remove();
            
            $("#bg-game").append("<div id='gameover'></div>");
            $("#gameover").html("<h1> Game Over!!</h1><p>Sua Pontuação foi: "+pontos+"</p>"+"<div id='reiniciar-jogo' onClick='reiniciaJogo()'><h3>REINICIAR JOGO</h3></div>");


        }

        

}//function start

function reiniciaJogo() {
    somGameOver.pause();
    $("#gameover").remove();
    start();
}