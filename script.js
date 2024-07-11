//Biblioteca dayJS
const formatador = (date) => {
  return {
    dia: {
      numerico: dayjs(date).format('DD'),
      semana: {
        curto: dayjs(date).format('ddd'),
        longo: dayjs(date).format('dddd'),
      }
    },
    mes: dayjs(date).format('MMMM'),
    hora: dayjs(date).format('HH:mm')
  }

}

//Objeto Atividade
const atividade = {
  name: "Almoço",
  date: new Date("2024-07-08 22:40"),
  finish: true
}

//Lista de Atividades
let atividades = [
  atividade,
  
  {
    name: 'Gaming Session',
    date: new Date('2024-07-09 22:00'),
    finish: true,
  },
  {
    name: 'Jantar',
    date: new Date('2024-07-09 23:00'),
    finish: false,
  },
]

atividades = [] //deixa a lista de atividades fazia, fazendo com que o usuario adicione a sua lista

//Arrow Function
const criarItemAtividades = (atividade) => {

  let input = `
   <input
   onchange="concluirAtividade(event)"
   value="${atividade.date}"
   type="checkbox"
    ` //criada variavel para o input checkbox

  if (atividade.finish) { //Se a atividade estiver finalizada, adiciona o checked 
    input += 'checked'
  }

  input += '>' //em determinado momento, pegará meu input e ira fechar a tag  (+= concatena o valor alterior, ex: input = input + '>')

  const formatar = formatador(atividade.date)

  return `
     <div class="card-bg">
      ${input}
      <div>
        <img class="active" src="./assets/checked.svg">
        <img class="inative" src="./assets/notchecked.svg">
      </div>
      <span>${atividade.name}</span>

      <time class="short">
      ${formatar.dia.semana.curto}, 
      dia ${formatar.dia.numerico}<br>
       ${formatar.hora}
      </time>

      <time class="full">
      ${formatar.dia.semana.longo}, 
      dia ${formatar.dia.numerico} 
      de ${formatar.mes}
      às 
      ${formatar.hora}h </time>
    </div>
  `
}


const atualizaListaDeAtividades = () => {
  const section = document.querySelector('section')
  section.innerHTML = '' //apagamos a lista toda, para quando atulizar com a nova atividade


  //Verifica se a lista esta vazia
  if (atividades.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada</p>`
    return
  }

  for (let atividade of atividades) {
    section.innerHTML += criarItemAtividades(atividade)
  }

}
atualizaListaDeAtividades()

//cancela o evento de envio automatico do formulário
const salvarAtividade = (event) => {
  event.preventDefault()
  const dadosDoFormulario = new FormData(event.target) //pegamos o formulario alvo

  //dados do formulário
  const name = dadosDoFormulario.get('atividade')
  const dia = dadosDoFormulario.get('dia')
  const hora = dadosDoFormulario.get('hora')
  const date = `${dia} ${hora}`

  
  const novaAtividade = { 
    name, //quando o nome da propriedade for o mesmo nome da variavel, podemos deixar apenas 1 nome igual ao lado
    date, //verrsao sem simplificar ficaria date: date,
    finish: false
  }
  
   const atividadeExiste = atividades.find((atividade) => {
     return atividade.date == novaAtividade.date
   })

   if(atividadeExiste) {
    return alert('Voce já marcou uma atividade nesse horário')
   }

  atividades = [novaAtividade, ...atividades] //quando usamos ... colocamos as atividades antigas na lista! e quando adicionamos atividade na frente, faz com que
  //adicione a nova atividade na frente das antigas
  atualizaListaDeAtividades()

}

//cria e formata os dias da viagem para dia e mes
const criarDiasSelecao = () => {
  const dias = [
    "2024-08-25",
    "2024-08-26",
    "2024-08-27",
    "2024-08-28",
  ]

  let diasSelecao = ''

  for(let dia of dias) {
    const formatar = formatador(dia)
    const diaFormatado = `
    ${formatar.dia.numerico} de 
    ${formatar.mes}
    `

    diasSelecao += `
      <option value="${dia}">
      ${diaFormatado}
      </option>
    `
  }

  document.querySelector('select[name="dia"]').innerHTML = diasSelecao
}
criarDiasSelecao()

const criarHorasSelecao = () => {

  let horasDisponiveis = ''

  //loop para criar as opcoes de horas
  for(let i = 6; i < 24; i++) {  //começa do 6, ate que seja menor que 24, depois encrementa
    const hora = String(i).padStart(2, "0")
    horasDisponiveis += `<option value="${hora}:00"> ${hora}:00 </option>`
    horasDisponiveis += `<option value="${hora}:30"> ${hora}:30 </option>`
  }

  document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis
}
criarHorasSelecao()

//faz com que permanca o check caso esteja marcado ou nao!
  const concluirAtividade = (event) => {
  const input = event.target
  const dataDoInput = input.value
  
    //arrow function para procurar a nova atividades dentro de atividade
   const atividade = atividades.find((atividade) => {
    return atividade.date == dataDoInput
   })

   if(!atividade) {
    return //toda vez que encontrada um return na funcao, ela cancela e
  }

   atividade.finish = !atividade.finish //verifica se antes era verdadeiro e se tornou falso e parmanece o ultimo
}
