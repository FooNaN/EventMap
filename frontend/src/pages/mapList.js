import React, { Component } from 'react';

import '../static/css/maplist.css';


export class MapList extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            maps: [],
            isLoaded: false,
            error: false,
        }

        this.load_maps();
    }

    load_maps = () => {
        fetch('http://127.0.0.1:8000/api/get_map_list/')
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    maps: result.result
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

    MapItem(props){
        return (
                <div class="news_card">
                    <a href={"/map/" + props.id}>
                        <div class="card_image_block" style={{'background-image': 'url('+'http://127.0.0.1:8000/media/'+props.img+')'}}>
                            <div class="image_opacity_color"></div>
                        </div>
                    </a>
                    <div class="news_card_content">
                        <p class="date-caption">{props.create_date}</p>
                        <a href={"/map/" + props.id}><p class="title">{props.name}</p></a>

                        <div class="news_tag_list">
                            <div class="news_tag">{props.code}</div>
                            <div class="news_tag">{props.place}</div>
                        </div>
                    </div>
                </div>
        )
    }

    render() {
        var content;

        if(this.state.error) {
            content = <p>Error!</p>
        }else if(!this.state.isLoaded) {
            content = <p>Loading...</p>
        }else {
            content = (
                <div>
                    <h2>Список интерактивных карт</h2>
                    <div class="news_list">
                        {this.state.maps.map((map_json) => 
                            <this.MapItem name={map_json['name']} place={map_json['place']} img={map_json['photo']} create_date={map_json['create_date']} code={map_json['code']} id={map_json['id']} key={map_json['id']}></this.MapItem>
                        )}
                    </div>
                </div>
            )
        }

        return <div>
            {content} 
            </div>
    }
}


export default MapList;
