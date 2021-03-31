function start() {
    $("#inicio").hide();

    $("#bg-game").append("<div id='jogador' class='anima1'></div>");
    $("#bg-game").append("<div id='inimigo1' class='anima-inimigo1'></div>");
    $("#bg-game").append("<div id='inimigo2'></div>");
    $("#bg-game").append("<div id='amigo' class='anima-amigo'></div>");
    



    var jogo = {};

    var velocidade = 5;
    var posicaoY = parseInt(Math.random() * 334)


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
    
        }
    }

    function moveInimigo1(){
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX-velocidade);
        $("#inimigo1").css("top",posicaoY);

        if(posicaoX<=0){
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }
    }


}//function start
