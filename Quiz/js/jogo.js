const pergunta=document.getElementById('Pergunta');
const respostas=Array.from(document.getElementsByClassName('escolha-texto'));

const N_perguntasText=document.getElementById('contadorDePergunta');
const N_Score=document.getElementById('score');

let perguntaCorrent={};
let aceitandoResposta=false;
let score=0;
let contadorDePergunta=0;
let PerguntaAvaliar=[];



let Perguntas=[
				{
					pergunta:"Qual o nome do presidente de Angola",
					resposta1:"Samacuva",
					resposta2:"Savimbe",
					resposta3:"Fernando da Piedade nando",
					resposta4:"Jão Lourenço",
					respostaCerta:4
				},
				{
					pergunta:"Que dia mês e ano nasceu a Inô?",
					resposta1:"12 de Março 2001",
					resposta2:"19 de julho de 2004",
					resposta3:"4 de fevereiro 1964",
					resposta4:"30 de Agosto de 2012",
					respostaCerta:2
				},
				
				{
					pergunta:"Qual o nome do Kaizer",
					resposta1:"Cláudio",
					resposta2:"Jézer",
					resposta3:"Gelson",
					resposta4:"João Lourenço",
					respostaCerta:1
				},
				{
					pergunta:"Quantoo Custa uma máscara em kwanza",
					resposta1:"90 kz",
					resposta2:"200 kz",
					resposta3:"300",
					resposta4:"10",
					respostaCerta:3
				},
				{
					pergunta:"Quantos Programas o Cláudio já fez?",
					resposta1:"Nenhum",
					resposta2:"nove",
					resposta3:"70",
					resposta4:"Nunca",
					respostaCerta:2
				}

				];


const Bonus_Resposta=20;
const Numero_perguntas=5;

IniciarJogo=()=>{
	contadorDePergunta=0;
	score=0;
	PerguntaAvaliar=[...Perguntas];
	PegarNovaPergunta();
}


PegarNovaPergunta=()=>{

	if (PerguntaAvaliar.length==0 || contadorDePergunta >=Numero_perguntas) {
		// vai para a página de fim de jogo
		localStorage.setItem('ScoreRecente',score);
		return window.location.assign('fim.html');
		// salvar score na base de dados
		// localStorage.GetItem('ScoreREcente');

	}

	contadorDePergunta++;
	N_perguntasText.innerText=contadorDePergunta+"/"+Numero_perguntas;


	const Indice_Pergunta=Math.floor(Math.random()*PerguntaAvaliar.length);
	ProximaPergunta=PerguntaAvaliar[Indice_Pergunta];
	pergunta.innerText=ProximaPergunta.pergunta;

	// console.log("Indice da pergunta:"+Indice_Pergunta)

	respostas.forEach(resposta=>{
		const numero=resposta.dataset['number'];
		resposta.innerText=ProximaPergunta['resposta'+numero];
	});
	PerguntaAvaliar.splice(Indice_Pergunta,1);
	aceitandoResposta=true;

}


respostas.forEach(resposta=>{
	resposta.addEventListener('click',e => {
		// 
		console.log(aceitandoResposta);
		if (!aceitandoResposta)return;
			// escolhento as respostas e concatemar 
			aceitandoResposta=false;
			const Escolhafeita=e.target;
			const EscolhaREsposta=Escolhafeita.dataset['number'];

			console.log("Escolhi"+Escolhafeita +" ::"+EscolhaREsposta);
			// adiciona e remove class nas respostas escolhidas!()
			const ClassResp=EscolhaREsposta==ProximaPergunta.respostaCerta ?'correta':'incorreta';

			// aumentando o score
			if (ClassResp=='correta') {

				aumentarScore(Bonus_Resposta);
			}

			Escolhafeita.parentElement.classList.add(ClassResp);
			// revome a class acdicionada em apenas 1segundo
			setTimeout(()=>{
			Escolhafeita.parentElement.classList.remove(ClassResp);
			// chama outra pergunta
			PegarNovaPergunta();
			},1000);

	});

});

// funcão de incrementar bonus
aumentarScore=num =>{
score+=num;
N_Score.innerText=score;


}


IniciarJogo();