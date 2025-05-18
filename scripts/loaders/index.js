export default async (url, callback) => {
  try {
    const baseUrl = window.location.origin;
    const absoluteUrl = new URL(url, baseUrl).href;

    const response = await fetch(absoluteUrl);

    const data = await response.text();

    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo');
    }

    if (!data) {
      throw new Error('Arquivo vazio');
    }

    callback(data);
  } catch (error) {
    console.error('Erro:', error);
    callback('');
  }
};
