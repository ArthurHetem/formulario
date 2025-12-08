/**
 * Google Apps Script para receber dados do formulário "Clean & Natural"
 *
 * INSTRUÇÕES DE CONFIGURAÇÃO ATUALIZADAS:
 *
 * 1. Abra sua planilha no Google Sheets.
 * 2. Na primeira linha (Cabeçalho), coloque exatamente nesta ordem:
 * A1: Data/Hora | B1: Nome | C1: WhatsApp | D1: Estado Civil |
 * E1: Aceita Convite? | F1: Culinária Favorita | G1: Programa Ideal | H1: Nível Estresse
 *
 * 3. Cole o código abaixo no Apps Script.
 * 4. IMPORTANTE: Clique em "Implantar" > "Nova implantação" (Sempre crie uma NOVA ao mudar o código).
 * 5. Copie a nova URL gerada.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Evita conflito de envios simultâneos

  try {
    // Pegar a planilha ativa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parsear os dados recebidos do React
    var data = JSON.parse(e.postData.contents);

    // Criar array com os dados na ordem das colunas da planilha
    // Estamos garantindo que se o campo vier vazio, salvamos como string vazia ''
    var row = [
      data.timestamp || new Date().toLocaleString('pt-BR'), // A
      data.nome || '', // B
      data.whatsapp || '', // C (Prioridade para contato)
      data.estadoCivil || '', // D
      data.aceitaConvite || '', // E
      data.culinariaFavorita || '', // F
      data.programaIdeal || '', // G
      data.nivelEstresse || '', // H
    ];

    // Adicionar linha na planilha
    sheet.appendRow(row);

    // Retornar sucesso
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: 'Dados salvos com sucesso!',
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Retornar erro
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: 'Erro ao salvar dados: ' + error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Função para testar se a URL está ativa (acessando pelo navegador)
function doGet() {
  return ContentService.createTextOutput('API do Formulário está ativa e funcionando! 😎');
}
