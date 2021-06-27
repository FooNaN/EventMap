import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/singleMap.css';


export class SingleMap extends Component {
    constructor(props){
        super(props);
        
        this.initial_state = this.state;

        const id = props.mapId;

        this.state = {
            id: id,
            isLoaded: false,
            error: false,
            map: null,
        };

        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);

        this.load_map(id);
    }

    notify = (text) => {
        toast(text)
    };

    load_map = (id) => {
        fetch(`http://127.0.0.1:8000/api/get_map/${id}`)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    map: result.result,
                }, () => {
                    this.init();
                });
                
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: true,
                });
            }
        )
    }

    getClickCoord(e){
        var ratioX = e.target.naturalWidth / e.target.offsetWidth;
        var ratioY = e.target.naturalHeight / e.target.offsetHeight;

        var domX = e.x + window.pageXOffset - e.target.offsetLeft;
        var domY = e.y + window.pageYOffset - e.target.offsetTop;

        var imgX = Math.round(domX * ratioX);
        var imgY = Math.round(domY * ratioY);

        return {'x': imgX, 'y': imgY};
    }

    initPoints = () => {
        // document.querySelectorAll(".point").forEach(e => e.remove());​

        var points = this.state.map.points;
        var image = document.getElementById("map-image");

        points.forEach((item) => {
            var block = document.createElement('div');

            block.innerHTML = item.number;
            block.className = 'point'

            block.dataset.name = item.name.toLowerCase();
            block.dataset.description = item.description.toLowerCase();
            block.dataset.category = item.category_name.toLowerCase();

            block.style.top = `${image.offsetTop + item.y * image.clientHeight}px`;
            block.style.left = `${image.offsetLeft + item.x * image.clientWidth}px`;

            block.onclick = (e) => {
                this.notify(`${item.name} : ${item.description}`);
                console.log(this.state.id);
            };

            document.body.appendChild(block);
        })
    }

    init = () => {
        var mymap = document.getElementById('map-image');

        mymap.onclick = (e) => {
            var ratioX = e.target.naturalWidth / e.target.offsetWidth;
            var ratioY = e.target.naturalHeight / e.target.offsetHeight;

            var domX = e.x + window.pageXOffset - e.target.offsetLeft;
            var domY = e.y + window.pageYOffset - e.target.offsetTop;

            var imgX = Math.round(domX * ratioX);
            var imgY = Math.round(domY * ratioY);
            
            var formDiv = document.getElementById('pointAdder');

            formDiv.style.display = 'flex';
            formDiv.style.top = `${e.pageY}px`;
            formDiv.style.left = `${e.pageX}px`;
            
            this.setState({
                'imgX': imgX,
                'imgY': imgY
            })
        }

        this.initPoints();
    }

    _handleSubmit = (event) => {
        var mymap = document.getElementById('map-image');

        const state = this.state;
        const csrftoken = document.getElementsByName("csrfmiddlewaretoken");

        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' ,
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(
                {
                    map_id     : state.id,
                    x          : state.imgX / mymap.naturalWidth,
                    y          : state.imgY / mymap.naturalHeight,
                    number     : state.number,
                    name       : state.name,
                    description: state.description,
                    category_id: state.category_id != null ? state.category_id : state.map.categories[0].id,
                })};
    
        fetch(`http://127.0.0.1:8000/api/add_point/${state.id}`, requestOptions)
            .then(response => response.json())
        
        event.preventDefault();

        window.location.reload();
    }

    _handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });

        console.log(this.state);
    }

    _filterPoints(event) {
        const target = event.target;
        const value = target.value.toLowerCase();

        document.querySelectorAll('.point').forEach(e => {
            if(e.dataset.name.includes(value) || e.dataset.description.includes(value)) {
                e.style.display = 'flex';
            }else {
                e.style.display = 'none';
            }
        });
        
    }
    
    render() {
        if(this.state.error) {
            return <p>Error: {this.id}</p>
        }else if(!this.state.isLoaded) {
            return <p>Loading...</p>
        }else {
            return (
                <div>
                    <h2>Карта {this.state.map.name}</h2>
                    
                    <div className="search-form-container">
                        <input className="search-form-input" id="search-form-input" type="text" placeholder="Введите название или примерное описание" onChange={this._filterPoints}/>
                        <label className="search-form-icon" for="search-form-input" style={{backgroundImage: 'url("http://127.0.0.1:8000/static/img/Button-M-Search-ic.svg")'}} />
                    </div><br></br>

                    <img style={{width: '100%'}}src={`http://127.0.0.1:8000${this.state.map.photo}`} id="map-image"/>

                    <ToastContainer />

                    <div id="pointAdder">
                        <form onSubmit={this._handleSubmit}>
                            <input type="number" name="number" id="number" placeholder="Номер" onChange={this._handleInputChange} required />
                            <input type="text" name="name" id="name" placeholder="Название" onChange={this._handleInputChange} required />
                            <input type="text" name="description" id="description" placeholder="Описание" onChange={this._handleInputChange} required />

                            <select name="category_id" onChange={this._handleInputChange} required>
                                {this.state.map.categories.map((json) => <option value={json.id} key={json.id}> 
                                    {json.name}
                                </option>)}
                            </select>

                            <input type="submit" value="Отправить"/>
                        </form>
                    </div>
                </div>
            )
        }
    }

    componentWillUnmount() {
        var elements = document.getElementsByClassName("point");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}


export default SingleMap;
