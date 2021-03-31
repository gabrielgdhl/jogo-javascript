function start() {
    $("#inicio").hide();

    $("#bg-game").append("<div id='jogador' class='anima1'></div>");
    $("#bg-game").append("<div id='inimigo1' class='anima-inimigo1'></div>");
    $("#bg-game").append("<div id='inimigo2'></div>");
    $("#bg-game").append("<div id='amigo' class='anima-amigo'></div>");
    



    var jogo = {};

    var velocidade = 5;
    var posicaoY = parseInt(Math.random() * 334)

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

    } // Fim da função loop()



    //Função que movimenta o fundo do jogo

    function movefundo() {

        esquerda = parseInt($("#bg-game").css("background-position"));
        $("#bg-game").css("background-position", esquerda - 1);

    } // fim da função movefundo()

    function movejogador(){
        if(jogo.pressionou[TECLA.W]){
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo - 10);

            if(topo<=0){
                $("#jogador").css("top", topo + 10);
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
        $("#inimigo2").css("left", posicaoX - 3);

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
        // jogador com o inimigo1

        if (colisao1.length > 0) {

            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X, inimigo1Y);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 700);
            $("#inimigo1").css("top", posicaoY);
        }

    } //Fim da função colisao()



        //Explosão 1
        function explosao1(inimigo1X, inimigo1Y) {
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


}//function start
