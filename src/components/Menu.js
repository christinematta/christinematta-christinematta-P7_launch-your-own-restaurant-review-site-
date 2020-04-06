import React, {Component} from 'react';
import searchIcon from '../search-icon.png';
import '../menu.css';


class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {showForm: false};
        this.showForm = this.showForm.bind(this);
    }

    showForm(event) {
        event.preventDefault();
        this.setState({
            showForm: !this.state.showForm // toggle the state for ShowForm
        });


    }

    render() {


        let searchForm = this.state.showForm ? (
            <form className="menu__search-form" method="POST">
                <input className="menu__search-input" placeholder="Type and hit enter"/>
            </form>
        ) : '';

        let linksMarkup = this.props.links.map((link, index) => {
            let linkMarkup = link.active ? (
                <a className="menu__link menu__link--active" href={link.link}>{link.label}</a>
            ) : (
                <a className="menu__link" href={link.link}>{link.label}</a>
            );

            return (
                <li key={index} className="menu__list-item">
                    {linkMarkup}
                </li>
            );
        });

        return (

            <nav className="menu">
                <h1 style={{backgroundImage: 'url(' + this.props.logo + ')', backgroundSize: '100%'}}
                    className="menu__logo">logo</h1>

                <div className="menu__right">
                    <ul className="menu__list">
                        {linksMarkup}
                    </ul>

                    <button onClick={this.showForm} style={{
                        backgroundImage: 'url(' + searchIcon + ')', backgroundSize: '107%'
                    }} className="menu__search-button"></button>

                    {searchForm}

                </div>
            </nav>);
    }
}

export default Menu;
