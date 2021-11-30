import React, {Component} from "react";
import {RecyclerListView, LayoutProvider, DataProvider} from "recyclerlistview";
import {View, Dimensions, Text, Image} from "react-native";
import FlightCard from "./FlightCard";
import FlightData from "./DataSource";
import HotelCard from "./HotelCard";
import TopWidget from "./TopWidget";

let {height, width} = Dimensions.get('window');

export default class MainComponent extends Component {

    pageSize: number = 20;
    pointer: number;

    constructor(args) {
        super(args);
        // this.ref = undefined;
        this.pointer = 0;
        this.state = {
            dataProvider: new DataProvider((r1, r2) => {
                return r1 !== r2
            }).cloneWithRows(FlightData.slice(0, Math.min(FlightData.length, (this.pointer++) * this.pageSize)))
        };
        this._layoutProvider = new LayoutProvider((i) => {
            return this.state.dataProvider.getDataForIndex(i).type;
        }, (type, dim) => {
            dim.width = Dimensions.get('window').width;
            switch (type) {

                //The most frequent items first.
                case "HOTEL_ITEM":

                    dim.height = 183;
                    break;
                case "HEADER":

                    dim.height = 300;
                    break;

                case "FL_ITEM":

                    dim.height = 80;
                    break;

                default:

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

    _onEndReached() {
        this.setState({
            dataProvider: new DataProvider((r1, r2) => {
                return r1 !== r2
            }).cloneWithRows(FlightData.slice(0, Math.min(FlightData.length, (this.pointer++) * this.pageSize)))
        });
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Travel Mate</Text>
            </View>
            <RecyclerListView
                canChangeSize={true}
                rowRenderer={this._renderRow}
                dataProvider={this.state.dataProvider}
                layoutProvider={this._layoutProvider}
                onEndReached={() => this._onEndReached()}/>
        </View>
    }

    //ref={this.onRef}
    // private onRef = (event) => {
    //     this.ref = event;
    //     //this.ref?.forceUpdate();
    // }

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
