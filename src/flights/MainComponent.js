import React, {Component} from "react";
import {RecyclerListView, LayoutProvider, DataProvider} from "recyclerlistview";
import {View, Dimensions, Text, Image} from "react-native";
import FlightCard from "./FlightCard";
import FlightData from "./DataSource";
import HotelCard from "./HotelCard";
import TopWidget from "./TopWidget";

let {height, width} = Dimensions.get('window');

export default class MainComponent extends Component {

    constructor(args) {
        super(args);
        this.state = {
            dataProvider: new DataProvider((r1, r2) => {
                return r1 !== r2
            }).cloneWithRows(FlightData)
        };
        this._layoutProvider = new LayoutProvider((i) => {
            return this.state.dataProvider.getDataForIndex(i).type;
        }, (type, dim) => {
            switch (type) {
                //The most frequent items first.
                case "HOTEL_ITEM":
                    dim.width = width;
                    dim.height = 183;
                    break;
                case "HEADER":
                    dim.width = width;
                    dim.height = 300;
                    break;

                case "FL_ITEM":
                    dim.width = width;
                    dim.height = 80;
                    break;

                default:
                    dim.width = width;
                    dim.height = 0;
            }
        });
        // this._renderRow = this._renderRow.bind(this); //WTF
    }


    _renderRow(type, data) {
        switch (type) {
            case "HOTEL_ITEM":
                return <HotelCard/>
            case "HEADER":
                return <TopWidget data={data}/>;
            case "FL_ITEM":
                return <FlightCard data={data}/>;
            default:
                return null;

        }

    }

    render() {
        return <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Travel Mate</Text>
            </View>
            <RecyclerListView rowRenderer={this._renderRow}
                              dataProvider={this.state.dataProvider}
                              layoutProvider={this._layoutProvider}/>
        </View>
    }
}
const styles = {
    container: {
        flex: 1,
    },
    header: {
        height: 65,
        backgroundColor: 'orange',
        alignItems: "center",
        flexDirection: "row",
        elevation: 4
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 16,
        paddingBottom: 3
    },
    backIcon: {
        height: 23,
        width: 23,
        marginLeft: 16

    }
}
