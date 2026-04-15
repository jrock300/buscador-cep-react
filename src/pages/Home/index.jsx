import {useState} from 'react'; // Importamos o hook useState
import './style.css';

function Home() {

  // Criamos o estado: 'input' é o valor, 'setInput' é a função que muda o valor
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  // Função que será chamada ao clicar o botão
  async function handleSearch() {
    if(input === '') {
      alert("Preencha algum CEP!");
      return;
    }
    // alert(`O que você digitou foi: ${input}`);
    try {
      const url = `https://viacep.com.br/ws/${input}/json/`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      // Salva os dados no estado, Não usamos return
      setCep(data);
      setInput("");
    }catch{
      alert("Erro ao buscar o CEP!");
      setInput(""); // Esvazia a string
      setCep({}); // Esvazia o objeto Cep
    }
  }

  // Função que limpa campos
  function limpaCampos(){
   setInput("");
   setCep("");
  }

  // Função que copia o endereço para a área de transferência
  function copiarEndereco (e){
    e.preventDefault();
    const enderecoCompleto = `Logradouro: ${cep.logradouro}\nBairro: ${cep.bairro}\nCidade: ${cep.localidade}\nEstado: ${cep.estado}\nCEP: ${cep.cep}`;

    navigator.clipboard.writeText(enderecoCompleto)
    .then(() => {
      alert("Endereço copiado!");
    })
    .catch((err)=>{
      console.error("Erro ao copiar: ", err);
    });
  }

  return (
    <div>
      <h1>Buscador de Cep - com React Js</h1>
      <div className='inputsContainer'>
        <input 
          type="text"
          placeholder='Digite o CEP'
          value={input} // O input mostra o que estiver no estado
          onChange={(e) => setInput(e.target.value)} // Ao digitar, atualiza o estado
        />

        <button className='btnBuscar' onClick={handleSearch}>
          Buscar
        </button>
        <button className='btnLimpar' onClick={limpaCampos}>
          Limpar
        </button>
      </div>

      <div className="main">

        <div className='item-endereco'>
          <label htmlFor="logradouro">Logradouro</label>
          <input 
          type="text" 
          name='logradouro'
          value={cep.logradouro || ''}
          readOnly
          />
        </div>

        <div className='item-endereco'>
          <label htmlFor="bairro">Bairro</label>
          <input 
          type="text" 
          name='bairro'
          value={cep.bairro || ''}
          readOnly
          />
        </div>
        
        <div className='item-endereco'>
          <label htmlFor="cidade">Cidade</label>
          <input 
          type="text" 
          name='cidade'
          value={cep.localidade || ''}
          readOnly // Isso avisa ao React que é normal não ter onChange
          />
        </div>

        <div className='item-endereco'>
          <label htmlFor="estado">Estado</label>
          <input 
          type="text" 
          name='estado'
          value={cep.estado || ''}
          readOnly
          />
        </div>

        <div className='item-endereco'>
          <label htmlFor="cep">CEP</label>
          <input 
          type="text" 
          name='cep'
          value={cep.cep || ''}
          readOnly
          />
        </div>

        <a 
        href="#"
        onClick={copiarEndereco}
        >
          Copiar endereço
        </a>

      </div>
    </div>
  )
}

export default Home