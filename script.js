const atividade = {
  name: "Almoço",
  date: new Date("2024-07-08 22:40"),
  finish: true
}

let atividades = [
  atividade,
  { 
    name: 'Academia em Grupo',
    date: new Date('2024-07-09 10:00'),
    finish: false
  },
{
  name: 'Game Session',
  date: new Date('2024-07-09 22:00'),
  finish: false,
}
]

const criarItemAtividades = (atividade) => {

  let input = '<input type="checkbox" ' //criada variavel para o input checkbox

  if (atividade.finish) { //Se a atividade estiver finalizada, adiciona o checked 
    input = input + 'checked'
  }

  input = input + '>' //em determinado momento, pegará meu input e ira fechar a tag

  return `
     <div>
      ${input}
      <span>${atividade.name}</span>
      <time>${atividade.date}</time>
    </div>
  `
}



const section = document.querySelector('section')

for(let atividade of atividades) {
  section.innerHTML += criarItemAtividades(atividade)
}