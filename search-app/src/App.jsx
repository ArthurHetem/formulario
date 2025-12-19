import { useState } from 'react';
import confetti from 'canvas-confetti';

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    nivelEstresse: '5',
    programaIdeal: '',
    culinariaFavorita: '',
    estadoCivil: null, // Alterado de 'namora' para 'estadoCivil' para ser mais formal
    aceitaConvite: null, // Alterado de 'querSair'
    whatsapp: ''
  });
  
  const [message, setMessage] = useState({ text: '', type: '' });
  const [submissionCount, setSubmissionCount] = useState(0);

  const dispararConfetes = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
      
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Lógica do Estado Civil
    if (name === 'estadoCivil') {
      const perguntaConvite = document.getElementById('perguntaConvite');
      const whatsappSection = document.getElementById('whatsappSection');

      if (value === 'solteira') {
        perguntaConvite?.classList.remove('hidden');
        whatsappSection?.classList.remove('hidden');
      } else {
        perguntaConvite?.classList.add('hidden');
        whatsappSection?.classList.add('hidden');
        setFormData(prev => ({ ...prev, aceitaConvite: null })); 
      }
      
      // Resetar posição do botão não
      const naoElement = document.getElementById('nao');
      if (naoElement) {
        naoElement.style.position = '';
        naoElement.style.left = '';
        naoElement.style.top = '';
      }
    }
  };

  function handleAceitaConviteChange(e) {
    const { name, value } = e.target;
    if (value === 'sim') {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  }

  function handleChangeNao(e) {
    e.preventDefault(); 
    e.stopPropagation(); 
    
    const naoElement = document.getElementById('nao');
    const container = document.getElementById('containerFugitivo');

    if (naoElement && container) {
      const parentWidth = container.offsetWidth;
      const parentHeight = container.offsetHeight;
      const childWidth = naoElement.offsetWidth;
      const childHeight = naoElement.offsetHeight;

      const maxX = parentWidth - childWidth;
      const maxY = parentHeight - childHeight;
      
      const randomX = Math.max(0, Math.floor(Math.random() * maxX));
      const randomY = Math.max(0, Math.floor(Math.random() * maxY));
      
      naoElement.style.position = 'absolute';
      naoElement.style.transition = 'all 0.1s ease';
      naoElement.style.left = `${randomX}px`;
      naoElement.style.top = `${randomY}px`;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome.trim()) {
      setMessage({ text: 'Por favor, preencha seu nome.', type: 'error' });
      return;
    }

    if (formData.aceitaConvite !== 'sim') {
      setMessage({ text: 'Ops! Parece que você não quer sair... 😢, Envio cancelado.', type: 'error' });
      return;
    }

    // Feedback visual de carregamento
    setMessage({ text: 'Enviando respostas...', type: 'info' });

    // ⚠️ SUBSTITUA PELA SUA URL DO GOOGLE APPS SCRIPT AQUI
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxbzoGEpB5Y4ExcQ5AyRPNOjUf5V9ZcqVYz1XBJNK648eZj_84_ntBB_nWhnVW6NJJagQ/exec';

    try {
      const submissionData = {
        ...formData,
        timestamp: new Date().toLocaleString('pt-BR')
      };

      // Envio para o Google Sheets
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        // 'no-cors' é essencial para o Google Apps Script não dar erro de bloqueio
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      // Sucesso
      dispararConfetes();
      setMessage({ text: 'Resposta registrada com sucesso! 😉', type: 'success' });
      setSubmissionCount(prev => prev + 1);
      
      // Limpeza do formulário após 3 segundos
      setTimeout(() => {
        setFormData({
            nome: '', 
            nivelEstresse: '5', 
            programaIdeal: '', 
            culinariaFavorita: '',
            estadoCivil: null, 
            aceitaConvite: null, 
            whatsapp: ''
        });
        
        // Esconder os campos dinâmicos novamente
        document.getElementById('perguntaConvite')?.classList.add('hidden');
        document.getElementById('whatsappSection')?.classList.add('hidden');
        
        // Limpar mensagem
        setMessage({ text: '', type: '' });
      }, 3000);

    } catch (error) {
      console.error('Erro ao enviar:', error);
      setMessage({ text: 'Houve um erro ao enviar. Tente novamente.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-purple-50 font-sans">
      
      {/* Cabeçalho Limpo */}
      <div className="w-full max-w-[770px] bg-white rounded-lg mb-3 overflow-hidden shadow-sm border border-gray-200">
        <div className="h-2.5 bg-purple-700"></div>
        <div className="p-6">
          <h1 className="text-3xl font-normal text-gray-900 mb-2">Formulário de Interesses</h1>
          <p className="text-sm text-gray-600">
            Breve pesquisa para coleta de preferências pessoais.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[770px] mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* 1. Nome */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <label className="block text-base font-medium text-gray-900 mb-4">
              Nome completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nome"
              className="w-full md:w-1/2 border-b border-gray-300 focus:border-purple-700 outline-none py-1 transition-colors bg-transparent placeholder-gray-400 text-gray-800"
              placeholder="Sua resposta"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          {/* 2. Nível de Estresse */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <label className="block text-base font-medium text-gray-900 mb-4">
              Em uma escala de 0 a 10, como foi sua semana?
            </label>
            <div className="px-2">
              <input 
                type="range" 
                name="nivelEstresse" 
                min="0" max="10" 
                value={formData.nivelEstresse} 
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-700"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-3">
                <span>0 (Tranquila)</span>
                <span className="font-bold text-purple-700 text-lg">{formData.nivelEstresse}</span>
                <span>10 (Estressante)</span>
              </div>
            </div>
          </div>

          {/* 3. Programa Ideal */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <label className="block text-base font-medium text-gray-900 mb-4">
              Qual sua programação preferida para o fim de semana?
            </label>
            <div className="space-y-3">
              {['Filmes e séries em casa', 'Sair para beber e conversar', 'Jantar em um bom restaurante', 'Atividades ao ar livre'].map((opcao) => (
                <label key={opcao} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="programaIdeal"
                    value={opcao}
                    checked={formData.programaIdeal === opcao}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <span className="text-gray-700 text-sm">{opcao}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Culinária */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <label className="block text-base font-medium text-gray-900 mb-4">
              Qual sua culinária favorita?
            </label>
            <input
              type="text"
              name="culinariaFavorita"
              className="w-full border-b border-gray-300 focus:border-purple-700 outline-none py-1 transition-colors bg-transparent placeholder-gray-400 text-gray-800"
              placeholder="Ex: Italiana, Japonesa, Brasileira..."
              value={formData.culinariaFavorita}
              onChange={handleChange}
            />
          </div>

          {/* 5. Estado Civil */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <label className="block text-base font-medium text-gray-900 mb-4">
              Estado civil atual <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="estadoCivil"
                  value="comprometida"
                  checked={formData.estadoCivil === 'comprometida'}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700 text-sm">Comprometida / Namorando</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="estadoCivil"
                  value="solteira"
                  checked={formData.estadoCivil === 'solteira'}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700 text-sm">Solteira</span>
              </label>
            </div>
          </div>

{/* 6. Convite (Aparece se Solteira) */}
          <div id="perguntaConvite" className="hidden bg-white rounded-lg p-6 shadow-sm border border-gray-200 relative overflow-hidden">
            <label className="block text-base font-medium text-gray-900 mb-4">
              {/* Aqui usamos o que ela escreveu na pergunta da comida. Se estiver vazio, usa um texto padrão */}
              {formData.culinariaFavorita 
                ? `Topa ir comer ${formData.culinariaFavorita} qualquer dia desses?` 
                : 'Topa marcar algo para comer qualquer dia desses?'}
            </label>
            
            {/* Container relativo */}
            <div id="containerFugitivo" className="h-40 w-full relative">
              <div className="absolute top-2 left-0 flex flex-col gap-4 z-10">
                <label className="flex items-center space-x-3 cursor-pointer py-2">
                  <input
                    type="radio"
                    name="aceitaConvite"
                    value="sim"
                    checked={formData.aceitaConvite === 'sim'}
                    onChange={handleAceitaConviteChange}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-gray-800 text-sm">Sim</span>
                </label>
                
                {/* Botão que foge */}
                <div id="nao" onClick={handleChangeNao} className="w-fit">
                  <label className="flex items-center space-x-3 cursor-pointer py-2 opacity-80">
                    <input
                      type="radio"
                      name="aceitaConvite"
                      value="não"
                      checked={formData.aceitaConvite === 'não'}
                      readOnly
                      className="w-4 h-4 text-gray-400 pointer-events-none"
                    />
                    <span className="text-gray-800 text-sm">Melhor não</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 7. WhatsApp */}
          <div id="whatsappSection" className="hidden bg-white rounded-lg p-6 shadow-sm border border-gray-200">
             <label className="block text-base font-medium text-gray-900 mb-4">
              WhatsApp para contato:
            </label>
            <input
              type="tel"
              name="whatsapp"
              className="w-full md:w-1/2 border-b border-gray-300 focus:border-purple-700 outline-none py-1 transition-colors bg-transparent placeholder-gray-400 text-gray-800"
              placeholder="(XX) 9XXXX-XXXX"
              value={formData.whatsapp}
              onChange={handleChange}
            />
          </div>

          {/* Botões */}
          <div className="flex justify-between items-center py-4">
            <button 
              type="submit" 
              className="bg-purple-700 text-white px-6 py-2 rounded text-sm font-medium hover:bg-purple-800 transition-colors shadow-sm"
            >
              Enviar
            </button>
            <button 
              type="button" 
              className="text-purple-700 text-sm font-medium hover:bg-purple-50 px-4 py-2 rounded transition-colors"
              onClick={() => window.location.reload()}
            >
              Limpar formulário
            </button>
          </div>

        </form>

        {/* Feedback */}
        {message.text && (
          <div className={`mt-4 p-4 rounded-md text-sm font-medium text-center shadow-sm ${
            message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center text-xs text-gray-400">
        Google Forms - Privacidade e Termos
      </div>
    </div>
  );
}

export default App;