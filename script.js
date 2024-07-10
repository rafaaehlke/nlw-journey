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
    name: 'Academia em Grupo',
    date: new Date('2024-07-09 10:00'),
    finish: true
  },
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

// atividades = []

//Arrow Function
const criarItemAtividades = (atividade) => {

  let input = '<input type="checkbox" ' //criada variavel para o input checkbox

  if (atividade.finish) { //Se a atividade estiver finalizada, adiciona o checked 
    input += 'checked'
  }

  input += '>' //em determinado momento, pegará meu input e ira fechar a tag  (+= concatena o valor alterior, ex: input = input + '>')

  const formatar = formatador(atividade.date)

  return `
     <div>
      ${input}
      <span>${atividade.name}</span>
      <time>
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
  section.innerHTML = ''


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
  const dadosDoFormulario = new FormData(event.target)
  console.log("teste")

  const name = dadosDoFormulario.get('atividade')
  const dia = dadosDoFormulario.get('dia')
  const hora = dadosDoFormulario.get('hora')
  const date = `${dia} ${hora}`

  
  const atividade = {
    name,
    date,
    finish: true
  }
  
  atividades = [atividade, ...atividades]
  atualizaListaDeAtividades()

}

//Parte do Formulario

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

  for(let i = 6; i < 24; i++) {
    horasDisponiveis += `<option value="${i}:00">${i}:00</option>`
    horasDisponiveis += `<option value="${i}:30">${i}:30</option>`
  }

  document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis
}
criarHorasSelecao()