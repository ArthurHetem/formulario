import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    comidaFavorita: '',
    restauranteFavorito: '',
    namora: false,
    comentarios: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [submissionCount, setSubmissionCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if(name === 'namora'){
      const perguntaNaoElement = document.getElementById('perguntaNao');
      if(value === 'não'){
        perguntaNaoElement.classList.remove('hidden');
      } else {
        perguntaNaoElement.classList.add('hidden');
      }
    }

  };

  function handleChangeNao(e) {
    e.preventDefault();

    // mover o elemento com id "nao" aleatoriamente

    const naoElement = document.getElementById('nao');
    if (naoElement) {
      const perguntaNaoElement = document.getElementById('perguntaNao');
      const maxX = perguntaNaoElement.clientWidth - naoElement.offsetWidth;
      const maxY = perguntaNaoElement.clientHeight - naoElement.offsetHeight;
      const randomX = Math.floor(Math.random() * maxX);
      const randomY = Math.floor(Math.random() * maxY);
      naoElement.style.position = 'absolute';
      naoElement.style.left = `${randomX}px`;
      naoElement.style.top = `${randomY}px`;

      perguntaNaoElement.classList.add('border');
      perguntaNaoElement.classList.add('border-red-500');
      perguntaNaoElement.classList.add('transition-all');
      perguntaNaoElement.classList.add('duration-150');
    }
    
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nome.trim() || !formData.email.trim()) {
      setMessage({ text: 'Por favor, preencha os campos obrigatórios (Nome e Email)', type: 'error' });
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/save-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...formData,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setMessage({ text: 'Formulário enviado com sucesso!', type: 'success' });
        setSubmissionCount(prev => prev + 1);
        
        // Limpar formulário
        setFormData({
          nome: '',
          telefone: '',
          comidaFavorita: '',
          restauranteFavorito: '',
          namora: false,
          satisfacao: '',
          comentarios: ''
        });
        
        // Limpar mensagem após 3 segundos
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      } else {
        setMessage({ text: 'Erro ao enviar formulário', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Erro ao conectar com o servidor', type: 'error' });
      console.error('Erro:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-5 bg-purple-50">
      <div className="w-full max-w-[770px] bg-white rounded-lg mb-3 overflow-hidden shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
        <div className="h-2.5 bg-linear-to-r from-purple-700 via-purple-600 to-pink-600"></div>
        <h1 className="text-[32px] font-normal text-gray-800 px-6 pt-6 pb-2 m-0">Formulário de Pesquisa</h1>
        <p className="text-sm text-gray-600 px-6 pb-6 m-0">Preencha os campos abaixo com suas informações</p>
      </div>

      <div className="w-full max-w-[770px] mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
          <div className="mb-6 pb-6 border-b border-gray-200">
            <label className="block text-sm text-gray-800 mb-2 font-normal">
              Nome completo <span className="text-red-600 ml-0.5">*</span>
            </label>
            <input
              type="text"
              name="nome"
              className="w-full max-w-full px-3.5 py-3 text-sm border-0 border-b border-gray-300 bg-transparent outline-none transition-colors duration-200 font-inherit text-gray-800 hover:border-gray-800 focus:border-b-2 focus:border-purple-700"
              placeholder="Sua resposta"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6 pb-6 border-b border-gray-200">
            <label className="block text-sm text-gray-800 mb-2 font-normal">Telefone</label>
            <input
              type="tel"
              name="telefone"
              className="w-full max-w-full px-3.5 py-3 text-sm border-0 border-b border-gray-300 bg-transparent outline-none transition-colors duration-200 font-inherit text-gray-800 hover:border-gray-800 focus:border-b-2 focus:border-purple-700"
              placeholder="Sua resposta"
              value={formData.telefone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6 pb-6 border-b border-gray-200">
            <label className="block text-sm text-gray-800 mb-2 font-normal">Você Namora?</label>
            <div className="flex w-full h-32 relative">
            <div className="flex flex-col gap-3">
              <label className="flex items-center text-sm text-gray-800 cursor-pointer py-1">
                <input
                  type="checkbox"
                  name="namora"
                  value="sim"
                  checked={formData.namora === 'sim'}
                  onChange={handleChange}
                  className="mr-3 w-5 h-5 cursor-pointer accent-purple-700"
                />
                Sim
              </label>
              <label 
                className="flex items-center text-sm text-gray-800 cursor-pointer py-1"
                onMouseEnter={handleChange}
                onClick={handleChange}
              >
                <input
                  type="checkbox"
                  name="namora"
                  value="não"
                  checked={formData.namora === 'não'}
                  onChange={handleChange}
                  className="mr-3 w-5 h-5 cursor-pointer accent-purple-700"
                />
                Não
              </label>
            </div>
            </div>
          </div>

          <div className="hidden mb-6 pb-6 border-b border-gray-200 relative" id="perguntaNao">
            <label className="block text-sm text-gray-800 mb-2 font-normal">Quer sair comigo?</label>
            <div className="flex w-full h-32 relative">
            <div className="flex flex-col gap-3">
              <label className="flex items-center text-sm text-gray-800 cursor-pointer py-1">
                <input
                  type="checkbox"
                  name="pergunta"
                  value="sim"
                  checked={formData.pergunta === 'sim'}
                  onChange={handleChange}
                  className="mr-3 w-5 h-5 cursor-pointer accent-purple-700"
                />
                Sim
              </label>
              <div id="nao">
              <label className="flex items-center text-sm text-gray-800 cursor-pointer py-1">
                <input
                  type="checkbox"
                  name="pergunta"
                  value="não"
                  checked={formData.pergunta === 'não'}
                  onChange={handleChangeNao}
                  className="mr-3 w-5 h-5 cursor-pointer accent-purple-700"
                />
                Não
              </label>
              </div>
            </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6 flex-wrap">
            <button type="submit" className="bg-purple-700 text-white border-0 rounded px-6 py-2.5 text-sm font-medium cursor-pointer transition-all duration-200 uppercase tracking-wide hover:bg-purple-800 hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] active:bg-purple-900">
              Enviar
            </button>
            <button 
              type="button" 
              className="bg-transparent text-purple-700 border-0 rounded px-6 py-2.5 text-sm font-medium cursor-pointer transition-colors duration-200 uppercase tracking-wide hover:bg-purple-700/8"
              onClick={() => setFormData({
                nome: '',
                telefone: '',
                comidaFavorita: '',
                restauranteFavorito: '',
                namora: false,
                comentarios: ''
              })}
            >
              Limpar formulário
            </button>
          </div>
        </form>

        {message.text && (
          <div className={`mt-3 px-4 py-4 rounded-lg text-sm bg-white shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-900 border-l-4 border-green-500' 
              : 'bg-red-50 text-red-900 border-l-4 border-red-500'
          }`}>
            {message.text}
          </div>
        )}

        {submissionCount > 0 && (
          <div className="mt-3 px-4 py-4 bg-white rounded-lg text-center text-sm text-gray-600 shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
            <p className="m-0">✅ Respostas enviadas: {submissionCount}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
