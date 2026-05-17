import {Component} from "react";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";
import "./charList.scss";

class CharList extends Component {
  state = {
    count: 9,
    charList: [],
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.marvelService
      .getAllCharacters(this.state.count)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  }

  onCharListLoaded = (charList) => {
    this.setState({
      charList,
      loading: false,
    });
  };

  onError = () => {
    this.setState({loading: false, error: true});
  };

  render() {
    const {charList, loading, error} = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading) ? <Cards charList={charList} /> : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const Cards = ({charList}) => {
  const cards = charList.map((item) => {
    return (
      <li className="char__item" key={item.id}>
        <img src={item.thumbnail} alt={item.name} />
        <div className="char__name">{item.name}</div>
      </li>
    );
  });

  return <ul className="char__grid">{cards}</ul>;
};

export default CharList;
