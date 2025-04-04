document.addEventListener("DOMContentLoaded", function () {
    let form1 = document.querySelector(".contact-form-1");
    if (form1) {
        let estadoSelect = form1.querySelector("#estado"),
            cidadeSelect = form1.querySelector("#cidade");

    
      


        async function carregarCidades(estado) {
            let resposta = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`),
                cidades = await resposta.json();

            cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
            cidades.forEach(cidade => {
                let option = document.createElement("option");
                option.value = cidade.nome;
                option.textContent = cidade.nome;
                cidadeSelect.appendChild(option);
            });
        }

        async function carregarEstados() {
            let resposta = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados"),
                estados = await resposta.json();

            estados.forEach(estado => {
                let option = document.createElement("option");
                option.value = estado.sigla;
                option.textContent = estado.sigla;
                estadoSelect.appendChild(option);
            });
        }

        estadoSelect.addEventListener("change", function () {
            let estadoSelecionado = estadoSelect.value;
            if (estadoSelecionado) {
                carregarCidades(estadoSelecionado);
            } else {
                cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
            }
        });

        carregarEstados();
    }
});

 document.addEventListener("DOMContentLoaded", function () {
    let forms = document.querySelectorAll(".contact-form-2");

    forms.forEach(form => {
        let estadoSelect = form.querySelector(".estado"),
            cidadeSelect = form.querySelector(".cidade");

        async function carregarEstados() {
            let resposta = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados"),
                estados = await resposta.json();

            estados.forEach(estado => {
                let option = document.createElement("option");
                option.value = estado.sigla;
                option.textContent = estado.sigla;
                estadoSelect.appendChild(option);
            });
        }

        async function carregarCidades(estado) {
            let resposta = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`),
                cidades = await resposta.json();

            cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
            cidades.forEach(cidade => {
                let option = document.createElement("option");
                option.value = cidade.nome;
                option.textContent = cidade.nome;
                cidadeSelect.appendChild(option);
            });
        }

        estadoSelect.addEventListener("change", function () {
            let estadoSelecionado = estadoSelect.value;
            if (estadoSelecionado) {
                carregarCidades(estadoSelecionado);
            } else {
                cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
            }
        });

        carregarEstados();
    });
}); 