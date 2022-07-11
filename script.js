let seuvotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votobranco = false;

function comecarEtapa(){  /*para zerar tela display*/ 
    let etapa = etapas[etapaAtual];
    
    let numeroHTML = '';
    numero = '';
    votobranco = false;
    
 for(let i=0;i<etapa.numeros;i++){
    if(i === 0){
      numeroHTML += '<div class="numero pisca"></div>';
    }else{
       numeroHTML += '<div class="numero"></div>';
   }
 }

    seuvotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
    
}
function atualizaInterface() {
   let etapa = etapas[etapaAtual];
   let candidato = etapa.candidatos.filter((item)=>{
      if(item.numero === numero){
         return true;
      } else{
         return false;
      }
   });
   if(candidato.length > 0){
      candidato = candidato[0];
      seuvotoPara.style.display = 'block';
      aviso.style.display = 'block';
      descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
      
      let fotosHtml = '';
      for(let i in candidato.fotos){
         if(candidato.fotos[i].small){
         fotosHtml += `<div class="d-1-image small"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
         } else {
            fotosHtml += `<div class="d-1-image"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
         }
      }

      lateral.innerHTML = fotosHtml;
   }else{
      seuvotoPara.style.display = 'block';
      aviso.style.display = 'block';
      descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`;

   }

}


function clicou(n){
  let elnumero = document.querySelector('.numero.pisca');
  if(elnumero !== null) {
     elnumero.innerHTML = n;
     numero = `${numero}${n}`;

     elnumero.classList.remove('pisca');
     if(elnumero.nextElementSibling !== null) {
          elnumero.nextElementSibling.classList.add('pisca'); /*pega proximo element do lado*/ 
     }else{
         atualizaInterface();
     }
  }
}
function branco(){
   if(numero === ''){
      votobranco = true;
      seuvotoPara.style.display = 'block';
      aviso.style.display = 'block';
      numeros.innerHTML = '';
      descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`;
      lateral.innerHTML = '';
   } else{
      alert("PARA VOTAR EM BRNACO, NÃO PODE TER DIGITADO NENHUM NUMERO!");
   }
}
function corrige(){
   comecarEtapa();
}
function confirma(){
   let etapa = etapas[etapaAtual];

   let votoconfirmado = false;

   if(votobranco === true){
      votoconfirmado = true;
       console.log("confirmand com branco");
   } else if (numero.length === etapa.numeros){
      votoconfirmado = true;
        console.log("confirmando como "+numero);
   }

   
   if(votoconfirmado){
      etapaAtual++;
      if(etapas[etapaAtual] !== undefined){
         comecarEtapa();
      } else {
         console.log("fim");
      }
   }
}    

comecarEtapa();