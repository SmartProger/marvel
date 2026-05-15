class MarvelService {
  _apiBase = "https://marvel-server-zeta.vercel.app/characters";
  _apiKey = "d4eecb0c66dedbfae4eab45d312fc1df";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getAllCharacters = () => {
    return this.getResource(`${this._apiBase}?apikey=${this._apiKey}`);
  };

  getCharacter = (id) => {
    return this.getResource(`${this._apiBase}/${id}?apikey=${this._apiKey}`);
  };
}

export default MarvelService;
