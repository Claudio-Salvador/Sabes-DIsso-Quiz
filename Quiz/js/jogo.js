const pergunta = document.getElementById('Pergunta');
const respostas = Array.from(document.getElementsByClassName('escolha-texto'));

const N_perguntasText = document.getElementById('contadorDePergunta');
const N_Score = document.getElementById('score');

let perguntaCorrent = {};
let aceitandoResposta = false;
let score = 0;
let contadorDePergunta = 0;
let PerguntaAvaliar = [];
let Perguntas = [];

const Bonus_Resposta = 20;
let Numero_perguntas =0 ;

//Fazer a busca das perguntas directo da API
  fetch('http://localhost:3000/api/questions').then(res=>{
		return res.json();
 	 }).then(lerPerguntas=>{
		 console.log(lerPerguntas.result);
         Numero_perguntas = lerPerguntas.result.length ;
 
		 Perguntas = lerPerguntas.result;
		 IniciarJogo();
     }).catch(erro=>{
	  console.error(erro);

     });

  
IniciarJogo = () => {
	contadorDePergunta = 0;
	score = 0;
	PerguntaAvaliar=[...Perguntas];
	PegarNovaPergunta();
}


PegarNovaPergunta = () => {

	if (PerguntaAvaliar.length == 0 || contadorDePergunta >= Numero_perguntas) {
		// vai para a página de fim de jogo
		   localStorage.setItem('ScoreRecente', score);
		return window.location.assign('fim.html');
		// salvar score na base de dados
		// localStorage.GetItem('ScoreREcente');

	}

	contadorDePergunta++;
	N_perguntasText.innerText = contadorDePergunta + "/" + Numero_perguntas;


	const Indice_Pergunta = Math.floor(Math.random() * PerguntaAvaliar.length);
	ProximaPergunta = PerguntaAvaliar[Indice_Pergunta];
	pergunta.innerText = ProximaPergunta.pergunta;

	// console.log("Indice da pergunta:"+Indice_Pergunta)

	respostas.forEach(resposta => {
		const numero = resposta.dataset['number'];
		resposta.innerText = ProximaPergunta['resposta' + numero];
	});
	PerguntaAvaliar.splice(Indice_Pergunta, 1);
	aceitandoResposta = true;
 
}


respostas.forEach(resposta => {
	resposta.addEventListener('click', e => {
		// 
		console.log(aceitandoResposta);
		if (!aceitandoResposta) return;
		// escolhento as respostas e concatemar 
		aceitandoResposta = false;
		const Escolhafeita = e.target;
		const EscolhaREsposta = Escolhafeita.dataset['number'];

		console.log("Escolhi" + Escolhafeita + " ::" + EscolhaREsposta);
		// adiciona e remove class nas respostas escolhidas!()
		const ClassResp = EscolhaREsposta == ProximaPergunta.respostaCerta ? 'correta' : 'incorreta';

		// aumentando o score
		if (ClassResp == 'correta') {

			aumentarScore(Bonus_Resposta);
		}

		Escolhafeita.parentElement.classList.add(ClassResp);
		// revome a class acdicionada em apenas 1segundo
		setTimeout(() => {
			Escolhafeita.parentElement.classList.remove(ClassResp);
			// chama outra pergunta
			PegarNovaPergunta();
		}, 1000);

	});

});

//funcão de incrementar bonus
aumentarScore = num => {
	score += num;
	N_Score.innerText = score;
}


