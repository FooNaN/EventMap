import React, { Component } from 'react';


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
            <div className="mapItem">
                <p>{props.name}</p>
                <a href={`/map/${props.id}`}>Открыть</a>
            </div>
        )
    }

    render() {
        if(this.state.error) {
            return <p>Error!</p>
        }else if(!this.state.isLoaded) {
            return <p>Loading...</p>
        }else {
            return (
                <div>
                    {this.state.maps.map((map_json) => 
                        <this.MapItem name={map_json['name']} id={map_json['id']} key={map_json['id']}></this.MapItem>
                    )}
                </div>
            )
        }
    }
}


export default MapList;
